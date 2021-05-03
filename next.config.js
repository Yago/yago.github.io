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
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
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
