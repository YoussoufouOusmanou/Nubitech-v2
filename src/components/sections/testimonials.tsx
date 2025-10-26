"use client";

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AnimatedSection } from '@/components/animated-section';
import { useTranslation } from '@/hooks/use-translation';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LeaveTestimonialDialog } from '@/components/leave-testimonial-dialog';

const Rating = ({ rating }: { rating: number }) => {
    return (
        <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
            ))}
        </div>
    );
};


export function Testimonials() {
    const { t } = useTranslation();
    const staticTestimonials = t('testimonials.items', { returnObjects: true }) as {
        name: string,
        role: string,
        avatar: string,
        testimonial: string,
        rating: number
    }[];

    if (!staticTestimonials) return null;

    return (
        <section id="testimonials" className="py-20 md:py-32 bg-primary/5">
            <div className="container mx-auto px-4 md:px-6">
                <AnimatedSection className="text-center mb-16">
                    <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tighter">
                        {t('testimonials.title')}
                    </h2>
                    <p className="max-w-2xl mx-auto mt-4 text-lg text-foreground/70">
                        {t('testimonials.description')}
                    </p>
                </AnimatedSection>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {staticTestimonials.map((item, index) => (
                        <AnimatedSection key={index} style={{ transitionDelay: `${index * 100}ms` }}>
                            <Card className="h-full flex flex-col bg-background/80 backdrop-blur-sm shadow-2xl hover:shadow-primary/20 transition-shadow duration-300">
                                <CardContent className="pt-6 flex-grow space-y-4">
                                    <Rating rating={item.rating} />
                                    <blockquote className="italic text-foreground/90 before:content-['“'] after:content-['”']">
                                        {item.testimonial}
                                    </blockquote>

                                </CardContent>
                                <CardFooter className="flex items-center gap-4 border-t pt-4 mt-4">
                                    <Avatar>
                                        <AvatarImage src={item.avatar} alt={item.name} data-ai-hint="person portrait" unoptimized/>
                                        <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-bold">{item.name}</p>
                                        <p className="text-sm text-muted-foreground">{item.role}</p>
                                    </div>
                                </CardFooter>
                            </Card>
                        </AnimatedSection>
                    ))}
                </div>
                <AnimatedSection className="text-center mt-16">
                    <LeaveTestimonialDialog>
                        <Button size="lg" className="font-bold">
                            {t('testimonials.leave_testimonial_cta')}
                        </Button>
                    </LeaveTestimonialDialog>
                </AnimatedSection>
            </div>
        </section>
    );
}
