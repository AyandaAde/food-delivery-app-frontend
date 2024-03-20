import { loadS3IntoPinecone } from "@/lib/pinecone";
import { getS3Url } from "@/lib/s3";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function useCreateChat(userId: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async function createChatRequest(data: any) {
        await loadS3IntoPinecone(data.file_key);
        const pdfUrl = getS3Url(data.file_key);
        const dataWithPdfUrl = {
            ...data,
            userId,
            pdfUrl,
        };
        const response = await fetch(`${API_BASE_URL}/api/customer-assistance`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataWithPdfUrl)
        });
        if (!response.ok) {
            throw new Error("Failed to create chat");
        }

    }

    const {
        mutateAsync: createChat,
        isLoading,
        isError,
        isSuccess,
        reset,
    } = useMutation(createChatRequest);

    if (isSuccess) {
        toast.success("Chat created successfully");
        reset();
    }
    if (isError) {
        toast.error("Failed to create chat");
        reset();
    }

    return {
        createChat,
        isLoading,
    }
}

export function useGetChatId(userId: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async function getChatIdRequest() {
        const response = await fetch(`${API_BASE_URL}/api/customer-assistance/${userId}`, {
            method: "GET",
        });
        if (!response.ok) {
            throw new Error("Failed to create chat");
        }
        return response.json();
    }

    const { data: chatId } = useQuery("fetchChatId", getChatIdRequest);

    return {
        chatId,
    }
}