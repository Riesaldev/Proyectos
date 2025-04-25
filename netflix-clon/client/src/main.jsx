import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import './index.css';
import App from './App.jsx';
import toast from 'react-hot-toast';

const Main = () => {
  useEffect( () => {
    const handleStorageChange = ( event ) => {
      if ( event.key === 'account-validation' )
      {
        const data = JSON.parse( event.newValue );
        if ( data )
        {
          const { success, message } = data;
          if ( success )
          {
            toast.success( message );
          } else
          {
            toast.error( message );
          }
          localStorage.removeItem( 'account-validation' ); // Limpia el almacenamiento
        }
      }
    };

    window.addEventListener( 'storage', handleStorageChange );
    return () => {
      window.removeEventListener( 'storage', handleStorageChange );
    };
  }, [] );

  return (
    <StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </StrictMode>
  );
};

createRoot( document.getElementById( 'root' ) ).render( <Main /> );
