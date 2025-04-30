import PropTypes from 'prop-types';
import cookies from 'js-cookie';

import { createContext, useEffect, useState } from 'react';

import toast from 'react-hot-toast';

const { VITE_API_URL, VITE_AUTH_TOKEN } = import.meta.env;

const AuthContext = createContext( null );

const AuthProvider = ( { children } ) => {
    const [ authToken, setAuthToken ] = useState(
        cookies.get( VITE_AUTH_TOKEN ) || null,
    );

    const [ authUser, setAuthUser ] = useState( null );
    const [ authLoading, setAuthLoading ] = useState( true );

    useEffect( () => {
        const fetchUser = async () => {
            try
            {
                if ( !authToken )
                {
                    throw new Error( 'Token no disponible.' );
                }

                const res = await fetch( `${ VITE_API_URL }/api/users/profile`, {
                    headers: {
                        Authorization: `Bearer ${ authToken }`, // Asegúrate de incluir "Bearer"
                    },
                } );

                const body = await res.json();

                if ( !res.ok )
                {
                    throw new Error( body.message || 'Error al obtener el usuario.' );
                }

                setAuthUser( body.data.user ); // Asegúrate de que el usuario se establece correctamente
            } catch ( err )
            {
                authLogoutState();
                toast.error( err.message || 'Error al autenticar.', {
                    id: 'authUser',
                } );
            } finally
            {
                setAuthLoading( false );
            }
        };

        if ( authToken )
        {
            fetchUser();
        } else
        {
            setAuthLoading( false );
        }
    }, [ authToken ] );

    const authLoginState = ( token ) => {
        setAuthToken( token );

        cookies.set( VITE_AUTH_TOKEN, token, {
            expires: 7,
        } );
    };

    const authLogoutState = () => {
        setAuthUser( null );

        setAuthToken( null );

        cookies.remove( VITE_AUTH_TOKEN );
    };

    const authUpdateAvatarState = ( avatarName ) => {
        setAuthUser( {
            ...authUser,
            avatar: avatarName,
        } );
    };

    return (
        <AuthContext.Provider
            value={{
                authToken,
                authUser,
                authLoading,
                authLoginState,
                authLogoutState,
                authUpdateAvatarState,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { AuthContext, AuthProvider };
