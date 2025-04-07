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

import FormError from '../FormError';

const FormSchema = z.object( {
    email: z.string().min( 2, {
        message: "Email is too short",
    } ),
    password: z.string().min( 6, {
        message: "Password is too short",
    } ),
    repeatPassword: z.string(),
} ).refine( ( data ) => data.password === data.repeatPassword, {
    message: "Passwords don't match",
    path: [ 'repeatPassword' ],
} );

const RegisterForm = () => {
    const form = useForm( {
        resolver: zodResolver( FormSchema ),
        defaultValues: {
            email: '',
            password: '',
            repeatPassword: '',
        },
    } );

    const onSubmit = ( e ) => {
        //TODO: Implement register logic and put setError
        console.log( e );
    };

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

                <FormField
                    control={form.control}
                    name="repeatPassword"
                    render={( { field } ) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="RepeatPassword" {...field} className="h-14 text-white" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormError />
                <Button type="submit" className="w-full bg-[#E50914]">Regístrate</Button>
            </form>
        </Form>
    )
};

export default RegisterForm;