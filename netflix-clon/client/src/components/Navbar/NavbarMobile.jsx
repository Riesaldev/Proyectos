
import { Menu } from "lucide-react";
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
                </SheetContent>
            </Sheet>

        </div>
    );
}

export default NavbarMobile;
