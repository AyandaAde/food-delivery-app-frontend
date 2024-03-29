import { Order } from "@/types";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CheckoutSessionRequest = {
    cartItems: {
        menuItemId: string;
        name: string;
        quantity: string;
    }[];
    deliveryDetails: {
        email: string;
        name: string;
        addressLine1: string;
        city: string;
    };
    restaurantId: string;
};

export const useCreateCheckoutSession = (userId: string) => {
    const createCheckoutSessionRequest = async (checkoutSessionRequest: CheckoutSessionRequest) => {
        const response = await fetch(`${API_BASE_URL}/api/order/checkout/${userId}/create-checkout-session`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(checkoutSessionRequest)
        });

        if (!response.ok) {
            throw new Error("Unable to create checkout session");
        }
        return response.json();
    };

    const { mutateAsync: createCheckoutSession, isLoading, error, reset } = useMutation(createCheckoutSessionRequest);

    if (error) {
        toast.error(error.toString());
        reset();
    }

    return {
        createCheckoutSession,
        isLoading
    }
}

export function useGetMyOrders(userId: string) {
    async function getMyOrdersRequest(): Promise<Order[]> {
        const response = await fetch(`${API_BASE_URL}/api/order/${userId}`, {
        });
        if (!response.ok) {
            throw new Error("Failed to get orders");
        }

        return response.json();
    }

    const { data: orders, isLoading } = useQuery(
        "fetchMyOrders",
        getMyOrdersRequest, {
        refetchInterval: 5000,
    });

    return {
        orders,
        isLoading
    };
}

