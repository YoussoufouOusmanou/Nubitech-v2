"use client";

import { AnimatedSection } from "@/components/animated-section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Rocket, Database, Settings, ShieldCheck, Users, Zap, Clock, Infinity, GitBranch, ArrowRight } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React from 'react';

interface UseCaseCardProps {
    title: string;
    stats: { icon: React.ReactNode; label: string; value: string }[];
    segmentIcon: React.ReactNode;
    segmentTitle: string;
    description: string;
    delay?: number;
}

const UseCaseCard: React.FC<UseCaseCardProps> = ({ title, stats, segmentIcon, segmentTitle, description, delay = 0 }) => {
    const { t } = useTranslation();
    const cardContent = (
        <Card className="h-full shadow-2xl hover:shadow-primary/20 transition-shadow duration-300 flex flex-col bg-secondary/30">
            <CardContent className="p-8 flex flex-col flex-grow">
                <h3 className="font-headline text-2xl font-bold mb-6 text-center">{title}</h3>
                
                <div className="grid grid-cols-3 gap-4 mb-8 text-center">
                    {stats.map((stat, i) => (
                        <div key={i} className="flex flex-col items-center">
                            <div className="bg-background/50 rounded-lg p-3 mb-2">
                                {stat.icon}
                            </div>
                            <span className="text-sm font-bold">{stat.label}</span>
                            <span className="text-xs text-muted-foreground">{stat.value}</span>
                        </div>
                    ))}
                </div>

                <div className="flex items-center gap-3 mb-4">
                    {segmentIcon}
                    <h4 className="font-bold text-lg text-primary">{segmentTitle}</h4>
                </div>

                <p className="text-foreground/80 text-sm mb-6 flex-grow">{description}</p>
                
                <Button variant="link" className="p-0 self-start text-primary hover:text-accent">
                    {t('useCases.learnMore')} <ArrowRight className="ml-2 h-4 w-4"/>
                </Button>
            </CardContent>
        </Card>
    );

    // Only wrap with AnimatedSection if it's not in a carousel (i.e., on desktop)
    if (delay > 0) {
        return <AnimatedSection style={{ transitionDelay: `${delay}ms` }}>{cardContent}</AnimatedSection>;
    }

    return cardContent;
};

export function UseCases() {
    const { t } = useTranslation();

    const plugin = React.useRef(
        Autoplay({ delay: 4000, stopOnInteraction: true })
    );

    const icons = {
        Code: <Code className="w-6 h-6" />,
        Zap: <Zap className="w-6 h-6 text-yellow-400" />,
        Infinity: <Infinity className="w-6 h-6 text-green-400" />,
        Rocket: <Rocket className="w-6 h-6 text-red-400" />,
        Database: <Database className="w-6 h-6 text-blue-400" />,
        Settings: <Settings className="w-6 h-6 text-gray-400" />,
        Users: <Users className="w-6 h-6 text-purple-400" />,
        ShieldCheck: <ShieldCheck className="w-6 h-6 text-green-400" />,
        Clock: <Clock className="w-6 h-6 text-red-400" />,
        GitBranch: <GitBranch className="w-6 h-6"/>
    };

    const useCasesData = t('useCases.items', { returnObjects: true }) as {
        title: string;
        stats: { icon: keyof typeof icons; label: string; value: string }[];
        segmentIcon: keyof typeof icons;
        segmentTitle: string;
        description: string;
    }[];

    if (!useCasesData) return null;

    return (
        <section id="platforms" className="py-20 md:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <AnimatedSection className="text-center mb-16">
                    <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tighter">
                        {t('useCases.title')}
                    </h2>
                    <p className="max-w-2xl mx-auto mt-4 text-lg text-foreground/70">
                        {t('useCases.description')}
                    </p>
                </AnimatedSection>

                {/* Grid for medium and larger screens */}
                <div className="hidden md:grid md:grid-cols-3 gap-8">
                    {useCasesData.map((useCase, index) => (
                        <UseCaseCard
                            key={index}
                            title={useCase.title}
                            stats={useCase.stats.map(stat => ({ ...stat, icon: icons[stat.icon] }))}
                            segmentIcon={icons[useCase.segmentIcon]}
                            segmentTitle={useCase.segmentTitle}
                            description={useCase.description}
                            delay={index * 150}
                        />
                    ))}
                </div>

                {/* Carousel for small screens */}
                <div className="md:hidden">
                    <Carousel
                        plugins={[plugin.current]}
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        className="w-full max-w-sm mx-auto"
                        onMouseEnter={plugin.current.stop}
                        onMouseLeave={plugin.current.reset}
                    >
                        <CarouselContent>
                            {useCasesData.map((useCase, index) => (
                                <CarouselItem key={index}>
                                    <div className="p-1 h-full">
                                         <UseCaseCard
                                            title={useCase.title}
                                            stats={useCase.stats.map(stat => ({ ...stat, icon: icons[stat.icon] }))}
                                            segmentIcon={icons[useCase.segmentIcon]}
                                            segmentTitle={useCase.segmentTitle}
                                            description={useCase.description}
                                        />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="-left-4" />
                        <CarouselNext className="-right-4"/>
                    </Carousel>
                </div>

            </div>
        </section>
    )
}
