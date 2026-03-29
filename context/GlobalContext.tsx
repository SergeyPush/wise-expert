import React, { useContext, useState } from 'react';

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

  const showConfirmation = (value?: boolean) => {
    setConfirmationIsVisible(value ?? true);
    setTimeout(() => setConfirmationIsVisible(false), 3000);
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
