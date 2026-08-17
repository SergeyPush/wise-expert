import dynamic from 'next/dynamic';

/**
 * Секции ниже первого экрана — одной точкой, чтобы настройки dynamic() не
 * копировались по страницам. Импортируются как обычные компоненты:
 * import { Calculator, Faq } from '@/components/Landing/sections';
 */
export const Calculator = dynamic(
  () => import('@/components/Calculator/Calculator'),
  { ssr: true },
);

export const Faq = dynamic(() => import('@/components/Faq/Faq'), { ssr: true });

export const Contacts = dynamic(
  () => import('@/components/Contacts/Contacts'),
  { ssr: true },
);

export const Map = dynamic(() => import('@/components/Map/Map'), { ssr: true });

export const Questions = dynamic(
  () => import('@/components/Questions/Questions'),
  { ssr: true },
);
