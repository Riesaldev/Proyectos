
import { BellRing, Search, Menu } from "lucide-react";
import Logo from "../Logo";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import ItemsNavbar from "../data/ItemsNavbar";



const NavbarMobile = () => {
    return (
        <div className="p-4 flex justify-between">
            <Logo />

            <Sheet>
                <SheetTrigger>
                    <Menu className="cursor-pointer text-white" />
                </SheetTrigger>
                <SheetContent side="left" className="text-white bg-[#171717]">
                    <lu className=" text-white ml-5 mt-16 list-none gap-6 flex flex-col ">
                        <ItemsNavbar />
                    </lu>
                    <div className="border-[1px] border-white/70 m-5" />
                    <div className="flex justify-between gap-6 mt-4 mx-15">
                        <Search className="cursor-pointer hover:text-gray-400 transition-all duration-300" />
                        <BellRing className="cursor-pointer hover:text-gray-400 transition-all duration-300" />
                        <p>User</p>
                        {/*TODO: Add user profile*/}
                    </div>
                </SheetContent>
            </Sheet>

        </div>
    );
}

export default NavbarMobile;
