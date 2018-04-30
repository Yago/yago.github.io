import React, { Component } from 'react';
import Link from 'gatsby-link';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { toggleMenu } from '../actions/navigation';

class Header extends Component {
  toggleMenu() {
    this.props.toggleMenu(!this.props.navigation.menuActive);
  }

  render() {
    const menuActive = this.props.navigation.menuActive ? ' open' : '';

    return (
      <header>
        <a href="/">
          <img className="logo" src="/build/svg/yago-logo.svg" alt="Yago logotype" />
        </a>

        <button
          type="button"
          className="console-toggle"
        >
          <span className="sr-only">Toggle console</span>
          <span></span>
          <span></span>
        </button>    
        
        <button
          type="button"
          className={`menu-toggle${menuActive}`}
          onClick={this.toggleMenu.bind(this)}
        >
          <span className="sr-only">Toggle navigation</span>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </header>
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
    toggleMenu,
  }, dispatch);
}

export default connect(mapState, mapDispatch)(Header);

