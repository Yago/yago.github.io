import React, { Component } from 'react';
import { Image, Transformation } from 'cloudinary-react';

class Picture extends Component {
  render() { 
    return (
      <Image
        cloudName="dwzk6imzg"
        publicId="appart-large/_DSF7565.jpg"
        width="auto"
        dpr="auto"
        responsive
        crop="scale"
        responsive_placeholder="blank"
      ></Image>
    )
  }
}
 
export default Picture;