import { Restaurant } from "@/types";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export type UpdateMenuItemRequest = {
    name: string,
    price: number,
}
type UpdateMyRestaurantRequest = {
    restaurantName: string,
    city: string,
    country: string,
    deliveryPrice: number,
    estimatedDeliveryTime: string,
    cuisines: string[],
    menuItems: UpdateMenuItemRequest[],
    imageUrl: string,
};
export const useCreateMyRestaurant = () => {
    const createMyRestaurantRequest = async (formData: UpdateMyRestaurantRequest): Promise<Restaurant> => {
        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error("Failed to create restaurant");
        }

        return response.json();

    };

    const { mutate: createRestaurant, isLoading, isSuccess, error } = useMutation(createMyRestaurantRequest);

    if (isSuccess) {
        toast.success("Restaurant created!");
    }
    if (error) {
        toast.error("Failed to update restaurant.");
    }

    return { createRestaurant, isLoading };
};

export const useGetMyRestaurant = (dbUserId: string) => {
    const getMyRestaurantRequest = async (): Promise<Restaurant> => {
        const response = await fetch(`${API_BASE_URL}/api/my/restaurant/${dbUserId}`, {
            method: "GET",
        });

        if (!response.ok) {
            throw new Error("Failed to get restaurant");
        }
        return response.json();
    };

    const { data: restaurant, isLoading } = useQuery("fetchMyRestaurant", getMyRestaurantRequest);

    return { restaurant, isLoading };
}

export const useUpdateMyRestaurant = () => {
    const updateMyRestaurantRequest = async (formData: UpdateMyRestaurantRequest): Promise<Restaurant> => {
        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error("Failed to update restaurant");
        }

        return response.json();

    };

    const { mutate: updateRestaurant, isLoading, isSuccess, error } = useMutation(updateMyRestaurantRequest);

    if (isSuccess) {
        toast.success("Restaurant updated!");
    }
    if (error) {
        toast.error("Failed to update restaurant.");
    }

    return { updateRestaurant, isLoading };
};

