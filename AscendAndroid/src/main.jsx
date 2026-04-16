import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';

// ─── Native Platform Init ───
async function initNative() {
  if (Capacitor.isNativePlatform()) {
    try {
      // Dark status bar to match our theme
      await StatusBar.setStyle({ style: Style.Dark });
      await StatusBar.setBackgroundColor({ color: '#060810' });
    } catch (e) {
      // StatusBar may not be available on all platforms
    }

    try {
      // Hide splash after app renders
      await SplashScreen.hide();
    } catch (e) {
      // SplashScreen may not be available
    }
  }
}

// Mount app
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// Init native features after render
initNative();
