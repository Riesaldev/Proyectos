
import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import useAuthContext from '@/hooks/useAuthContext';

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import FormError from './FormError';
import toast from 'react-hot-toast';

const { VITE_API_URL } = import.meta.env;

const formSchema = z.object( {
    name: z.string().min( 1, { message: 'Name is required' } ),
    avatar: z.string().url( { message: 'Invalid URL' } ),
} );

const CreateForm = () => {

    const { authToken } = useAuthContext();
    const { formInputs } = useState( {
        name: '',
        avatar: '',
    } );
    const [ error, setError ] = useState( null );
    const navigate = useNavigate();
    const form = useForm( {
        resolver: zodResolver( formSchema ),
        defaultValues: {
            name: '',
            avatar: '',
        },
    } );

    const handleDeleteProfile = async ( e ) => {
        try
        {
            e.preventDefault();

            const res = await fetch( `${ VITE_API_URL }/api/users/profiles`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ authToken }`,
                },
                body: JSON.stringify( formInputs ),
            } );

            const body = await res.json();

            if ( !res.ok )
            {
                throw new Error( body.message || 'Error al crear el perfil.' );
            }

            toast.success( 'Perfil creado con éxito.' );
            navigate( '/profiles' );
        } catch ( error )
        {
            setError( error.message || 'Error al crear el perfil.' );
        }
    }
    return (

        <>
            <Form {...form}>
                <form onSubmit={handleDeleteProfile} className="w-full gap-4 flex flex-col">
                    <FormField
                        control={form.control}
                        name="name"
                        render={( { field } ) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder="Nombre" {...field}
                                        className="h-14 text-white"
                                        type="text"

                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="avatar"
                        render={( { field } ) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder="URL de la imagen" {...field}
                                        className="h-14 text-white"
                                        type="text"


                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {error && <FormError message={error} />}
                    <Button type="submit"

                        className="mt-4">Crear Perfil</Button>
                </form>
            </Form >
        </>
    );
}

export default CreateForm;
