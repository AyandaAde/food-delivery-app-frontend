import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { UploadDropzone, UploadButton } from "@bytescale/upload-widget-react";
import { Input } from "@/components/ui/input";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";

const REACT_UPLOAD_API_KEY = import.meta.env.VITE_REACT_UPLOAD_API_KEY;

// -----
// Configuration:
// https://www.bytescale.com/docs/upload-widget#configuration
// -----
const options = {
    apiKey: REACT_UPLOAD_API_KEY, // This is your API key.
    maxFileCount: 1,
    showFinishButton: true, // Note: You must use 'onUpdate' if you set 'showFinishButton: false' (default).
    styles: {
        colors: {
            primary: "#8F00FF"
        }
    }
};


export default function ImageSection() {
    const { control, setValue, watch } = useFormContext();

    const existingImageUrl = watch("imageUrl");

    return (
        <div className="space-y-2">
            <div>
                <h2 className="text-2xl font-bold">
                    Image
                </h2>
                <FormDescription>
                    Add an image.
                </FormDescription>
            </div>
            <div className="flex flex-col gap-8 md:w-[50%]">
                {existingImageUrl && (
                    <AspectRatio ratio={16 / 9}>
                        <img
                            src={existingImageUrl}
                            className="rounded-md object-cover h-full w-full"
                            alt="existing restaurant image"
                        />
                    </AspectRatio>
                )}
                <div className="block md:hidden">
                    <UploadButton
                        options={options}
                        onComplete={files => {
                            alert(files.map(x => x.fileUrl).join("\n"));
                            setValue("imageUrl", files[0].fileUrl);
                        }
                        }
                    >
                        {({ onClick }) =>
                            <Button onClick={onClick}>
                                Upload a file...
                            </Button>
                        }
                    </UploadButton>
                </div>
                <UploadDropzone
                    className="hidden md:block"
                    options={options}
                    onUpdate={({ uploadedFiles }) => console.log(uploadedFiles.map(x => x.fileUrl).join("\n"))}
                    onComplete={files => {
                        alert(files.map(x => x.fileUrl).join("\n"));
                        setValue("imageUrl", files[0].fileUrl);
                    }
                    }
                    width="600px"
                    height="375px" />
                <FormField
                    control={control}
                    name="imageUrl"
                    render={({ field }) => (
                        <FormItem className="mb-5">
                            <FormControl>
                                <Input
                                    {...field}
                                    type="url"
                                    placeholder="Upload an image or type in an image URL"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="userId"
                    render={({ field }) => (
                        <FormItem className="mb-5">
                            <FormLabel>User Id:</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    type="text"
                                    disabled
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>
    )
}