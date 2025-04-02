import React from "react";
import cn from "@/lib/utils"
import Logo from "../Logo";
import { BellRing, Search } from "lucide-react";
import useScrollPosition from '@/hooks/useScrollPosition';
import itemsNavbar from "@/utils/itemsNavbar.js";

function NavbarDesktop () {
    const scrollPosition = useScrollPosition();
    return (
        <section className={cn( "z-30 left-0 right-0 top-0 h-16 fixed w-full transition-all duration-300", scrollPosition > 20 ? "bg-black" : "bg-transparent" )}>
            <div className="px-[4%] mx-auto h-full">
                <div className="flex gap-4 justify-between items-center h-full">
                    <div className="flex items-center gap-2">
                        <Logo />
                        <div className="ml-10 flex gap-4 ">
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
                    </div>
                    <div className="flex gap-4 items-center">
                        <Search className="cursor-pointer" />
                        <BellRing className="cursor-pointer" />
                        <div className="flex items-center gap-2">
                            {/*TODO: Add user profile */}
                            <p>User</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default NavbarDesktop