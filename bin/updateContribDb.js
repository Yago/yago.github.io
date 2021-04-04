#!/usr/bin/env node

const fs = require('fs-extra')
const path = require('path');
const sizeOf = require('image-size');
const axios = require('axios');

(async () => {
  try {
    const contribs = await axios('https://github-contributions.now.sh/api/v1/yago').then(res => res.data);

    fs.writeJson('./src/config/contribs.json', contribs, err => {
      if (err) return console.error(err)
      console.log('Contribs DB updated!')
    })
  } catch (e) {
    console.error("We've thrown! Whoops!", e);
  }
})();


