import { TOGGLE_MENU, TOGGLE_TERMINAL, RESET } from './navigation-actions';

import initialState from './navigation-initial-state';

export default function atomicReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_MENU:
      return {
        ...state,
        menuOpen: action.payload,
      };

    case TOGGLE_TERMINAL:
      return {
        ...state,
        terminalOpen: action.payload,
      };

    case RESET:
      return initialState;

    default:
      return state;
  }
}
