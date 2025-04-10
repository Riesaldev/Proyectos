import React from 'react';
import Link from 'next/link';
import { Checkbox } from '@/components/ui/checkbox';
import Terms from '../components/Terms/Terms';
import LoginForm from './LoginForm/LoginForm';

const LoginPage = () => {
    return (
        <div>
            <p className='text-3xl font-bold text-left mb-7'>Iniciar Sesión</p>
            <LoginForm />

            <div className='mt-5 text-center'>
                <Link href="/" className='hover:underline hover:opacity-70'>
                    ¿Has olvidado tu contraseña?
                </Link>
            </div>
            <div className='flex items-center space-x-2 mt-4'>
                <Checkbox id="Terms" className='border-white' />
                <label className='peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                    Recuérdame
                </label>
            </div>
            <div className='flex gap-1 mt-4'>
                <p className='text-white opacity-70'>¿Aún sin Riflix?</p>
                <Link href="/register" className='text-white opacity-100 hover:underline hover:opacity-70'>
                    Regístrate yá
                </Link>
            </div>
            <Terms />
        </div>
    );
}

export default LoginPage;
