require('babel-polyfill');
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

module.exports = {
  API_URL: 'https://www.googleapis.com/pagespeedonline/v1/runPagespeed?screenshot=true',
  _download: async function(url, opts) {
    var urlToFetch;
    if (opts && opts.mobile) {
        urlToFetch = `${this.API_URL}&strategy=mobile&url=${encodeURI(url)}`;
    } else {
        urlToFetch = `${this.API_URL}&url=${encodeURI(url)}`; 
    }

    var resp = await fetch(urlToFetch, {method: 'get'})
    var json = await resp.json();

    var data = json.screenshot.data;
    data = data.replace(/_/g, '/');
    data = data.replace(/-/g, '+');

    if (opts && opts.dest) {
      var file = path.join(opts.dest, opts.filename + '.jpg');
      fs.writeFileSync(file, data, {encoding: 'base64'}, function(ex) {
        console.error('writing failed', ex);
      });
      return file;
    } else {
      return data;
    }
  },
  download: async function(url, opts) {
    return this._download(url, opts);
  },
  base64: async function(url) {
    return this._download(url);
  }
}
