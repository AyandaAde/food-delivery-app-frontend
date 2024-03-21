import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";

export default function Footer() {
    return (
        <div className="bg-purple-700 py-5 mb-6">
            <div className="flex flex-col">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                    <span className="text-2xl text-white font-bold tracking-tight">
                        NomNom Nimbus
                    </span>
                    <span className="text-white font-bold tracking-tight flex gap-4">
                        <span>Privacy Policy</span>
                        <span>Terms of Service</span>
                    </span>
                </div>
            </div>
            <Separator className="my-5 bg-gray-400" />
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-200 text-base">© {new Date().getFullYear()} Made by Ayanda Kinyambo</p>
                <Link to="mailto:support@nomnomnimbus.com" className="text-gray-200 text-sm md:text-base">Support: support@nomnomnimbus.com</Link>
            </div>
        </div>
    )
}