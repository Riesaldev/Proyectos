


const Item = ( { item } ) => {
    return (
        <>
            <div className="flex flex-col rounded-xl bg-white shadow-md p-4 m-4 w-3/4 h-2/3">
                <div className="justify-center items-center">
                    <img src={item.logo} alt={item.name} />
                    <h2>{item.name}</h2>
                    <p>{item.description}</p>
                </div>
                <div>
                    <button type="button">Remove</button>
                    <button className="Active-button" type="button" aria-label="Activate">
                        Activate
                    </button>
                </div>
            </div>
        </>
    );
}

export default Item;