import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { StaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';

import Header from './header';
import Footer from './Footer';
import Breadcrumb from './Breadcrumb';
import SidePanel from './SidePanel';
import Icons from './Icons';

import { actions as navigationActions } from '../store/navigation';

import '../../styleguide/assets/fonts/types.css';
import '../../styleguide/assets/components/base.scss';

const query = graphql`
  query AllPages2 {
    allSitePage {
      edges {
        node {
          path
        }
      }
    }
  }
`;

const Layout = ({
  children,
  location,
  navigation: {
    menuOpen, terminalOpen, pageTree, pageList,
  },
  updateLocation,
  toggleMenu,
  setPageTree,
  setPageList,
}) => {
  const [enter, setEnter] = useState(false);
  setTimeout(() => setEnter(true), 400);

  // Update Redux navigation.location on location change
  useEffect(() => {
    updateLocation(location);
    toggleMenu(false);
  }, [location]);

  return (
    <StaticQuery
      query={query}
      render={(data) => {
        if (pageTree.length <= 0) {
          setPageTree(data.allSitePage.edges.map(i => i.node.path));
        }

        if (pageList.length <= 0) {
          setPageList(data.allSitePage.edges.map(i => i.node.path));
        }

        return (
          <>
            <Icons />

            <div
              className={`main-wrapper${menuOpen || terminalOpen ? ' open' : ''}`}
              id="main-wrapper"
            >
              <SidePanel />

              <div className="main-container">
                <div className="container-fluid">
                  <Header />
                  {location.pathname !== '/' && <Breadcrumb location={location} />}
                </div>
                <div className={`transition-opacity-${enter ? 'entered' : 'exiting'}`}>
                  {children}
                </div>
                <div className="container-fluid">
                  <Footer />
                </div>
              </div>
            </div>
          </>
        );
      }}
    />
  );
};

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  location: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  updateLocation: PropTypes.func.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  setPageTree: PropTypes.func.isRequired,
  setPageList: PropTypes.func.isRequired,
};
Layout.defaultProps = { children: <span>no content</span> };

const mapState = ({ navigation }) => ({ navigation });
const mapDispatch = (dispatch) => {
  const {
    updateLocation, toggleMenu, setPageTree, setPageList,
  } = navigationActions;
  return bindActionCreators({
    updateLocation, toggleMenu, setPageTree, setPageList,
  }, dispatch);
};

export default connect(
  mapState,
  mapDispatch,
)(Layout);
