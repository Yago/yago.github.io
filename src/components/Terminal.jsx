import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactTerminal from 'react-terminal-component';
import {
  EmulatorState,
  OutputFactory,
  CommandMapping,
  defaultCommandMapping,
} from 'javascript-terminal';

const Terminal = ({ status, navigation }) => {
  const theme = {
    background: 'transparent',
    promptSymbolColor: '#22E922',
    commandColor: '#fcfcfc',
    outputColor: '#fcfcfc',
    errorOutputColor: '#FF1479',
    fontSize: '0.7rem',
    spacing: '7%',
    fontFamily: 'Arial',
    width: '100%',
    height: '100vh',
  };

  const help = `A good reflex to see your options here.
So those are some of the available commands :

  pwd         Print the current path
  ls          List directory contents
  contact     Get my contact information
  secret      Learn a small secret
  `;

  const simpleOutput = str => ({
    function: () => ({ output: OutputFactory.makeTextOutput(str) }),
    optDef: {},
  });

  const customState = EmulatorState.create({
    commandMapping: CommandMapping.create({
      ...defaultCommandMapping,
      pwd: simpleOutput(navigation.location.pathname),
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
    }),
  });

  return (
    <div className={`terminal-wrapper transition-opacity-${status}`}>
      <ReactTerminal theme={theme} promptSymbol="▲&nbsp;" emulatorState={customState} />
    </div>
  );
};

Terminal.propTypes = {
  status: PropTypes.string.isRequired,
  navigation: PropTypes.object.isRequired,
};

const mapState = ({ navigation }) => ({ navigation });
const mapDispatch = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

export default connect(
  mapState,
  mapDispatch,
)(Terminal);
