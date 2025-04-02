import React from "react";
import Logo from "../Logo";
import { Menu } from "lucide-react";
import itemsNavbar from "@/utils/itemsNavbar.js";
import cn from "@/lib/utils";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";


function NavbarMobile () {
    return (
        <div className="flex justify-between p-4">
            <Logo />

            <Sheet>
                <SheetTrigger>
                    <Menu />
                </SheetTrigger>
                <SheetContent side="left" className="bg-black">
                    <div className="flex flex-col gap-4">
                        {itemsNavbar.map( ( item ) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className={cn( "text-white text-sm font-semibold hover:text-gray-300 transition-all duration-300", item.className )}
                            >
                                {item.label}
                            </a>
                        ) )}

                    </div>
                </SheetContent>
            </Sheet>

        </div>
    );
}

export default NavbarMobile;