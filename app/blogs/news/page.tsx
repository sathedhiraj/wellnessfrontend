import Image from "next/image";
import Link from "next/link";
import { blogPosts, type BlogPost } from "@/lib/mock-data/blog-posts";
import type { Metadata } from "next";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export const metadata: Metadata = {
  title: "Skin, Decoded — The Wave of Wellness Blog",
  description:
    "Science-backed skincare education. Learn how ingredients work, build better routines, and understand your skin.",
};

async function fetchBlogs(): Promise<BlogPost[]> {
  try {
    const res = await fetch(`${API_URL}/blog/posts`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch {
    return blogPosts;
  }
}

export default async function BlogListingPage() {
  const posts = await fetchBlogs();

  return (
    <>
      {/* Banner */}
      <section className="bg-forest py-16">
        <div className="container-padded text-center">
          <p className="text-xs font-semibold text-sage-400 uppercase tracking-widest mb-2">The Blog</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-cream-50 mb-3">Skin, Decoded</h1>
          <p className="text-cream-200 text-base max-w-lg mx-auto">
            Science-backed skincare education for people who want to understand their skin — not just cover it up.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="section-py bg-cream-50">
        <div className="container-padded">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: BlogPost) => (
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
                  <div className="absolute top-3 left-3">
                    {post.tags?.[0] && (
                      <span className="badge-bestseller text-[10px]">{post.tags[0]}</span>
                    )}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 text-xs text-warmgray-400 mb-3">
                    <span>📅 {new Date(post.publishDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                    <span>· {post.readTime} min read</span>
                  </div>
                  <h2 className="font-serif font-bold text-forest text-lg leading-snug mb-2 group-hover:text-sage-700 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-warmgray-500 line-clamp-2 mb-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-warmgray-400">By {post.author}</p>
                    <span className="text-xs font-semibold text-sage-600 group-hover:text-forest transition-colors">
                      Read more →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
