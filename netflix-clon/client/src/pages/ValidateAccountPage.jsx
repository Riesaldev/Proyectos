import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const { VITE_API_URL } = import.meta.env;

const ValidateAccountPage = () => {
    const { regCode } = useParams();

    useEffect( () => {
        const validateAccount = async () => {
            try
            {
                const response = await fetch( `${ VITE_API_URL }/api/users/validate/${ regCode }` );
                const data = await response.json();

                if ( !response.ok )
                {
                    const message = data.message || 'Error al validar la cuenta.';
                    toast.error( message );
                    localStorage.setItem( 'account-validation', JSON.stringify( { success: false, message } ) );
                    return;
                }

                toast.success( 'Cuenta activada con éxito.' );
                localStorage.setItem( 'account-validation', JSON.stringify( { success: true, message: 'Cuenta activada con éxito.' } ) );
            } catch ( error )
            {
                const message = error.message || 'Error al validar la cuenta.';
                toast.error( message );
                localStorage.setItem( 'account-validation', JSON.stringify( { success: false, message } ) );
            } finally
            {
                window.close();
            }
        };

        validateAccount();
    }, [ regCode ] );

    return <div>Validando tu cuenta...</div>;
};

export default ValidateAccountPage;