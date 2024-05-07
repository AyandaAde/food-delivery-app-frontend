
import hero from "../../public/images/hero(1).png";
import Typewriter from 'typewriter-effect';
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { PizzaIcon } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

type Props = {
    from?: string;
}
const Hero = ({ from }: Props) => {
    const [city, setCity] = useState("");

    function handleClick() {
        toast.info("Please switch on your location. Alternatively enter the name of your city in the search bar below.")
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async (pos) => {
            const { latitude, longitude } = pos.coords;
            const resp = await axios(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
            const currentLocation = resp.data;
            setCity(currentLocation.address.city);
            console.log(city);
        })

    }, []);

    return (
        <div className="flex flex-col md:flex-row justify-between pt-4 pb-16 items-center gap-y-3 bg-gradient-to-br dark:bg-gradient-to-tl from-violet-800 via-violet-500 to-amber-500 overflow-x-hidden">
            <img
                src={hero}
                className="hidden md:block w-full max-h-[700px] object-cover relative md:right-24"
            />
            <div className="mx-auto w-11/12 md:w-[350px] lg:w-[500px] flex flex-col items-center md:items-start gap-y-3 relative md:right-[10%]">
                <p className="flex flex-col gap-y-1 text-xl lg:text-2xl font-semibold text-gray-50 dark:text-white">
                    {from === "about" ?
                        <h1 className="text-5xl relative md:left-20">
                            <Typewriter
                                onInit={(typewriter) => {
                                    typewriter.typeString('About Us.')
                                        .start();
                                }}
                            />
                        </h1>
                        : (`Craving something delicious? NomNom Nimbus brings your favorite restaurants right to your doorstep, no matter what your taste buds desire. From steaming hot pizza to exotic curries, juicy burgers to fresh sushi, our vast selection will tantalize your senses and satisfy every hunger pang.`)
                    }
                    <br />
                    <p className="italic font-semibold">
                        {from !== "about" &&
                            <Typewriter
                                options={{
                                    strings: ["NomNom Nimbus: A world of flavors.",
                                        "Delivered to your door."],
                                    autoStart: true,
                                    loop: true,
                                }}
                            />
                        }
                    </p>
                </p>
                {from !== "about" &&
                    <div className="flex flex-row gap-x-2">
                        <Link to="/about" className="mt-2"><Button className="bg-purple-700">Read More</Button></Link>
                        {
                            city === "" ?
                                <Button
                                    className="bg-purple-700 mt-2"
                                    onClick={handleClick}
                                >Order Food <PizzaIcon className="ml-2" />
                                </Button>
                                : <Link to={`/search/${city}`} className="mt-2"><Button className="bg-purple-700">Order Food <PizzaIcon className="ml-2" /></Button></Link>
                        }

                    </div>
                }
            </div>
        </div>
    )
}

export default Hero
