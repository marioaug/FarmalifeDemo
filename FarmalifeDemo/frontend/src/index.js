import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/root.css'; // Variables CSS globales
import './index.css'; // Base CSS
import App from './App';
import reportWebVitals from './reportWebVitals';

// Renderizado de la aplicación
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
