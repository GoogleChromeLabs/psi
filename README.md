# psi [![Build Status](https://travis-ci.org/addyosmani/psi.svg?branch=master)](https://travis-ci.org/addyosmani/psi)

> PageSpeed Insights With Reporting

Node module for auditing a page with [Google PageSpeed Insights](https://developers.google.com/speed/docs/insights/v1/getting_started) with fancy reporting for your build. Uses [gpagespeed](https://github.com/zrrrzzt/gpagespeed/).

## Install

```bash
$ npm install --save psi
```

## Preview

<img src="https://camo.githubusercontent.com/b0942adcf4ce21dec89512c6651c0e5ce313eb2b/687474703a2f2f692e696d6775722e636f6d2f676d4944306b7a2e706e67"/>

## Usage

Note: a developer API key is required from the [Google Developer Console](https://console.developers.google.com/) in order to use this module.

```js
var psi = require('psi');

var options = ({
	key: '...',
	url: 'http://html5rocks.com',
	paths: '',           // optional
	locale: 'en_GB',     // optional
	strategy: 'mobile',  // optional
	threshold: 80        // optional
});	

psi(options);
```

Optionally, a callback is also available with access to the response:

```
psi(options, function(err, data){
	console.log(data.score);
	console.log(data.pageStats);
});
```

## CLI support

You will probably want to globally install psi if using as a CLI. This can be done as follows:

```
npm install -g psi
```

You can then casually use it with your key:

```
$ psi http://www.google.com --key 'YOUR_KEY_GOES_HERE'
```

Per gpagespeed, the following optional flags are also supported:

```
$ psi <url> --key=<key> --callback=<callback> --prettyprint=<true> --userIp=<userIp> --locale=<locale> --strategy=<desktop|mobile>
```

## License

[MIT](http://opensource.org/licenses/MIT) © [Addy Osmani](http://addyosmani.com)
