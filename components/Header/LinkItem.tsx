import React from 'react';
import { ILink } from '@/interfaces/link.interface';
import { scrollToId } from '@/utils/scroll.utils';

interface LinkItemInterface {
  item: ILink;
  isScrolled?: boolean;
}

const LinkItem = ({ item, isScrolled }: LinkItemInterface) => {
  const handleClick = () => {
    scrollToId(item.id);
  };
  return (
    <li>
      <button
        type="button"
        onClick={handleClick}
        className={`px-3 py-2 rounded-lg hover:bg-color-black/5 cursor-pointer text-sm font-medium whitespace-nowrap transition-all duration-200 ${
          isScrolled
            ? 'text-color-muted hover:text-color-black'
            : 'text-color-white/80 hover:text-color-white hover:bg-color-white/10'
        }`}
      >
        {item.title}
      </button>
    </li>
  );
};

export default LinkItem;
