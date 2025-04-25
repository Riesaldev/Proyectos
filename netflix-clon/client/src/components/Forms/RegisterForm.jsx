import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

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

const RegisterForm = () => {
    const [ error, setError ] = useState( "" );
    const [ formInputs, setFormInputs ] = useState( {
        email: '',
        password: '',
        repeatPassword: '',
    } );
    const navigate = useNavigate();
    const form = useForm( {
        resolver: zodResolver( formSchema ),
        defaultValues: {
            email: '',
            password: '',
            repeatPassword: '',
        },
    } );

    const handleRegister = async ( e ) => {
        try
        {
            e.preventDefault();

            const res = await fetch( `${ VITE_API_URL }/api/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify( formInputs ),
            } );

            const body = await res.json();
            if ( !res.ok )
            {
                throw new Error( body.message );
            }


            localStorage.setItem( 'login-credentials', JSON.stringify( {
                email: formInputs.email,
                password: formInputs.password,
            } ) );

            toast.success( 'Usuario registrado con éxito. Redirigiendo al inicio de sesión...', {
                id: 'register',
            } );

            navigate( '/login' );
        } catch ( error )
        {
            console.error( error );
            setError( error.message || 'Algo salió mal.' );
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={handleRegister} className="w-full gap-4 flex flex-col">
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
                                    placeholder="Contraseña" {...field}
                                    className="h-14 text-white"
                                    id="password"
                                    onChange={( e ) => setFormInputs( { ...formInputs, password: e.target.value } )}
                                    value={formInputs.password}
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
                                    id="repeatPassword"
                                    onChange={( e ) => setFormInputs( { ...formInputs, repeatPassword: e.target.value } )}
                                    value={formInputs.repeatPassword}
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
};

export default RegisterForm;

