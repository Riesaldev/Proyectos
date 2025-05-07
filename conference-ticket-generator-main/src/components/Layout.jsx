import FormDesc from "./FormDesc";

const Layout = ( { children } ) => {
    return (
        <div className="h-screen bg-[url('../../assets/images/background-mobile.png')] bg-cover bg-center max-w-[375px] max-h-[812px] relative  justify-center  ">
            <div className="bg-[url('../../assets/images/pattern-lines.svg')] w-screen h-[700px] bg-size-[995px]">
                <div className="flex flex-col items-center h-full relative">
                    <div className="flex flex-row h-full relative place-items-center -top-10 left-15 justify-center w-auto">
                        <img src="../../assets/images/logo-full.svg" alt="Logo" className="size-40 " />
                        <img src="../../assets/images/pattern-squiggly-line-top.svg" alt="top-line" className="size-[110px] " />
                    </div>
                    {children}
                    <img src="../../assets/images/pattern-squiggly-line-bottom-mobile-tablet.svg" alt="bottom-line" className="relative -left-17 -top-27 w-60" />
                </div>
            </div>
        </div>
    );
};

export default Layout;