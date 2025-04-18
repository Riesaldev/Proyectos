import { useContext, useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import toast from 'react-hot-toast';
import Layout from '@/components/Layout';
import FormLayout from '@/components/FormLayout';

const { VITE_API_URL } = import.meta.env;

const ValidateUserPage = () => {
    const { authUser } = useContext( AuthContext );
    const navigate = useNavigate();
    const { regCode } = useParams();

    useEffect( () => {
        const fetchValidateUser = async () => {
            try
            {
                const res = await fetch(
                    `${ VITE_API_URL }/api/users/validate/${ regCode }`,
                    {
                        method: 'put',
                    }
                );

                const body = await res.json();

                if ( body.status === 'error' )
                {
                    throw new Error( body.message );
                }

                toast.success( body.message, {
                    id: 'activateUser',
                } );

                navigate( '/login' );

            } catch ( err )
            {
                toast.error( err.message, {
                    id: 'activateUser',
                } );
                navigate( '/' );
            }
        };

        fetchValidateUser();
    }, [ regCode, navigate ] );

    if ( authUser )
    {
        return <Navigate to="/" />;
    }

    return (
        <div>
            <Layout />
            <div>
                <FormLayout>
                    <h1>Validando usuario...</h1>
                    <p>Por favor, espera un momento.</p>
                    <p>Si no has recibido un correo, revisa tu carpeta de spam.</p>
                    <p>Si no encuentras el correo, puedes volver a registrarte.</p>
                </FormLayout>
            </div>
        </div>
    );
}

export default ValidateUserPage;