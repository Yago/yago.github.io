import type { Picture } from 'types';

export type PhotoSwipeContainer = {
  uid: number;
  src: string;
  w: number;
  h: number;
  title: string | undefined;
  meta: Picture;
}[];
