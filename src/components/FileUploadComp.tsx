import { useCreateChat, useGetChatId } from "@/api/CreateChatApi";
import { uploadToS3 } from "@/lib/s3";
import { useAuth } from "@clerk/clerk-react";
import { Inbox, Loader2 } from "lucide-react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function FileUploadComp() {
    const { userId } = useAuth();
    const navigate = useNavigate();

    const [uploading, setUploading] = useState(false);
    const { createChat, isLoading: isCreateChatLoading } = useCreateChat(userId);
    const { chatId } = useGetChatId(userId);

    const { getRootProps, getInputProps } = useDropzone({
        accept: { "application/pdf": [".pdf"] },
        maxFiles: 1,
        onDrop: async (acceptedFiles) => {
            console.log(acceptedFiles);
            const file = acceptedFiles[0];
            if (file.size > 10 * 1024 * 1024) {
                //bigger than 10mb
                toast.error("Please upload a smaller file.");
                return;
            }
            try {
                setUploading(true);
                const data = await uploadToS3(file);
                if (!data?.file_key || !data.file_name) {
                    toast.error("Something went wrong");
                    return;
                }
                await createChat(data);
                navigate(`/${chatId}`);
                console.log("data", data);
            } catch (error) {
                console.log(error);
            } finally {
                setUploading(false);
            }
        }
    });

    return (
        <div className="p-2 bg-white rounded-xl">
            <div {...getRootProps({
                className: "border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col"
            })}>
                <input
                    {...getInputProps()}
                />
                {(uploading || isCreateChatLoading) ? (
                    <>
                        <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
                        <p className="mt-2 text-sm text-slate-400">Uploading pdf...</p>
                    </>
                ) : (
                    <>
                        <Inbox className="w-10 h-10 text-blue-500" />
                        <p className="mt-2 text-sm text-slate-400">Drop PDF here.</p>
                    </>
                )}
            </div>
        </div>
    )
}