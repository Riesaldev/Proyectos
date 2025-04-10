import Link from "next/link";
import Terms from "../components/Terms/Terms";

const RegisterPage = () => {
    return (
        <div>
            <p className='text-3xl font-bold text-left mb-7'>Registro de usuario</p>

            <p>register Form...</p>

            <div className='mt-4 flex gap-1'>
                <p className='text-white opacity-70'>¿Ya tienes cuenta?</p>
                <Link href='/login' className='text-white opacity-100 hover:underline cursor-pointer'>Inicia sesión aquí</Link>
            </div>

            <Terms />
        </div>
    );
}

export default RegisterPage;
