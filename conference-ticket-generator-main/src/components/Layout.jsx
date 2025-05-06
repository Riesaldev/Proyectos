
const Layout = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-[url('../../assets/images/background-mobile.png')] bg-cover bg-no-repeat bg-center">
            <div className="bg-[url('../../assets/images/pattern-lines.svg')] bg-no-repeat bg-center w-screen h-[700px] bg-size-[995px] absolute top-0 left-7 z-0">
                <div>
                    <img src="../../assets/images/pattern-squiggly-line-top.svg" alt="top-line" className="size-[110px] absolute left-60" />
                    <img src="../../assets/images/logo-full.svg" alt="Logo" className="absolute top-[-40px] left-[5rem] z-10 size-40" />
                    <img src="../../assets/images/pattern-squiggly-line-bottom-mobile-tablet.svg" alt="bottom-line" className=" absolute top-[730px] right-[28px]" />
                </div>
            </div>
        </div>
    );
}

export default Layout;
