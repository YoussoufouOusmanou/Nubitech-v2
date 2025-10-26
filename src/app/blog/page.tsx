
import { getSortedPostsData, PostData } from '@/lib/posts';
import { Header } from '@/components/sections/header';
import { Footer } from '@/components/sections/footer';
import { BlogClientContent } from '@/components/blog-client-content';

// We can't use the metadata export with "use client"
// We will need to manage the title at the layout level if needed.
/*
export const metadata = {
  title: 'Blog | Nubitech',
  description: 'Actualités, articles et analyses de l\'équipe Nubitech.',
};
*/

export default function BlogHome() {
    const allPostsData = getSortedPostsData();

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow pt-24 pb-16">
                <BlogClientContent initialPosts={allPostsData} />
            </main>
            <Footer />
        </div>
    );
}
