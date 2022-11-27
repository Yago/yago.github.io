import fs from 'fs';

import glob from 'glob';

import { Tree } from 'types';

const getTree = (): Promise<Tree> =>
  new Promise((res, rej) => {
    glob('./src/pages/**/*', (err, files) => {
      if (err) rej(err);
      const cleanedFiles = files
        .filter(
          file =>
            !file.includes('/api') &&
            !file.includes('.tsx') &&
            !file.includes('.ts')
        )
        .map(file => {
          let meta = null;
          if (!fs.statSync(file).isDirectory()) {
            const content = fs.readFileSync(file, { encoding: 'utf-8' });
            const metaMatch = content.matchAll(
              /export\sconst\smeta\s=\s({[\S\s]+});\s\/\/\send-meta/gm
            );
            const metaStr = metaMatch.next()?.value?.[1];
            if (metaStr !== undefined) {
              meta = {};
              // eslint-disable-next-line no-eval
              eval(`meta = ${metaStr}`);
            }
          }
          return {
            path: file.replace('./src/pages', '').replace('.mdx', ''),
            meta,
          };
        });
      res(cleanedFiles);
    });
  });

export default getTree;
