import React from 'react';
import { useRouter } from 'next/router';
import ContactForm from '@/components/Contacts/ContactForm';
import { getPageType, pushEvent } from '@/utils/analytics';

interface BackdropInterface {
  // children: React.ReactNode;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const Backdrop = ({ setIsVisible }: BackdropInterface) => {
  const { pathname } = useRouter();
  const handleClick = (e: React.MouseEvent) => {
    if (e.currentTarget !== e.target) {
      return;
    }
    setIsVisible((prevState) => !prevState);
  };

  // Backdrop монтируется ровно тогда, когда открывается модалка «Замовити
  // дзвінок» — не важно, с какой кнопки (хедер, «Супровід», FAQ) — поэтому
  // это единственная точка, где нужно отследить открытие (R10)
  React.useEffect(() => {
    pushEvent('modal_open', { page_type: getPageType(pathname), page_path: pathname });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={
        'fixed w-full h-screen z-40 top-0 bottom-0 left-0 right-0 bg-color-black flex justify-center items-center bg-opacity-20 p-4'
      }
      onClick={(e) => handleClick(e)}
    >
      <ContactForm
        location="call_modal"
        className={'flex-grow md:flex-grow-0'}
        setIsVisible={setIsVisible}
      />
    </div>
  );
};

export default Backdrop;
