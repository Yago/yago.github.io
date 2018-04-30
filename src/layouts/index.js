import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import 'prismjs/themes/prism-solarizedlight.css';

import Header from '../components/header';
import Head from '../components/head';
import Icons from '../components/icons';
import MenuPanel from '../components/MenuPanel';

import { reset } from './../actions/navigation';

class Layout extends Component {
  componentDidUpdate(prevProps, prevState, snapshot) {
    // Location change
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.props.reset();
    }
  }

  render() {
    const menuActive = this.props.navigation.menuActive ? ' right-open' : '';

    return (
      <div className="main-wrapper">
        <Head data={this.props.data} />
        <Icons />

        <div id="content-wrapper" className={`content-wrapper${menuActive}`}>
          <Header siteTitle={this.props.data.site.siteMetadata.title} />
          <MenuPanel />
          {this.props.children()}
        </div>
      </div>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.func,
}

function mapState(state) {
  return {
    navigation: state.navigation,
  };
}

function mapDispatch(dispatch) {
  return bindActionCreators({
    reset,
  }, dispatch);
}

export default connect(mapState, mapDispatch)(Layout);

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
