import React from "react";
import { cn } from "@/lib/utils";
import { Button } from './ui/button';
import {
    NavigationMenu,
    // NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    // NavigationMenuTrigger,
    // navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
// import { Link } from "react-router-dom";
import DarkModeButton from "./DarkModeButton";
import { SignedIn, SignedOut, UserButton, useAuth } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

export default function DesktopNav() {
    const { userId } = useAuth();

    return (
        <NavigationMenu>
            <NavigationMenuList>
                <SignedIn>
                    <div className="flex felx-row gap-3">
                        <NavigationMenuItem>
                            <Link to="/order-status">
                                <NavigationMenuLink className="font-semibold hover:text-orange-500">
                                    Order Status
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link to="/user-profile">
                                <NavigationMenuLink className="font-semibold hover:text-orange-500">
                                    User profile
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        {
                            userId === "user_2cifQMBRzDlRIo3CjV5M5b4JuXh" &&
                            <NavigationMenuItem>
                                <Link to="/manage-restaurant">
                                    <NavigationMenuLink className="font-semibold hover:text-orange-500">
                                        Manage Restaurant
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        }
                    </div>
                </SignedIn>
                <NavigationMenuItem>
                    <Button
                        variant={"ghost"}
                        className="font-bold hover:text-purple-700 hover:bg-orange-300"
                    >
                        <SignedIn>
                            <UserButton afterSignOutUrl='/sign-in' />
                        </SignedIn>
                        <SignedOut>
                            <Link to="/sign-in">Log In</Link>
                        </SignedOut>
                    </Button>
                </NavigationMenuItem>
                {/* <NavigationMenuItem>
                    <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                            {components.map((component) => (
                                <ListItem
                                    key={component.title}
                                    title={component.title}
                                    href={component.href}
                                >
                                    {component.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem> */}
                <NavigationMenuItem>
                    <DarkModeButton />
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"


