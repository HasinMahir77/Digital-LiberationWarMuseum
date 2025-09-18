// VirtualTour.tsx
// A self-contained virtual tour component for React + Tailwind.
// Drop this file into your project and render <VirtualTour apiKey="YOUR_KEY" />
// or pass stops to customize the tour.
//
// Required: For Advanced Markers to work, you need a valid Map ID from Google Cloud Console.
// Create a map style in Google Cloud Console and use its Map ID here.
// Optional: For TypeScript IntelliSense, install @types/google.maps
// and (if needed) add "types": ["google.maps"] to tsconfig.json's compilerOptions.
//
// Tailwind: container classes assume your app already has Tailwind configured.

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { useTranslation } from 'react-i18next';

type LatLng = { lat: number; lng: number };

export type TourStop = {
  id: string;
  title: string;
  position: LatLng;
  description?: string;
  /** If you know a specific panorama ID, set it to force an exact pano. */
  panoId?: string;
  /** Preferred street view heading/pitch/zoom for nicer framing. */
  heading?: number;
  pitch?: number;
  zoom?: number;
  /** Optional thumbnail URL for the sidebar. */
  thumbnailUrl?: string;
};

type VirtualTourProps = {
  apiKey: string;
  /** Provide your own stops; if omitted, we preload the museum. */
  stops?: TourStop[];
  /** Autoplay the tour on mount. */
  autoPlay?: boolean;
  /** Milliseconds between stops during autoplay. */
  autoPlayIntervalMs?: number;
  /** Initial map zoom for single-stop cases. */
  initialZoom?: number;
  /** Map ID for Advanced Markers (required for Advanced Markers to work). */
  mapId?: string;
  /** Map style or options override. */
  mapOptions?: google.maps.MapOptions;
  /** Polyline options override. */
  polylineOptions?: google.maps.PolylineOptions;
  /** Street View options override. */
  streetViewOptions?: google.maps.StreetViewPanoramaOptions;
  /** Libraries to load (advanced users). */
  libraries?: Array<("places" | "geometry" | "marker" | "maps")>;
  /** ClassName passthrough for the outermost container. */
  className?: string;
};

// Default: Bangladesh Liberation War Museum (Agargaon campus, current site)
const DEFAULT_STOPS_ORIGINAL: TourStop[] = [
  {
    id: "lwm-main",
    title: "Liberation War Museum (Main Entrance)",
    position: { lat: 23.775728, lng: 90.369718 },
    description:
      "The primary campus at Sher-e-Bangla Nagar Civic Centre, Agargaon. Explore the grounds and galleries.",
    // These are gentle defaults; Street View will pick nearest panorama.
    heading: 90,
    pitch: 0,
    zoom: 1,
  },
];

const cn = (...parts: Array<string | undefined | false>) =>
  parts.filter(Boolean).join(" ");

export const VirtualTour: React.FC<VirtualTourProps> = ({
  apiKey,
  stops = [],
  autoPlay = false,
  autoPlayIntervalMs = 5500,
  initialZoom = 17,
  mapId = "DEMO_MAP_ID",
  mapOptions,
  polylineOptions,
  streetViewOptions,
  libraries,
  className,
}) => {
  const svDivRef = useRef<HTMLDivElement | null>(null);

  const mapRef = useRef<google.maps.Map>();
  const panoRef = useRef<google.maps.StreetViewPanorama>();
  const infoWindowRef = useRef<google.maps.InfoWindow>();
  const svServiceRef = useRef<google.maps.StreetViewService>();
  const autoplayTimerRef = useRef<number | null>(null);

  const [isReady, setIsReady] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [error, setError] = useState<string | null>(null);

  const { t } = useTranslation();

  const processedStops = useMemo(() => {
    if (stops.length > 0) return stops;
    return [
      {
        id: "lwm-main",
        title: t('virtualTourComponent.defaultStops.mainEntrance.title'),
        position: { lat: 23.775728, lng: 90.369718 },
        description: t('virtualTourComponent.defaultStops.mainEntrance.description'),
        heading: 90,
        pitch: 0,
        zoom: 1,
      },
    ];
  }, [stops, t]);

  // Bounds for fitting all stops elegantly
  const bounds = useMemo(() => {
    if (typeof google === 'undefined' || !google.maps) {
      return null;
    }
    const b = new google.maps.LatLngBounds();
    processedStops.forEach((s) => b.extend(s.position));
    return b;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(processedStops)]);

  // Initialize Google Maps + Street View
  useEffect(() => {
    let cancelled = false;
    const loader = new Loader({
      apiKey,
      version: "weekly",
      libraries: libraries ?? ["places", "marker"],
    });

    (async () => {
      try {
        await loader.load();

        if (cancelled) return;

        // Map (hidden - only used for Street View integration)
        const map = new google.maps.Map(document.createElement('div'), {
          center: processedStops.length ? processedStops[0].position : { lat: 23.777, lng: 90.38 },
          zoom: processedStops.length === 1 ? initialZoom : 14,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          clickableIcons: true,
          gestureHandling: "greedy",
          mapId, // Required for Advanced Markers
          ...mapOptions,
        });
        mapRef.current = map;

        // Street View
        const pano = new google.maps.StreetViewPanorama(
          svDivRef.current as HTMLDivElement,
          {
            pov: { heading: 90, pitch: 0 },
            zoom: 1,
            disableDefaultUI: false,
            addressControl: true,
            motionTracking: true,
            motionTrackingControl: true,
            ...streetViewOptions,
          }
        );
        panoRef.current = pano;

        // Services
        infoWindowRef.current = new google.maps.InfoWindow();
        svServiceRef.current = new google.maps.StreetViewService();

        // Jump to initial stop
        await openStreetViewForStop(0, { openInfo: false });

        setIsReady(true);
        if (autoPlay) startAutoplay();
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("Google Maps init failed:", err);
        setError(t('virtualTourComponent.failedToLoad'));
      }
    })();

    return () => {
      cancelled = true;
      stopAutoplay();
      // Clean up
      infoWindowRef.current?.close();
      panoRef.current?.setVisible(false);
      // Let the DOM nodes be GC'd by React unmount
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiKey, autoPlay, initialZoom, mapOptions, polylineOptions, streetViewOptions, JSON.stringify(processedStops), t]);

  const startAutoplay = () => {
    if (autoplayTimerRef.current) return;
    setIsPlaying(true);
    autoplayTimerRef.current = window.setInterval(() => {
      goToStop((activeIdx + 1) % processedStops.length, { smooth: true });
    }, Math.max(2200, autoPlayIntervalMs));
  };

  const stopAutoplay = () => {
    if (autoplayTimerRef.current) {
      window.clearInterval(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) stopAutoplay();
    else startAutoplay();
  };

  // Jump to a given stop (updates Street View)
  const goToStop = async (idx: number, opts?: { smooth?: boolean }) => {
    setActiveIdx(idx);
    await openStreetViewForStop(idx, { openInfo: true, smooth: opts?.smooth });
  };

  // Core function to open the panorama for a stop (by panoId or nearest-by-location)
  const openStreetViewForStop = async (
    idx: number,
    opts?: { centerMap?: boolean; openInfo?: boolean; smooth?: boolean }
  ) => {
    const s = processedStops[idx];
    const pano = panoRef.current!;
    const svc = svServiceRef.current!;
    const iw = infoWindowRef.current!;

    // Street View: explicit panoId if provided, else find nearest panorama
    const applyPov = () => {
      if (s.heading !== undefined || s.pitch !== undefined || s.zoom !== undefined) {
        pano.setPov({
          heading: s.heading ?? pano.getPov().heading,
          pitch: s.pitch ?? pano.getPov().pitch,
        });
        if (typeof s.zoom === "number") pano.setZoom(s.zoom);
      }
    };

    const showInfo = () => {
      if (!opts?.openInfo) return;
      // Info window functionality removed since we don't have markers anymore
      // The sidebar already shows the stop information
    };

    if (s.panoId) {
      pano.setPano(s.panoId);
      pano.setVisible(true);
      applyPov();
      showInfo();
      return;
    }

    // Find nearest pano within ~100m (adjust as needed)
    await new Promise<void>((resolve) => {
      svc.getPanorama(
        { location: s.position as any, preference: google.maps.StreetViewPreference.NEAREST, radius: 100 },
        (data, status) => {
          if (status === google.maps.StreetViewStatus.OK && data?.location?.pano) {
            pano.setPano(data.location.pano);
            pano.setVisible(true);
            applyPov();
          } else {
            // Fallback: place the POV at the stop even if no pano was returned
            pano.setPosition(s.position as any);
            pano.setVisible(true);
          }
          showInfo();
          resolve();
        }
      );
    });
  };

  const handlePrev = () => goToStop((activeIdx - 1 + processedStops.length) % processedStops.length, { smooth: true });
  const handleNext = () => goToStop((activeIdx + 1) % processedStops.length, { smooth: true });

  // Show error state
  if (error) {
    return (
      <div className={cn("w-full h-[78vh] flex items-center justify-center", className)}>
        <div className="text-center p-8 bg-red-50 border border-red-200 rounded-2xl shadow">
          <h3 className="text-lg font-semibold text-red-800 mb-2">{t('virtualTourComponent.errorLoading')}</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            {t('virtualTourComponent.retry')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full h-[78vh] grid grid-cols-12 gap-4", className)}>
      {/* Sidebar */}
      <aside className="col-span-3 bg-white/70 backdrop-blur border rounded-2xl shadow p-4 overflow-y-auto">
        <header className="mb-3">
          <h2 className="text-xl font-semibold leading-tight">{t('virtualTourComponent.title')}</h2>
          <p className="text-sm opacity-80">
            {t('virtualTourComponent.subtitle')}
          </p>
        </header>

        <ul className="space-y-2">
          {processedStops.map((s, i) => (
            <li key={s.id}>
              <button
                onClick={() => goToStop(i)}
                className={cn(
                  "w-full text-left flex items-center gap-3 rounded-xl border p-3 hover:shadow transition",
                  i === activeIdx ? "border-indigo-500 ring-1 ring-indigo-300 bg-indigo-50/60" : "border-gray-200"
                )}
              >
                <span className={cn(
                  "inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold",
                  i === activeIdx ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-800"
                )}>
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <div className="truncate font-medium">{s.title}</div>
                  {s.description && (
                    <div className="text-xs opacity-70 line-clamp-2">{s.description}</div>
                  )}
                </div>
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="px-3 py-2 rounded-xl border shadow-sm hover:shadow transition text-sm"
            aria-label="Previous stop"
          >
            {t('virtualTourComponent.prev')}
          </button>
          <button
            onClick={togglePlay}
            className={cn(
              "px-3 py-2 rounded-xl border shadow-sm hover:shadow transition text-sm",
              isPlaying ? "bg-emerald-600 text-white border-emerald-600" : ""
            )}
            aria-label={isPlaying ? t('virtualTourComponent.pause') : t('virtualTourComponent.play')}
          >
            {isPlaying ? t('virtualTourComponent.pause') : t('virtualTourComponent.play')}
          </button>
          <button
            onClick={handleNext}
            className="px-3 py-2 rounded-xl border shadow-sm hover:shadow transition text-sm"
            aria-label="Next stop"
          >
            {t('virtualTourComponent.next')}
          </button>
        </div>

        {!isReady && !error && (
          <div className="mt-4 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3">
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-amber-600 mr-2"></div>
              {t('virtualTourComponent.initializing')}
            </div>
          </div>
        )}

        <footer className="mt-4 text-[11px] opacity-70">
          {t('virtualTourComponent.tip')}
        </footer>
      </aside>

      {/* Street View area */}
      <section className="col-span-9">
        <div ref={svDivRef} className="w-full h-[78vh] rounded-2xl border shadow overflow-hidden" />
      </section>
    </div>
  );
};

// Small utility to safely escape text for InfoWindow HTML
function escapeHtml(str: string) {
  return str.replace(/[&<>"']/g, (m) => {
    switch (m) {
      case "&": return "&amp";
      case "<": return "&lt";
      case ">": return "&gt";
      case '"': return "&quot";
      case "'": return "&#39";
      default: return m;
    }
  });
}

export default VirtualTour;
