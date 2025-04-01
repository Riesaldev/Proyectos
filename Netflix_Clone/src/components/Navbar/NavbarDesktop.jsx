import React from "react";
import cn from "@/lib/utils"
import Logo from "../Logo";
import { BellRing, Search } from "lucide-react";

function NavbarDesktop () {
    return (
        <section className={cn( "z-30 left-0 right-0 top-0 h-16 w-full transition-all duration-300" )}>
            <div className="px-[4%] mx-auto h-full">
                <div className="flex gap-4 justify-between items-center h-full">
                    <div className="flex items-center gap-2">
                        <Logo />
                        <div className="ml-10 flex gap-4">
                            <p>Home</p>
                            <p>Movies</p>
                            <p>Series</p>
                            <p>Profile</p>
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