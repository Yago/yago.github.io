import React, { Component, Children } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

import Header from './header';
import './layout.css';
import { actions as navigationActions } from '../store/navigation';

const query = graphql`
  query HeadingQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

class Layout extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    toggleMenu: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
  };

  handleToggle() {
    const { toggleMenu, navigation } = this.props;
    toggleMenu(!navigation.menuOpen);
  }

  render() {
    const { children } = this.props;

    return (
      <>
        <StaticQuery
          query={query}
          render={data => <Header siteTitle={data.site.siteMetadata.title} />}
        />
        <button type="button" onClick={this.handleToggle.bind(this)}>
          Click me
        </button>
        <div
          style={{
            margin: '0 auto',
            maxWidth: 960,
            padding: '0px 1.0875rem 1.45rem',
            paddingTop: 0,
          }}
        >
          <main>{children}</main>
        </div>
      </>
    );
  }
}

const mapState = ({ navigation }) => {
  return {
    navigation,
  };
};

const mapDispatch = (dispatch) => {
  const { toggleMenu } = navigationActions;
  return bindActionCreators(
    {
      toggleMenu,
    },
    dispatch,
  );
};

export default connect(
  mapState,
  mapDispatch,
)(Layout);
