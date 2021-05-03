#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const widths = {
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
};

const directories = [
  './public/images/cover',
  // './public/images/projects',
  // './public/images/posts',
];
const sizes = [...widths.deviceSizes, ...widths.imageSizes];

directories.forEach(directory => {
  const images = fs.readdirSync(directory);
  images.forEach(image => {
    const filePath = path.join(directory, image);
    const ext = path.extname(filePath);
    const fileName = image.replace(ext, '')

    sizes.forEach(width => {
      sharp(`${directory}/${image}`)
        .resize(width)
        .jpeg({ quality: 65 })
        .toFile(`./public/images/responsive/${fileName}-${width}.jpg`, (err, info) => {
          console.log('err', err);
          console.log('info', info);
        });

      sharp(`${directory}/${image}`)
        .resize(width)
        .webp({ quality: 65 })
        .toFile(`./public/images/responsive/${fileName}-${width}.webp`, (err, info) => {
          console.log('err', err);
          console.log('info', info);
        });
    });
  })
})