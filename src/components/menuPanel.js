import React, { Component } from 'react';
import Link from 'gatsby-link';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Icon from './icon';

class MenuPanel extends Component {
  render() {
    const menuActive = this.props.navigation.menuActive ? ' open' : '';
    
    return (
      <div id="menu-wrapper" className={`side-wrapper menu-wrapper${menuActive}`}>
        <div id="menu" className="menu">
          <ul>
            <li><Link to="/">Home</Link></li>
            {/* <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/photo">Photos</Link></li> */}
            <li><Link to="/blog">Blog</Link></li>
            <li><Icon slug="bonsai" /></li>
          </ul>
        </div>
      </div>
    )
  }
}


function mapState(state) {
  return {
    navigation: state.navigation,
  };
}

function mapDispatch(dispatch) {
  return bindActionCreators({
    
  }, dispatch);
}

export default connect(mapState, mapDispatch)(MenuPanel);
