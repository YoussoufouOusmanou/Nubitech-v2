
"use client";

import { useTranslation } from '@/hooks/use-translation';
import { Logo } from '../logo';
import { AnimatedSection } from "../animated-section";
import { Contact } from './contact';

export function Footer() {
    const { t } = useTranslation();
    const ctaUrl = process.env.NEXT_PUBLIC_CTA_URL;

    const footerLinksData = t('footer.links', { returnObjects: true }) as { title: string, links: { label: string, href: string }[] }[];

    // Inject the CTA URL into the links
    const footerLinks = footerLinksData?.map(group => ({
        ...group,
        links: group.links.map(link => ({
            ...link,
            href: link.href === "" ? ctaUrl || '#' : link.href,
        }))
    }));


    return (
        <footer className="bg-secondary/30 border-t">
            <div className="container mx-auto py-16 px-4 md:px-6">
                <AnimatedSection>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="md:col-span-1">
                            <div className="mb-4">
                                <Logo className="w-auto h-12 text-primary" />
                            </div>
                        </div>

                        <div className="md:col-span-1 grid grid-cols-2 sm:grid-cols-3 gap-8">
                            {footerLinks && footerLinks.map(group => (
                                <div key={group.title}>
                                    <h4 className="font-bold font-headline mb-4 text-foreground">{group.title}</h4>
                                    <ul className="space-y-3">
                                        {group.links.map(link => (
                                            <li key={link.label}>
                                                <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors" target={link.href.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer">
                                                    {link.label}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        <div className="md:col-span-1">
                            <Contact />
                        </div>
                    </div>
                </AnimatedSection>
            </div>

            <div className="bg-background border-t">
                <div className="container mx-auto py-8 px-4 md:px-6 text-center text-sm text-muted-foreground">
                    {t('footer.copyright', { year: new Date().getFullYear() })} - {t('footer.tagline')}
                </div>
            </div>
        </footer>
    );
}
