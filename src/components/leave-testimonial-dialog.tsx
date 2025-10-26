"use client";

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from '@/hooks/use-translation';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { sendTestimonial } from '@/ai/flows/send-testimonial-flow';

const StarRating = ({ field }: { field: any }) => {
    const [hover, setHover] = useState(0);
    const { t } = useTranslation();

    return (
        <div>
            <FormLabel>{t('testimonials.form.rating.label')}</FormLabel>
            <div className="flex items-center gap-1 mt-2">
            {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                <label key={ratingValue}>
                    <input
                    type="radio"
                    className="hidden"
                    value={ratingValue}
                    onClick={() => field.onChange(ratingValue)}
                    />
                    <Star
                    className={cn(
                        "h-8 w-8 cursor-pointer transition-colors",
                        ratingValue <= (hover || field.value || 0)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    )}
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(0)}
                    />
                </label>
                );
            })}
            </div>
             <FormMessage />
        </div>
    )
}

export function LeaveTestimonialDialog({ children }: { children: React.ReactNode }) {
    const { t } = useTranslation();
    const { toast } = useToast();
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const formSchema = z.object({
        name: z.string().min(2, { message: t('testimonials.form.errors.name') }),
        role: z.string().min(2, { message: t('testimonials.form.errors.role') }),
        testimonial: z.string().min(10, { message: t('testimonials.form.errors.testimonial') }),
        rating: z.number().min(1, { message: t('testimonials.form.errors.rating') }).max(5),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            role: "",
            testimonial: "",
            rating: 0
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        try {
            await sendTestimonial(values);
            toast({
                title: t('testimonials.toast.title'),
                description: t('testimonials.toast.description'),
            });
            form.reset();
            setIsOpen(false);
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Erreur',
                description: "Une erreur est survenue lors de l'envoi de votre témoignage.",
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[480px]">
                <DialogHeader>
                    <DialogTitle className="font-headline text-2xl">{t('testimonials.form.title')}</DialogTitle>
                    <DialogDescription>{t('testimonials.form.description')}</DialogDescription>
                </DialogHeader>
                 <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('testimonials.form.name.label')}</FormLabel>
                                    <FormControl>
                                        <Input placeholder={t('testimonials.form.name.placeholder')} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('testimonials.form.role.label')}</FormLabel>
                                    <FormControl>
                                        <Input placeholder={t('testimonials.form.role.placeholder')} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="testimonial"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('testimonials.form.message.label')}</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder={t('testimonials.form.message.placeholder')} className="min-h-[100px]" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="rating"
                            render={({ field }) => (
                               <StarRating field={field} />
                            )}
                        />
                        <DialogFooter className="pt-4">
                            <DialogClose asChild>
                                <Button type="button" variant="outline" disabled={isSubmitting}>{t('testimonials.form.cancel')}</Button>
                            </DialogClose>
                            <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Envoi en cours..." : t('testimonials.form.submit')}</Button>
                        </DialogFooter>
                    </form>
                 </Form>
            </DialogContent>
        </Dialog>
    )
}
