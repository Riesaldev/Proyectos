import Form from "../components/Form";



const FormPage = () => {
    return (
        <div className="relative bg-[url(../../public/assets/images/background-mobile.png)] bg-no-repeat bg-center brightness-120 bg-cover h-screen w-[375px] flex flex-col items-center justify-start text-white z-0">

            <div className="h-full w-auto flex flex-col bg-[url(../../public/assets/images/pattern-lines.svg)]  bg-no-repeat bg-[length:270%] items-center ">

                <div className="flex flex-row w-full h-22 items-center align-middle ">

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
            <img src="../../public/assets/images/pattern-squiggly-line-bottom-mobile-tablet.svg" alt="line-bottom" className="absolute bottom-0 left-0 w-full z-0 pointer-events-none " />
        </div>
    );
};
export default FormPage;
