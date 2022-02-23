import slugify from '@sindresorhus/slugify';
import * as fs from 'fs';


// Create the requried folders
fs.mkdir(`./public`, () => {});

function createFile(fileName, data) {
  fs.writeFile(fileName, data, (err) => {
    if (!err) {
      console.log('File created: ' + fileName);
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

