import slugify from '@sindresorhus/slugify';
import { createFile, readFile } from '../utils.js';


function _generateOptions() {
  const data = JSON.parse(readFile('./reviews/data.json'));

  function _options(series) {
    return series.map((item) => `<option value="${slugify(item)}">${item}</option>`).join('\n')
  }

  return `<optgroup label="TV Shows">${_options(data.shows, 'tv-shows')}</optgroup>`;
}

function _init() {
  let template = readFile('./reviews/src/template.html');
  const options = _generateOptions();

  template = template.replace('%OPTIONS%', options);

  createFile('./public/reviews/index.html', template);
}

_init();

