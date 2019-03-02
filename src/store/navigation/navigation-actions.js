export const TOGGLE_MENU = 'TOGGLE_MENU';
export const TOGGLE_TERMINAL = 'TOGGLE_TERMINAL';
export const UPDATE_LOCATION = 'UPDATE_LOCATION';
export const SET_PAGE_TREE = 'SET_PAGE_TREE';
export const SET_PAGE_LIST = 'SET_PAGE_LIST';
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

export function updateLocation(location) {
  return {
    type: UPDATE_LOCATION,
    payload: location,
  };
}

const buildTree = (pages, depth = 1) => pages.reduce((acc, path) => {
  const cleanPath = path.match(/\/$/g) && path !== '/' ? path.slice(0, -1) : path;
  const steps = cleanPath.split('/');
  if (steps.length === depth || path === '/') {
    acc.push({
      path: cleanPath,
      children: buildTree(pages.filter(i => i !== path && i.includes(cleanPath)), depth + 1),
    });
  }
  return acc;
}, []);

export function setPageTree(urls) {
  return {
    type: SET_PAGE_TREE,
    payload: buildTree(urls.filter(i => !i.includes('404'))),
  };
}

export function setPageList(urls) {
  return {
    type: SET_PAGE_LIST,
    payload: urls.filter(i => !i.includes('404')),
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
  UPDATE_LOCATION,
  RESET,
  toggleMenu,
  toggleTerminal,
  updateLocation,
  setPageTree,
  setPageList,
  reset,
};
