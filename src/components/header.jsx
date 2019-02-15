import { Link } from 'gatsby';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import logo from '../../styleguide/assets/svg/yago.svg';
import { actions as navigationActions } from '../store/navigation';

const Header = ({ toggleMenu, toggleTerminal, navigation: { menuOpen, terminalOpen } }) => (
  <header className="header">
    <Link to="/" className="brand">
      <img
        src={logo}
        alt="Yann Gouffon, JavaScript Developer and photographer"
        className="img-fluid"
      />
    </Link>

    <button
      type="button"
      className={`terminal-toggle${terminalOpen ? ' open' : ''}`}
      id="terminal-toggle"
      onClick={() => toggleTerminal(!terminalOpen)}
    >
      <span className="sr-only">Toggle terminal</span>
      <span />
      <span />
    </button>

    <button
      type="button"
      className={`menu-toggle${menuOpen ? ' open' : ''}`}
      id="menu-toggle"
      onClick={() => toggleMenu(!menuOpen)}
    >
      <span className="sr-only">Toggle navigation</span>
      <span />
      <span />
      <span />
    </button>
  </header>
);

Header.propTypes = {
  toggleMenu: PropTypes.func.isRequired,
  toggleTerminal: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
};

const mapState = ({ navigation }) => ({ navigation });

const mapDispatch = (dispatch) => {
  const { toggleMenu, toggleTerminal } = navigationActions;
  return bindActionCreators({ toggleMenu, toggleTerminal }, dispatch);
};

export default connect(
  mapState,
  mapDispatch,
)(Header);
