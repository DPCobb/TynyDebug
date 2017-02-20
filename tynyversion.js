const fs = require('fs');

const npmPkgJSON = fs.readFileSync('./package.json');
const npmPkg = JSON.parse(npmPkgJSON);

module.exports = {
  change(num, release) {
    const v = npmPkg.version.split('.');

    switch (release) {
      case 'major':
        return `${num}.${v[1]}.${v[2]}`;
      case 'minor':
        return `${v[0]}.${num}.${v[2]}`;
      case 'patch':
        return `${v[0]}.${v[1]}.${num}`;
      default:
        return 'Invalid release type.';
    }
  },
  inc(release) {
    const v = npmPkg.version.split('.');

    let num;

    switch (release) {
      case 'major':
        num = parseInt(v[0], 10) + 1;
        return `${num}.${v[1]}.${v[2]}`;
      case 'minor':
        num = parseInt(v[1], 10) + 1;
        return `${v[0]}.${num}.${v[2]}`;
      case 'patch':
        num = parseInt(v[2], 10) + 1;
        return `${v[0]}.${v[1]}.${num}`;
      default:
        return 'Invalid release type.';
    }
  },
};
