"use client";

import { AnimatedSection } from "@/components/animated-section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useTranslation } from "@/hooks/use-translation";

export function Faq() {
    const { t } = useTranslation();
    const faqs = t('faq.questions', { returnObjects: true }) as { question: string, answer: string }[];

    if (!faqs) return null;

    return (
        <section id="faq" className="py-20 md:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <AnimatedSection className="text-center mb-16">
                    <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tighter">
                        {t('faq.title')}
                    </h2>
                    <p className="max-w-2xl mx-auto mt-4 text-lg text-foreground/70">
                        {t('faq.description')}
                    </p>
                </AnimatedSection>

                <AnimatedSection className="max-w-3xl mx-auto">
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                           <AccordionItem value={`item-${index}`} key={index}>
                               <AccordionTrigger className="text-left font-bold text-lg hover:no-underline">
                                   {faq.question}
                                </AccordionTrigger>
                               <AccordionContent className="text-base text-foreground/80">
                                   {faq.answer}
                               </AccordionContent>
                           </AccordionItem>
                        ))}
                    </Accordion>
                </AnimatedSection>
            </div>
        </section>
    )
}
