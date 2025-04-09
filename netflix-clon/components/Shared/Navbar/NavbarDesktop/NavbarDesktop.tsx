"use client"
import { BellRing, Search } from "lucide-react";

import { cn } from "@/lib/utils";

import { Logo } from "../../logo/Logo";
import Link from "next/link";
import { itemsNavbar } from "@/data/ItemsNavbar";
import { UseScrollPosition } from "@/hooks/useScrollPosition";

const NavbarDesktop = () => {
    const scrollPosition = UseScrollPosition();
    return (
        <div className={cn
            ("z-30 left-0 top-0 h-16 w-full fixed transition-all duration-300",
                scrollPosition > 20 ? 'bg-black' : 'bg-transparent')}>
            <div className="px[4%] mx-6 h-full">
                <div className="flex gap-4 justify-between h-full items-center">
                    <div className="flex items-center gap-2">
                        <Logo />
                        <div className="ml-10 flex gap-4">
                            {itemsNavbar.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.link}
                                    className="hover:text-gray-400 transition-all duration-300 ">
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Search className="cursor-pointer" />
                        <BellRing className="cursor-pointer" />
                        <div className="flex gap-2 items-center">
                            {/*TODO: Add user profile image*/}
                            <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                            <h1 className="text-sm font-semibold">User Name</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NavbarDesktop;
