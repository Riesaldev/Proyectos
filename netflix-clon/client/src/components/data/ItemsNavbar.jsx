const ItemsNavbar = () => {
    const items = [
        { name: "Inicio", Link: "/" },
        { name: "Series", Link: "/series" },
        { name: "Películas", Link: "/movies" },
        { name: "Novedades más vistas", Link: "/trending" },
        { name: "Mi lista", Link: "/mylist" },
    ];

    return (
        <nav >
            <ul className="flex ml-10 gap-4">
                {items.map( ( item, index ) => (
                    <li key={index}>
                        <a href={item.Link}>{item.name}</a>
                    </li>
                ) )}
            </ul>
        </nav>
    );
};

export default ItemsNavbar;
