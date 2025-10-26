import { getPostData, getAllPostSlugs } from '@/lib/posts';
import { Header } from '@/components/sections/header';
import { Footer } from '@/components/sections/footer';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Metadata } from 'next';
import Image from 'next/image';

type Props = {
    params: {
        slug: string;
    };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const postData = await getPostData(params.slug);
    return {
        title: `${postData.title} | Blog Nubitech`,
        description: postData.description,
    };
}

export async function generateStaticParams() {
    const paths = getAllPostSlugs();
    return paths.map(path => ({
        slug: path.params.slug
    }));
}

export default async function Post({ params }: Props) {
    const postData = await getPostData(params.slug);

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow pt-24 pb-16">
                <article className="container mx-auto px-4 md:px-6 max-w-4xl">
                    <header className="mb-12">
                        <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden mb-8">
                            <Image
                                src={postData.image}
                                alt={postData.title}
                                fill
                                className="object-cover"
                                unoptimized
                                data-ai-hint="post header"
                            />
                        </div>
                        <div className="text-center">
                            <div className="flex flex-wrap justify-center gap-2 mb-4">
                                {postData.tags.map(tag => (
                                    <Badge key={tag} variant="secondary">{tag}</Badge>
                                ))}
                            </div>
                            <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter mb-4">
                                {postData.title}
                            </h1>
                            <div className="flex justify-center items-center gap-4 text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={`https://picsum.photos/seed/${postData.author}/40/40`} alt={postData.author} unoptimized/>
                                        <AvatarFallback>{postData.author.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <span>{postData.author}</span>
                                </div>
                                <span>&bull;</span>
                                <time dateTime={postData.date}>
                                    {format(new Date(postData.date), 'dd MMMM yyyy', { locale: fr })}
                                </time>
                            </div>
                        </div>
                    </header>
                    <div
                        className="prose dark:prose-invert max-w-none mx-auto prose-headings:font-headline prose-headings:tracking-tighter prose-a:text-primary hover:prose-a:text-accent prose-strong:font-bold prose-img:rounded-lg"
                        dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
                    />
                </article>
            </main>
            <Footer />
        </div>
    );
}
