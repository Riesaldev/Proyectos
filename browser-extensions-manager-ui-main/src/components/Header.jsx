import { useState } from 'react';

const Header = () => {
    const [ isDarkMode, setIsDarkMode ] = useState( false );

    const toggleDarkMode = () => {
        setIsDarkMode( !isDarkMode );
        document.documentElement.classList.toggle( 'dark', !isDarkMode );
    };

    return (
        <div className="flex justify-center h-20 pt-4">
            <header className="max-xl:w-1/2 max-xl:min-w-[350px] xl:w-1/2 flex p-4 dark:bg-gray-900 bg-white shadow-md rounded-lg">
                <div className="flex items-center justify-between w-full">
                    <a href="./index.html">
                        <img src={!isDarkMode ? "../../public/img/logo.svg" : "../../public/img/logo-Dark.svg"} alt="Logo"
                        />
                    </a>
                    <button
                        className="p-3 rounded-lg bg-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600 dark:bg-slate-800"
                        onClick={toggleDarkMode}
                        aria-label="Toggle light/dark mode"
                    >
                        <img
                            src={isDarkMode ? "../../public/img/icon-sun.svg" : "../../public/img/icon-moon.svg"}
                            alt={isDarkMode ? "Light mode icon" : "Dark mode icon"}
                            className="w-5 h-5"
                        />
                    </button>
                </div>
            </header>
        </div>
    );
};

export default Header;