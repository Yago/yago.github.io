import { useEffect, useReducer } from 'react';
import { theme } from 'tailwindcss/defaultConfig';

type State = {
  width: number | null;
  height: number | null;
  largerThan: Record<'sm' | 'md' | 'lg' | 'xl', boolean>;
  smallerThan: Record<'sm' | 'md' | 'lg' | 'xl', boolean>;
};

type Action =
  | {
      type: 'size';
      width: number;
      height: number;
    }
  | {
      type: 'smaller' | 'larger';
      value: boolean;
      breakpoint: string;
    };

const initialDimensions: State = {
  width: null,
  height: null,
  largerThan: {
    sm: false,
    md: false,
    lg: false,
    xl: false,
  },
  smallerThan: {
    sm: false,
    md: false,
    lg: false,
    xl: false,
  },
};

const dimensionsReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'size':
      return { ...state, width: action.width, height: action.height };

    case 'larger':
      return {
        ...state,
        largerThan: { ...state.largerThan, [action.breakpoint]: action.value },
      };

    case 'smaller':
      return {
        ...state,
        smallerThan: {
          ...state.smallerThan,
          [action.breakpoint]: action.value,
        },
      };

    default:
      return state;
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function useWindowDimensions() {
  const hasWindow = typeof window !== 'undefined';
  const [dimensions, dispatch] = useReducer(
    dimensionsReducer,
    initialDimensions
  );

  const refreshBreakpoints = (breakpoint: string, width: string) => () => {
    const w = +width.replace('px', '');
    dispatch({
      type: 'larger',
      breakpoint,
      value: window.innerWidth > w,
    });
    dispatch({
      type: 'smaller',
      breakpoint,
      value: window.innerWidth <= w,
    });
  };

  const refreshSizes = () => {
    dispatch({
      type: 'size',
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (hasWindow) {
      refreshSizes();
      window.addEventListener('resize', refreshSizes);

      Object.entries(theme.screens).forEach(([breakpoint, width]) => {
        refreshBreakpoints(breakpoint, width as string)();
        window
          .matchMedia(`(max-width: ${width})`)
          .addListener(refreshBreakpoints(breakpoint, width as string));
      });

      return () => {
        window.removeEventListener('resize', refreshSizes);
        Object.entries(theme.screens).forEach(([breakpoint, width]) => {
          window
            .matchMedia(`(max-width: ${width})`)
            .removeListener(refreshBreakpoints(breakpoint, width as string));
        });
      };
    }
  }, [hasWindow]);

  return dimensions;
}
