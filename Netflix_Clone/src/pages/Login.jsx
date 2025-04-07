import LoginLayout from "../components/Login/LoginLayout";
import Layout from "@/components/Layout";


const LoginPage = () => {
    return (
        <div className="h-full">
            <Layout>
                <LoginLayout />
            </Layout>
        </div>
    );
}

export default LoginPage;