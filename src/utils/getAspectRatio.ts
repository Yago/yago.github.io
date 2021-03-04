import { css } from '@emotion/react';
import { isNil, range } from 'ramda';
import tw, { TwStyle } from 'twin.macro';

/* Inspired by https://gist.github.com/jonathantneal/d3a259ebeb46de7ab0de */
const getNearestRatio = (
  left: number,
  right: number
): { ratio: string; isExact: boolean } => {
  const initialRatio = (left * 100) / (right * 100);
  const ratiosCheck: Record<string, boolean> = {};
  const ratios: Record<string, number> = {};

  // 17 because 16 ;)
  range(1, 17).forEach(ratioL => {
    range(1, 17).forEach(ratioR => {
      const ratioX = (ratioL * 100) / (ratioR * 100);

      if (isNil(ratiosCheck[ratioX])) {
        ratiosCheck[ratioX] = true;
        ratios[`${ratioL}:${ratioR}`] = ratioX;
      }
    });
  });

  const ratio = Object.keys(ratios).reduce((acc, val) => {
    if (
      isNil(ratios[acc]) ||
      Math.abs(initialRatio - ratios[val]) <
        Math.abs(initialRatio - ratios[acc])
    ) {
      return val;
    }
    return acc;
  }, '');

  return {
    ratio,
    isExact: ratios[ratio] === initialRatio,
  };
};

const aspectRatios: Record<string, TwStyle> = {
  '1:1': tw`aspect-w-1 aspect-h-1`,
  '1:2': tw`aspect-w-1 aspect-h-2`,
  '1:3': tw`aspect-w-1 aspect-h-3`,
  '1:4': tw`aspect-w-1 aspect-h-4`,
  '1:5': tw`aspect-w-1 aspect-h-5`,
  '1:6': tw`aspect-w-1 aspect-h-6`,
  '1:7': tw`aspect-w-1 aspect-h-7`,
  '1:8': tw`aspect-w-1 aspect-h-8`,
  '1:9': tw`aspect-w-1 aspect-h-9`,
  '1:10': tw`aspect-w-1 aspect-h-10`,
  '1:11': tw`aspect-w-1 aspect-h-11`,
  '1:12': tw`aspect-w-1 aspect-h-12`,
  '1:13': tw`aspect-w-1 aspect-h-13`,
  '1:14': tw`aspect-w-1 aspect-h-14`,
  '1:15': tw`aspect-w-1 aspect-h-15`,
  '1:16': tw`aspect-w-1 aspect-h-16`,
  '2:1': tw`aspect-w-2 aspect-h-1`,
  '2:3': tw`aspect-w-2 aspect-h-3`,
  '2:5': tw`aspect-w-2 aspect-h-5`,
  '2:7': tw`aspect-w-2 aspect-h-7`,
  '2:9': tw`aspect-w-2 aspect-h-9`,
  '2:11': tw`aspect-w-2 aspect-h-11`,
  '2:13': tw`aspect-w-2 aspect-h-13`,
  '2:15': tw`aspect-w-2 aspect-h-15`,
  '3:1': tw`aspect-w-3 aspect-h-1`,
  '3:2': tw`aspect-w-3 aspect-h-2`,
  '3:4': tw`aspect-w-3 aspect-h-4`,
  '3:5': tw`aspect-w-3 aspect-h-5`,
  '3:7': tw`aspect-w-3 aspect-h-7`,
  '3:8': tw`aspect-w-3 aspect-h-8`,
  '3:10': tw`aspect-w-3 aspect-h-10`,
  '3:11': tw`aspect-w-3 aspect-h-11`,
  '3:13': tw`aspect-w-3 aspect-h-13`,
  '3:14': tw`aspect-w-3 aspect-h-14`,
  '3:16': tw`aspect-w-3 aspect-h-16`,
  '4:1': tw`aspect-w-4 aspect-h-1`,
  '4:3': tw`aspect-w-4 aspect-h-3`,
  '4:5': tw`aspect-w-4 aspect-h-5`,
  '4:7': tw`aspect-w-4 aspect-h-7`,
  '4:9': tw`aspect-w-4 aspect-h-9`,
  '4:11': tw`aspect-w-4 aspect-h-11`,
  '4:13': tw`aspect-w-4 aspect-h-13`,
  '4:15': tw`aspect-w-4 aspect-h-15`,
  '5:1': tw`aspect-w-5 aspect-h-1`,
  '5:2': tw`aspect-w-5 aspect-h-2`,
  '5:3': tw`aspect-w-5 aspect-h-3`,
  '5:4': tw`aspect-w-5 aspect-h-4`,
  '5:6': tw`aspect-w-5 aspect-h-6`,
  '5:7': tw`aspect-w-5 aspect-h-7`,
  '5:8': tw`aspect-w-5 aspect-h-8`,
  '5:9': tw`aspect-w-5 aspect-h-9`,
  '5:11': tw`aspect-w-5 aspect-h-11`,
  '5:12': tw`aspect-w-5 aspect-h-12`,
  '5:13': tw`aspect-w-5 aspect-h-13`,
  '5:14': tw`aspect-w-5 aspect-h-14`,
  '5:16': tw`aspect-w-5 aspect-h-16`,
  '6:1': tw`aspect-w-6 aspect-h-1`,
  '6:5': tw`aspect-w-6 aspect-h-5`,
  '6:7': tw`aspect-w-6 aspect-h-7`,
  '6:11': tw`aspect-w-6 aspect-h-11`,
  '6:13': tw`aspect-w-6 aspect-h-13`,
  '7:1': tw`aspect-w-7 aspect-h-1`,
  '7:2': tw`aspect-w-7 aspect-h-2`,
  '7:3': tw`aspect-w-7 aspect-h-3`,
  '7:4': tw`aspect-w-7 aspect-h-4`,
  '7:5': tw`aspect-w-7 aspect-h-5`,
  '7:6': tw`aspect-w-7 aspect-h-6`,
  '7:8': tw`aspect-w-7 aspect-h-8`,
  '7:9': tw`aspect-w-7 aspect-h-9`,
  '7:10': tw`aspect-w-7 aspect-h-10`,
  '7:11': tw`aspect-w-7 aspect-h-11`,
  '7:12': tw`aspect-w-7 aspect-h-12`,
  '7:13': tw`aspect-w-7 aspect-h-13`,
  '7:15': tw`aspect-w-7 aspect-h-15`,
  '7:16': tw`aspect-w-7 aspect-h-16`,
  '8:1': tw`aspect-w-8 aspect-h-1`,
  '8:3': tw`aspect-w-8 aspect-h-3`,
  '8:5': tw`aspect-w-8 aspect-h-5`,
  '8:7': tw`aspect-w-8 aspect-h-7`,
  '8:9': tw`aspect-w-8 aspect-h-9`,
  '8:11': tw`aspect-w-8 aspect-h-11`,
  '8:13': tw`aspect-w-8 aspect-h-13`,
  '8:15': tw`aspect-w-8 aspect-h-15`,
  '9:1': tw`aspect-w-9 aspect-h-1`,
  '9:2': tw`aspect-w-9 aspect-h-2`,
  '9:4': tw`aspect-w-9 aspect-h-4`,
  '9:5': tw`aspect-w-9 aspect-h-5`,
  '9:7': tw`aspect-w-9 aspect-h-7`,
  '9:8': tw`aspect-w-9 aspect-h-8`,
  '9:10': tw`aspect-w-9 aspect-h-10`,
  '9:11': tw`aspect-w-9 aspect-h-11`,
  '9:13': tw`aspect-w-9 aspect-h-13`,
  '9:14': tw`aspect-w-9 aspect-h-14`,
  '9:16': tw`aspect-w-9 aspect-h-16`,
  '10:1': tw`aspect-w-10 aspect-h-1`,
  '10:3': tw`aspect-w-10 aspect-h-3`,
  '10:7': tw`aspect-w-10 aspect-h-7`,
  '10:9': tw`aspect-w-10 aspect-h-9`,
  '10:11': tw`aspect-w-10 aspect-h-11`,
  '10:13': tw`aspect-w-10 aspect-h-13`,
  '11:1': tw`aspect-w-11 aspect-h-1`,
  '11:2': tw`aspect-w-11 aspect-h-2`,
  '11:3': tw`aspect-w-11 aspect-h-3`,
  '11:4': tw`aspect-w-11 aspect-h-4`,
  '11:5': tw`aspect-w-11 aspect-h-5`,
  '11:6': tw`aspect-w-11 aspect-h-6`,
  '11:7': tw`aspect-w-11 aspect-h-7`,
  '11:8': tw`aspect-w-11 aspect-h-8`,
  '11:9': tw`aspect-w-11 aspect-h-9`,
  '11:10': tw`aspect-w-11 aspect-h-10`,
  '11:12': tw`aspect-w-11 aspect-h-12`,
  '11:13': tw`aspect-w-11 aspect-h-13`,
  '11:14': tw`aspect-w-11 aspect-h-14`,
  '11:15': tw`aspect-w-11 aspect-h-15`,
  '11:16': tw`aspect-w-11 aspect-h-16`,
  '12:1': tw`aspect-w-12 aspect-h-1`,
  '12:5': tw`aspect-w-12 aspect-h-5`,
  '12:7': tw`aspect-w-12 aspect-h-7`,
  '12:11': tw`aspect-w-12 aspect-h-11`,
  '12:13': tw`aspect-w-12 aspect-h-13`,
  '13:1': tw`aspect-w-13 aspect-h-1`,
  '13:2': tw`aspect-w-13 aspect-h-2`,
  '13:3': tw`aspect-w-13 aspect-h-3`,
  '13:4': tw`aspect-w-13 aspect-h-4`,
  '13:5': tw`aspect-w-13 aspect-h-5`,
  '13:6': tw`aspect-w-13 aspect-h-6`,
  '13:7': tw`aspect-w-13 aspect-h-7`,
  '13:8': tw`aspect-w-13 aspect-h-8`,
  '13:9': tw`aspect-w-13 aspect-h-9`,
  '13:10': tw`aspect-w-13 aspect-h-10`,
  '13:11': tw`aspect-w-13 aspect-h-11`,
  '13:12': tw`aspect-w-13 aspect-h-12`,
  '13:14': tw`aspect-w-13 aspect-h-14`,
  '13:15': tw`aspect-w-13 aspect-h-15`,
  '13:16': tw`aspect-w-13 aspect-h-16`,
  '14:1': tw`aspect-w-14 aspect-h-1`,
  '14:3': tw`aspect-w-14 aspect-h-3`,
  '14:5': tw`aspect-w-14 aspect-h-5`,
  '14:9': tw`aspect-w-14 aspect-h-9`,
  '14:11': tw`aspect-w-14 aspect-h-11`,
  '14:13': tw`aspect-w-14 aspect-h-13`,
  '14:15': tw`aspect-w-14 aspect-h-15`,
  '15:1': tw`aspect-w-15 aspect-h-1`,
  '15:2': tw`aspect-w-15 aspect-h-2`,
  '15:4': tw`aspect-w-15 aspect-h-4`,
  '15:7': tw`aspect-w-15 aspect-h-7`,
  '15:8': tw`aspect-w-15 aspect-h-8`,
  '15:11': tw`aspect-w-15 aspect-h-11`,
  '15:13': tw`aspect-w-15 aspect-h-13`,
  '15:14': tw`aspect-w-15 aspect-h-14`,
  '15:16': tw`aspect-w-15 aspect-h-16`,
  '16:1': tw`aspect-w-16 aspect-h-1`,
  '16:3': tw`aspect-w-16 aspect-h-3`,
  '16:5': tw`aspect-w-16 aspect-h-5`,
  '16:7': tw`aspect-w-16 aspect-h-7`,
  '16:9': tw`aspect-w-16 aspect-h-9`,
  '16:11': tw`aspect-w-16 aspect-h-11`,
  '16:13': tw`aspect-w-16 aspect-h-13`,
  '16:15': tw`aspect-w-16 aspect-h-15`,
};

const getAspectRatio = (
  left: number,
  right: number
): { styles: TwStyle; isExact: boolean } => {
  const { ratio, isExact } = getNearestRatio(left, right);

  return {
    styles: aspectRatios[ratio] ?? tw`aspect-w-1 aspect-h-1`,
    isExact,
  };
};

export default getAspectRatio;
