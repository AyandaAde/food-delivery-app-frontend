
import hero from "../../public/images/hero(1).png";
import Typewriter from 'typewriter-effect';
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { PizzaIcon } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

const Hero = () => {
    const [city, setCity] = useState();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async (pos) => {
            const { latitude, longitude } = pos.coords;
            console.log(latitude, longitude);
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
                className="w-full sm:w-3/5 max-h-[700px] object-cover relative right-24"
            />
            <div className="mx-auto w-11/12 md:w-[350px] lg:w-[500px] flex flex-col items-center md:items-start gap-y-3 relative md:right-[10%]">
                <p className="flex flex-col gap-y-1 text-xl lg:text-2xl font-semibold text-gray-50 dark:text-white">
                    Craving something delicious? NomNom brings your favorite restaurants right to your doorstep, no matter what your taste buds desire. From steaming hot pizza to exotic curries, juicy burgers to fresh sushi, our vast selection will tantalize your senses and satisfy every hunger pang.
                    <br />
                    <p className="italic font-semibold">
                        <Typewriter
                            options={{
                                strings: ["NomNom: A world of flavors.",
                                    "Delivered to your door."],
                                autoStart: true,
                                loop: true,
                            }}
                        />
                    </p>
                </p>
                <Link to={`/search/${city ? city : "Harare"}`} className="mt-2"><Button className="bg-purple-700">Order Food <PizzaIcon className="ml-2" /></Button></Link>
            </div>
        </div>
    )
}

export default Hero