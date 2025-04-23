import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const { VITE_API_URL } = import.meta.env;

const ValidateAccountPage = () => {
    const { regCode } = useParams();
    const navigate = useNavigate();

    useEffect( () => {
        const validateAccount = async () => {
            try
            {
                const response = await fetch( `${ VITE_API_URL }/api/users/validate/${ regCode }` );
                const data = await response.json();

                if ( !response.ok )
                {
                    if ( data.message === 'El código ya ha sido utilizado o es inválido.' )
                    {
                        toast.error( 'El código ya ha sido utilizado. Si tu cuenta ya está activada, inicia sesión.' );
                    } else
                    {
                        throw new Error( data.message || 'Error al validar la cuenta' );
                    }
                } else
                {
                    toast.success( 'Cuenta activada con éxito. Ahora puedes iniciar sesión.' );
                }
                navigate( '/login' );
            } catch ( error )
            {
                toast.error( error.message || 'Error al validar la cuenta.' );
                navigate( '/login' );
            }
        };

        validateAccount();
    }, [ regCode, navigate ] );

    return <div>Validando tu cuenta...</div>;
};

export default ValidateAccountPage;
