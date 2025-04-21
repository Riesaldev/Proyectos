import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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
import useAuthContext from '@/hooks/useAuthContext.js';
import { Navigate } from 'react-router-dom';

const { VITE_API_URL } = import.meta.env;

const formSchema = z.object( {
    email: z.string().email( { message: 'Invalid email address' } ),
    password: z.string().min( 6, { message: 'Password must be at least 6 characters long' } ),
} );

const LoginForm = () => {
    const [ formInputs, setFormInputs ] = useState( {
        email: '',
        password: '',
    } )
    const [ loading, setLoading ] = useState( false );


    const LoadingIndicator = () => loading ? <p>Loading...</p> : null;
    const { authUser, authLoginState } = useAuthContext();
    const [ error, setError ] = useState( null );
    const form = useForm( {
        resolver: zodResolver( formSchema ),
        defaultValues: {
            email: '',
            password: '',
        },
    } );

    const handleLogin = async ( e ) => {
        try
        {
            e.preventDefault();
            setLoading( true );

            const res = await fetch( `${ VITE_API_URL }/api/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify( formInputs ),
            } );

            const body = await res.json();

            if ( body.status === 'error' )
            {
                throw new Error( body.message );
            }

            authLoginState( body.data.token );

            toast.success( `Bienvenid@ ${ body.data.userName }!!`, {
                id: 'login-success',
            } );

        } catch ( err )
        {
            toast.error( err.message, {
                id: 'login',
            } );
        } finally
        {
            setLoading( false );
        }
    }



    if ( authUser )
    {
        return (
            <>
                <Navigate to={`/profile/${ authUser?.userId }`} />
            </>
        );
    }
    return (
        <Form {...form}>
            <form onSubmit={handleLogin} className="w-full gap-4 flex flex-col">
                {/* Mueve el LoadingIndicator dentro del formulario */}
                {loading && <p>Loading...</p>}
                <FormField
                    control={form.control}
                    name="email"
                    render={( { field } ) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    placeholder="Correo electrónico" {...field}
                                    className="h-14 text-white"
                                    type="email"
                                    id="email"
                                    onChange={( e ) => setFormInputs( { ...formInputs, email: e.target.value } )}
                                    value={formInputs.email}
                                    autoFocus
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={( { field } ) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    type="password"
                                    id="password"
                                    placeholder="Contraseña" {...field}
                                    className="h-14 text-white"
                                    onChange={( e ) => setFormInputs( { ...formInputs, password: e.target.value } )}
                                    value={formInputs.password}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormError message={error} />
                <Button type="submit"
                    onClick={() => {
                        setError( null );
                    }}
                    className="w-full bg-[#E50914]">Iniciar sesión</Button>
            </form>
        </Form>
    );
}

export default LoginForm;