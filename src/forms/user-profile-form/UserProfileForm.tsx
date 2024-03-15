import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { User } from "@/types";
import { useEffect } from "react";

const formSchema = z.object({
    email: z.string().optional(),
    firstName: z.string().min(1, "first name is required"),
    lastName: z.string().min(1, "last name is required."),
    addressLine1: z.string().min(1, "address line 1 is required."),
    city: z.string().min(1, "city is required."),
    country: z.string().min(1, "country is required."),
});

export type UserFormData = z.infer<typeof formSchema>;


type Props = {
    onSave: (userProfileData: UserFormData) => void;
    isLoading: boolean;
    currentUser: User;
    title?: string;
    buttonText?: string;
}

export default function UserProfileForm({ onSave, isLoading, currentUser, title = "User Profile", buttonText = "Submit" }: Props) {
    const form = useForm<UserFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: currentUser.email,
            firstName: "",
            lastName: "",
            addressLine1: "",
            city: "",
            country: "",
        }
    });

    useEffect(() => {
        form.reset(currentUser);
    }, [currentUser, form]);

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSave)}
                className="space-y-4 bg-gray-50  rounded-lg md:p-10"
            >
                <div>
                    <h2 className="text-2xl font-bold">
                        {title}
                    </h2>
                    <FormDescription>
                        Edit your profile here.
                    </FormDescription>
                </div>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="w-full md:w-11/12">
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    disabled
                                    className="bg-white"
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <div className="flex flex-col md:flex-row gap-4 w-full md:w-11/12">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input {...field}

                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex flex-col md:flex-row gap-4 w-full md:w-11/12">
                    <FormField
                        control={form.control}
                        name="addressLine1"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Address Line 1</FormLabel>
                                <FormControl>
                                    <Input {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Country</FormLabel>
                                <FormControl>
                                    <Input {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                {isLoading ? <LoadingButton />
                    : <Button
                        type="submit"
                        className="bg-orange-500"
                    >{buttonText}
                    </Button>
                }
            </form>
        </Form>
    )
}
