import landingImage from "../../public/images/landing(1).png";
import appDownloadImage from "../../public/images/appDownload-Photoroom.png"
import SearchBar, { SearchForm } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function HomePage() {
    const navigate = useNavigate()

    const handleSearchSubmit = (searchFromValues: SearchForm) => {
        navigate({
            pathname: `/search/${searchFromValues.searchQuery}`,
        })

    }
    return (
        <div className="flex flex-col gap-12">
            <div className="bg-white md:px-32 rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-20" id="search">
                <motion.h1
                    className="text-5xl font-bold tracking-tight text-purple-900"
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    Bite into happiness today.
                </motion.h1>
                <motion.span
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                    className="text-xl dark:text-black"
                >Food is just a click away!
                </motion.span>
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: [0, -15, 0] }}
                    transition={{ duration: 0.6, delay: 1 }}
                >
                    <SearchBar placeHolder="Search by city or town" onSubmit={handleSearchSubmit} />
                </motion.div>
            </div>
            <div className="grid md:grid-cols-2 gap-5" id="download">
                <img
                    src={landingImage}
                />
                <div
                    className="flex flex-col items-center justify-center gap-4 text-center">
                    <span className="font-bold text-3xl tracking-tighter">
                        Order takeaway even faster!
                    </span>
                    <span>Download the NomNom app for faster ordering and personalised recommendations.</span>
                    <img
                        src={appDownloadImage}
                    />
                </div>
            </div>
        </div>
    )
}