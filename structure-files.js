const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');

const folderPath = path.join(__dirname, 'Subs'); // Replace with the path to your folder
const destinationFolder = __dirname; // Replace with the path to the destination folder

function getFoldersInDirectory(directoryPath) {
    const items = fs.readdirSync(directoryPath);
  
    const folders = items.filter((item) => {
      const itemPath = path.join(directoryPath, item);
      return fs.statSync(itemPath).isDirectory();
    });
  
    return folders;
}

function copyFirstFileFromFolders(sourcePath, destinationPath) {
    const folders = getFoldersInDirectory(sourcePath);
  
    for (const folder of folders) {
      const folderPath = path.join(sourcePath, folder);
      const files = fs.readdirSync(folderPath);
  
      if (files.length > 0) {
        const firstFile = files[0];
        const sourceFile = path.join(folderPath, firstFile);
        const newFileName = `${folder}.${firstFile?.split('.').at(-1)}`;
        const destinationFile = path.join(destinationPath, newFileName);
  
        fse.copySync(sourceFile, destinationFile);
      }
    }
}

copyFirstFileFromFolders(folderPath, destinationFolder);
