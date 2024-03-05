import { useCreateMyRestaurant, useGetMyRestaurant, useUpdateMyRestaurant } from '@/api/MyRestaurantApi'
import ManageRestaurantForm from '@/forms/manage-restaurant-form/ManageRestaurantForm'
import { useAuth } from '@clerk/clerk-react';


export default function ManageRestaurantPage() {
    const { userId } = useAuth();
    function stringToHex(str: string) {
        let hex = "";
        for (let i = 0; i < str.length; i++) {
            const charCode = str.charCodeAt(i);
            const hexValue = charCode.toString(16);

            //* Pad with zeros to endure two digit representation of hex values.
            hex += hexValue.padStart(2, "0");
        }
        return hex;
    }

    const dbUserId = stringToHex(userId).slice(-24);

    const { createRestaurant, isLoading: isCreateLoading } = useCreateMyRestaurant();
    const { restaurant } = useGetMyRestaurant(dbUserId);
    const { updateRestaurant, isLoading: isUpdateLoading } = useUpdateMyRestaurant();

    const isEditing = !!restaurant;

    return (
        <ManageRestaurantForm
            restaurant={restaurant}
            onSave={isEditing ? updateRestaurant : createRestaurant}
            isLoading={isCreateLoading || isUpdateLoading}
        />
    )
}