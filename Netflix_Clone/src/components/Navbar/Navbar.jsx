import React from "react";
import NavbarDesktop from "../Navbar/NavbarDesktop.jsx";
import NavbarMobile from "../Navbar/NavbarMobile.jsx";

function Navbar () {
    return (
        <nav>
            <div className="hidden md:block max-auto">
                <NavbarDesktop />
            </div>
            <div className="md:hidden">
                <NavbarMobile />
            </div>
        </nav>


    );
}

export default Navbar;