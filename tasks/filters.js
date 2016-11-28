import swig from 'swig';
import marked from 'marked';

export const markdown = swig.setFilter('markdown', string => {
  return marked(string);
});

export const dump = swig.setFilter('dump', input => {
  return JSON.stringify(input, null, 2);
});

export const log = swig.setFilter('log', input => {
  console.log(input);
});

export const slug = swig.setFilter('slug', path => {
  const splited = path.split('/');
  return splited[splited.length-2];
});

export const get = swig.setFilter('get', (array, value) => {
  let obj = {};
  if (array) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].id == value) {
        obj = array[i];
      }
    }
  }
  return obj;
});
