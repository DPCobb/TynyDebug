/**
 *
 * Daniel Cobb
 * 2-13-2017
 * TynyDebug
 *
 */
require('dotenv').config();

// Handles console.logs without an ESLint warning
class con {
  // method log writes the msg to the console
  log(data) {
    // data is the message
    this.data = data;
    // write to console
    console.log('%s', data);
  }
  error(data) {
    this.data = data;
    console.error('%s', data);
  }
  warn(data) {
    this.data = data;
    console.warn('%s', data);
  }
}
// Instantiate con class
const cons = new con();

// handles the log data for the debugger
class msgHandle {
  constructor(data) {
    // Get request/response data from passed in event
    this.type = data.type;
    this.verify = data.data;
    this.msg = data.msg;
    this.location = data.location;
    this.request = data.request;
  }
}

// Location of a console.log event, used to check if location is undefined
// in msg and saveMsg methods
class loc {
  constructor(data) {
    // location information
    this.loc = data;
  }
}

const debug = process.env.DEBUG;

module.exports = {
  // get a time for log events
  getTime() {
    // set date obj
    const dateObj = new Date();
    const time = dateObj.toLocaleTimeString();
    // return time
    return time;
  },
  // send warning that debugging is active
  debugWarn() {
    // if debug is true, send warning msg
    if (debug === 'true') {
      cons.log('**************************************** \n Debugging Mode is Active!\n\n****************************************\n');
    }
  },
  // debug takes json data, logs to console and to log file
  debug(dataIn) {
    const data = new msgHandle(dataIn);
    const time = this.getTime();
    // if debug is true
    if (debug === 'true') {
      // set up variables
      let logData = '';
      let logReq = '';
      // set console colors
      const resetColor = '\x1b[0m';
      const successColor = '\x1b[32m';
      const errorColor = '\x1b[31m';
      const defaultColor = '\x1b[33m';
      // set up type title : error, success, warning
      let type = defaultColor + data.type.toUpperCase() + resetColor;
      // check to see if there is data, if data isn't null and if the type is not error and is
      // success or warn.
      if (data.verify && !data.verify.data && data.type !== 'error' && (data.type === 'success' || data.type === 'warn')) {
        // if you get here the type changes to warning
        data.type = 'warning - request returned null';
      }
      // if type is success set the success title
      if (data.type === 'success') {
        type = successColor + data.type.toUpperCase() + resetColor;
      } else if (data.type === 'error') {
        // if error set error title
        type = errorColor + data.type.toUpperCase() + resetColor;
      } else {
        // set default
        type = defaultColor + data.type.toUpperCase() + resetColor;
      }
      // header for actual console display
      let logMsg = '\n**********\nEvent at ' + time + ' @ ' + data.location + '\n' + type + '\n' + data.msg;
      // if not an error display returned data from json
      if (data.verify && data.type !== 'error') {
        logData = '\nReturned Data: \n-- ' + JSON.stringify(data.verify).split(',').join('\n    ').replace(/[{}"]/g, ' ');
      }
      // if it is an error return the error string
      if (data.type === 'error') {
        logData = '\nReturned Data: \n ' + data.verify;
      }
      // if request info is sent display the request info
      if (data.request) {
        logReq = '\nRequested Data: \n-- ' + JSON.stringify(data.request).split(',').join('\n    ').replace(/[{}"]/g, ' ');
      }
      // create the log console and log file
      logMsg += logData;
      logMsg += logReq;

      // console.log the message
      switch (data.type) { // If data.type is
        case 'success': // Output success messages to the log.
          cons.log(logMsg);
          break;
        case 'error': // Output error messages to the error.
          cons.error(logMsg);
          break;
        case 'warning':
        case 'warning - request returned null': // Output warning or null return to the warning.
          cons.warn(logMsg);
          break;
        default: // If not one of the types above output a invalid message type error.
          this.debug({
            type: 'error',
            msg: `${data.type} is not a valid message type.`,
            location: data.location,
          });
          break;
      }
    }
  },
  /* Msg acts like a standard console.log if debug is true and debug_console
  is true, and doesn't append to log file */
  msg(data, locIn) {
    // instantiate loc class

    const location = new loc(locIn);
    // check if location information was given
    if (location.loc === undefined) {
      // if no location data change loc to no info msg
      location.loc = 'No Location Info';
    }
    if (debug === 'true') {
      cons.log('\x1b[37mMSG:\x1b[0m ' + data + '\n-- @ ' + location.loc);
    }
  },
  updateVersion(current, release) { // A function to semantically update the version number.
    const v = current.split('.'); // Split the version number apart at the .
    let num; // Variable for use in incrementing.

    if (v.length === 3) { // If there are 3 numbers in the version.
      switch (release) {
        case 'major': // If the release is major.
          num = parseInt(v[0], 10) + 1; // Add 1 to the major release.
          return `${num}.0.0`; // Return the major release number with the minor and patch reset.
        case 'minor': // If the release is minor.
          num = parseInt(v[1], 10) + 1; // Add 1 to the minor release.
          return `${v[0]}.${num}.0`; // Return the minor release number with the patch reset.
        case 'patch': // If the release is a patch.
          num = parseInt(v[2], 10) + 1; // Add 1 to the patch release.
          return `${v[0]}.${v[1]}.${num}`; // Return the updated version.
        default:
          return 'Invalid release type.'; // If the release is not one of the above, return the error.
      }
    }

    return 'Invalid version number.'; // If the version number does not contain precisely 3 numbers return the error.
  },
};
