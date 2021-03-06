/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-webpack-loader-syntax */
/* eslint-disable react/no-danger */
import React from 'react';

import px500 from '../../assets/icons/500px.svg';
import bootstrap from '../../assets/icons/bootstrap.svg';
import close from '../../assets/icons/close.svg';
import drakar from '../../assets/icons/drakar.svg';
import email from '../../assets/icons/email.svg';
import film from '../../assets/icons/film.svg';
import fullscreen from '../../assets/icons/fullscreen.svg';
import gatsby from '../../assets/icons/gatsby.svg';
import git from '../../assets/icons/git.svg';
import github from '../../assets/icons/github.svg';
import graphql from '../../assets/icons/graphql.svg';
import gulp from '../../assets/icons/gulp.svg';
import igloo from '../../assets/icons/igloo.svg';
import instagram from '../../assets/icons/instagram.svg';
import ionic from '../../assets/icons/ionic.svg';
import left from '../../assets/icons/left.svg';
import linkedin from '../../assets/icons/linkedin.svg';
import medium from '../../assets/icons/medium.svg';
import mongodb from '../../assets/icons/mongodb.svg';
import nodejs from '../../assets/icons/nodejs.svg';
import npm from '../../assets/icons/npm.svg';
import pswpclose from '../../assets/icons/pswpclose.svg';
import pswpfullscreen from '../../assets/icons/pswpfullscreen.svg';
import pswpzoom from '../../assets/icons/pswpzoom.svg';
import react from '../../assets/icons/react.svg';
import reactivex from '../../assets/icons/reactivex.svg';
import redux from '../../assets/icons/redux.svg';
import right from '../../assets/icons/right.svg';
import tipi from '../../assets/icons/tipi.svg';
import twitter from '../../assets/icons/twitter.svg';
import wordpress from '../../assets/icons/wordpress.svg';
import yarn from '../../assets/icons/yarn.svg';
import yeoman from '../../assets/icons/yeoman.svg';
import zoom from '../../assets/icons/zoom.svg';

export type IconNames =
  | 'bootstrap'
  | 'close'
  | 'drakar'
  | 'email'
  | 'film'
  | 'fullscreen'
  | 'gatsby'
  | 'git'
  | 'github'
  | 'graphql'
  | 'gulp'
  | 'igloo'
  | 'instagram'
  | 'ionic'
  | 'left'
  | 'linkedin'
  | 'medium'
  | 'mongodb'
  | 'nodejs'
  | 'npm'
  | 'pswpclose'
  | 'pswpfullscreen'
  | 'pswpzoom'
  | 'px500'
  | 'react'
  | 'reactivex'
  | 'redux'
  | 'right'
  | 'tipi'
  | 'twitter'
  | 'wordpress'
  | 'yarn'
  | 'yeoman'
  | 'zoom';

export const iconList: Record<string, string> = {
  bootstrap,
  close,
  drakar,
  email,
  film,
  fullscreen,
  gatsby,
  git,
  github,
  graphql,
  gulp,
  igloo,
  instagram,
  ionic,
  left,
  linkedin,
  medium,
  mongodb,
  nodejs,
  npm,
  pswpclose,
  pswpfullscreen,
  pswpzoom,
  px500,
  react,
  reactivex,
  redux,
  right,
  tipi,
  twitter,
  wordpress,
  yarn,
  yeoman,
  zoom,
};

const Icons = (): JSX.Element => (
  <div style={{ display: 'none' }}>
    {Object.keys(iconList).map(icon =>
      React.createElement(iconList[icon], {
        key: icon,
        id: icon.replace(/_/gm, '-'),
      })
    )}
  </div>
);

export default Icons;
