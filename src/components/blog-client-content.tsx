
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useTranslation } from '@/hooks/use-translation';
import { ArrowRight } from 'lucide-react';
import { PostData } from '@/lib/posts';

type DisplayPost = PostData & {
    isLocal?: boolean;
    description: string;
};

interface BlogClientContentProps {
    initialPosts: PostData[];
}

export function BlogClientContent({ initialPosts }: BlogClientContentProps) {
    const { t } = useTranslation();

    const allPosts: DisplayPost[] = initialPosts.map(p => ({
        ...p,
        tags: Array.isArray(p.tags) ? p.tags : [],
        description: p.description || ''
    }));

    return (
        <div className="container mx-auto px-4 md:px-6">
            <header className="text-center py-12">
                <h1 className="font-headline text-5xl font-bold tracking-tighter">
                    Blog Nubitech
                </h1>
                <p className="max-w-2xl mx-auto mt-4 text-lg text-foreground/70">
                    Actualités, articles et analyses de l'équipe Nubitech.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {allPosts.map(({ slug, date, title, description, tags, author, image }) => (
                    <article key={slug} className="group flex flex-col">
                        <Link href={`/blog/${slug}`} className="block h-full">
                            <div className="bg-card border rounded-lg overflow-hidden h-full flex flex-col shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-1">
                                <div className="relative w-full h-48">
                                    <Image
                                        src={image}
                                        alt={title}
                                        fill
                                        className="object-cover"
                                        unoptimized
                                        data-ai-hint="post cover"
                                    />
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="mb-4">
                                        <p className="text-sm text-muted-foreground mb-2">
                                            Par {author} &bull; {format(new Date(date), 'dd MMMM yyyy', { locale: fr })}
                                        </p>
                                        <h2 className="font-headline text-2xl font-bold text-primary group-hover:text-accent transition-colors">
                                            {title}
                                        </h2>
                                    </div>
                                    <p className="text-foreground/80 flex-grow mb-4">{description}</p>
                                    <div className="flex justify-between items-end mt-auto">
                                        <div className="flex flex-wrap gap-2">
                                            {tags.map((tag) => (
                                                <Badge key={tag} variant="secondary">{tag}</Badge>
                                            ))}
                                        </div>
                                        <div className="flex items-center text-sm font-semibold text-primary group-hover:text-accent transition-colors">
                                            {t('blog.readMore')}
                                            <ArrowRight className="ml-1 h-4 w-4" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </article>
                ))}
            </div>
        </div>
    );
}
