import { useGetMyOrders } from "@/api/OrderApi";
import OrderStatusDetail from "@/components/OrderStatusDetail";
import OrderStatusHeader from "@/components/OrderStatusHeader";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useAuth } from "@clerk/clerk-react"
import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function OrderStatusPage() {
    const { userId } = useAuth();
    const [opening, setOpening] = useState("");
    const { orders, isLoading } = useGetMyOrders(userId);

    if (isLoading) {
        //TODO: Add loading skeleton here
        <span><Loader2 className="animate-spin" />Loading</span>
    }

    if (!orders || orders.length === 0) {
        const timeOut = setTimeout(() => (
            setOpening("No orders found.")
        ), 10000);

        timeOut;
        return <h1>{opening}</h1>;
    }

    return (
        <div className="space-y-10">
            {orders.map((order, index) => (
                <div key={index} className="space-y-10 bg-gray-50 p-10 rounded-lg">
                    <OrderStatusHeader order={order} />
                    <div className="grid gap-10 md:grid-cols-2">
                        <OrderStatusDetail order={order} />
                        <AspectRatio ratio={16 / 5}>
                            <img src={order.restaurant.imageUrl} className="rounded-md object-cover h-full w-full" />
                        </AspectRatio>
                    </div>
                </div>
            ))}
        </div>
    )
}
