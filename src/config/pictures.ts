import { Picture } from 'types';

import picturesJson from './pictures.json';

const pictures: Record<string, Picture> = JSON.parse(
  JSON.stringify(picturesJson, null, 2)
);

export default pictures;
