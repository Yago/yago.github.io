import React, { Component } from 'react';

class GalleryItem extends Component {
  render() { 
    return (<img src={this.props.src} />)
  }
}
 
export default GalleryItem;