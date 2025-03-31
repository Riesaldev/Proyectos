


const Item = ( { item } ) => {
    return (
        <>
            <div className="extension-item">
                <img src={item.icon} alt={item.name} />
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                <button>Remove</button>
                <button className="Active-button" type="button" aria-label="Activate">
                    Activate
                </button>
            </div>
        </>
    );
}

export default Item;