import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import DarkModeButton from "./DarkModeButton";
import { SignedIn, SignedOut, useAuth, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";


const MobileNav = () => {
    const { userId } = useAuth();
    const { user } = useUser();
    const admins = ["user_2cifQMBRzDlRIo3CjV5M5b4JuXh"];
    return (
        <Sheet>
            <SheetTrigger>
                <Menu className="text-purple-700" />
            </SheetTrigger>
            <SheetContent>
                <SheetTitle className="flex mt-5 px-3 justify-between items-center">
                    <SignedIn>
                        {user?.fullName}
                    </SignedIn>
                    <SignedOut>
                        Welcome to NomNom
                    </SignedOut>
                    <DarkModeButton />
                </SheetTitle>
                <Separator className="my-3" />
                <SheetDescription className="flex">
                    <SignedIn>
                        <div className="flex flex-col gap-3 mt-1 text-base">
                            <Link to="/order-status" className="font-semibold hover:text-orange-500">
                                Order Status
                            </Link>
                            <Link to="/user-profile" className="font-semibold hover:text-orange-500">
                                User profile
                            </Link>
                            {
                                admins.includes(userId) &&
                                <Link to="/manage-restaurant" className="font-semibold hover:text-orange-500">
                                    Manage Restaurant
                                </Link>
                            }
                        </div>
                    </SignedIn>
                    <SignedOut>
                        <Button className="flex-1 font-bold">
                            <Link to="/sign-in">Log In</Link>
                        </Button>
                    </SignedOut>
                </SheetDescription>
            </SheetContent>
        </Sheet>
    )
}

export default MobileNav