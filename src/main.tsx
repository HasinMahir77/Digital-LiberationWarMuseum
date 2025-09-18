import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './i18n'; // Import our i18n configuration
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n'; // Import the i18n instance

function Main() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (i18n.isInitialized) {
      setIsInitialized(true);
    } else {
      i18n.on('initialized', () => setIsInitialized(true));
    }
    return () => {
      i18n.off('initialized', () => setIsInitialized(true));
    };
  }, []);

  if (!isInitialized) {
    return <div>Loading Translations...</div>;
  }

  return (
    <StrictMode>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </StrictMode>
  );
}

createRoot(document.getElementById('root')!).render(<Main />);
