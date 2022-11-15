import slugify from '@sindresorhus/slugify';
import { createFile, readFile } from '../utils.js';


function _generateOptions() {
  const shows = JSON.parse(readFile('./reviews/data.json')).shows;
  const options = shows.map((show) => `<option value="${slugify(show)}">${show}</option>`).join('\n');

  return options;
}

function _init() {
  let template = readFile('./reviews/src/template.html');
  const options = _generateOptions();

  template = template.replace('%OPTIONS%', options);

  createFile('./public/reviews/index.html', template);
}

_init();

