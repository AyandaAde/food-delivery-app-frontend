import { Link } from 'react-router-dom';
import MobileNav from './MobileNav';
import DesktopNav from './DesktopNav';


const Header = () => {
    return (
        <div className="border-b-2 border-b-purple-700 py-6">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold tracking-tight text-purple-700">
                    NomNom Nimbus
                </Link>
                <div className="md:hidden h-fit">
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