import { Order, Restaurant } from "@/types";
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

    const { mutate: createRestaurant, isLoading, isSuccess, error, reset } = useMutation(createMyRestaurantRequest);

    if (isSuccess) {
        toast.success("Restaurant created!");
        reset();

    }
    if (error) {
        toast.error("Failed to create restaurant.");
        reset();
    }

    return { createRestaurant, isLoading };
};

export const useGetMyRestaurant = (userId: string) => {
    const getMyRestaurantRequest = async (): Promise<Restaurant> => {
        const response = await fetch(`${API_BASE_URL}/api/my/restaurant/${userId}`, {
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

    const { mutate: updateRestaurant, isLoading, isSuccess, error, reset } = useMutation(updateMyRestaurantRequest);

    if (isSuccess) {
        toast.success("Restaurant updated!");
        reset();

    }
    if (error) {
        toast.error("Failed to update restaurant.");
        reset();
    }

    return { updateRestaurant, isLoading };
};

export function useMyRestaurantOrders(userId: string) {
    async function getMyRestaurantOrdersRequest(): Promise<Order[]> {
        const response = await fetch(`${API_BASE_URL}/api/my/restaurant/order/${userId}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch orders");
        }
        return response.json();
    }

    const { data: orders, isLoading } = useQuery("fetchMyRestaurantOrders", getMyRestaurantOrdersRequest);

    return { orders, isLoading };
}

type UpdateOrderStatusRequest = {
    orderId: string;
    status: string;
}

export function useUpdateMyRestaurantOrder(userId: string) {
    async function updateMyRestaurantOrder(updateStatusOrderRequest: UpdateOrderStatusRequest) {
        const response = await fetch(`${API_BASE_URL}/api/my/restaurant/order/${updateStatusOrderRequest.orderId}/status/${userId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: updateStatusOrderRequest.status })
        });
        if (!response.ok) {
            throw new Error("Failed to update status");
        }

        return response.json();
    }

    const { mutateAsync: updateRestaurantStatus, isLoading, isError, isSuccess, reset } = useMutation(updateMyRestaurantOrder);

    if (isSuccess) {
        toast.success("Order updated");
        reset();
    }
    if (isError) {
        toast.error("Unable to update order");
        reset();
    }

    return {
        updateRestaurantStatus,
        isLoading
    }

}

