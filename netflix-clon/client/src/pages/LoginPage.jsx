import FormLayout from "@/components/FormLayout";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import Terms from "@/components/data/Terms";
import LoginForm from "@/components/Forms/LoginForm";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

const LoginPage = () => {
    const [ searchParams ] = useSearchParams();

    useEffect( () => {
        if ( searchParams.get( "activated" ) === "true" )
        {
            toast.success( "Cuenta activada con éxito. Ahora puedes iniciar sesión." );
            // Clear the search parameter to prevent the toast from reappearing
            window.history.replaceState( {}, document.title, window.location.pathname );
        }
    }, [ searchParams ] );

    return (
        <>
            <Layout />
            <div>
                <FormLayout>
                    <div>
                        <p className="text-3xl font-bold text-left mb-7">Iniciar sesión</p>
                        <LoginForm />

                        <div className="mt-5 text-center">
                            <Link to="/" className="hover:underline hover:opacity-70">
                                ¿Has olvidado tu contraseña?
                            </Link>
                        </div>

                        <div className="flex items-center space-x-2 mt-4">
                            <Checkbox id="Terms" className="border-white" />
                            <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Recuérdame</label>
                        </div>

                        <div className="mt-4 flex gap-4">
                            <p className="text-white opacity-70">¿Todavía sin Netflix?</p>
                            <Link to="/register" className="opacity-100 text-white">Suscríbete ya</Link>
                        </div>
                        <Terms />
                    </div>
                </FormLayout>
            </div>
        </>
    );
}

export default LoginPage;
