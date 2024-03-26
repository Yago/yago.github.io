import React, { useEffect } from 'react';
import ReactTerminal from 'react-terminal-component';
import {
  CommandMapping,
  defaultCommandMapping,
  EmulatorState,
  EnvironmentVariables,
  EnvVariableUtil,
  FileSystem,
  OutputFactory,
} from 'javascript-terminal';

const Terminal = (): JSX.Element | null => {
  if (typeof window === 'undefined') return null;

  const { tree: treeConfig, path: currentPathRaw } = document.getElementById(
    'terminal-props'
  )?.dataset as { tree: string; path: string };
  const currentPath =
    currentPathRaw !== '/'
      ? currentPathRaw.replace(/\/$/g, '')
      : currentPathRaw;
  const tree = JSON.parse(treeConfig) as string[];

  // react-terminal-component theme options
  const theme = {
    background: 'transparent',
    promptSymbolColor: '#22E922',
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

  const simpleOutput = (str: string) => ({
    function: () => ({ output: OutputFactory.makeTextOutput(str) }),
    optDef: {},
  });

  const defaultState = EmulatorState.createEmpty();
  const defaultEnvVariables = defaultState.getEnvVariables();
  const customState = EmulatorState.create({
    fs: FileSystem.create(
      tree.reduce((acc, val) => ({ ...acc, [val]: {} }), {})
    ),
    environmentVariables: EnvironmentVariables.setEnvironmentVariable(
      defaultEnvVariables,
      'cwd',
      currentPath
    ),
    commandMapping: CommandMapping.create({
      ...defaultCommandMapping,
      ll: defaultCommandMapping.ls,
      ps: simpleOutput('Someone here is a bit too curious!'),
      rm: simpleOutput("Do you want to destroy my life's work? 😥"),
      touch: simpleOutput(
        "File successfully created!\n\nNo, I'm just kidding 😆"
      ),
      vim: simpleOutput('Edition not permitted. You only have read access.'),
      vi: simpleOutput('Edition not permitted. You only have read access.'),
      nano: simpleOutput('Edition not permitted. You only have read access.'),
      git: simpleOutput(
        'Yeah! I love Git too 😍. Feel free to check origin on github.com/yago/yago.github.io'
      ),
      contact: simpleOutput('Feel free to drop me a line on hello@yago.io 😄'),
      secret: simpleOutput(
        'Curious, right? There is undocumented commands 😉.'
      ),
      help: simpleOutput(help),
      open: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function: (state: any, opts: any) => {
          const cwd = state.getEnvVariables('cwd').get('cwd') as string;
          const isGlobal = opts[0].charAt(0) === '/';

          let path =
            opts[0] === '.' ? cwd : `${cwd === '/' ? '' : cwd}/${opts[0]}`;
          // eslint-disable-next-line prefer-destructuring
          if (isGlobal) path = opts[0];

          if (path !== currentPath) {
            window.location.href = path;
            return {
              output: OutputFactory.makeTextOutput(
                'Redirection in progress...'
              ),
            };
          }
          return {
            output: OutputFactory.makeTextOutput(
              "You're already on the right place 😉"
            ),
          };
        },
        optDef: {},
      },
    }),
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    // Add event listener
    const listener = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        document.getElementById('toggle-terminal')?.click();
      }
    };

    document.addEventListener('keydown', listener);

    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, []);

  return (
    <ReactTerminal
      theme={theme}
      promptSymbol="▲&nbsp;"
      emulatorState={customState}
      clickToFocus
    />
  );
};

Terminal.propTypes = {};

export default Terminal;
