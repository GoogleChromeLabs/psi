# psi [![Dependency Status](https://david-dm.org/addyosmani/psi.svg)](https://david-dm.org/addyosmani/psi) [![devDependency Status](https://david-dm.org/addyosmani/psi/dev-status.svg)](https://david-dm.org/addyosmani/psi#info=devDependencies) [![Build Status](https://travis-ci.org/addyosmani/psi.svg?branch=master)](https://travis-ci.org/addyosmani/psi)

> PageSpeed Insights With Reporting

Run mobile and desktop performance tests for your deployed site using [Google PageSpeed Insights](https://developers.google.com/speed/docs/insights/v1/getting_started) with tidy reporting for your build process. A sample [Gulpfile](https://github.com/addyosmani/psi-gulp-sample) demonstrating use is also available.

Uses [gpagespeed](https://github.com/zrrrzzt/gpagespeed/) and the reporter in [grunt-pagespeed](https://github.com/jrcryer/grunt-pagespeed).

## Install

```bash
$ npm install --save psi
```

## Preview

<img src="http://i.imgur.com/pbLR4pV.png"/>

## Usage

When using this module for a production-level build process, registering for an API key from the [Google Developer Console](https://developers.google.com/speed/docs/insights/v1/getting_started#auth) is recommended.

```js
var psi = require('psi');

psi({
	// key: '...', optional
	url: 'http://html5rocks.com',
	paths: '',           // optional
	locale: 'en_GB',     // optional
	strategy: 'mobile',  // optional
	threshold: 80        // optional
});
```

Optionally, a callback is also available with access to the response:

```
psi(options, function(err, data){
	console.log(data.score);
	console.log(data.pageStats);
});
```

###Supported properties

####url
Type: `String`

URL of the page for which the PageSpeed Insights API should generate results.

####locale
Type: `String`

The locale that results should be generated in (e.g 'en_GB').

####strategy
Type: `String`

The strategy to use when analyzing the page. Valid values are desktop and mobile.

####threshold
Type: `Number`

Threshold score that is needed to pass the pagespeed test

####paths
Type: `Array`

An array of URL paths that are appended to the URL

###Options

####key
Type: `String`

[Google API Key](https://code.google.com/apis/console/)

Unless Specified defaults to use the free tier on PageSpeed Insights. Good for getting a feel for how well this tool works for you.

####url
Type: `String`

The URL of the page for which the PageSpeed Insights API should generate results.

## CLI support

You will probably want to globally install psi if using as a CLI. This can be done as follows:

```
npm install -g psi
```

You can then casually use it with your key:

```
$ psi http://www.google.com --key 'YOUR_KEY_GOES_HERE'
```

Similar to gpagespeed, the following optional flags are also supported:

```
$ psi <url> --key=<key> --prettyprint=<true> --userIp=<userIp> --locale=<locale> --strategy=<desktop|mobile>
```

```
$ psi http://www.html5rocks.com --strategy=mobile
```

## Getting PSI into your build

A sample [Gulp](https://github.com/addyosmani/psi-gulp-sample) project using PSI is available. 

If you use Grunt, [grunt-pagespeed](https://github.com/jrcryer/grunt-pagespeed) is a task by James Cryer that uses PSI under the hood.

## License

Apache 2.0  
Copyright 2014 Google Inc
