import React, { Component } from 'react';
import axios from 'axios';
 
class Icons extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      icons: "",
    }
  }

  componentWillMount() {
    axios.get('/build/icons/icons.svg')
    .then((res) => {
      this.setState({ icons: res.data });
    })
  }

  render() {   
    return (
      <div dangerouslySetInnerHTML={{ __html: this.state.icons }}></div>
    )
  }
}

export default Icons;
