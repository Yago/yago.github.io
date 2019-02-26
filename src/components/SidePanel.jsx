import React from 'react';
import { Transition } from 'react-transition-group';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';

import Terminal from './Terminal';

const SideNavigation = ({ status }) => (
  <div className={`side-navigation transition-opacity-${status} py-2`}>
    <nav className="nav flex-column text-sans">
      <Link className="nav-link active" to="/">
        Homepage
      </Link>
      <Link className="nav-link" to="/projects">
        Projects
      </Link>
      <Link className="nav-link" to="/blog">
        Blog
      </Link>
      <Link className="nav-link" to="/pictures">
        Pictures
      </Link>
    </nav>
  </div>
);

SideNavigation.propTypes = { status: PropTypes.string.isRequired };

const SidePanel = ({ navigation: { menuOpen, terminalOpen } }) => (
  <div className="side-panel bg-dark" id="side-panel">
    <Transition in={menuOpen} timeout={{ enter: 0, exit: 400 }}>
      {status => <SideNavigation status={status} />}
    </Transition>
    <Transition in={terminalOpen} timeout={{ enter: 0, exit: 400 }}>
      {status => <Terminal status={status} />}
    </Transition>
  </div>
);

SidePanel.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const mapState = ({ navigation }) => ({ navigation });
const mapDispatch = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

export default connect(
  mapState,
  mapDispatch,
)(SidePanel);
