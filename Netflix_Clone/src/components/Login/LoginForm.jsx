import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '../ui/form';
import { useState } from 'react';
import FormError from './FormError';

const FormSchema = z.object( {
    email: z.string().min( 2, {
        message: "Email is too short",
    } ),
    password: z.string().min( 6, {
        message: "Password is too short",
    } ),
} )

const LoginForm = () => {
    const [ error, setError ] = useState( "" );
    const form = useForm( {
        resolver: zodResolver( FormSchema ),
        defaultValues: {
            email: '',
            password: '',
        },
    } );

    const onSubmit = ( e ) => {
        //TODO: Implement login logic and put setError
        console.log( e );
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit( onSubmit )} className="w-full flex gap-4 flex-col">
                <FormField
                    control={form.control}
                    name="email"
                    render={( { field } ) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Email" {...field} className="h-14 text-white" />
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
                                <Input placeholder="Password" {...field} className="h-14 text-white" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormError message={error} />
                <Button type="submit" className="w-full bg-[#E50914]">Iniciar sesión</Button>
            </form>
        </Form>
    )
}

export default LoginForm;