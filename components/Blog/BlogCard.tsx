import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IBlogPost } from '@/interfaces/blog-post.interface';

interface BlogCardProps {
  post: IBlogPost;
  priority?: boolean;
}

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' });
};

const BlogCard = ({ post, priority = false }: BlogCardProps) => {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col bg-color-white rounded-2xl overflow-hidden border border-color-border hover:border-color-blue/30 shadow-soft hover:shadow-elevated transition-all duration-300 cursor-pointer"
    >
      {/* Image */}
      <div className="relative w-full h-[200px] overflow-hidden bg-color-light-gray flex-shrink-0">
        {post.coverImage?.url ? (
          <Image
            src={`https:${post.coverImage.url}`}
            alt={post.coverImage.title || post.title}
            fill
            priority={priority}
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-color-light-blue to-color-blue/10 flex items-center justify-center">
            <span className="text-color-blue/30 text-4xl font-bold">W</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Category */}
        <span className="text-xs font-semibold text-color-blue uppercase tracking-wider">
          {post.category}
        </span>

        {/* Title */}
        <h2 className="text-base font-bold text-color-black leading-snug group-hover:text-color-blue transition-colors duration-200 line-clamp-3">
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="text-sm text-color-muted leading-relaxed line-clamp-3 flex-1">
          {post.excerpt}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-2 text-xs text-color-muted pt-1 border-t border-color-border mt-auto">
          <span>{formatDate(post.publishedAt)}</span>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
