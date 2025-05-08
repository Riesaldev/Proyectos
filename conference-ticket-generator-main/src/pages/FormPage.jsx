import Form from "../components/Form";



const FormPage = () => {
    return (
        <div className="bg-[url(../../public/assets/images/background-mobile.png)] bg-no-repeat bg-center w-max-[375px] h-screen flex flex-col items-center justify-start absolute">
            <div className="w-max-[375px] h-full w-full flex flex-col justify-start bg-[url(../../public/assets/images/pattern-lines.svg)]  bg-no-repeat bg-top-right  bg-[length:260%]">
                <div className="w-max-[375px] h-40  flex flex-row items-baseline justify-end">
                    <img src="../../public/assets/images/logo-full.svg" alt="logo"
                        className=" w-56 h-54" />
                    <img src="../../public/assets/images/pattern-squiggly-line-top.svg" alt="line-top" className="w-48 h-48" />
                </div>
                <div className="w-max-[375px] h-40 flex flex-row items-center justify-center">

                    <Form />
                </div>
            </div>
            <div className="w-max-[375px] w-[575px] flex items-end">
                <img src="../../public/assets/images/pattern-squiggly-line-bottom-mobile-tablet.svg" alt="line-bottom" className="h-3/4 self-end" />
            </div>
        </div>
    );
};
export default FormPage;
