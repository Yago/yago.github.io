#!/usr/bin/env node

const fs = require('fs-extra');
const { glob } = require('glob');

const updateTree = async () => {
  const files = await glob('./src/pages/**/*');
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
        path: file.replace('src/pages', '').replace('.mdx', ''),
        meta,
      };
    });
  fs.writeJson('./src/config/tree.json', cleanedFiles, err => {
    if (err) return console.error(err)
    console.log('Tree updated!')
  })
};

updateTree();
