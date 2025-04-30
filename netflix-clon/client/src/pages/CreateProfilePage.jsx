import CreateForm from "@/components/Forms/CreateForm";
import Layout from "@/components/Layout";
import FormLayout from "@/components/FormLayout";
const CreateProfilePage = () => {
    return (

        <>
            <Layout />
            <div>
                <FormLayout>
                    <div>
                        <p className="text-3xl font-bold text-left mb-7">Crear perfil</p>
                        <CreateForm />
                    </div>
                </FormLayout>
            </div>
        </>

    );
}

export default CreateProfilePage;
