import Form from "../components/Form";



const FormPage = () => {
    return (
        <div className="bg-[url(../../public/assets/images/background-mobile.png)] bg-no-repeat bg-center h-screen w-[375px] flex flex-col items-center justify-start absolute">

            <div className="h-full w-auto flex flex-col bg-[url(../../public/assets/images/pattern-lines.svg)]  bg-no-repeat bg-[length:270%] items-center ">

                <div className="flex flex-row w-full items-center align-middle">

                    <img src="../../public/assets/images/pattern-circle.svg" alt="circles-top"
                        className="h-28 w-auto flex relative -top-8 -left-5" />

                    <img src="../../public/assets/images/logo-full.svg" alt="logo"
                        className="w-42 h-auto" />

                    <img src="../../public/assets/images/pattern-squiggly-line-top.svg" alt="line-top" className="h-auto w-24" />

                </div>

                <div className="h-auto w-auto flex flex-col items-center justify-center text-center">

                    <Form />
                </div>
            </div>
            <div className="w-max-[375px] flex justify-start relative">
                <img src="../../public/assets/images/pattern-squiggly-line-bottom-mobile-tablet.svg" alt="line-bottom" className="self-end" />
            </div>
        </div>
    );
};
export default FormPage;
