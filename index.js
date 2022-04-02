import slugify from '@sindresorhus/slugify';
import * as fs from 'fs';

// Create the requried folders
fs.mkdir(`./public`, () => {});

function createFile(fileName, data) {
  fs.writeFile(fileName, data, (err) => {
    if (!err) {
      const targetContent = fs.readFileSync(fileName, 'utf-8');

      console.log('File created: ' + fileName);

      fs.writeFileSync(fileName, targetContent.replaceAll('%VERSION%', process.env.npm_package_version));
    }
  });
}

function readFile(path) {
  return fs.readFileSync(path, { encoding:'utf8', flag:'r'});
}

function _generateOptions() {
  const shows = JSON.parse(readFile('data.json')).shows;
  const options = shows.map((show) => `<option value="${slugify(show)}">${show}</option>`).join('\n');

  return options;
}

function _init() {
  let template = readFile('src/template.html');
  const options = _generateOptions();

  template = template.replace('%OPTIONS%', options);

  createFile('./public/index.html', template);
}

_init();

