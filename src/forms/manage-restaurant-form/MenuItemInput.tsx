import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

type Props = {
    index: number;
    removeMenuItem: () => void;
}

export default function MenuItemInput({ index, removeMenuItem }: Props) {
    const { control } = useFormContext();

    return (
        <div>
            <div className="flex flex-col md:flex-row items-end gap-2">
                <FormField
                    control={control}
                    name={`menuItems.${index}.name`}
                    render={({ field }) => (
                        <FormItem className="flex items-center gap-1">
                            <FormLabel>Name<FormMessage />
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Pepperoni Pizza"
                                    className="bg-white"
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name={`menuItems.${index}.price`}
                    render={({ field }) => (
                        <FormItem className="flex item-center gap-1">
                            <FormLabel>Price (in cents) <FormMessage />
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="800"
                                    className="bg-white"
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type="button" onClick={removeMenuItem} className="bg-red-500 max-h-fit">Remove</Button>
            </div>
        </div>
    )
}