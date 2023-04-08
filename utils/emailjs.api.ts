import emailjs from '@emailjs/browser';

export const sendData = async (data: any) => {
  return emailjs.send(
    'wegmail',
    'template_sbRg0J0U',
    data,
    'user_5p0b4IT3bwkF3nOhn3S5L'
  );
};
