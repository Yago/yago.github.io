import React from 'react';
import PropTypes from 'prop-types';
import { Image, Transformation } from 'cloudinary-react';

const Picture = ({ id }) => (
  <Image cloudName="dwzk6imzg" publicId={id} width="auto" responsive>
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

Picture.propTypes = { id: PropTypes.string };
Picture.defaultProps = { id: 'ACO/Assassin_s_Creed_Origins2018-4-1-10-36-30.png' };

export default Picture;
