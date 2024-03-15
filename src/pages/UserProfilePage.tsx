import { useUpdateMyUser } from '@/api/MyUserApi'
import { getUserDetails } from '@/features/user/userSlice';
import UserProfileForm from '@/forms/user-profile-form/UserProfileForm'
import { useAuth } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function UserProfilePage() {
    const { userId } = useAuth();
    const { updateUser, isLoading: isUpdateLoading } = useUpdateMyUser();

    const { currentUser, isLoading: isGetLoading } = useSelector(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (state: any) => state.user
    );
    const dispatch = useDispatch();

    useEffect(() => {
        //@ts-ignore
        dispatch(getUserDetails(userId));
    }, []);


    if (isGetLoading) {
        return <span>Loading...</span>
    }

    if (!currentUser) {
        return <span>Unable to load user data.</span>
    }



    return (
        <div className="flex flex-col-reverse md:flex-row items-center gap-5 bg-gray-50 rounded-lg p-10">
            <UserProfileForm
                onSave={updateUser}
                isLoading={isUpdateLoading}
                currentUser={currentUser}
            />
            <div className="p-10 flex flex-col gap-4">
                <div>
                    <h2 className="text-2xl font-bold">User Profile details</h2>
                    <p className="text-[12.5px] text-gray-600">View your profile here</p>
                </div>
                <div className="flex flex-col md:flex-row gap-x-5">
                    <div>
                        <h3 className="text-xl font-bold">
                            First name
                        </h3>
                        <p>{
                            currentUser.firstName ?
                                currentUser.firstName :
                                "None"

                        }</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold">
                            Last name
                        </h3>
                        <p>{
                            currentUser.lastName ?
                                currentUser.lastName :
                                "None"

                        }</p>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-x-5">
                    <div>
                        <h3 className="text-xl font-bold">
                            Address
                        </h3>
                        <p>{currentUser.addressLine1 ? currentUser.addressLine1 : "None"}</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold">
                            City
                        </h3>
                        <p>{currentUser.city ? currentUser.city : "None"}</p>
                    </div>
                </div>
                <div>
                    <h3 className="text-xl font-bold">
                        Country
                    </h3>
                    <p>{currentUser.country ? currentUser.country : "None"}</p>
                </div>
            </div>
        </div>
    )
}