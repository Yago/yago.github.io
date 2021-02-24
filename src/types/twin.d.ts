import { css as cssProperty } from '@emotion/react';
import styledComponent from '@emotion/styled';

import 'twin.macro';

declare module 'twin.macro' {
  const css: typeof cssProperty;
  const styled: typeof styledComponent;
}
