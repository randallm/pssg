'use strict';

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('babel-polyfill');


module.exports = {
  API_URL: 'https://www.googleapis.com/pagespeedonline/v1/runPagespeed?screenshot=true&strategy=mobile&url=',
  _download: function _download(url, opts) {
    var json, data, file;
    return regeneratorRuntime.async(function _download$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap((0, _nodeFetch2.default)(this.API_URL + url, { method: 'get' }).then(function (resp) {
              return resp.json();
            }));

          case 2:
            json = _context.sent;
            data = json.screenshot.data;


            data = data.replace(/_/g, '/');
            data = data.replace(/-/g, '+');

            if (!(opts && opts.dest)) {
              _context.next = 12;
              break;
            }

            file = _path2.default.join(opts.dest, opts.filename + '.jpg');

            _fs2.default.writeFileSync(file, data, { encoding: 'base64' }, function (ex) {
              console.error('writing failed', ex);
            });
            return _context.abrupt('return', file);

          case 12:
            return _context.abrupt('return', data);

          case 13:
          case 'end':
            return _context.stop();
        }
      }
    }, null, this);
  },
  download: function download(url, opts) {
    return regeneratorRuntime.async(function download$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt('return', this._download(url, opts));

          case 1:
          case 'end':
            return _context2.stop();
        }
      }
    }, null, this);
  },
  base64: function base64(url) {
    return regeneratorRuntime.async(function base64$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt('return', this._download(url));

          case 1:
          case 'end':
            return _context3.stop();
        }
      }
    }, null, this);
  }
};
