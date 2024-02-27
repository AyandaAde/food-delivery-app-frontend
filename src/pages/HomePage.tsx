import landingImage from "../../public/images/landing(1).png";
import appDownloadImage from "../../public/images/appDownload-Photoroom.png"

export default function HomePage() {
    return (
        <div className="flex flex-col gap-12">
            <div className="bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-20" id="search">
                <h1 className="text-5xl font-bold tracking-tight text-purple-900">
                    Bite into happiness today.
                </h1>
                <span className="text-xl dark:text-black">Food is just a click away!</span>
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