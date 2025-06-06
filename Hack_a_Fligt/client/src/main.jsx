import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import './index.css'; // Importa el archivo CSS global

createRoot( document.getElementById( 'root' ) ).render(
    <StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <App />
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>
);