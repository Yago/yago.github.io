const path = require('path');
const emoji = require('remark-emoji')
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      emoji
    ],
  }
});
const dirTree = require('directory-tree');

module.exports = withMDX({
  pageExtensions: ['tsx', 'mdx'],
  webpack(config) {
    config.resolve = {
      ...config.resolve,
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    };

    config.module.rules = [
      ...config.module.rules,
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ];

    return config;
  },
  env: {
  },
});
