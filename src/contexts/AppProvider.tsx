/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { isNil } from 'ramda';

import jsonTree from 'config/tree.json';
import { PhotoSwipeContainer, Tree } from 'types';

const tree: Tree = jsonTree;

export type TreeItem = {
  path: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  meta: any;
};

type AppContextType = {
  closing: boolean;
  menuOpen: boolean;
  setMenuOpen: (newVal: boolean) => void;
  terminalOpen: boolean;
  setTerminalOpen: (newVal: boolean) => void;
  tree: TreeItem[];
  photoswipeOpen: boolean;
  setPhotoswipeOpen: (open: boolean) => void;
  photoswipeIndex: number | null;
  setPhotoswipeIndex: (index: number | null) => void;
  photoswipeContainer: PhotoSwipeContainer | null;
  setPhotoswipeContainer: (container: PhotoSwipeContainer | null) => void;
};

type Props = {
  children: React.ReactNode;
};

export const AppContext = React.createContext<AppContextType>({
  closing: false,
  menuOpen: false,
  setMenuOpen: console.log,
  terminalOpen: false,
  setTerminalOpen: console.log,
  photoswipeOpen: false,
  tree: [],
  setPhotoswipeOpen: console.log,
  photoswipeIndex: null,
  setPhotoswipeIndex: console.log,
  photoswipeContainer: null,
  setPhotoswipeContainer: console.log,
});

const AppProvider = ({ children }: Props): JSX.Element => {
  const { asPath } = useRouter();
  const [closing, setClosing] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [photoswipeOpen, setPhotoswipeOpen] = useState(false);
  const [photoswipeContainer, setPhotoswipeContainer] =
    useState<PhotoSwipeContainer | null>(null);
  const [photoswipeIndex, setPhotoswipeIndex] = useState<number | null>(null);

  useEffect(() => {
    if (menuOpen === true) setTerminalOpen(false);
  }, [menuOpen]);

  useEffect(() => {
    if (terminalOpen === true) setMenuOpen(false);
  }, [terminalOpen]);

  useEffect(() => {
    if (menuOpen || terminalOpen) {
      setClosing(true);
      setTimeout(() => {
        setClosing(false);
      }, 700);
    }

    setMenuOpen(false);
    setTerminalOpen(false);
  }, [asPath]);

  useEffect(() => {
    if (window.innerWidth < 762) {
      if (terminalOpen === true || menuOpen === true) {
        document.body.setAttribute('style', 'overflow: hidden;');
      } else {
        document.body.removeAttribute('style');
      }
    }
  }, [menuOpen, terminalOpen]);

  useEffect(() => {
    if (!photoswipeOpen && !isNil(photoswipeIndex)) setPhotoswipeOpen(true);
  }, [photoswipeIndex]);

  useEffect(() => {
    if (!photoswipeOpen) setPhotoswipeIndex(null);
  }, [photoswipeOpen]);

  return (
    <AppContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        closing,
        menuOpen,
        setMenuOpen,
        terminalOpen,
        setTerminalOpen,
        tree,
        photoswipeOpen,
        setPhotoswipeOpen,
        photoswipeIndex,
        setPhotoswipeIndex,
        photoswipeContainer,
        setPhotoswipeContainer,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
