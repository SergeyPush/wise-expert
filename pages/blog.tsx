import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import Head from 'next/head';
import { Nunito_Sans } from 'next/font/google';
import client from '@/utils/contentful.api';
import { mapBlogPost } from '@/utils/contentful.utils';
import { IBlogPost } from '@/interfaces/blog-post.interface';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import Wrapper from '@/components/Wrapper';
import BlogCard from '@/components/Blog/BlogCard';
import Button from '@/components/Button/Button';
import ConsultationCta from '@/components/Blog/ConsultationCta';
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
        description="Корисні статті та поради з бухгалтерського обліку, податків та фінансів для вашого бізнесу від WisExpert. Актуальна інформація про зміни в законодавстві."
        canonical="https://wisexpert.com.ua/blog"
        openGraph={{
          title: 'Блог — WisExpert | Бухгалтерські поради для бізнесу',
          description:
            'Корисні статті та поради з бухгалтерського обліку, податків та фінансів для вашого бізнесу від WisExpert. Актуальна інформація про зміни в законодавстві.',
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
        twitter={{
          handle: '@wisexpert',
          site: '@wisexpert',
          cardType: 'summary_large_image',
        }}
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Головна', item: 'https://wisexpert.com.ua' },
                { '@type': 'ListItem', position: 2, name: 'Блог', item: 'https://wisexpert.com.ua/blog' },
              ],
            }),
          }}
        />
      </Head>
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
                  {visiblePosts.map((post, i) => (
                    <BlogCard key={post.id} post={post} priority={i < 3} />
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

        <ConsultationCta onBook={() => setBookCallIsVisible(true)} />

        <Footer />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const response = await client.getEntries({
      content_type: 'blog',
      include: 1,
      order: '-sys.createdAt' as never,
      limit: 100,
    });

    const posts: IBlogPost[] = response.items.map(mapBlogPost);

    return { props: { posts }, revalidate: 3600 };
  } catch (e) {
    console.error('Failed to fetch blog posts:', e);
    return { props: { posts: [] }, revalidate: 60 };
  }
};
