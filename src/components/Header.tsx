import { Link } from 'react-router-dom';
import MobileNav from './MobileNav';
import DesktopNav from './DesktopNav';
import logo from "../../public/images/logo.png";
import { SignedIn, UserButton } from '@clerk/clerk-react';

const Header = () => {

    return (
        <div className="border-b-2 border-b-purple-700 py-6">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold tracking-tight flex items-center text-purple-700">
                    NomNom Nimbus <img src={logo} className="w-12 h-12 rounded-md object-cover ml-1 inline-block" />
                </Link>
                <div className="md:hidden h-fit flex flex-row gap-2">
                    <SignedIn>
                        <UserButton afterSignOutUrl='/' />
                    </SignedIn>
                    <MobileNav />
                </div>
                <div className="hidden md:block">
                    <DesktopNav />
                </div>
            </div>
        </div>
    )
}

export default Header