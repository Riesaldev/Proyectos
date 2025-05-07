import React from 'react';
import FormDesc from '../components/FormDesc';
import Layout from '../components/Layout';
import Form from '../components/Form';

const FormPage = () => {
    return (
        <div >
            <Layout>
                <FormDesc>
                    <Form />
                </FormDesc>
            </Layout >
        </div >
    );
};
export default FormPage;
