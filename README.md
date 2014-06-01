# pagespeed-insights [![Build Status](https://travis-ci.org/addyosmani/pagespeed-insights.svg?branch=master)](https://travis-ci.org/addyosmani/pagespeed-insights)

> PageSpeed Insights With Reporting

## Install

```bash
$ npm install --save pagespeed-insights
```

## Preview

<img src="https://camo.githubusercontent.com/b0942adcf4ce21dec89512c6651c0e5ce313eb2b/687474703a2f2f692e696d6775722e636f6d2f676d4944306b7a2e706e67"/>

## Usage

```js
var testData = ({
	key: 'AIzaSyCHBBOqcgSVUC_shyK6BEAKOZZoBpJCF6g',
	url: 'http://html5rocks.com',
	paths: '',           // optional
	locale: 'en_GB',     // optional
	strategy: 'mobile',  // optional
	threshold: 80        // optional
});	

pagespeed(testData);
```

Optionally, a callback is also available with access to the response:

```
pagespeed(options, function(err, data){
	console.log(data.score);
	console.log(data.pageStats);
});
```

## License

[MIT](http://opensource.org/licenses/MIT) © [Addy Osmani](http://addyosmani.com)
