export const TOGGLE_MENU = 'TOGGLE_MENU';
export const RESET = 'RESET';

export function toggleMenu(isOpen) {
  return {
    type: TOGGLE_MENU,
    payload: isOpen,
  };
}

export function reset() {
  return {
    type: RESET
  };
}