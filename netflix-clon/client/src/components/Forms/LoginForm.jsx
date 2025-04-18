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
import toast, { Toaster } from 'react-hot-toast';


const formSchema = z.object( {
    email: z.string().email( { message: 'Invalid email address' } ),
    password: z.string().min( 6, { message: 'Password must be at least 6 characters long' } ),
} );

const LoginForm = () => {
    const [ error, setError ] = useState( "" );
    const form = useForm( {
        resolver: zodResolver( formSchema ),
        defaultValues: {
            email: '',
            password: '',
        },
    } );

    const onSubmit = ( data ) => {

        setError( toast.loading( 'Cargando...', {
            id: 'login',
        } ) );
        setError( toast.dismiss( 'login' ) );
        setError( toast.success( 'Login successful', {
            id: 'login',
        } ) );
        setError( toast.error( 'Login failed', {
            id: 'login',
        } ) );
        setError( "" );

        console.log( data );

    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit( onSubmit )} className="w-full gap-4 flex flex-col">
                <FormField
                    control={form.control}
                    name="email"
                    render={( { field } ) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    placeholder="Correo electrónico" {...field}
                                    className="h-14 text-white"
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
                                    placeholder="Contraseña" {...field}
                                    className="h-14 text-white"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormError message={error} />
                <Button type="submit" className="w-full bg-[#E50914]">Iniciar sesión</Button>
                <Toaster toastOptions="
                    {
                        style: {
                            background: '#1F2937',
                            color: '#FFFFFF',
                        },
                    },
                "/>
            </form>
        </Form>
    );
}

export default LoginForm;
