import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { Nunito_Sans } from 'next/font/google';
import client from '@/utils/contentful.api';
import { IBlogPost } from '@/interfaces/blog-post.interface';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import Wrapper from '@/components/Wrapper';
import BlogCard from '@/components/Blog/BlogCard';
import Button from '@/components/Button/Button';
import { useGlobalContext } from '@/context/GlobalContext';

const nunito = Nunito_Sans({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600', '700', '800'],
  preload: true,
  variable: '--font-sans',
  display: 'swap',
});

const PAGE_SIZE = 9;

interface BlogPageProps {
  posts: IBlogPost[];
}

export default function BlogPage({ posts }: BlogPageProps) {
  const [showAll, setShowAll] = useState(false);
  const { setBookCallIsVisible } = useGlobalContext();

  const visiblePosts = showAll ? posts : posts.slice(0, PAGE_SIZE);
  const hasMore = posts.length > PAGE_SIZE;

  return (
    <>
      <NextSeo
        title="Блог — WisExpert | Бухгалтерські поради для бізнесу"
        description="Корисні статті та поради з бухгалтерського обліку, податків та фінансів для вашого бізнесу від WisExpert."
        canonical="https://wisexpert.com.ua/blog"
        openGraph={{
          title: 'Блог — WisExpert | Бухгалтерські поради для бізнесу',
          description:
            'Корисні статті та поради з бухгалтерського обліку, податків та фінансів для вашого бізнесу від WisExpert.',
          url: 'https://wisexpert.com.ua/blog',
          type: 'website',
          locale: 'uk_UA',
          siteName: 'WisExpert',
          images: [
            {
              url: 'https://wisexpert.com.ua/og-image.png',
              width: 1200,
              height: 630,
              alt: 'WisExpert блог',
            },
          ],
        }}
      />
      <main className={nunito.className}>
        <Header />

        {/* Hero */}
        <section className="bg-gradient-to-br from-color-black to-color-light-black pt-36 pb-16 md:pt-44 md:pb-20">
          <Wrapper>
            <span className="block text-xs font-semibold text-color-blue uppercase tracking-wider mb-4">
              Блог
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-color-white mb-4 tracking-tight leading-tight">
              Корисні статті та новини
            </h1>
            <p className="text-color-white/60 text-base md:text-lg max-w-xl leading-relaxed">
              Актуальна інформація про бухгалтерію, податки та бізнес в Україні
            </p>
          </Wrapper>
        </section>

        {/* Posts grid */}
        <section className="pt-14 pb-20 md:pt-16 md:pb-28 bg-color-light-gray">
          <Wrapper>
            {posts.length === 0 ? (
              <p className="text-center text-color-muted text-lg py-20">
                Статті незабаром з&apos;являться тут
              </p>
            ) : (
              <>
                <h2 className="text-lg font-semibold text-color-black mb-8">
                  Останні публікації
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {visiblePosts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>

                {hasMore && !showAll && (
                  <div className="flex justify-center mt-12">
                    <Button
                      format="outline-dark"
                      text="Показати більше"
                      size="wide"
                      onClick={() => setShowAll(true)}
                    />
                  </div>
                )}
              </>
            )}
          </Wrapper>
        </section>

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

export const getStaticProps: GetStaticProps = async () => {
  try {
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
      include: 1,
      order: '-sys.createdAt' as never,
      limit: 100,
    });

    const posts: IBlogPost[] = response.items.map((item) => {
      const f = item.fields as Record<string, unknown>;
      const imageAsset = f.image as
        | { fields?: { file?: { url?: string }; title?: string } }
        | undefined;
      const coverImageUrl = imageAsset?.fields?.file?.url;
      const publishedRaw = (f.publishedAt ??
        f.date ??
        (item.sys.createdAt as string)) as string;

      return {
        id: item.sys.id,
        title: plainText(f.title),
        slug: plainText(f.slug),
        excerpt: plainText(f.text ?? f.excerpt ?? f.description ?? ''),
        category: plainText(f.tag ?? f.category ?? ''),
        publishedAt: publishedRaw,
        readTime: typeof f.readTime === 'number' ? f.readTime : 5,
        coverImage: coverImageUrl
          ? {
              url: coverImageUrl,
              title: plainText(imageAsset?.fields?.title ?? '') || null,
            }
          : null,
      };
    });

    return { props: { posts }, revalidate: 3600 };
  } catch (e) {
    console.error('Failed to fetch blog posts:', e);
    return { props: { posts: [] }, revalidate: 60 };
  }
};
