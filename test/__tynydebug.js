const expect = require('chai').expect;
const debug = require('../tynydebug.js');

describe('TynyDebug Utility Test', () => {
  it('Tests the debug warning method', () => {
    debug.debugWarn();
  });
  const types = ['success', 'test', 'error', 'warning', ''];
  types.forEach((status) => {
    it('Tests debug method for ' + status, () => {
      debug.debug({
        type: `${status}`,
        msg: 'This is a test',
        location: '__tynydebug.js',
        data: {
          test: 'test',
          one: 'one',
        },
        request: {
          id: 1,
          name: 'this is a test',
        },
      });
      debug.debug({
        type: status,
        msg: 'This is a test',
        location: '__tynydebug.js',
      });
    });
  });
  it('Tests the msg and loc methods', () => {
    debug.msg('This is testing msg', 'with location');
  });
  it('Tests the msg methods', () => {
    debug.msg('This is testing msg with no location');
  });
});

const version = require('../tynydebug').updateVersion;

describe('TynyVersion Utility Test', () => {
  describe('Test Version Change Function', () => {
    it('Update the major version.', () => {
      const newVer = version('1.3.2', 'major');

      expect(newVer).to.equal('2.3.2');
    });
    it('Update the minor version.', () => {
      const newVer = version('1.3.2', 'minor');

      expect(newVer).to.equal('1.4.2');
    });
    it('Update the patch version.', () => {
      const newVer = version('1.3.2', 'patch');

      expect(newVer).to.equal('1.3.3');
    });
    it('Bad release type entered.', () => {
      const newVer = version('1.3.2', 'match');

      expect(newVer).to.equal('Invalid release type.');
    });
    it('Bad version number entered.', () => {
      const newVer = version('1.3.2.3', 'match');

      expect(newVer).to.equal('Invalid version number.');
    });
  });
});
