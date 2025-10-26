"use client";

import React, { useState } from 'react';
import Image from 'next/image';
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

const formSchema = z.object({
    title: z.string().min(5, { message: "Le titre doit contenir au moins 5 caractères." }),
    category: z.string().min(2, { message: "La catégorie doit contenir au moins 2 caractères." }),
    excerpt: z.string().min(10, { message: "L'extrait doit contenir au moins 10 caractères." }),
    imageUrl: z.string().min(1, { message: "Veuillez sélectionner une image." }),
});

type FormValues = z.infer<typeof formSchema>;

interface AddArticleDialogProps {
  children: React.ReactNode;
  onAddArticle: (data: FormValues) => void;
}

export function AddArticleDialog({ children, onAddArticle }: AddArticleDialogProps) {
    const { toast } = useToast();
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            category: "",
            excerpt: "",
            imageUrl: ""
        },
    });
    
    const imageUrl = form.watch("imageUrl");

    async function onSubmit(values: FormValues) {
        setIsSubmitting(true);
        // Simulate an API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        onAddArticle(values);
        
        toast({
            title: "Article ajouté !",
            description: "Votre nouvel article a été ajouté à la liste.",
        });
        
        form.reset();
        setIsOpen(false);
        setIsSubmitting(false);
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                form.setValue('imageUrl', reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[480px]">
                <DialogHeader>
                    <DialogTitle className="font-headline text-2xl">Ajouter un nouvel article</DialogTitle>
                    <DialogDescription>Remplissez le formulaire ci-dessous pour publier un nouvel article de blog.</DialogDescription>
                </DialogHeader>
                 <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Titre</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Le futur du cloud..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Catégorie</FormLabel>
                                    <FormControl>
                                        <Input placeholder="DevOps, Sécurité..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="excerpt"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Extrait</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Un court résumé de votre article..." className="min-h-[100px]" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Image de l'article</FormLabel>
                                    <FormControl>
                                        <Input 
                                            type="file" 
                                            accept="image/*"
                                            onChange={handleImageChange}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {imageUrl && (
                            <div className="relative h-40 w-full rounded-md overflow-hidden border">
                                <Image src={imageUrl} alt="Aperçu de l'image" layout="fill" objectFit="cover" />
                            </div>
                        )}

                        <DialogFooter className="pt-4">
                            <DialogClose asChild>
                                <Button type="button" variant="outline" disabled={isSubmitting}>Annuler</Button>
                            </DialogClose>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Publication..." : "Publier l'article"}
                            </Button>
                        </DialogFooter>
                    </form>
                 </Form>
            </DialogContent>
        </Dialog>
    )
}
