
"use client";

import { Button } from '@/components/ui/button';
import { ArrowRight, Check, ShieldCheck, Zap } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import { AnimatedSection } from '@/components/animated-section';
import { DemoVideoDialog } from '@/components/demo-video-dialog';

const DeploymentVisual = () => {
    return (
        <div className="relative w-full max-w-lg mx-auto rotate-[5deg] transition-transform duration-300 hover:rotate-0">
            <div className="bg-secondary/50 rounded-lg p-4 shadow-2xl border border-border">
                <div className="flex items-center gap-2 mb-4">
                    <span className="w-3 h-3 rounded-full bg-red-500"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                    <span className="w-3 h-3 rounded-full bg-green-500"></span>
                </div>
                <div className="space-y-2">
                    <div className="h-6 rounded bg-primary/70 w-3/4 animate-pulse"></div>
                    <div className="h-6 rounded bg-green-500/70 w-full animate-pulse delay-150"></div>
                    <div className="h-6 rounded bg-primary/70 w-1/2 animate-pulse delay-300"></div>
                </div>
                <div className="mt-4 flex justify-end">
                    <div className="bg-accent/50 text-primary-foreground px-4 py-2 rounded-md flex items-center gap-2">
                        <span>✨</span>
                        <span>Déploiement réussi!</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function Hero() {
    const { t } = useTranslation();
    const ctaUrl = process.env.NEXT_PUBLIC_CTA_URL;

    return (
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 flex items-center justify-center text-foreground overflow-hidden">
            <div className="absolute inset-0 z-0 pointer-events-none bg-background">
                <div className="bubble-wrapper">
                    {[...Array(20)].map((_, i) => (
                        <div key={i} className="bubble" style={{
                            '--size': `${5 + Math.random() * 5}rem`,
                            '--distance': `${6 + Math.random() * 4}rem`,
                            '--position': `${-5 + Math.random() * 110}%`,
                            '--time': `${25 + Math.random() * 20}s`,
                            '--delay': `${-1 * (Math.random() * 20)}s`,
                        } as React.CSSProperties} />
                    ))}
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="text-center md:text-left">
                        <AnimatedSection>
                            <div className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium mb-4">
                                <Zap className="w-4 h-4" />
                                <span>{t('hero.badge')}</span>
                            </div>
                            <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter mb-4">
                                {t('hero.title.line1')}<br/>
                                <span className="text-primary">{t('hero.title.line2')}</span>
                            </h1>
                        </AnimatedSection>
                        <AnimatedSection style={{ transitionDelay: '100ms' }}>
                            <p className="max-w-xl mx-auto md:mx-0 text-lg md:text-xl text-foreground/80 mb-8">
                                {t('hero.description')}
                            </p>
                        </AnimatedSection>
                        <AnimatedSection style={{ transitionDelay: '200ms' }} className="space-y-4 mb-10">
                            <div className="flex items-center gap-4 justify-center md:justify-start">
                                <span className="flex items-center gap-2 text-foreground/80"><Check className="w-5 h-5 text-green-500" />{t('hero.highlights.0')}</span>
                                <span className="flex items-center gap-2 text-foreground/80"><Check className="w-5 h-5 text-green-500" />{t('hero.highlights.1')}</span>
                                <span className="flex items-center gap-2 text-foreground/80"><Check className="w-5 h-5 text-green-500" />{t('hero.highlights.2')}</span>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection style={{ transitionDelay: '300ms' }}>
                            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 mb-4">
                                <Button size="lg" className="font-bold text-lg" asChild>
                                    <a href={ctaUrl} target="_blank" rel="noopener noreferrer">{t('hero.cta.primary')}</a>
                                </Button>
                                <DemoVideoDialog>
                                    <Button size="lg" variant="outline" className="font-bold text-lg demo-button">
                                        {t('hero.cta.secondary')}
                                    </Button>
                                </DemoVideoDialog>
                            </div>
                            <p className="text-sm text-center md:text-left text-foreground/60 flex items-center justify-center md:justify-start gap-2">
                                <ShieldCheck className="w-4 h-4 text-green-500" />
                                {t('hero.guarantee')}
                            </p>
                        </AnimatedSection>
                    </div>
                    <AnimatedSection style={{ transitionDelay: '400ms' }} className="hidden md:block">
                        <DeploymentVisual />
                    </AnimatedSection>
                </div>
            </div>
        </section>
    );
}
