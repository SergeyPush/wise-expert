import React, { useContext, useState } from 'react';

interface GlobalContextInterface {
  confirmationIsVisible: boolean;
  showConfirmation: (value?: boolean) => void;
}

export const GlobalContext = React.createContext<GlobalContextInterface>({
  confirmationIsVisible: false,
  showConfirmation: () => {},
});

export const ContextProvider = ({ children }: any) => {
  const [confirmationIsVisible, setConfirmationIsVisible] =
    useState<boolean>(false);

  const showConfirmation = (value?: boolean) => {
    setConfirmationIsVisible(value ?? true);
    setTimeout(() => setConfirmationIsVisible(false), 3000);
  };

  return (
    <GlobalContext.Provider value={{ confirmationIsVisible, showConfirmation }}>
      {children}
    </GlobalContext.Provider>
  );
};

export function useGlobalContext() {
  return useContext(GlobalContext);
}
