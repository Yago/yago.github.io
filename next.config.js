const path = require('path');
const emoji = require('remark-emoji');
const withPWA = require('next-pwa');

const dirTree = require('directory-tree');

module.exports = withPWA({
  // future: {
  //   webpack5: true
  // },
  pageExtensions: ['tsx', 'mdx'],
  pwa: {
    dest: 'public'
  },
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [256, 384],
    domains: ['cloudimg.io'],
  },
  webpack(config, options) {
    config.resolve = {
      ...config.resolve,
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      // fallback: {
      //   fs: false,
      //   module: false
      // },
    };

    // MDX support
    config.module.rules.push({
      test: /\.mdx?$/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: require.resolve('@mdx-js/loader'),
          options: {
            remarkPlugins: [
              emoji
            ],
          }
        },
      ],
    });

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  env: {},
});