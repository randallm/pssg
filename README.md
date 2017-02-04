# pssg

## Description

pssg:
* stands for "pagespeed screengrab".
* is a node client for Google's ["secret" screenshot API](https://shkspr.mobi/blog/2015/11/google-secret-screenshot-api/)
* helps you rapidly generate thumbnails, like [Urlbox](https://urlbox.io/) (but free and lower quality) or PhantomJS (but faster and lower quality)

## Usage

First, install pssg:

```
npm install pssg --save-dev
```

Then call `download` or `base64`:

```
var pssg = require('pssg');

var filename = 'yeezy_screengrab';
pssg.download('http://www.kanyewest.com', {
  dest: __dirname,
  filename: filename
}).then(function(file) {
  console.log('Saved to ' + file + '.');
});

pssg.base64('http://randallma.com')
  .then(function(b64) {
    console.log('Screenshot base64 snippet: ' + b64.substr(0, 20));
  });
```

That's it!

## License

MIT
