import {
  TOGGLE_MENU,
  RESET,
} from '../actions/navigation';

const defaultState = {
  menuActive: false,
  consoleActive: false,  
};

export default function atomicReducer(state = defaultState, action) {
  switch (action.type) {
    case TOGGLE_MENU:
      return {
        ...state,
        menuActive: action.payload,
      };

    case RESET:
      return defaultState;
    
    default:
      return state;
  }
}
