export const TOGGLE_MENU = 'TOGGLE_MENU';
export const TOGGLE_TERMINAL = 'TOGGLE_TERMINAL';
export const RESET = 'RESET';

export function toggleMenu(isOpen) {
  return {
    type: TOGGLE_MENU,
    payload: isOpen,
  };
}

export function toggleTerminal(isOpen) {
  return {
    type: TOGGLE_TERMINAL,
    payload: isOpen,
  };
}

export function reset() {
  return {
    type: RESET,
  };
}

export default {
  TOGGLE_MENU,
  TOGGLE_TERMINAL,
  RESET,
  toggleMenu,
  toggleTerminal,
  reset,
};
