const rewire = require('rewire');
const sinon = require('sinon');
const expect = require('chai').expect;

const debug = rewire('../tynydebug.js');

describe('TynyDebug Utility Test', () => {
  describe('Testing Running WIthout Errors', () => {
    it('Tests the debug warning method', () => {
      debug.debugWarn();
    });
    const types = ['success', 'error', 'warning', 'invalid'];
    types.forEach((status) => {
      it('Tests debug method for ' + status, () => {
        const t = this;
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
  describe('Testing Expected Behavior', () => {
    beforeEach(() => {
      this.cons = {
        log: sinon.spy(),
        error: sinon.spy(),
        warn: sinon.spy(),
      };

      debug.__set__('process.env.DEBUG', 'true');

      debug.__set__('cons.log', this.cons.log);
      debug.__set__('cons.error', this.cons.error);
      debug.__set__('cons.warn', this.cons.warn);
    });
    it('Tests the debug warning method', () => {
      debug.debugWarn();
    });
    const types = ['success', 'error', 'warning', 'invalid'];
    types.forEach((status) => {
      it('Tests debug method for ' + status, () => {
        const t = this;
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
        switch (status) {
          case 'success':
            expect(t.cons.log.callCount).to.equal(1);
            expect(t.cons.warn.callCount).to.equal(1);
            break;
          case 'error':
            expect(t.cons.error.callCount).to.equal(2);
            break;
          case 'warning':
            expect(t.cons.warn.callCount).to.equal(2);
            break;
          default:
            const output = t.cons.error.args[0][0];
            expect(output).to.include('invalid is not a valid message type');
            expect(t.cons.error.callCount).to.equal(2);
            break;
        }
      });
    });
    it('Tests the msg and loc methods', () => {
      debug.msg('This is testing msg', 'with location');
    });
    it('Tests the msg methods', () => {
      debug.msg('This is testing msg with no location');
    });
  });
});
