import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import rootReducer from './reducers/';
import rootEpic from './epics/'; // eslint-disable-line import/no-named-as-default

export function configureStore(deps = {}) {
  const epicMiddleware = createEpicMiddleware(rootEpic, {
    dependencies: {
      ...deps,
    },
  });

  // eslint-disable-next-line no-underscore-dangle
  const devtools =
    process.env.NODE_ENV === 'development' && window.devToolsExtension
      ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f;

  return createStore(
    rootReducer,
    devtools,
    applyMiddleware(epicMiddleware),
  );
}

export default configureStore;