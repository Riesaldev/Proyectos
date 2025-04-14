import NavbarDesktop from "./Navbar/NavbarDesktop";
import NavbarMobile from "./Navbar/NavbarMobile";



const Header = () => {
    return (
        <nav>
            <div className="hidden mx-auto md:block">
                <NavbarDesktop />
            </div>
            <div className="md:hidden">
                <NavbarMobile />
            </div>
        </nav>
    );
}

export default Header;
