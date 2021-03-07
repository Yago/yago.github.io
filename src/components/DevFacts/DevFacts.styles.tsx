import { css } from '@emotion/react';
import tw from 'twin.macro';

export default css`
  text {
    ${tw`fill-current font-mono`}
    font-size: 0.6em;
  }
  .react-calendar-heatmap .contrib-empty,
  .react-calendar-heatmap .contrib-0 {
    fill: #171b21;
  }
  .react-calendar-heatmap .contrib-1 {
    fill: #143722;
  }
  .react-calendar-heatmap .contrib-2 {
    fill: #275e32;
  }
  .react-calendar-heatmap .contrib-3 {
    fill: #459548;
  }
  .react-calendar-heatmap .contrib-4 {
    fill: #67d15a;
  }
`;
