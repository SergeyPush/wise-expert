import React, { useContext, useEffect, useRef, useState } from 'react';

interface GlobalContextInterface {
  confirmationIsVisible: boolean;
  showConfirmation: (value?: boolean) => void;
  bookCallIsVisible: boolean;
  setBookCallIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GlobalContext = React.createContext<GlobalContextInterface>({
  confirmationIsVisible: false,
  showConfirmation: () => {},
  bookCallIsVisible: false,
  setBookCallIsVisible: () => { return; },
});

export const ContextProvider = ({ children }: any) => {
  const [confirmationIsVisible, setConfirmationIsVisible] =
    useState<boolean>(false);
  const [bookCallIsVisible, setBookCallIsVisible] = useState<boolean>(false);

  // id активного таймера автоскрытия — чтобы не копить таймеры при повторных вызовах
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Чистим таймер при размонтировании провайдера
  useEffect(() => {
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  const showConfirmation = (value?: boolean) => {
    // Сбрасываем предыдущий таймер, иначе он скроет новое подтверждение раньше времени
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    setConfirmationIsVisible(value ?? true);
    hideTimerRef.current = setTimeout(() => setConfirmationIsVisible(false), 3000);
  };

  return (
    <GlobalContext.Provider value={{ confirmationIsVisible, showConfirmation, bookCallIsVisible, setBookCallIsVisible }}>
      {children}
    </GlobalContext.Provider>
  );
};

export function useGlobalContext() {
  return useContext(GlobalContext);
}
