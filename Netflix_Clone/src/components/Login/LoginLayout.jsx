import { Checkbox } from "@/components/ui/checkbox"
import Terms from "@/components/Login/Terms";
import LoginForm from "./LoginForm";

function LoginLayout () {
    return (
        <div>
            <h1 className="text-3xl font-bold text-left mb-7">Iniciar Sesión</h1>
            <LoginForm />

            <div className="mt-5 text-center">
                <a href="/" className="hover:underline hover:opacity-70">¿Has olvidado tu contraseña?</a>
            </div>

            <div className="flex items-center space-x-2 mt-4">
                <Checkbox id="Terms" className="border-white" />
                <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Recuerdame</label>
            </div>
            <div className="mt-4 flex gap-1">
                <p className="text-white opacity-70">¿Aun sin Netflix?</p>
                <a href="/register" className="opacity-100 text-white">Suscríbete ya</a>
            </div>
            <div>
                <Terms />
            </div>
        </div>
    );
}

export default LoginLayout;

