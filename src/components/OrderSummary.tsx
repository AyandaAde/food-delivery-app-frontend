import { CartItem, Restaurant } from '@/types'
import { CardContent, CardHeader, CardTitle } from './ui/card'
import { formatPriceUSD } from '@/lib/formatPrice'
// import { useSelector } from "react-redux";
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Trash } from 'lucide-react';

type Props = {
    restaurant: Restaurant
    cartItems: CartItem[];
    removeFromCart: () => void;
}

export default function OrderSummary({ restaurant, cartItems, removeFromCart }: Props) {
    // const { total } = useSelector(
    //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //     (store: any) => store.cart
    // );

    function getTotalPrice() {
        // const totalWithDelivery = total + restaurant.deliveryPrice;

        // return parseInt((totalWithDelivery / 100).toFixed(2));

        const totalInCence = cartItems.reduce((total, cartItem) => (total + cartItem.price * cartItem.quantity), 0);

        const totalWithDelivery = totalInCence + restaurant.deliveryPrice;
        return parseInt((totalWithDelivery / 100).toFixed(2));

    }
    return (
        <>
            <CardHeader>
                <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
                    <span>Your Order</span>
                    <span>{formatPriceUSD(getTotalPrice())}</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
                {cartItems.map((item, index) => (
                    <div key={index} className="flex justify-between">
                        <span>
                            <Badge variant="outline" className="mr-2">
                                {item.quantity}
                            </Badge>
                            {item.name}
                        </span>
                        <span className="flex items-center gap-1">
                            <Trash
                                className="cursor-pointer"
                                color="red"
                                size={20}
                                onClick={() => removeFromCart(item)}
                            />
                            {formatPriceUSD(parseInt(((item.price * item.quantity) / 100).toFixed(2)))}
                        </span>
                    </div>
                ))}
                <Separator className="my-1" />
                <div className="flex justify-between">
                    <span>Delivery</span>
                    <span>{formatPriceUSD(parseInt((restaurant.deliveryPrice / 100).toFixed(2)))}</span>
                </div>
                <Separator className="my-1" />

            </CardContent>
        </>
    )
}