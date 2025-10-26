"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedSection } from '@/components/animated-section';
import { useTranslation } from '@/hooks/use-translation';
import { Button } from '@/components/ui/button';
import { ArrowRight, PlusCircle } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { AddArticleDialog } from '@/components/add-article-dialog';

interface BlogPost {
    title: string;
    category: string;
    excerpt: string;
    imageUrl: string;
    author: {
        name: string;
        avatarUrl: string;
    };
}

export function Blog() {
    const { t } = useTranslation();
    const initialBlogPosts = t('blog.posts', { returnObjects: true }) as BlogPost[];
    
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>(initialBlogPosts || []);

    if (!blogPosts) return null;

    const handleAddArticle = (newArticle: Omit<BlogPost, 'author'>) => {
        const newPost: BlogPost = {
            ...newArticle,
            author: { // For demo purposes, we'll use a default author
                name: "New Author",
                avatarUrl: `https://picsum.photos/seed/${Math.random()}/40/40`
            }
        };
        setBlogPosts(prevPosts => [newPost, ...prevPosts]);
    };

    return (
        <section id="blog" className="py-20 md:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <AnimatedSection className="text-center mb-12">
                    <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tighter">
                        {t('blog.title')}
                    </h2>
                    <p className="max-w-2xl mx-auto mt-4 text-lg text-foreground/70">
                        {t('blog.description')}
                    </p>
                </AnimatedSection>

                 <AnimatedSection className="text-center mb-16">
                    <AddArticleDialog onAddArticle={handleAddArticle}>
                        <Button size="lg" className="font-bold">
                            <PlusCircle className="mr-2 h-5 w-5" />
                            Ajouter un article
                        </Button>
                    </AddArticleDialog>
                </AnimatedSection>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post, index) => (
                        <AnimatedSection key={index} style={{ transitionDelay: `${index * 100}ms` }}>
                            <Card className="h-full flex flex-col overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
                                <div className="relative h-56 w-full">
                                    <Image
                                        src={post.imageUrl}
                                        alt={post.title}
                                        fill
                                        className="object-cover"
                                        data-ai-hint="blog post image"
                                        unoptimized // Allow external URLs like picsum
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                    <Badge variant="secondary" className="absolute top-4 left-4">{post.category}</Badge>
                                </div>
                                <CardContent className="p-6 flex flex-col flex-grow">
                                    <h3 className="font-headline text-xl font-bold mb-3">{post.title}</h3>
                                    <p className="text-foreground/80 text-sm mb-6 flex-grow">{post.excerpt}</p>
                                    <div className="flex items-center gap-4 mt-auto">
                                        <Avatar>
                                            <AvatarImage src={post.author.avatarUrl} alt={post.author.name} data-ai-hint="person portrait"/>
                                            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-bold text-sm">{post.author.name}</p>
                                        </div>
                                         <Button variant="link" className="p-0 ml-auto text-primary hover:text-accent group-hover:translate-x-1 transition-transform">
                                            {t('blog.readMore')} <ArrowRight className="ml-2 h-4 w-4"/>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
}
