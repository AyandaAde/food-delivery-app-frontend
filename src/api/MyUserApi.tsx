import { useMutation } from "react-query";
import { toast } from "sonner";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CreateUserRequest = {
    userId: string;
    email: string;
};

export const useCreateMyUser = () => {
    const createMyUserRequest = async (user: CreateUserRequest) => {
        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            throw new Error("Failed to create user");
        }
    };
    const {
        mutateAsync: createUser,
        isLoading,
        isError,
        isSuccess } = useMutation(createMyUserRequest);

    return {
        createUser,
        isLoading,
        isError,
        isSuccess,
    }
};

type UpdateMyUserRequest = {
    email: string,
    firstName: string,
    lastName: string,
    addressLine1: string,
    citY: string,
    country: string,
};

export const useUpdateMyUser = () => {
    const updateMyUserRequest = async (formData: UpdateMyUserRequest) => {
        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error("Failed to update user");
        }

        return response.json();
    };

    const { mutateAsync: updateUser, isLoading, isSuccess, error, reset } = useMutation(updateMyUserRequest);

    if (isSuccess) {
        toast.success("User profile updated!");
        reset();

    }

    if (error) {
        toast.error(error.toString());
        reset();
    }

    return {
        updateUser,
        isLoading,
    }
};

