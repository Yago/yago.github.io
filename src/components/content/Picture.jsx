import React from 'react';
import PropTypes from 'prop-types';
import { Image, Transformation } from 'cloudinary-react';

const Picture = ({ id, ratio }) => (
  <Image className="picture-cloudinary" cloudName="dwzk6imzg" publicId={id} width="auto" responsive>
    <Transformation
      width="auto"
      aspect_ratio={ratio}
      dpr="auto"
      crop="fill"
      gravity="face:center"
      placeholder="blank"
      responsive
    />
  </Image>
);

Picture.propTypes = {
  id: PropTypes.string,
  ratio: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

Picture.defaultProps = {
  id: 'ACO/Assassin_s_Creed_Origins2018-4-1-10-36-30.png',
  ratio: null,
};

export default Picture;
