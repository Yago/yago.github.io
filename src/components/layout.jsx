import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

import Header from './Header';
import SidePanel from './SidePanel';
import Icons from './Icons';

import { actions as navigationActions } from '../store/navigation';

import '../../styleguide/assets/fonts/types.css';
import '../../styleguide/assets/components/base.scss';

const Layout = ({
  children, location, navigation: { menuOpen, terminalOpen }, updateLocation,
}) => {
  // Update Redux navigation.location on location change
  useEffect(() => {
    updateLocation(location);
  }, [location]);

  return (
    <>
      <Helmet>
        <link rel="stylesheet" href="https://use.typekit.net/jjy6lvf.css" />
      </Helmet>

      <Icons />

      <div className={`main-wrapper${menuOpen || terminalOpen ? ' open' : ''}`} id="main-wrapper">
        <SidePanel />

        <div className="main-container">
          <div className="container-fluid">
            <Header />
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.element,
  location: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  updateLocation: PropTypes.func.isRequired,
};
Layout.defaultProps = { children: <span>no content</span> };

const mapState = ({ navigation }) => ({ navigation });
const mapDispatch = (dispatch) => {
  const { updateLocation } = navigationActions;
  return bindActionCreators({ updateLocation }, dispatch);
};

export default connect(
  mapState,
  mapDispatch,
)(Layout);
