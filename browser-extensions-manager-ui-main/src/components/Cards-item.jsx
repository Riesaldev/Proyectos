import SwitchButton from "./SwitchButton";
import RemoveButton from "./RemoveButton";



const Item = ( { item } ) => {

    return (
        <>
            <div className="rounded-2xl bg-white shadow-md p-4 w-[350px] h-[200px] flex flex-col justify-between">

                <div className="flex items-start">
                    <img src={item.logo} alt={item.name} />
                    <div className="ml-4 flex flex-col">
                        <h2 className="font-bold">{item.name}</h2>
                        <p>{item.description}</p>
                    </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <RemoveButton />
                    <SwitchButton />
                </div>
            </div>
        </>
    );
}

export default Item;