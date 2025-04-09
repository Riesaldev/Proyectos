import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from '@/components/ui/sheet';
import Link from 'next/link';

import { itemsNavbar } from '@/data/ItemsNavbar';

import { Logo } from '../../logo/Logo';
import { BellRing, Menu, Search } from 'lucide-react';


const NavbarMobile = () => {
    return (
        <div className="p-4 flex justify-between">
            <Logo />

            <Sheet>
                <SheetTrigger>
                    <Menu />
                </SheetTrigger>
                <SheetContent side="left" className="bg-black">

                    <div className="flex flex-col gap-4 my-4 mx-2">
                        {itemsNavbar.map((item) => (
                            <Link
                                key={item.name}
                                href={item.link}
                                className="hover:text-gray-400 transition-all duration-300 "
                            > {item.name}
                            </Link>
                        ))}
                    </div>

                    <div className='border-[1px] border-white/70 my-4' />

                    <div className="flex justify-between gap-6 mt-4 mx-4">
                        <Search className="cursor-pointer" />
                        <BellRing className="cursor-pointer" />
                        {/*Todo: Add user profile*/}
                        <p>User</p>
                    </div>

                </SheetContent>
            </Sheet>

        </div>
    );
}

export default NavbarMobile;