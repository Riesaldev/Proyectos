import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import useAuthContext from '@/hooks/useAuthContext.js';
import toast from 'react-hot-toast';
import ProfileLayout from '@/components/ui/ProfileLayout';
import FormLayout from '@/components/FormLayout';

const ProfilePage = () => {
    const { authUser, authLogoutState } = useAuthContext();
    const [ profiles ] = useState( [] );


    const handleLogout = () => {
        authLogoutState();
        toast.success( 'Sesión cerrada' );
    };

    const handleToHome = () => {
        window.location.href = '/login';
    };



    if ( !authUser )
    {
        return (
            <div>
                <Layout />
                <h1>No estás autenticado</h1>
                <p>Por favor, inicia sesión para acceder a tu perfil.</p>
                <Button type="button" className="w-full bg-[#E50914]" onClick={handleToHome}>
                    Ir a la página de inicio
                </Button>
            </div>
        );
    }

    return (
        <div>
            <Layout />
            <FormLayout>
                <div className='flex flex-col items-center justify-center h-full'>
                    <h1 className='text-5xl mb-4'>¿Quién eres?</h1> <p className='text-2xl mb-8'>Elige tu perfil</p>
                </div>
                <ProfileLayout profiles={profiles} />
                <Button type="button" className="w-full bg-[#E50914]" onClick={handleLogout}>
                    Cerrar sesión
                </Button>
            </FormLayout>
        </div>
    );
};

export default ProfilePage;
