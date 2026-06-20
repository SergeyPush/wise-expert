export interface IBlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  updatedAt: string;
  readTime: number;
  coverImage: {
    url: string;
    title: string | null;
  } | null;
}
