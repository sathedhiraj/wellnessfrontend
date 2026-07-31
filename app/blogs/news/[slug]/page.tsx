import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getBlogPostBySlug, blogPosts } from "@/lib/mock-data/blog-posts";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <section className="section-py bg-cream-50">
        <div className="container-padded max-w-3xl">
          {/* Back */}
          <Link
            href="/blogs/news"
            className="inline-flex items-center gap-2 text-sm text-warmgray-400 hover:text-forest transition-colors mb-6"
          >
            ← Back to Blog
          </Link>

          {/* Hero image */}
          <div className="relative aspect-video rounded-3xl overflow-hidden bg-warmgray-100 mb-8">
            <Image src={post.image} alt={post.title} fill className="object-cover" priority sizes="(max-width: 768px) 100vw, 800px" />
          </div>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-warmgray-400 mb-4">
            <span>📅 {new Date(post.publishDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
            <span>⏱ {post.readTime} min read</span>
            <span>By {post.author}</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {post.tags.map((tag) => (
              <span key={tag} className="px-2.5 py-0.5 bg-sage-100 text-sage-700 text-xs font-medium rounded-full">
                {tag}
              </span>
            ))}
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-forest mb-4 leading-tight">
            {post.title}
          </h1>
          <p className="text-lg text-warmgray-500 mb-8 leading-relaxed">{post.excerpt}</p>

          {/* Content */}
          <div className="mb-8 text-warmgray-700 leading-relaxed space-y-4 text-base">
            {post.content.split("\n\n").map((block, i) => {
              if (block.startsWith("## ")) {
                return (
                  <h2 key={i} className="font-serif text-2xl font-bold text-forest mt-8 mb-3">
                    {block.replace("## ", "")}
                  </h2>
                );
              }
              if (block.startsWith("### ")) {
                return (
                  <h3 key={i} className="font-serif text-xl font-bold text-forest mt-6 mb-2">
                    {block.replace("### ", "")}
                  </h3>
                );
              }
              if (block.trim().startsWith("-")) {
                return (
                  <ul key={i} className="list-disc list-inside space-y-1 ml-2">
                    {block.split("\n").filter((l) => l.trim().startsWith("-")).map((l, j) => (
                      <li key={j} className="text-warmgray-600">{l.replace(/^-\s*/, "").replace(/\*\*(.*?)\*\*/g, "$1")}</li>
                    ))}
                  </ul>
                );
              }
              if (block.trim()) {
                return <p key={i}>{block.trim().replace(/\*\*(.*?)\*\*/g, "$1")}</p>;
              }
              return null;
            })}
          </div>

          {/* Share */}
          <div className="flex items-center gap-3 py-5 border-t border-b border-warmgray-100 mb-10">
            <span className="text-sm font-semibold text-warmgray-500">Share this article:</span>
            <span className="text-sm text-warmgray-400">🔗 Share</span>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-12 bg-warmgray-50">
          <div className="container-padded">
            <h2 className="font-serif text-2xl font-bold text-forest mb-6">Related Articles</h2>
            <div className="grid gap-5 sm:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/blogs/news/${p.slug}`}
                  className="group card-base overflow-hidden block"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image src={p.image} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="33vw" />
                  </div>
                  <div className="p-4">
                    <p className="font-serif font-bold text-forest text-sm leading-snug mb-2 group-hover:text-sage-700 transition-colors line-clamp-2">
                      {p.title}
                    </p>
                    <span className="text-xs font-semibold text-sage-600">Read more →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
