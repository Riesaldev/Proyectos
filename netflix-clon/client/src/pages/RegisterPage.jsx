import Layout from "@/components/Layout";
import FormLayout from "@/components/FormLayout";
import { Link } from "react-router-dom";
import Terms from "@/components/data/Terms";
import RegisterForm from "@/components/Forms/RegisterForm";



const RegisterPage = () => {
    return (
        <div>
            <Layout />
            <div>
                <FormLayout>
                    <div>
                        <p className="text-3xl font-bold text-left mb-7">Registro de usuario</p>
                        <RegisterForm />

                        <div className="mt-5 flex gap-4">
                            <p className="text-white opacity-70">¿Ya tienes cuenta?</p>
                            <Link to="/login" className="opacity-100 text-white">Inicia sesión</Link>
                        </div>
                        <Terms />
                    </div>
                </FormLayout>
            </div>
        </div>
    );
}

export default RegisterPage;
