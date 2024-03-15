import { Order, OrderStatus } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { formatPriceUSD } from "@/lib/formatPrice";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ORDER_STATUS } from "@/config/order-status-config";
import { useUpdateMyRestaurantOrder } from "@/api/MyRestaurantApi";
import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";

type Props = {
    order: Order
}

export default function OrderItemCard({ order }: Props) {
    const { userId } = useAuth();
    const { updateRestaurantStatus, isLoading } = useUpdateMyRestaurantOrder(userId);
    const [status, setStatus] = useState<OrderStatus>(order.status);

    useEffect(() => {
        setStatus(order.status);
    }, [order.status]);

    function getTime() {
        const orderDateTime = new Date(order.createdAt);

        const hours = orderDateTime.getHours();
        const minutes = orderDateTime.getMinutes();
        const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

        return `${hours}:${paddedMinutes}`;
    }

    async function handleStatusChange(newStatus: OrderStatus) {
        await updateRestaurantStatus({ orderId: order._id as string, status: newStatus });
        setStatus(newStatus);
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="grid md:grid-cols-4 gap-4 justify-between mb-3">
                    <div>
                        Customer Name:
                        <span className="ml-2 font-normal">
                            {order.deliveryDetails.name}
                        </span>
                    </div>
                    <div>
                        Delivery Address:
                        <span className="ml-2 font-normal">
                            {order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}
                        </span>
                    </div>
                    <div>
                        Time Ordered:
                        <span className="ml-2 font-normal">
                            {getTime()}
                        </span>
                    </div>
                    <div>
                        Total Cost:
                        <span className="ml-2 font-normal">
                            {formatPriceUSD(parseInt((order.totalAmount / 100).toFixed(2)))}
                        </span>
                    </div>
                </CardTitle>
                <Separator className="my-5" />
                <CardContent className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        {order.cartItems.map((cartItem) => (
                            <span>
                                <Badge variant="outline" className="mr-2">
                                    {cartItem.quantity}
                                </Badge>
                                {cartItem.name}
                            </span>
                        ))}
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="status">Order Status</Label>
                        <Select
                            value={status}
                            disabled={isLoading}
                            onValueChange={(value) => handleStatusChange(value as OrderStatus)}
                        >
                            <SelectTrigger id="status">
                                <SelectValue
                                    placeholder="Status"
                                />
                                <SelectContent position="popper">
                                    {ORDER_STATUS.map((status) => (
                                        <SelectItem value={status.value}>{status.label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </SelectTrigger>
                        </Select>
                    </div>
                </CardContent>
            </CardHeader>
        </Card>
    )
}