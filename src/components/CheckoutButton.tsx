import { SignedIn, SignedOut, useAuth } from "@clerk/clerk-react"
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { LoadingButton } from "./LoadingButton";
import UserProfileForm, { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { useGetMyUser } from "@/api/MyUserApi";

type Props = {
    onCheckout: (userFormData: UserFormData) => void;
    disabled: boolean;
    isLoading: boolean;
}

export default function CheckoutButton({ onCheckout, disabled, isLoading }: Props) {
    const { userId, isLoaded: isAuthLoaded } = useAuth();
    //@ts-ignore
    const { currentUser, isLoading: isGetUserLoading } = useGetMyUser(userId);
    if (!isAuthLoaded || !currentUser || isLoading) {
        return <LoadingButton />
    }

    return (
        <div className="w-full">
            <SignedOut>
                <Button className="flex-1 w-full">
                    <Link to="/sign-in">
                        Login to check out
                    </Link>
                </Button>
            </SignedOut>
            <SignedIn>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button
                            disabled={disabled}
                            className="flex-1 w-full">
                            Checkout
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[45px] md:min-w-[700px] bg-gray-50">
                        <UserProfileForm
                            onSave={onCheckout}
                            currentUser={currentUser}
                            isLoading={isGetUserLoading}
                            title="Confirm Delivery Details"
                            buttonText="Continue to checkout"
                        />
                    </DialogContent>
                </Dialog>
            </SignedIn>
        </div>
    )
}