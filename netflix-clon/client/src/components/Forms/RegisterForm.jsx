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
    const form = useForm( {
        resolver: zodResolver( formSchema ),
        defaultValues: {
            email: '',
            password: '',
            repeatPassword: '',
        },
    } );

    const onSubmit = ( data ) => {
        //TODO: Put setError("") here to reset the error message => setError( "" );
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
