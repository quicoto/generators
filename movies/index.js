import { createFile, readFile } from '../utils.js';

function _init() {
  const template = readFile('./movies/src/template.html');
  createFile('./public/movies/index.html', template);
}

_init();
