import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios'; // Added axios import
import { toast } from 'react-hot-toast'; // Added toast import

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

const { VITE_API_URL } = import.meta.env;


const formSchema = z.object( {
    email: z.string().email( {
        message: 'Please enter a valid email address'
    } ),
    password: z.string().min( 6, {
        message: 'Your password must contain at least 6 characters'
    } ),
    repeatPassword: z.string().min( 6, {
        message: 'Password must be at least 6 characters long'
    } )
} ).refine( ( data ) => data.password === data.repeatPassword, {
    message: "Passwords don't match",
    path: [ 'repeatPassword' ]
} );

export function RegisterForm () {
    const [ error, setError ] = useState( "" ); // Corrected usage of setError
    const form = useForm( {
        resolver: zodResolver( formSchema ),
        defaultValues: {
            email: '',
            password: '',
            repeatPassword: '',
        },
    } );

    const onSubmit = async ( data ) => {
        try
        {
            if ( !VITE_API_URL )
            {
                throw new Error( "API URL is not defined. Please check your environment variables." );
            }

            await axios.post( `${ VITE_API_URL }/api/users/register`, data )

            toast.success( 'User registered successfully', {
                id: 'register',
                icon: '✅',
                type: 'success',
            } );
        } catch ( error )
        {
            console.error( error );

            if ( error.response )
            {
                // Server responded with a status code outside the 2xx range
                setError( `Error ${ error.response.status }: ${ error.response.statusText }` );
                toast.error( `Error ${ error.response.status }: ${ error.response.data || 'Something went wrong' }`, {
                    id: 'register',
                    icon: '❌',
                    type: 'error',
                    background: '#f44336',
                    color: '#fff',
                } );
            } else if ( error.request )
            {
                // Request was made but no response received
                setError( 'No response received from the server' );
                toast.error( 'No response received from the server', {
                    id: 'register',
                    icon: '❌',
                    type: 'error',
                    background: '#f44336',
                    color: '#fff',
                } );
            } else
            {
                // Something else happened
                setError( error.message );
                toast.error( error.message, {
                    id: 'register',
                    icon: '❌',
                    type: 'error',
                    background: '#f44336',
                    color: '#fff',
                } );
            }
        }
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

                <FormField
                    control={form.control}
                    name="repeatPassword"
                    render={( { field } ) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Repite la contraseña" {...field}
                                    className="h-14 text-white"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormError message={error} />
                <Button type="submit" className="w-full bg-[#E50914]">Regístrate</Button>
            </form>
        </Form>
    );
}

export default RegisterForm;

