# psi [![Build Status](https://travis-ci.org/addyosmani/psi.svg?branch=master)](https://travis-ci.org/addyosmani/psi)

> PageSpeed Insights with reporting

![](screenshot.png)

Run mobile and desktop performance tests for your deployed site using [Google PageSpeed Insights](https://developers.google.com/speed/docs/insights/v1/getting_started) with tidy reporting for your build process.


## Install

```
$ npm install --save psi
```


## Usage

```js
var psi = require('psi');

// get the PageSpeed Insights report
psi('html5rocks.com', function (err, data) {
  console.log(data.score);
  console.log(data.pageStats);
});

// output a formatted report to the terminal
psi.output('html5rocks.com', function (err) {
  console.log('done');
});
```


## API

### psi(url, [options], callback)

#### url

*Required*  
Type: `string`

URL of the page for which the PageSpeed Insights API should generate results.

#### options

Type: `object`

##### key

Type: `string`  
Default: `Free tier`

When using this module for a production-level build process, registering for an API key from the [Google Developer Console](https://developers.google.com/speed/docs/insights/v1/getting_started#auth) is recommended.

##### strategy

Type: `string`  
Default: `mobile`  
Values: `mobile`, `desktop`

Strategy to use when analyzing the page.

##### locale

Type: `string`  
Default: `en_US`

Locale results should be generated in.

##### threshold

Type: `number`  
Default: `70`

Threshold score to pass the PageSpeed test.

#### callback(error, data)

*Required*  
Type: `function`

##### data

Type: `object`

The response from Google PageSpeed Insights.

### psi.output(url, [options], [callback])

Output the formatted report to the terminal.

`url` and `options` is the same as `psi()`.

#### callback(error)

Type: `function`


## CLI

```
$ npm install --global psi
```

```
$ psi --help

  Usage
    psi <url> <options>

  Example
    psi todomvc.com --strategy=mobile

  Options
    --key          Google API Key. By default the free tier is used.
    --strategy     Strategy to use when analyzing the page: mobile|desktop
    --format       Output format: cli|json|tap
    --locale       Locale results should be generated in.
    --threshold    Threshold score to pass the PageSpeed test.
```


## Getting PSI into your build

A sample [Gulp](https://github.com/addyosmani/psi-gulp-sample) project using PSI is available.

If you use Grunt, [grunt-pagespeed](https://github.com/jrcryer/grunt-pagespeed) is a task by James Cryer that uses PSI under the hood.

For testing local project, we recommend using [ngrok](http://www.jamescryer.com/2014/06/12/grunt-pagespeed-and-ngrok-locally-testing/).


## License

Apache-2.0  
Copyright 2015 Google Inc
