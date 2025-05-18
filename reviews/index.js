import slugify from '@sindresorhus/slugify';
import { createFile, readFile } from '../utils.js';


function _generateOptions() {
  const data = JSON.parse(readFile('./reviews/data.json'));

  function _options(series, type) {
    return series.map((item) => `<option data-type="${type}" value="${slugify(item)}">${item}</option>`).join('\n')
  }

  const shows = `<optgroup label="TV Shows">${_options(data.shows, 'tv-shows')}</optgroup>`;
  const manga = `<optgroup label="Manga">${_options(data.manga, 'manga')}</optgroup>`;

  return shows + manga;
}

function _init() {
  let template = readFile('./reviews/src/template.html');
  const options = _generateOptions();

  template = template.replace('%OPTIONS%', options);

  createFile('./public/reviews/index.html', template);
}

_init();
