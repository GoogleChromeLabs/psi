# psi

> PageSpeed Insights With Reporting

Run mobile and desktop performance tests for your deployed site using [Google PageSpeed Insights](https://developers.google.com/speed/docs/insights/v1/getting_started) with tidy reporting for your build process. 

Uses [gpagespeed](https://github.com/zrrrzzt/gpagespeed/) and the reporter in [grunt-pagespeed](https://github.com/jrcryer/grunt-pagespeed).

## Install

```bash
$ npm install --save psi
```

## Preview

<img src="https://camo.githubusercontent.com/b0942adcf4ce21dec89512c6651c0e5ce313eb2b/687474703a2f2f692e696d6775722e636f6d2f676d4944306b7a2e706e67"/>

## Usage

Note: a developer API key is required from the [Google Developer Console](https://developers.google.com/speed/docs/insights/v1/getting_started#auth) in order to use this module.

```js
var psi = require('psi');

psi({
	key: '...',
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

Per gpagespeed, the following optional flags are also supported:

```
$ psi <url> --key=<key> --prettyprint=<true> --userIp=<userIp> --locale=<locale> --strategy=<desktop|mobile>
```

## Sample Gulpfile

A sample [Gulp](https://github.com/addyosmani/psi-gulp-sample) project using PSI is available. If you use Grunt, [grunt-pagespeed](https://github.com/jrcryer/grunt-pagespeed) is a task that offers similar PageSpeed reporting options.

## License

[MIT](http://opensource.org/licenses/MIT) © [Addy Osmani](http://addyosmani.com)
