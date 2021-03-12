#!/usr/bin/env node

const { configureSitemap } = require('@sergeymyssak/nextjs-sitemap');

const Sitemap = configureSitemap({
  baseUrl: 'https://yago.io',
  exclude: [],
  excludeIndex: true,
  isTrailingSlashRequired: true,
  targetDirectory: __dirname + '/../public',
  pagesDirectory: __dirname + '/../src/pages',
});

Sitemap.generateSitemap();

console.log('Sitemap update!');