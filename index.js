const PkgReader = require('reiko-parser');
const fs = require('fs');

const handle = () => {
  const filePath = process.argv[2];
  const ext = filePath.split('.').reverse()[0];
  const fileInfo = filePath.replace(ext, '') + 'json';

  if (ext === 'apk') {
    const apkReader = new PkgReader(process.argv[2], 'apk', { withIcon: true });
    apkReader.parse((err, pkgInfo) => {
      if (err) {
        console.error(err);
      } else {
        fs.writeFile(fileInfo, JSON.stringify(pkgInfo), function (err) {
          if (err) return console.log(err);
          console.log(fileInfo);
        });
      }
    });
  } else if (ext === 'ipa') {
    const ipaReader = new PkgReader(filePath, 'ipa', { withIcon: true });
    ipaReader.parse((err, pkgInfo) => {
      if (err) {
        console.error(err);
      } else {
        fs.writeFile(fileInfo, JSON.stringify(pkgInfo), function (err) {
          if (err) return console.log(err);
          console.log(fileInfo);
        });
      }
    });
  } else {
    throw new Error(`File ${ext} is not supported.`);
  }

}

handle();