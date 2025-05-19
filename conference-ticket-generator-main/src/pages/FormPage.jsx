import Form from "../components/Form";

const FormPage = () => {
    return (
        <div className="
            relative
            bg-[url(/assets/images/background-mobile.png)]
            bg-no-repeat bg-center brightness-120 bg-cover
            min-h-screen w-full flex flex-col items-center justify-start text-white z-0
            md:bg-[url(/assets/images/background-desktop.png)] md:bg-cover
        ">
            <div className="
                h-full w-full flex flex-col
                bg-[url(/assets/images/pattern-lines.svg)]
                bg-no-repeat bg-[length:270%] items-center
                md:bg-[length:100%]
            ">
                <div className="flex flex-row w-full h-22 items-center align-middle justify-between px-4 md:px-16">
                    <img src="/assets/images/pattern-circle.svg" alt="circles-top"
                        className="h-28 w-auto flex relative -top-8 -left-5" />
                    <img src="/assets/images/logo-full.svg" alt="logo"
                        className="w-42 h-auto" />
                    <img src="/assets/images/pattern-squiggly-line-top.svg" alt="line-top" className="h-auto w-24" />
                </div>
                <div className="h-auto w-full flex flex-col items-center justify-center text-center px-2 md:px-0">
                    <div className="w-full max-w-md md:max-w-xl lg:max-w-2xl mx-auto">
                        <Form />
                    </div>
                </div>
            </div>
            <img src="/assets/images/pattern-squiggly-line-bottom-mobile-tablet.svg" alt="line-bottom" className="absolute bottom-0 left-0 w-full z-0 pointer-events-none" />
        </div>
    );
};

export default FormPage;