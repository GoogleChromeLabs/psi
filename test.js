'use strict';
var fs = require('fs');
var assert = require('assert');
var insights = require('./index');
var key = 'AIzaSyCHBBOqcgSVUC_shyK6BEAKOZZoBpJCF6g';

it('should throw if no valid URL is provided', function (done) {
	insights({
		key: key
	}, function(err, data){
	    if(/Invalid url/.test(err)) {
	        return true;
	    }
		done();
	});
});

it('should return desktop results from PageSpeed Insights', function (done) {	
	insights({
		key: key,
		url: 'http://html5rocks.com',
		strategy: 'desktop',
		threshold: 80
	}, function(err, data){
		assert(data.responseCode == 200);
		assert(data.id == 'http://www.html5rocks.com/en/');
		done();
	});
});

it('should return mobile results from PageSpeed Insights', function (done) {
	insights({
		key: key,
		url: 'http://html5rocks.com',
		locale: 'en_GB',
		strategy: 'mobile',
		threshold: 80
	}, function(err, data){
		assert(data.score == 73);
		assert(data.responseCode == 200);
		assert(data.id == 'http://www.html5rocks.com/en/');
		done();
	});
});