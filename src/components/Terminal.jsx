import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { navigate } from 'gatsby';
import Hotkeys from 'react-hot-keys';
import ReactTerminal from 'react-terminal-component';
import {
  EmulatorState,
  FileSystem,
  OutputFactory,
  CommandMapping,
  defaultCommandMapping,
  EnvironmentVariables,
} from 'javascript-terminal';

import { actions as navigationActions } from '../store/navigation';

const Terminal = ({ status, navigation, toggleTerminal }) => {
  // react-terminal-component theme options
  const theme = {
    background: 'transparent',
    promptSymbolColor: '#F8E71C',
    commandColor: '#fcfcfc',
    outputColor: '#fcfcfc',
    errorOutputColor: '#FF1479',
    fontSize: '16px',
    spacing: '10%',
    fontFamily: 'Arial',
    width: '100%',
    height: '100vh',
  };

  // Help text
  const help = `A good reflex to see your options here.
So those are some of the available commands :

  pwd             Print the current path
  ls              List directory contents
  open [path]     Go to path 
  contact         Get my contact information
  secret          Learn a small secret
  `;

  /**
   * Simple text terminal output
   * @param {String} str
   */
  const simpleOutput = str => ({
    function: () => ({ output: OutputFactory.makeTextOutput(str) }),
    optDef: {},
  });

  /**
   * Get active page on the pageTree (recursive)
   * @param {Object} tree
   * @param {String} current
   */
  const getActive = (tree, current) => tree.reduce((acc, page) => {
    if (page.path === current) return page;
    if (current.includes(page.path)) return getActive(page.children, current);
    return acc;
  }, {});

  /**
   * Get children from current page
   * @param {Object} tree
   * @param {String} current
   * @return {Array} children
   */
  // eslint-disable-next-line
  const getChildren = (tree, current) => {
    const item = getActive(tree, current);
    if (item.children) return item.children;
    return '';
  };

  /**
   * Remove last slash of path if exist
   * @param {String} path
   */
  const cleanPath = path => (path && path.match(/\/$/g) && path !== '/' ? path.slice(0, -1) : path);

  /**
   * Return react-terminal-component properly formatted file system description
   * @param {Array} urls all site's urls
   */
  const getFS = urls => urls.reduce((acc, val) => {
    const key = cleanPath(val);
    acc[key] = {};
    return acc;
  }, {});

  // Init Terminal state
  const defaultState = EmulatorState.createEmpty();
  const defaultEnvVariables = defaultState.getEnvVariables();
  const customState = EmulatorState.create({
    fs: FileSystem.create(getFS(navigation.pageList)),
    environmentVariables: EnvironmentVariables.setEnvironmentVariable(
      defaultEnvVariables,
      'cwd',
      cleanPath(navigation.location.pathname),
    ),
    commandMapping: CommandMapping.create({
      ...defaultCommandMapping,
      ll: defaultCommandMapping.ls,
      ps: simpleOutput('Someone here is a bit too curius !'),
      rm: simpleOutput("Do you want to destroy my life's work ? 😥"),
      touch: simpleOutput("File successfully created !\n\nNo, I'm just kidding 😆"),
      vim: simpleOutput('Edition not permitted. You only have read access.'),
      vi: simpleOutput('Edition not permitted. You only have read access.'),
      nano: simpleOutput('Edition not permitted. You only have read access.'),
      git: simpleOutput(
        'Yeah! I love Git too 😍. Feel free to check origin on github.com/yago/yago.github.io',
      ),
      contact: simpleOutput('Feel free to drop me a line on hello@yago.io 😄'),
      secret: simpleOutput('Curious, right ? There is undocumented commands 😉.'),
      help: simpleOutput(help),
      open: {
        function: (state, opts) => {
          const cwd = state.getEnvVariables('cwd').get('cwd');
          const isGlobal = opts[0].charAt(0) === '/';

          let path = opts[0] === '.' ? cwd : `${cwd === '/' ? '' : cwd}/${opts[0]}`;
          if (isGlobal) path = opts[0];

          const pages = navigation.pageList;
          const isValidPath = pages.findIndex(i => cleanPath(i) === cleanPath(path)) > -1;

          if (isValidPath && path !== navigation.location.pathname) {
            navigate(path);
          }

          if (path === navigation.location.pathname) {
            return { output: OutputFactory.makeTextOutput("You're already on the right place 😉") };
          }

          return {
            output: OutputFactory.makeTextOutput(
              'Ouch, looks like the given path was not ideal...',
            ),
          };
        },
        optDef: {},
      },
    }),
  });

  return (
    <div className={`terminal-wrapper transition-opacity-${status}`}>
      <Hotkeys keyName="escape" onKeyDown={() => toggleTerminal(false)}>
        <ReactTerminal
          theme={theme}
          promptSymbol="▲&nbsp;"
          emulatorState={customState}
          clickToFocus
        />
      </Hotkeys>
    </div>
  );
};

Terminal.propTypes = {
  status: PropTypes.string.isRequired,
  navigation: PropTypes.object.isRequired,
  toggleTerminal: PropTypes.func.isRequired,
};

const mapState = ({ navigation }) => ({ navigation });
const mapDispatch = (dispatch) => {
  const { toggleTerminal } = navigationActions;
  return bindActionCreators(
    {
      toggleTerminal,
    },
    dispatch,
  );
};

export default connect(
  mapState,
  mapDispatch,
)(Terminal);
