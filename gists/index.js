import { createFile, readFile } from '../utils.js';

function _init() {
  let template = readFile('./gists/src/template.html');

  createFile('./public/gists/index.html', template);
}

_init();

