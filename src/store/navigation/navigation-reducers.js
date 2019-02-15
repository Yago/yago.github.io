import {
  TOGGLE_MENU, TOGGLE_TERMINAL, UPDATE_LOCATION, RESET,
} from './navigation-actions';

import initialState from './navigation-initial-state';

export default function atomicReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_MENU:
      return {
        ...state,
        menuOpen: action.payload,
        terminalOpen: false,
      };

    case TOGGLE_TERMINAL:
      return {
        ...state,
        terminalOpen: action.payload,
        menuOpen: false,
      };

    case UPDATE_LOCATION:
      return {
        ...state,
        location: action.payload,
      };

    case RESET:
      return initialState;

    default:
      return state;
  }
}
