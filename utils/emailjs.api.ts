import emailjs from '@emailjs/browser';
import process from 'process';

export const sendData = async (data: any) => {
  return emailjs.send(
    'wegmail',
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? '',
    data,
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
  );
};
