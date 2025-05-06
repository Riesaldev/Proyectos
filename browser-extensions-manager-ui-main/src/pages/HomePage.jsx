import Item from "../components/Cards-item.jsx";
import initialData from "../../data.json";
import { useState } from "react";

const HomePage = () => {
    const [ data, setData ] = useState( initialData );
    const [ activeButton, setActiveButton ] = useState( "all" );

    const handleButtonClick = ( buttonName ) => {
        setActiveButton( buttonName );
    };

    const handleToggle = ( index ) => {
        const updatedData = [ ...data ];
        updatedData[ index ].isActive = !updatedData[ index ].isActive;
        setData( updatedData );
    };

    const filteredData = data.filter( ( item ) => {
        if ( activeButton === "all" ) return true;
        if ( activeButton === "active" ) return item.isActive === true;
        if ( activeButton === "inactive" ) return item.isActive === false;
        return false;
    } );

    return (
        <div className="min-h-screen flex flex-col items-center pt-10 max-xl:min-w-[400px] xl:w-full xl:min-w-[800px]">
            <div className="flex flex-col max-xl:flex-col xl:flex-row justify-between items-center py-4 mb-4 max-xl:w-1/2 max-xl:min-w-[350px] xl:w-1/2 xl:min-w-[800px]">
                <h1 className="text-4xl font-bold">Extension List</h1>
                <section className="flex font-semibold gap-4 mt-4 xl:mt-0">
                    <button
                        className={`px-4 py-1 rounded-full ${ activeButton === "all" ? "bg-red-500 text-white" : "bg-white hover:opacity-70" } dark:text-black`}
                        type="button"
                        onClick={() => handleButtonClick( "all" )}
                    >
                        All
                    </button>
                    <button
                        className={`px-4 py-1 rounded-full  ${ activeButton === "active" ? "bg-red-500 text-white" : "bg-white hover:opacity-70" } dark:text-black`}
                        type="button"
                        onClick={() => handleButtonClick( "active" )}
                    >
                        Active
                    </button>
                    <button
                        className={`px-4 py-1 rounded-full ${ activeButton === "inactive" ? "bg-red-500 text-white" : "bg-white hover:opacity-70" } dark:text-black`}
                        type="button"
                        onClick={() => handleButtonClick( "inactive" )}
                    >
                        Inactive
                    </button>
                </section>
            </div>
            <section className="flex flex-wrap justify-center gap-4 max-xl:w-1/2 max-xl:min-w-[400px] xl:w-1/2 p-4">
                {filteredData.map( ( item, index ) => (
                    <div key={index}>
                        <Item
                            item={item}
                            onToggle={() => handleToggle( index )}
                        />
                    </div>
                ) )}
            </section>
        </div>
    );
};

export default HomePage;