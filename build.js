/* eslint-disable import/no-extraneous-dependencies */

const fs = require('fs');
const sass = require('sass');

(() => {
  if (fs.existsSync('public')) {
    fs.rmSync('public', {
      recursive: true,
    });
  }

  fs.mkdirSync('public/stylesheets', {
    recursive: true,
  });

  fs.writeFileSync('public/stylesheets/style.css', sass.renderSync({
    file: 'app/assets/sass/style.scss',
    outputStyle: 'compressed',
  }).css);
})();
