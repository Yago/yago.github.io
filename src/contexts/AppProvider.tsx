/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { isNil } from 'ramda';
import { PhotoSwipeContainer } from 'types';

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
  const { asPath } = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [photoswipeOpen, setPhotoswipeOpen] = useState(false);
  const [
    photoswipeContainer,
    setPhotoswipeContainer,
  ] = useState<PhotoSwipeContainer | null>(null);
  const [photoswipeIndex, setPhotoswipeIndex] = useState<
    string | number | null
  >(null);
  const tree = importAll(require.context('../pages/', true));

  useEffect(() => {
    if (menuOpen === true) setTerminalOpen(false);
  }, [menuOpen]);

  useEffect(() => {
    if (terminalOpen === true) setMenuOpen(false);
  }, [terminalOpen]);

  useEffect(() => {
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
      value={{
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
