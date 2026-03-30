import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import Link from 'next/link';
import { Nunito_Sans } from 'next/font/google';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, MARKS, Document } from '@contentful/rich-text-types';
import client from '@/utils/contentful.api';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import Wrapper from '@/components/Wrapper';
import Button from '@/components/Button/Button';
import BlogCard from '@/components/Blog/BlogCard';
import { IBlogPost } from '@/interfaces/blog-post.interface';
import { useGlobalContext } from '@/context/GlobalContext';

const nunito = Nunito_Sans({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600', '700', '800'],
  preload: true,
  variable: '--font-sans',
  display: 'swap',
});

interface AuthorFields {
  name: string;
  role: string;
  bio: string | null;
  photo: { fields?: { file?: { url?: string } } } | null;
}

interface ArticlePageProps {
  post: IBlogPost & { body: Document | null };
  author: AuthorFields | null;
  related: IBlogPost[];
}

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString('uk-UA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

const richTextOptions = {
  renderMark: {
    [MARKS.BOLD]: (text: React.ReactNode) => (
      <strong className="font-bold text-color-black">{text}</strong>
    ),
    [MARKS.ITALIC]: (text: React.ReactNode) => <em>{text}</em>,
    [MARKS.CODE]: (text: React.ReactNode) => (
      <code className="bg-color-light-gray px-1.5 py-0.5 rounded text-sm font-mono text-color-blue">
        {text}
      </code>
    ),
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_node: unknown, children: React.ReactNode) => (
      <p className="text-color-muted text-base leading-relaxed mb-5">
        {children}
      </p>
    ),
    [BLOCKS.HEADING_1]: (_node: unknown, children: React.ReactNode) => (
      <h1 className="text-3xl font-bold text-color-black mt-10 mb-4 leading-tight">
        {children}
      </h1>
    ),
    [BLOCKS.HEADING_2]: (_node: unknown, children: React.ReactNode) => (
      <h2 className="text-2xl font-bold text-color-black mt-10 mb-4 leading-tight">
        {children}
      </h2>
    ),
    [BLOCKS.HEADING_3]: (_node: unknown, children: React.ReactNode) => (
      <h3 className="text-xl font-bold text-color-black mt-8 mb-3 leading-tight">
        {children}
      </h3>
    ),
    [BLOCKS.HEADING_4]: (_node: unknown, children: React.ReactNode) => (
      <h4 className="text-lg font-semibold text-color-black mt-6 mb-2">
        {children}
      </h4>
    ),
    [BLOCKS.UL_LIST]: (_node: unknown, children: React.ReactNode) => (
      <ul className="space-y-2 mb-5 pl-1">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (_node: unknown, children: React.ReactNode) => (
      <ol className="space-y-2 mb-5 pl-1 list-decimal list-inside">
        {children}
      </ol>
    ),
    [BLOCKS.LIST_ITEM]: (_node: unknown, children: React.ReactNode) => (
      <li className="flex gap-3 items-start text-color-muted text-base leading-relaxed">
        <span className="mt-2 w-2 h-2 rounded-full bg-color-blue flex-shrink-0" />
        <span>{children}</span>
      </li>
    ),
    [BLOCKS.QUOTE]: (_node: unknown, children: React.ReactNode) => (
      <blockquote className="border-l-4 border-color-blue pl-5 py-1 my-6 italic text-color-muted bg-color-light-blue rounded-r-xl">
        {children}
      </blockquote>
    ),
    [BLOCKS.HR]: () => <hr className="my-8 border-color-border" />,
    [BLOCKS.EMBEDDED_ASSET]: (node: unknown) => {
      const n = node as {
        data?: {
          target?: {
            fields?: {
              file?: {
                url?: string;
                details?: { image?: { width?: number; height?: number } };
              };
              title?: string;
            };
          };
        };
      };
      const url = n?.data?.target?.fields?.file?.url;
      const title = n?.data?.target?.fields?.title ?? '';
      const w = n?.data?.target?.fields?.file?.details?.image?.width ?? 800;
      const h = n?.data?.target?.fields?.file?.details?.image?.height ?? 450;
      if (!url) return null;
      return (
        <div className="my-8 rounded-2xl overflow-hidden">
          <Image
            src={`https:${url}`}
            alt={title}
            width={w}
            height={h}
            className="w-full object-cover"
          />
        </div>
      );
    },
    [INLINES.HYPERLINK]: (node: unknown, children: React.ReactNode) => {
      const n = node as { data?: { uri?: string } };
      return (
        <a
          href={n?.data?.uri}
          target="_blank"
          rel="noopener noreferrer"
          className="text-color-blue underline hover:text-color-blue-dark transition-colors"
        >
          {children}
        </a>
      );
    },
  },
};

export default function ArticlePage({
  post,
  author,
  related,
}: ArticlePageProps) {
  const { setBookCallIsVisible } = useGlobalContext();
  const coverUrl = post.coverImage?.url ? `https:${post.coverImage.url}` : null;

  return (
    <>
      <NextSeo
        title={`${post.title} — WisExpert`}
        description={post.excerpt}
        canonical={`https://wisexpert.com.ua/blog/${post.slug}`}
        openGraph={{
          title: `${post.title} — WisExpert`,
          description: post.excerpt,
          url: `https://wisexpert.com.ua/blog/${post.slug}`,
          type: 'article',
          locale: 'uk_UA',
          siteName: 'WisExpert',
          ...(coverUrl && {
            images: [
              { url: coverUrl, width: 1200, height: 630, alt: post.title },
            ],
          }),
        }}
      />
      <main className={nunito.className}>
        <Header />

        {/* Hero */}
        <section className="bg-gradient-to-br from-color-black to-color-light-black pt-28 pb-0 md:pt-36 overflow-hidden">
          <Wrapper>
            {/* Tag + meta */}
            <div className="flex flex-wrap items-center gap-4 mb-5">
              {post.category && (
                <span className="text-xs font-semibold text-color-blue bg-color-blue/10 border border-color-blue/20 rounded-full px-3 py-1 uppercase tracking-wider">
                  {post.category}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-color-white mb-5 tracking-tight leading-tight max-w-4xl">
              {post.title}
            </h1>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 text-color-white/50 text-sm mb-0 pb-8">
              <span className="flex items-center gap-1.5">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {formatDate(post.publishedAt)}
              </span>
              {author?.name && (
                <span className="flex items-center gap-1.5">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  {author.name}
                </span>
              )}
            </div>

            {/* Cover image */}
            {coverUrl && (
              <div className="relative w-full h-[360px] md:h-[480px] rounded-t-2xl overflow-hidden mt-2">
                <Image
                  src={coverUrl}
                  alt={post.title}
                  fill
                  className="object-cover object-center"
                  priority
                />
              </div>
            )}
          </Wrapper>
        </section>

        {/* Article body + sidebar */}
        <section className="py-14 md:py-20 bg-color-white">
          <Wrapper>
            <div className="flex flex-col lg:flex-row gap-12 xl:gap-16">
              {/* Article content */}
              <article className="flex-1 min-w-0">
                {post.body ? (
                  documentToReactComponents(post.body, richTextOptions as never)
                ) : (
                  <p className="text-color-muted">{post.excerpt}</p>
                )}

                {/* Share */}
                <div className="mt-10 pt-6 border-t border-color-border flex items-center gap-3">
                  <span className="text-sm text-color-muted font-medium">
                    Поділитись:
                  </span>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=https://wisexpert.com.ua/blog/${post.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-color-light-gray hover:bg-color-blue/10 flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Share on Facebook"
                  >
                    <svg
                      className="w-4 h-4 text-color-muted"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                    </svg>
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=https://wisexpert.com.ua/blog/${post.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-color-light-gray hover:bg-color-blue/10 flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Share on LinkedIn"
                  >
                    <svg
                      className="w-4 h-4 text-color-muted"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </a>
                  <a
                    href={`https://t.me/share/url?url=https://wisexpert.com.ua/blog/${post.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-color-light-gray hover:bg-color-blue/10 flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Share on Telegram"
                  >
                    <svg
                      className="w-4 h-4 text-color-muted"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21.198 2.433a2.242 2.242 0 00-1.022.215l-16.5 7.5a2.25 2.25 0 00.126 4.14l3.857 1.27 1.544 4.63a1.125 1.125 0 001.898.371l2.378-2.378 4.064 2.986a2.25 2.25 0 003.435-1.44l2.7-16.5a2.25 2.25 0 00-2.48-2.794zm-3.068 5.16l-7.956 7.327-2.988-.985 10.944-6.342z" />
                    </svg>
                  </a>
                </div>
              </article>

              {/* Sidebar */}
              <aside className="lg:w-[320px] xl:w-[360px] flex-shrink-0 space-y-6">
                {/* Author card */}
                {author && (
                  <div className="bg-color-light-gray rounded-2xl p-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-color-blue/10 flex items-center justify-center mx-auto mb-4">
                      {author.photo?.fields?.file?.url ? (
                        <Image
                          src={`https:${author.photo.fields.file.url}`}
                          alt={author.name}
                          width={64}
                          height={64}
                          className="rounded-full object-cover w-16 h-16"
                        />
                      ) : (
                        <svg
                          className="w-8 h-8 text-color-blue/40"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      )}
                    </div>
                    <p className="font-bold text-color-black text-base mb-1">
                      {author.name}
                    </p>
                    {author.role && (
                      <p className="text-color-muted text-sm mb-3">
                        {author.role}
                      </p>
                    )}
                    {author.bio && (
                      <p className="text-color-muted text-sm leading-relaxed">
                        {author.bio}
                      </p>
                    )}
                  </div>
                )}

                {/* CTA card */}
                <div className="bg-color-black rounded-2xl p-6">
                  <p className="font-bold text-color-white text-base mb-2">
                    Потрібна допомога з податками?
                  </p>
                  <p className="text-color-white/60 text-sm mb-5 leading-relaxed">
                    Отримайте консультацію від наших спеціалістів
                  </p>
                  <Button
                    format="primary"
                    text="Замовити консультацію"
                    size="wide"
                    className="w-full"
                    onClick={() => setBookCallIsVisible(true)}
                  />
                </div>

                {/* Back to blog */}
                <Link
                  href="/blog"
                  className="flex items-center gap-2 text-color-muted hover:text-color-blue transition-colors text-sm font-medium"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Назад до блогу
                </Link>
              </aside>
            </div>
          </Wrapper>
        </section>

        {/* Related articles */}
        {related.length > 0 && (
          <section className="py-14 md:py-20 bg-color-light-gray">
            <Wrapper>
              <h2 className="text-xl font-bold text-color-black mb-8">
                Читайте також
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((p) => (
                  <BlogCard key={p.id} post={p} />
                ))}
              </div>
            </Wrapper>
          </section>
        )}

        {/* CTA */}
        <section className="bg-gradient-to-br from-color-black to-color-light-black py-20 md:py-24">
          <Wrapper>
            <div className="text-center max-w-2xl mx-auto">
              <span className="block text-xs font-semibold text-color-blue uppercase tracking-wider mb-5">
                Консультація зі спеціалістом
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-color-white mb-4 tracking-tight">
                Потрібна допомога з бухгалтерією?
              </h2>
              <p className="text-color-white/60 text-base md:text-lg mb-8 leading-relaxed">
                Наші спеціалісти допоможуть розібратись у будь-яких питаннях
                обліку, податків та звітності. Залиште заявку — ми
                зв&apos;яжемось з вами.
              </p>
              <Button
                format="primary"
                text="Отримати консультацію"
                size="wide"
                onClick={() => setBookCallIsVisible(true)}
              />
            </div>
          </Wrapper>
        </section>

        <Footer />
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await client.getEntries({
    content_type: 'blog',
    select: ['fields.slug'],
    limit: 200,
  });
  const paths = response.items
    .map((item) => {
      const f = item.fields as Record<string, unknown>;
      return typeof f.slug === 'string' ? { params: { slug: f.slug } } : null;
    })
    .filter(Boolean) as { params: { slug: string } }[];

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;

  const plainText = (value: unknown): string => {
    if (typeof value === 'string') return value;
    if (Array.isArray(value)) return value.map(plainText).join('');
    if (value && typeof value === 'object') {
      const node = value as { value?: string; content?: unknown[] };
      if (node.value) return node.value;
      if (node.content) return plainText(node.content);
    }
    return '';
  };

  const response = await client.getEntries({
    content_type: 'blog',
    'fields.slug': slug,
    include: 2,
    limit: 1,
  });

  if (!response.items.length) return { notFound: true };

  const item = response.items[0];
  const f = item.fields as Record<string, unknown>;

  const imageAsset = f.image as
    | { fields?: { file?: { url?: string }; title?: string } }
    | undefined;
  const coverImageUrl = imageAsset?.fields?.file?.url ?? null;
  const publishedRaw = (f.publishedAt ??
    f.date ??
    item.sys.createdAt) as string;

  // Author
  const authorEntry = f.author as
    | { fields?: Record<string, unknown> }
    | undefined;
  const af = authorEntry?.fields ?? null;
  const authorPhoto = af?.authorImage as
    | { fields?: { file?: { url?: string } } }
    | undefined;
  const author: AuthorFields | null = af
    ? {
        name: plainText(af.authorName),
        role: plainText(af.authorDescription ?? ''),
        bio: null,
        photo: authorPhoto ?? null,
      }
    : null;

  const post = {
    id: item.sys.id,
    title: plainText(f.title),
    slug: plainText(f.slug),
    excerpt: plainText(f.excerpt ?? f.description ?? ''),
    category: plainText(f.tag ?? f.category ?? ''),
    publishedAt: publishedRaw,
    readTime: typeof f.readTime === 'number' ? f.readTime : 5,
    coverImage: coverImageUrl
      ? {
          url: coverImageUrl,
          title: plainText(imageAsset?.fields?.title ?? '') || null,
        }
      : null,
    body: f.text ?? null,
  };

  // Related posts (exclude current)
  const relatedResponse = await client.getEntries({
    content_type: 'blog',
    limit: 3,
    'sys.id[ne]': item.sys.id,
    order: '-sys.createdAt' as never,
  });

  const related: IBlogPost[] = relatedResponse.items.map((r) => {
    const rf = r.fields as Record<string, unknown>;
    const rImg = rf.image as
      | { fields?: { file?: { url?: string }; title?: string } }
      | undefined;
    const rImgUrl = rImg?.fields?.file?.url ?? null;
    return {
      id: r.sys.id,
      title: plainText(rf.title),
      slug: plainText(rf.slug),
      excerpt: plainText(rf.text ?? rf.excerpt ?? rf.description ?? ''),
      category: plainText(rf.tag ?? rf.category ?? ''),
      publishedAt: (rf.publishedAt ?? rf.date ?? r.sys.createdAt) as string,
      readTime: typeof rf.readTime === 'number' ? rf.readTime : 5,
      coverImage: rImgUrl
        ? { url: rImgUrl, title: plainText(rImg?.fields?.title ?? '') || null }
        : null,
    };
  });

  return { props: { post, author, related }, revalidate: 3600 };
};
