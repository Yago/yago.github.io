#!/usr/bin/env node

const fs = require('fs-extra')
const path = require('path');
const ExifReader = require('exifreader');
const sizeOf = require('image-size');

const options = {
  tiff: true,
  xmp: false,
  icc: false,
  iptc: true,
  jfif: false,
  ihdr: false,
  ifd0: true,
  ifd1: false,
  exif: true,
  gps: false,
  interop: false,
  makerNote: false,
  userComment: false,
  skip: [],
  pick: [],
  translateKeys: true,
  translateValues: true,
  reviveValues: true,
  sanitize: true,
  mergeOutput: true,
  silentErrors: true,
  chunked: true,
  firstChunkSize: undefined,
  firstChunkSizeNode: 512,
  firstChunkSizeBrowser: 65536,
  chunkSize: 65536,
  chunkLimit: 5,
};

const baseDir = './public/images/';

let pictureDb = {};

(async () => {
  try {
    const dirs = await fs.promises.readdir(baseDir);

    for (const dir of dirs) {
      const dirPath = path.join(baseDir, dir);
      const dirStat = await fs.promises.stat(dirPath);

      if (dirStat.isDirectory()) {
        const files = await fs.promises.readdir(path.join(baseDir, dir));

        for (const file of files) {
          const filePath = path.join(baseDir, dir, file);
          const stat = await fs.promises.stat(filePath);
          const ext = path.extname(filePath);

          if (stat.isFile() && ['.jpg', '.jpeg', '.png', '.gif'].includes(ext)) {
            const exif = ext !== '.gif' ? ExifReader.load(fs.readFileSync(filePath), {expanded: true}) : {};

            if (exif.MakerNote !== undefined) delete exif.MakerNote;
            if (exif.Thumbnail !== undefined) delete exif.Thumbnail;
            if (exif.mpf !== undefined) delete exif.mpf;
            
            const exifSanitized = Object.keys(exif).reduce((acc, val) => {
              const data = Object.keys(exif[val]).reduce((cacc, cval) => ({ ...cacc, [cval]: exif[val][cval].description }), {});
              return { ...acc, ...data };
            }, {});
            const size = sizeOf(filePath);

            pictureDb[file] = {
              filename: file,
              directory: dir,
              src: '/images/' + path.join(dir, file),
              msrc: '/images/' + path.join(dir, file),
              w: size.width,
              h: size.height,
              type: size.type,
              ...exifSanitized,
            }
          } else if (stat.isDirectory()) {
            console.log("'%s' is a directory.", filePath);
          }
        }
      }
    }

    fs.writeJson('./src/config/pictures.json', pictureDb, err => {
      if (err) return console.error(err)
      console.log('Pictures DB updated!')
    })
  } catch (e) {
    console.error("We've thrown! Whoops!", e);
  }
})();


