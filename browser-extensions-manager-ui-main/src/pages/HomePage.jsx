import Item from "../components/Cards-item.jsx";
import data from "../../data.json";
import { useState } from "react";

const HomePage = () => {
    const [ activeButton, setActiveButton ] = useState( "all" ); // Por defecto, "all" está seleccionado

    const handleButtonClick = ( buttonName ) => {
        setActiveButton( buttonName );
    };

    return (
        <div className="mx-auto px-8 py-12 bg-slate-200 flex flex-col gap-4 min-h-screen items-center">
            <h1 className="text-4xl font-bold">Extension List</h1>
            <section className="w-1/2 flex justify-between items-center px-4 py-4">
                <button
                    className={`border px-4 py-1 rounded-2xl ${ activeButton === "all" ? "bg-red-500 text-white" : "bg-white"
                        }`}
                    type="button"
                    onClick={() => handleButtonClick( "all" )}
                >
                    All
                </button>
                <button
                    className={`border px-4 py-1 rounded-2xl ${ activeButton === "active" ? "bg-red-500 text-white" : "bg-white"
                        }`}
                    type="button"
                    onClick={() => handleButtonClick( "active" )}
                >
                    Active
                </button>
                <button
                    className={`border px-4 py-1 rounded-2xl ${ activeButton === "inactive" ? "bg-red-500 text-white" : "bg-white"
                        }`}
                    type="button"
                    onClick={() => handleButtonClick( "inactive" )}
                >
                    Inactive
                </button>
            </section>
            <section>
                {data.map( ( item, index ) => (
                    <div key={index}>
                        <Item item={item} />
                    </div>
                ) )}
            </section>
        </div>
    );
};

export default HomePage;