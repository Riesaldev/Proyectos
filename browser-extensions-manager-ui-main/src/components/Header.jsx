
const Header = () => {
    return (
        <div className="flex justify-center h-20 bg-slate-200 shadow-md pt-4">
            <header className="max-xl:w-1/2 max-xl:min-w-[400px] xl:w-1/2 flex p-4 bg-white shadow-md rounded-lg">
                <div className="flex items-center justify-between w-full">
                    <a href="./index.html">
                        <img src="../../public/img/logo.svg" alt="Logo" className="logo" />
                    </a>
                    <button className=" p-3 rounded-lg bg-slate-100" label="Toggle light mode">
                        <img src="../../public/img/icon-moon.svg" alt="Light mode icon"
                            className="w-5 h-5" />

                    </button>
                </div>
            </header>
        </div>
    );
}
export default Header;