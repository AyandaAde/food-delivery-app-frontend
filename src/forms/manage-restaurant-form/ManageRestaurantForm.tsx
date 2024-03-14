import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSection from "./DetailsSection";
import { Separator } from "@/components/ui/separator";
import CuisinesSection from "./CuisinesSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import { LoadingButton } from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/clerk-react";
import { Restaurant } from "@/types";
import { useEffect } from "react";

const formSchema = z.object({
    userId: z.string(),
    restaurantName: z.string({
        required_error: "restaurant name is required",
    }),
    city: z.string({
        required_error: "city is required",
    }),
    country: z.string({
        required_error: "country is required",
    }),
    deliveryPrice: z.coerce.number({
        required_error: "delivery price is required",
        invalid_type_error: "must be a valid number",
    }),
    estimatedDeliveryTime: z.coerce.number({
        required_error: "estimated delivery time is required",
        invalid_type_error: "must be a valid number",
    }),
    cuisines: z.array(z.string()).nonempty({
        message: "please select at least one item"
    }),
    menuItems: z.array(z.object({
        name: z.string().min(1, "name is required"),
        price: z.coerce.number().min(1, "price is required")
    })),
    imageUrl: z.string().min(2, "image is required").optional(),
})

type RestaurantFormData = z.infer<typeof formSchema>;
type Props = {
    restaurant?: Restaurant;
    onSave: (restaurantFormData: RestaurantFormData) => void;
    isLoading: boolean;
}

export default function ManageRestaurantForm({ onSave, isLoading, restaurant }: Props) {
    const { userId } = useAuth();

    const form = useForm<RestaurantFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            userId,
            cuisines: [],
            menuItems: [{ name: "", price: 0 }],
        },
    });

    useEffect(() => {
        if (!restaurant) {
            return
        }

        const updatedRestaurant = {
            ...restaurant
        };
        form.reset(updatedRestaurant);
    }, [form, restaurant]);

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSave)} className="sapce-y-8 bg-gray-50 p-10 rounded-lg">
                    <DetailsSection />
                    <Separator className="my-10" />
                    <CuisinesSection />
                    <Separator className="my-10" />
                    <MenuSection />
                    <Separator className="my-10" />
                    <ImageSection />
                    {isLoading ?
                        <LoadingButton /> :
                        <Button type="submit">Submit</Button>
                    }
                </form>
            </Form>
        </div>
    )
}