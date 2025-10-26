"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedSection } from '@/components/animated-section';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/use-translation';

export function Pricing() {
    const { t } = useTranslation();
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

    const plans = t('pricing.plans', { returnObjects: true }) as {
        name: string,
        description: string,
        price: { monthly: number, yearly: number },
        features: string[],
        isPopular: boolean
    }[];
    
    const [selectedPlan, setSelectedPlan] = useState<string>(plans?.[1]?.name || '');

    if (!plans) return null;

    return (
        <section id="pricing" className="py-20 md:py-32 bg-primary/5">
            <div className="container mx-auto px-4 md:px-6">
                <AnimatedSection className="text-center mb-12 md:mb-16">
                    <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tighter">
                        {t('pricing.title')}
                    </h2>
                    <p className="max-w-2xl mx-auto mt-4 text-lg text-foreground/70">
                        {t('pricing.description')}
                    </p>
                </AnimatedSection>

                <AnimatedSection style={{ transitionDelay: '200ms' }} className="flex justify-center items-center gap-4 mb-12">
                     <Label htmlFor="billing-switch" className={cn("font-medium text-lg", billingCycle === 'monthly' ? 'text-primary' : 'text-muted-foreground')}>
                        {t('pricing.billing.monthly')}
                    </Label>
                    <Switch
                        id="billing-switch"
                        checked={billingCycle === 'yearly'}
                        onCheckedChange={(checked) => setBillingCycle(checked ? 'yearly' : 'monthly')}
                        aria-label={t('pricing.billing.ariaLabel')}
                    />
                    <Label htmlFor="billing-switch" className={cn("font-medium text-lg", billingCycle === 'yearly' ? 'text-primary' : 'text-muted-foreground')}>
                        <span className="flex items-center gap-2">
                          {t('pricing.billing.yearly')} <span className="hidden sm:inline-block px-2 py-0.5 bg-accent text-accent-foreground text-xs rounded-full">{t('pricing.billing.save')}</span>
                        </span>
                    </Label>
                </AnimatedSection>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch max-w-sm mx-auto md:max-w-none">
                    {plans.map((plan, index) => (
                        <AnimatedSection key={index} style={{ transitionDelay: `${index * 150 + 300}ms` }}>
                            <Card 
                                onClick={() => setSelectedPlan(plan.name)}
                                className={cn(
                                    "h-full flex flex-col shadow-lg transition-all duration-300 hover:shadow-2xl cursor-pointer", 
                                    plan.isPopular ? "shadow-primary/40" : "",
                                    selectedPlan === plan.name ? "border-2 border-primary scale-105" : "border"
                                )}
                            >
                                {plan.isPopular && (
                                    <div className="bg-primary text-primary-foreground text-center text-sm font-bold py-1.5 rounded-t-lg">
                                        {t('pricing.popular')}
                                    </div>

                                )}
                                <CardHeader className="text-center">
                                    <CardTitle className="font-headline text-3xl mt-4">{plan.name}</CardTitle>
                                    <CardDescription className="text-base min-h-[50px]">{plan.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow p-6">
                                    <div className="text-center mb-8">
                                        <span className="font-headline text-5xl font-bold">
                                            {billingCycle === 'monthly' ? plan.price.monthly : plan.price.yearly}€
                                        </span>
                                        <span className="text-muted-foreground">/{billingCycle === 'monthly' ? t('pricing.billing.month') : t('pricing.billing.year')}</span>
                                        {billingCycle === 'yearly' && (
                                            <div className="text-sm text-muted-foreground mt-1">
                                                soit {plan.price.yearly * 12}€ / {t('pricing.billing.year')}
                                            </div>
                                        )}
                                    </div>
                                    <ul className="space-y-4">
                                        {plan.features.map((feature, fIndex) => (
                                            <li key={fIndex} className="flex items-center gap-3">
                                                <Check className="h-5 w-5 text-green-500" />
                                                <span className="text-foreground/80">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardFooter className="p-6 mt-auto">
                                    <Button asChild size="lg" className="w-full font-bold text-lg" variant={plan.isPopular ? "default" : "outline"}>
                                        <a href="#">{t('pricing.choosePlan')} {plan.name}</a>
                                    </Button>
                                </CardFooter>
                            </Card>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
}
