import React from 'react';
import { Image, Transformation } from 'cloudinary-react';

const Picture = () => (
  <Image
    cloudName="dwzk6imzg"
    publicId="ACO/Assassin_s_Creed_Origins2018-4-1-10-36-30.png"
    responsive
  >
    <Transformation
      width="auto"
      dpr="auto"
      crop="fill"
      gravity="face:center"
      placeholder="blank"
      responsive
    />
  </Image>
);

export default Picture;
