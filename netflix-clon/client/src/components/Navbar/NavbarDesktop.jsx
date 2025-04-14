import { cn } from "@/lib/utils";
import { BellRing, Search } from "lucide-react";
import Logo from "../Logo";
import ItemsNavbar from "../data/itemsNavbar";



const NavbarDesktop = () => {
    return (
        <div
            className={cn(
                "z-30 left-0 right-0 top-0 h-16 fixed w-full transition-all duration-300"
            )}
        >
            <div className="px-[4%] mx-auto h-full flex items-center justify-center">
                <div className="flex gap-4 justify-between items-center h-full w-[90%]">
                    <div className="flex items-center justify-between w-full">
                        <Logo />
                        <ItemsNavbar />
                        <div className="flex items-center gap-4">
                            <Search className="cursor-pointer" />
                            <BellRing className="cursor-pointer" />
                            <p>Username</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default NavbarDesktop;
