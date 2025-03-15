import { useQuery } from "@tanstack/react-query";
import { type Post } from "@shared/schema";
import { Header } from "@/components/common/Header";
import { format } from "date-fns";
import { Helmet } from "react-helmet";

export default function View({ params }: { params: { slug: string } }) {
  const { data: post, isLoading } = useQuery<Post>({
    queryKey: [`/api/posts/${params.slug}`]
  });

  if (isLoading) {
    return (
      <div>
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4" />
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-8" />
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded" />
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!post) {
    return (
      <div>
        <Header />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold">Post not found</h1>
        </main>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>{post.metaTitle || post.title}</title>
        <meta name="description" content={post.metaDescription || post.excerpt} />
        <meta property="og:title" content={post.metaTitle || post.title} />
        <meta property="og:description" content={post.metaDescription || post.excerpt} />
      </Helmet>

      <Header />
      <main className="container mx-auto px-4 py-8">
        <article className="max-w-3xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <time className="text-muted-foreground">
              {format(new Date(post.publishedAt), 'MMMM dd, yyyy')}
            </time>
          </header>
          <div 
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>
    </div>
  );
}
