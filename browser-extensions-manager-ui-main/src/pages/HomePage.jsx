import Item from "../components/Cards-item.jsx";

const HomePage = () => {
    return (
        <>
            <h1>Extension List</h1>
            <section class="extension-filter">
                <button name="All" type="button">All</button>
                <button name="Active" type="button">Active</button>
                <button name="Inactive" type="button">Inactive</button>
            </section>
            <section class="extensions-list">
                {Item.map( ( item ) => (
                    <div key={item.id}>
                        <Item {...item} />
                    </div>
                ) )}
            </section>
        </>
    );
};

export default HomePage;