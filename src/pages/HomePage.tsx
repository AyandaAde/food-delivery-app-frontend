import landingImage from "../../public/images/landing(1).png";
import appDownloadImage from "../../public/images/appDownload-Photoroom.png"
import SearchBar, { SearchForm } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";

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
                <h1 className="text-5xl font-bold tracking-tight text-purple-900">
                    Bite into happiness today.
                </h1>
                <span className="text-xl dark:text-black">Food is just a click away!</span>
                <SearchBar placeHolder="Search by city or town" onSubmit={handleSearchSubmit} />
            </div>
            <div className="grid md:grid-cols-2 gap-5" id="download">
                <img
                    src={landingImage}
                />
                <div className="flex flex-col items-center justify-center gap-4 text-center">
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