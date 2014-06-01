// node ./lib/test.js

var pagespeed = require('./pagespeed-insights.js');
var data = ({
	key: 'AIzaSyCHBBOqcgSVUC_shyK6BEAKOZZoBpJCF6g',
	url: 'http://html5rocks.com',
	paths: '',
	locale: 'en_GB',
	strategy: 'desktop',
	threshold: 80
});

pagespeed(data);