
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { useTranslation } from '@/hooks/use-translation';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from '../logo';

export function Header() {
    const { t } = useTranslation();
    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const ctaUrl = process.env.NEXT_PUBLIC_CTA_URL;

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: "#process", label: t('header.nav.process') },
        { href: "#platforms", label: t('header.nav.platforms') },
        { href: "#features", label: t('header.nav.features') },
        { href: "/blog", label: "Blog" },
    ];

    return (
        <header
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                scrolled ? 'bg-background/95 dark:bg-card/95 backdrop-blur-sm shadow-md' : 'bg-transparent'
            )}
        >
            <div className="container mx-auto flex h-20 items-center px-4 md:px-6">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl font-headline">
                    <Logo />
                </Link>

                <div className="flex items-center gap-4 ml-auto">
                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                        {navLinks.map(link => (
                            <Link key={link.href} href={link.href} className="text-foreground/80 hover:text-foreground transition-colors">{link.label}</Link>
                        ))}
                    </nav>
                    <ThemeSwitcher />
                    <Button asChild className="hidden sm:inline-flex font-bold hover:opacity-90 transition-opacity">
                        <a href={ctaUrl} target="_blank" rel="noopener noreferrer">{t('header.cta')}</a>
                    </Button>
                    <div className="md:hidden">
                        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <Menu className="h-6 w-6" />
                                    <span className="sr-only">Ouvrir le menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left">
                                <SheetHeader>
                                    <SheetTitle className="sr-only">Menu Principal</SheetTitle>
                                    <SheetDescription className="sr-only">Navigation principale du site</SheetDescription>
                                    <Link href="/" className="flex items-center gap-2 font-bold text-xl font-headline mb-8">
                                        <Logo />
                                    </Link>
                                </SheetHeader>
                                <nav className="flex flex-col items-start gap-6 text-lg font-medium">
                                    {navLinks.map(link => (
                                        <Link key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="text-foreground/80 hover:text-foreground transition-colors">{link.label}</Link>
                                    ))}
                                </nav>
                                <Button asChild className="w-full mt-8 font-bold hover:opacity-90 transition-opacity">
                                    <a href={ctaUrl} target="_blank" rel="noopener noreferrer">{t('header.cta')}</a>
                                </Button>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    );
}
