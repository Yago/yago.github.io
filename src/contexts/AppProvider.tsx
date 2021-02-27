import React, { useEffect, useState } from 'react';

type AppContextType = {
  menuOpen: boolean;
  setMenuOpen: (newVal: boolean) => void;
  terminalOpen: boolean;
  setTerminalOpen: (newVal: boolean) => void;
};

type Props = {
  children: React.ReactNode;
};

export const AppContext = React.createContext<AppContextType>({});

const AppProvider = ({ children }: Props): JSX.Element => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);

  useEffect(() => {
    if (menuOpen === true) setTerminalOpen(false);
  }, [menuOpen]);

  useEffect(() => {
    if (terminalOpen === true) setMenuOpen(false);
  }, [terminalOpen]);

  return (
    <AppContext.Provider
      value={{ menuOpen, setMenuOpen, terminalOpen, setTerminalOpen }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
