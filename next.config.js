const path = require('path');
const withPWA = require('next-pwa')({
  dest: 'public'
});

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    providerImportSource: '@mdx-js/react',
  },
})

const dirTree = require('directory-tree');

module.exports = withPWA(withMDX({
  pageExtensions: ['ts', 'tsx', 'mdx'],
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [256, 384],
    domains: ['cloudimg.io'],
  },
  webpack(config, options) {
    config.resolve = {
      ...config.resolve,
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    };

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  env: {},
}));