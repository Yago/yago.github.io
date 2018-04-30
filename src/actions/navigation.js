export const TOGGLE_MENU = 'TOGGLE_MENU';

export function toggleMenu(isOpen) {
  return {
    type: TOGGLE_MENU,
    payload: isOpen,
  };
}