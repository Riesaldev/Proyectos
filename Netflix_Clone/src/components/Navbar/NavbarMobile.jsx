import React from "react";
import Logo from "../Logo";
import { BellRing, Menu, Search } from "lucide-react";
import itemsNavbar from "@/utils/itemsNavbar.js";
import cn from "@/lib/utils";
import {
    Sheet,
    SheetContent,
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
                    <div className="flex flex-col gap-2">
                        {itemsNavbar.map( ( item ) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className={cn( "text-white text-sm font-semibold hover:text-gray-300 transition-all duration-300 p-3", item.className )}
                            >
                                {item.label}
                            </a>
                        ) )}
                    </div>
                    <div className="border-[1px] border-white/70 my-5" />
                    <div className="flex justify-between gap-6 px-3">
                        <Search className="cursor-pointer" />
                        <BellRing className="cursor-pointer" />
                        {/*TODO: Add user profile */}
                        <p>User</p>
                    </div>
                </SheetContent>
            </Sheet>

        </div>
    );
}

export default NavbarMobile;