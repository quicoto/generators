import * as fs from 'fs';

// Create the requried folders
fs.mkdir(`./public`, () => {});
fs.mkdir(`./public/reviews`, () => {});
fs.mkdir(`./public/gists`, () => {});
fs.mkdir(`./public/movies`, () => {});