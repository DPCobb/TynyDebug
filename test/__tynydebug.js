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
