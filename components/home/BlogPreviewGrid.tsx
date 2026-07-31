import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { getRecentPosts } from "@/lib/mock-data/blog-posts";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  publishDate: string;
  readTime: number;
  tags: string | string[];
}

async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch(`${API_URL}/blog/posts`, {
      // Revalidate every 60 seconds (ISR)
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("API error");
    const data: BlogPost[] = await res.json();
    return data.slice(0, 3);
  } catch {
    // Fallback to mock data if backend is unreachable
    return getRecentPosts(3) as unknown as BlogPost[];
  }
}

export async function BlogPreviewGrid() {
  const posts = await fetchBlogPosts();

  return (
    <section className="section-py bg-cream-50">
      <div className="container-padded">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-semibold text-sage-600 uppercase tracking-widest mb-1">Our Blog</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest">Skin, Decoded</h2>
          </div>
          <Link
            href="/blogs/news"
            className="hidden sm:flex items-center gap-1 text-sm font-semibold text-sage-600 hover:text-forest transition-colors"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blogs/news/${post.slug}`}
              className="group card-base overflow-hidden block"
            >
              <div className="relative aspect-video overflow-hidden bg-warmgray-100">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-warmgray-400 mb-2">
                  <Calendar size={12} />
                  <span>
                    {new Date(post.publishDate).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  <span>·</span>
                  <span>{post.readTime} min read</span>
                </div>
                <h3 className="font-serif font-bold text-forest text-lg leading-snug mb-2 group-hover:text-sage-700 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-warmgray-500 line-clamp-2 mb-3">{post.excerpt}</p>
                <span className="text-xs font-semibold text-sage-600 group-hover:text-forest transition-colors flex items-center gap-1">
                  Read more <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="sm:hidden mt-6 text-center">
          <Link href="/blogs/news" className="btn-outline">
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  );
}
