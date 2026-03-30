import { Entry } from 'contentful';
import { IBlogPost } from '@/interfaces/blog-post.interface';

export const plainText = (value: unknown): string => {
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) return value.map(plainText).join('');
  if (value && typeof value === 'object') {
    const node = value as { value?: string; content?: unknown[] };
    if (node.value) return node.value;
    if (node.content) return plainText(node.content);
  }
  return '';
};

export const mapBlogPost = (item: Entry<Record<string, unknown>>): IBlogPost => {
  const f = item.fields as Record<string, unknown>;
  const imageAsset = f.image as
    | { fields?: { file?: { url?: string }; title?: string } }
    | undefined;
  const coverImageUrl = imageAsset?.fields?.file?.url;

  return {
    id: item.sys.id,
    title: plainText(f.title),
    slug: plainText(f.slug),
    excerpt: plainText(f.text ?? f.excerpt ?? f.description ?? ''),
    category: plainText(f.tag ?? f.category ?? ''),
    publishedAt: (f.publishedAt ?? f.date ?? item.sys.createdAt) as string,
    readTime: typeof f.readTime === 'number' ? f.readTime : 5,
    coverImage: coverImageUrl
      ? {
          url: coverImageUrl,
          title: plainText(imageAsset?.fields?.title ?? '') || null,
        }
      : null,
  };
};
