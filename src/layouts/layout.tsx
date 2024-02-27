import React from 'react'
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/theme-provider";
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
type Props = {
    children: React.ReactNode;
    showHero?: boolean;
}

const Layout = ({ children, showHero = false }: Props) => {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <div className="flex flex-col min-h-screen">
                <Header />
                {showHero && <Hero />}
                <div className="container mx-auto flex-1 py-10">
                    {children}
                </div>
                <Footer />
            </div>
        </ThemeProvider>

    )
}

export default Layout