import React from 'react';
import Image from 'next/image';
import { getUrl } from '@/utils/image.utils';

interface ImageSlideInterface {
  name: string;
  url: string;
}
const ImageSlide = ({ name, url }: ImageSlideInterface) => {
  return (
    <div>
      <Image
        src={getUrl(url)}
        alt={name}
        width={500}
        height={500}
        className={'h-10 lg:h-14 object-contain'}
      />
    </div>
  );
};

export default ImageSlide;
