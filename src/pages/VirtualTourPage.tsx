import React from "react";
import { VirtualTour, TourStop } from "../components/VirtualTour";

const VirtualTourPage: React.FC = () => {
  // Customize the tour with additional stops around the museum
  const stops: TourStop[] = [
    {
      id: "lwm-main",
      title: "Liberation War Museum (Main Entrance)",
      position: { lat: 23.775728, lng: 90.369718 },
      description: "The primary campus at Sher-e-Bangla Nagar Civic Centre, Agargaon. Explore the grounds and galleries.",
      heading: 120,
      pitch: 0,
      zoom: 1,
    },
    {
      id: "lwm-gallery",
      title: "Museum Gallery Area",
      position: { lat: 23.7755, lng: 90.3695 },
      description: "Main exhibition halls showcasing artifacts and historical documents from the Liberation War.",
      heading: 90,
      pitch: 0,
      zoom: 1,
    },
    {
      id: "lwm-memorial",
      title: "Memorial Garden",
      position: { lat: 23.7759, lng: 90.3699 },
      description: "Peaceful memorial garden dedicated to the martyrs of the Liberation War.",
      heading: 180,
      pitch: 0,
      zoom: 1,
    },
    {
      id: "lwm-library",
      title: "Research Library",
      position: { lat: 23.7753, lng: 90.3692 },
      description: "Extensive collection of books, documents, and research materials on Bangladesh's history.",
      heading: 270,
      pitch: 0,
      zoom: 1,
    },
  ];

  return (
    <div 
      className="min-h-screen bg-cover bg-fixed bg-center" 
      style={{ 
        backgroundImage: 'url(\'https://www.tbsnews.net/sites/default/files/styles/infograph/public/images/2020/12/15/jadu_ghor_3-min.jpg\')' 
      }}
    >

      
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8 bg-gray-800 bg-opacity-60 rounded-lg p-6">
          <h1 className="text-4xl font-bold text-white mb-4">
            Virtual Tour
          </h1>
          <p className="text-lg text-gray-200 max-w-3xl">
            Take a virtual journey through the Bangladesh Liberation War Museum and its surroundings. 
            Explore the museum grounds, galleries, and memorial areas using Google Street View technology.
          </p>
        </div>

        {/* Virtual Tour Component */}
        <div className="bg-gray-200 bg-opacity-80 rounded-2xl shadow-lg p-6 relative">
          {/* Darker overlay just for the virtual tour area */}
          <div className="absolute inset-0 bg-black bg-opacity-30 rounded-2xl pointer-events-none"></div>
          <div className="relative z-10">
          <VirtualTour
            apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string}
            mapId={import.meta.env.VITE_GOOGLE_MAPS_MAP_ID || "DEMO_MAP_ID"}
            stops={stops}
            autoPlay={false}
            autoPlayIntervalMs={6000}
            className="max-w-full"
          />
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-200 bg-opacity-80 rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              How to Use the Virtual Tour
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                Click on any numbered stop in the sidebar to jump to that location
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                Use the Play button to start an automated tour
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                Drag the Street View image to look around
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                Use mouse wheel or trackpad to zoom in and out
              </li>
            </ul>
          </div>

          <div className="bg-gray-200 bg-opacity-80 rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              About the Museum
            </h3>
            <p className="text-gray-600 mb-4">
              The Bangladesh Liberation War Museum is dedicated to preserving and showcasing 
              the history of the 1971 Liberation War. The museum houses thousands of artifacts, 
              documents, and photographs that tell the story of Bangladesh's struggle for independence.
            </p>
            <p className="text-gray-600">
              Located in the heart of Dhaka, the museum serves as both an educational institution 
              and a memorial to the martyrs who sacrificed their lives for the nation's freedom.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualTourPage;
