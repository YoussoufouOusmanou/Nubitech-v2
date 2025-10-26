"use client";

import { useMemo } from 'react';
import { AnimatedSection } from "@/components/animated-section";
import { Box, UploadCloud, Globe, Code } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"


export function HowItWorks() {
    const plugin = useMemo(
      () => Autoplay({ delay: 2000, stopOnInteraction: false }),
      []
    );
    
    return (
        <section id="process" className="py-20 md:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <AnimatedSection className="text-center mb-16">
                    <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tighter">
                        De l'idée à la production en 4 étapes
                    </h2>
                    <p className="max-w-2xl mx-auto mt-4 text-lg text-foreground/70">
                        Déployer vos applications n'a jamais été aussi simple et rapide.
                    </p>
                </AnimatedSection>
                <AnimatedSection>
                    <Carousel 
                      opts={{
                        align: "start",
                        loop: true,
                      }}
                      plugins={[plugin]}
                      onMouseEnter={plugin.stop}
                      onMouseLeave={plugin.reset}
                      className="w-full max-w-5xl mx-auto"
                    >
                      <CarouselContent>
                          <CarouselItem className="md:basis-1/2">
                            <div className="p-1 h-full">
                                <Card className="shadow-xl bg-secondary/30 border-primary/10 h-full flex flex-col">
                                    <CardHeader>
                                        <div className="flex items-center gap-4">
                                            <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg">
                                                <Code className="w-10 h-10 text-primary" />
                                            </div>
                                            <div>
                                                <div className="absolute top-4 right-4 h-12 w-12 flex items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xl font-headline border-4 border-background">
                                                    01
                                                </div>
                                                <CardTitle className="font-headline text-2xl mt-4">Connectez votre dépôt</CardTitle>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="flex flex-col flex-grow">
                                        <p className="text-foreground/80 mb-4 flex-grow">Liez votre compte GitHub, GitLab ou Bitbucket en un seul clic. Nous détectons automatiquement votre configuration.</p>
                                        <div className="flex flex-wrap gap-2">
                                            <Badge variant="outline" className="border-border bg-background/50 text-foreground/80">GitHub</Badge>
                                            <Badge variant="outline" className="border-border bg-background/50 text-foreground/80">GitLab</Badge>
                                            <Badge variant="outline" className="border-border bg-background/50 text-foreground/80">Bitbucket</Badge>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                          </CarouselItem>
                          <CarouselItem className="md:basis-1/2">
                            <div className="p-1 h-full">
                                <Card className="shadow-xl bg-secondary/30 border-primary/10 h-full flex flex-col">
                                    <CardHeader>
                                        <div className="flex items-center gap-4">
                                            <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg">
                                                <Box className="w-10 h-10 text-primary" />
                                            </div>
                                            <div>
                                                <div className="absolute top-4 right-4 h-12 w-12 flex items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xl font-headline border-4 border-background">
                                                    02
                                                </div>
                                                <CardTitle className="font-headline text-2xl mt-4">Configurez votre build</CardTitle>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="flex flex-col flex-grow">
                                        <p className="text-foreground/80 mb-4 flex-grow">Notre interface intuitive vous permet de gérer tous vos commandes de build et vos variables d'environnement en toute simplicité.</p>
                                        <div className="flex flex-wrap gap-2">
                                            <Badge variant="outline" className="border-border bg-background/50 text-foreground/80">Détection Auto</Badge>
                                            <Badge variant="outline" className="border-border bg-background/50 text-foreground/80">Interface</Badge>
                                            <Badge variant="outline" className="border-border bg-background/50 text-foreground/80">Variables</Badge>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                          </CarouselItem>
                          <CarouselItem className="md:basis-1/2">
                            <div className="p-1 h-full">
                                <Card className="shadow-xl bg-secondary/30 border-primary/10 h-full flex flex-col">
                                    <CardHeader>
                                        <div className="flex items-center gap-4">
                                            <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg">
                                                <UploadCloud className="w-10 h-10 text-primary" />
                                            </div>
                                            <div>
                                                <div className="absolute top-4 right-4 h-12 w-12 flex items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xl font-headline border-4 border-background">
                                                    03
                                                </div>
                                                <CardTitle className="font-headline text-2xl mt-4">Poussez votre code</CardTitle>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="flex flex-col flex-grow">
                                        <p className="text-foreground/80 mb-4 flex-grow">À chaque 'git push', Nubitech build votre application, lance les tests et prépare le déploiement.</p>
                                        <div className="flex flex-wrap gap-2">
                                            <Badge variant="outline" className="border-border bg-background/50 text-foreground/80">Push Code</Badge>
                                            <Badge variant="outline" className="border-border bg-background/50 text-foreground/80">Build</Badge>
                                            <Badge variant="outline" className="border-border bg-background/50 text-foreground/80">Tests</Badge>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                          </CarouselItem>
                          <CarouselItem className="md:basis-1/2">
                            <div className="p-1 h-full">
                                <Card className="shadow-xl bg-secondary/30 border-primary/10 h-full flex flex-col">
                                    <CardHeader>
                                        <div className="flex items-center gap-4">
                                            <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg">
                                                <Globe className="w-10 h-10 text-primary" />
                                            </div>
                                            <div>
                                                <div className="absolute top-4 right-4 h-12 w-12 flex items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xl font-headline border-4 border-background">
                                                    04
                                                </div>
                                                <CardTitle className="font-headline text-2xl mt-4">Mise en ligne instantanée</CardTitle>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="flex flex-col flex-grow">
                                        <p className="text-foreground/80 mb-4 flex-grow">Votre site est déployé sur notre infrastructure globale, optimisé pour la performance et la scalabilité.</p>
                                        <div className="flex flex-wrap gap-2">
                                            <Badge variant="outline" className="border-border bg-background/50 text-foreground/80">Global CDN</Badge>
                                            <Badge variant="outline" className="border-border bg-background/50 text-foreground/80">Performance</Badge>
                                            <Badge variant="outline" className="border-border bg-background/50 text-foreground/80">Monitoring</Badge>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                          </CarouselItem>
                      </CarouselContent>
                      <CarouselPrevious />
                      <CarouselNext />
                    </Carousel>
                </AnimatedSection>
            </div>
        </section>
    )
}
