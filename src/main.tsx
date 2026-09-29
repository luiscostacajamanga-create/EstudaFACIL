import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Register Service Worker for PWA offline caching & installation
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('EstudaFácil Service Worker registrado com sucesso:', registration.scope);
      })
      .catch((error) => {
        console.warn('Falha no registro do Service Worker:', error);
      });
  });
}

createRoot(document.getElementById('root')!).render(<App />);

