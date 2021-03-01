import React, { useEffect, useState } from 'react';

export type TreeItem = {
  path: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  meta: any;
};

type AppContextType = {
  menuOpen: boolean;
  setMenuOpen: (newVal: boolean) => void;
  terminalOpen: boolean;
  setTerminalOpen: (newVal: boolean) => void;
  tree: TreeItem[];
};

type Props = {
  children: React.ReactNode;
};

export const AppContext = React.createContext<AppContextType>({});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const importAll = (r: any) =>
  r
    .keys()
    .map(
      (path: string): TreeItem => ({
        path: path.replace(/^\./g, ''),
        meta: r(path)?.meta,
      })
    )
    .filter(
      (item: TreeItem): boolean => !['/', '/_app', '/index'].includes(item.path)
    )
    .filter((item: TreeItem): boolean => !item.path.includes('.tsx'))
    .map(
      (item: TreeItem): TreeItem => ({
        ...item,
        path: item.path.replace(/\.\w+$/g, ''),
      })
    );

const AppProvider = ({ children }: Props): JSX.Element => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const tree = importAll(require.context('../pages/', true));

  useEffect(() => {
    if (menuOpen === true) setTerminalOpen(false);
  }, [menuOpen]);

  useEffect(() => {
    if (terminalOpen === true) setMenuOpen(false);
  }, [terminalOpen]);

  useEffect(() => {
    if (window.innerWidth < 762) {
      if (terminalOpen === true || menuOpen === true) {
        document.body.setAttribute('style', 'overflow: hidden;');
      } else {
        document.body.removeAttribute('style');
      }
    }
  }, [menuOpen, terminalOpen]);

  return (
    <AppContext.Provider
      value={{
        menuOpen,
        setMenuOpen,
        terminalOpen,
        setTerminalOpen,
        tree,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
