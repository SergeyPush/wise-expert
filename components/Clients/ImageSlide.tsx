import React from 'react';
import Image from 'next/image';
import { getUrl } from '@/utils/image.utils';

interface ImageSlideInterface {
  name: string;
  url: string;
}
const ImageSlide = ({ name, url }: ImageSlideInterface) => {
  return (
    <div className="flex items-center justify-center px-4 py-2 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
      <Image
        src={getUrl(url)}
        alt={name}
        width={500}
        height={500}
        className={'h-10 lg:h-12 object-contain'}
      />
    </div>
  );
};

export default ImageSlide;
