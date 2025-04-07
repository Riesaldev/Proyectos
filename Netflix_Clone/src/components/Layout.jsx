import Logo from "./Logo";


const Layout = ( { children } ) => {
    return (
        <div className="h-full">
            <div className="bg-[url(/img/login-bg.jpg)] bg-cover bg-center min-h-screen opacity-60 -z-10">
                <div className="px-8 py-5 max-w-7xl mx-auto">
                    <Logo />
                </div>
                <div className="h-full w-full max-w-md mx-auto">
                    <div className="bg-black/70 px-14 py-16">
                        {children}
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Layout;
