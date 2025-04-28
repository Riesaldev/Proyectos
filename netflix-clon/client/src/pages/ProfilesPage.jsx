import UsersItem from '@/components/data/UsersItem';
import Logo from '@/components/Logo';
import React from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const { VITE_API_URL } = import.meta.env;


export function ProfilesPage () {

    const { userId } = JSON.parse( localStorage.getItem( 'user' ) ) || {};

    const fetchProfiles = async () => {


        try
        {

            const response = await fetch( `${ VITE_API_URL }/api/users/${ userId }/profiles`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify( userId ),
            } );

            const body = await response.json();
            console.log( body );

            if ( !body.ok )
            {
                const message = body.message || 'Error al cargar los perfiles.';
                toast.error( message );
                throw new Error( message );
            }
            toast.success( 'Perfiles cargados con éxito.' );

        } catch ( error )
        {
            const message = error.message || 'Error al cargar los perfiles.';
            toast.error( message );



            return (
                <div className='h-screen w-screen bg-gray-900'>
                    <div className="bg-gray-900 w-screen h-17 flex items-center ml-4">
                        <Logo />
                    </div>
                    <div className="  bg-black h-1/2 w-auto mt-16  items-center mx-auto rounded-lg shadow-lg flex flex-col">
                        <h1 className='text-3xl text-center mt-8'>¿Quién eres? Elige tu perfil</h1>
                        <div className='flex flex-raw gap-8 items-start justify-center my-18'>
                            <UsersItem />
                            <Link to="/create" className='items-center justify-center flex flex-col'>
                                <Logo />
                                <p>Añadir perfil</p>
                            </Link>
                        </div>
                        <a href="" className='border '><p className='mx-6 my-2 text-xl'>Administrar Perfiles</p></a>
                    </div>
                </div>

            );
        }
    }
}
