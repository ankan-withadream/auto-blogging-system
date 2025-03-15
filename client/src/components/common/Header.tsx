import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { PenSquare } from "lucide-react";

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <a className="text-2xl font-bold">Blog Platform</a>
        </Link>
        <nav>
          <Link href="/create">
            <Button>
              <PenSquare className="mr-2 h-4 w-4" />
              New Post
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
