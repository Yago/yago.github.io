import {
  TOGGLE_MENU,
} from '../actions/navigation';

const defaultState = {
  menuActive: false,
};

export default function atomicReducer(state = defaultState, action) {
  switch (action.type) {
    case TOGGLE_MENU:
      return {
        ...state,
        menuActive: action.payload,
      };
    
    default:
      return state;
  }
}
