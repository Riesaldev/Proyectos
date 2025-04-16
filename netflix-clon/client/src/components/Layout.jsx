import Logo from "./Logo";



const Layout = () => {
    return (
        <div className="h-full">
            <div className="h-full relative">
                <div className="bg-black w-full h-full min-h-screen absolute -z-10 ">
                    <div className="bg-[url('/img/login-bg.jpg')] h-full opacity-40 bg-no-repeat bg-cover" />
                </div>
                <div className="flex flex-col items-center justify-self-start ml- h-full px-8 py-5 max-w-7xl">
                    <Logo />
                </div>
            </div>
        </div>
    );
}

export default Layout;
