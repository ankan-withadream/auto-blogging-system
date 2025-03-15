import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { type Post } from "@shared/schema";
import { format } from "date-fns";

interface BlogCardProps {
  post: Post;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Card className="transition-shadow hover:shadow-lg">
      <Link href={`/post/${post.slug}`}>
        <a className="block">
          <CardHeader>
            <CardTitle className="text-xl font-bold hover:text-blue-600">
              {post.title}
            </CardTitle>
            <CardDescription>
              Published on {format(new Date(post.publishedAt), 'MMM dd, yyyy')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground line-clamp-3">
              {post.excerpt}
            </p>
          </CardContent>
        </a>
      </Link>
    </Card>
  );
}
