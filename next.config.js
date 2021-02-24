const path = require('path');
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
});
const dirTree = require('directory-tree');

module.exports = withMDX({
  pageExtensions: ['tsx', 'mdx'],
  webpack(config) {
    config.resolve = {
      ...config.resolve,
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    };

    return config;
  },
  env: {
    tree: dirTree('./src/pages/', { exclude: [/_app/, /index/] })
  },
});
