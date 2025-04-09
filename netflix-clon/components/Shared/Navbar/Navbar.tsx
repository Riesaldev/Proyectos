import NavbarDesktop from "./NavbarDesktop/NavbarDesktop";
import NavbarMobile from "./NavbarMobile/NavbarMobile";
const Navbar = () => {
    return (
        <nav>
            <div className="hidden md:block mx-auto">
                <NavbarDesktop />
            </div>

            <div className="md:hidden">
                <NavbarMobile />
            </div>
        </nav>
    );
}

export default Navbar;
