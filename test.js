'use strict';
var fs = require('fs');
var assert = require('assert');
var insights = require('./index');

it('should throw if no valid URL is provided', function (done) {
	var testData = ({
		key: 'AIzaSyCHBBOqcgSVUC_shyK6BEAKOZZoBpJCF6g'
	});

	insights(testData, function(err, data){
	    if(/Invalid url/.test(err)) {
	        return true;
	    }
		done();
	});
});

it('should return desktop results from PageSpeed Insights', function (done) {
	var testData = ({
		key: 'AIzaSyCHBBOqcgSVUC_shyK6BEAKOZZoBpJCF6g',
		url: 'http://html5rocks.com',
		strategy: 'desktop',
		threshold: 80
	});	
	insights(testData, function(err, data){
		assert(data.responseCode == 200);
		assert(data.id == 'http://www.html5rocks.com/en/');
		done();
	});
});

it('should return mobile results from PageSpeed Insights', function (done) {
	var testData = ({
		key: 'AIzaSyCHBBOqcgSVUC_shyK6BEAKOZZoBpJCF6g',
		url: 'http://html5rocks.com',
		locale: 'en_GB',
		strategy: 'mobile',
		threshold: 80
	});	
	insights(testData, function(err, data){
		assert(data.score == 73);
		assert(data.responseCode == 200);
		assert(data.id == 'http://www.html5rocks.com/en/');
		done();
	});
});