

const ItemsNavbar = () => {

    return (
        <>
            <li>
                <a className="hover:text-gray-400 transition-all duration-300" href="/">Inicio</a>
            </li>
            <li>
                <a className="hover:text-gray-400 transition-all duration-300" href="/series">Series</a>
            </li>
            <li>
                <a className="hover:text-gray-400 transition-all duration-300" href="/movies">Películas</a>
            </li>
            <li>
                <a className="hover:text-gray-400 transition-all duration-300" href="/trending">Novedades mas vistas</a>
            </li>
            <li>
                <a className="hover:text-gray-400 transition-all duration-300" href="/mylist">Mi lista</a>
            </li>
        </>
    );
};

export default ItemsNavbar;
