type TelegramFormData = Record<string, string>;

export const sendTelegramMessage = async (formData: TelegramFormData) => {
  const res = await fetch('/api/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    throw new Error('Failed to submit form');
  }
};
