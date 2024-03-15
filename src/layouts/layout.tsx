import React from 'react'
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/theme-provider";
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
type Props = {
    children: React.ReactNode;
    from?: string;
    showHero?: boolean;
}

const Layout = ({ children, showHero = false, from }: Props) => {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <div className="flex flex-col min-h-screen">
                <Header />
                {showHero && <Hero from={from} />}
                <div className="container mx-auto flex-1 py-10">
                    {children}
                </div>
                <Footer />
            </div>
        </ThemeProvider>

    )
}

export default Layout