const path = require('path');
const emoji = require('remark-emoji');
const withPWA = require('next-pwa');

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      emoji
    ],
  }
});
const dirTree = require('directory-tree');

module.exports = withPWA(withMDX({
  pageExtensions: ['tsx', 'mdx'],
  pwa: {
    dest: 'public'
  },
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
}));
