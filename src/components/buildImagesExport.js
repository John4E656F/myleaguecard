import fs from 'fs';
import path from 'path';
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const imageDirectory = path.join(__dirname, '../assets/tiles');

fs.readdir(imageDirectory, (error, files) => {
  if (error) {
    console.log('Error reading directory', error);
    return;
  }

  const exports = files.map((file) => {
    let imageName = path.parse(file).name;
    // remove underscore and number from the end
    imageName = imageName.replace(/_[0-9]+$/, '');
    return `export { default as ${imageName} } from '../assets/tiles/${file}';`;
  });

  fs.writeFile('tilesAssets.js', exports.join('\n'), (error) => {
    if (error) {
      console.log('Error writing to file', error);
      return;
    }

    console.log('Successfully wrote to index.js');
  });
});
