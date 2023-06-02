import fs from 'fs';
import path from 'path';
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const imageDirectory = path.join(__dirname, '../assets/bg');

fs.readdir(imageDirectory, (error, files) => {
  if (error) {
    console.log('Error reading directory', error);
    return;
  }

  files.forEach((file) => {
    let newName = file.replace(/_[0-9]+\./, '.');
    fs.rename(path.join(imageDirectory, file), path.join(imageDirectory, newName), (error) => {
      if (error) {
        console.log('Error renaming file', error);
        return;
      }

      console.log(`Successfully renamed ${file} to ${newName}`);
    });
  });
});
