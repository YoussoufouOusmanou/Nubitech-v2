"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from '@/hooks/use-translation';
import { sendContactMessage } from '@/ai/flows/send-contact-form-flow';

export function Contact() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const formSchema = z.object({
    name: z.string().min(2, { message: t('contact.form.errors.name') }),
    email: z.string().email({ message: t('contact.form.errors.email') }),
    message: z.string().min(10, { message: t('contact.form.errors.message') }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      await sendContactMessage(values);
      toast({
        title: t('contact.toast.title'),
        description: t('contact.toast.description'),
      });
      form.reset();
    } catch (error) {
       toast({
        variant: 'destructive',
        title: t('contact.toast.error.title'),
        description: t('contact.toast.error.description'),
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="max-w-2xl mx-auto shadow-2xl bg-card border-border">
        <CardHeader className="text-center">
            <CardTitle className="font-headline text-3xl md:text-4xl">{t('contact.title')}</CardTitle>
            <CardDescription>{t('contact.description')}</CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('contact.form.name.label')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('contact.form.name.placeholder')} {...field} disabled={isSubmitting} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('contact.form.email.label')}</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder={t('contact.form.email.placeholder')} {...field} disabled={isSubmitting} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('contact.form.message.label')}</FormLabel>
                      <FormControl>
                        <Textarea placeholder={t('contact.form.message.placeholder')} className="min-h-[100px]" {...field} disabled={isSubmitting} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                   {isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}
                </Button>
              </form>
            </Form>
        </CardContent>
    </Card>
  )
}
