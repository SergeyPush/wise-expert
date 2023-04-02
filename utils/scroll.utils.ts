export const scrollToId = (id: string) => {
  const getMeTo = document.getElementById(id);
  getMeTo?.scrollIntoView({ behavior: 'smooth' });
};
