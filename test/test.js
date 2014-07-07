'use strict';
var fs = require('fs');
var assert = require('assert');
var insights = require('../index');

it('should throw if no valid URL is provided', function (done) {
	insights({}
	, function(err, data){
	    if(/Invalid url/.test(err)) {
	        return true;
	    }
		done();
	});
});

it('should return desktop results from PageSpeed Insights', function (done) {
	insights({
		url: 'http://html5rocks.com',
		strategy: 'desktop',
		threshold: 80
	}, function(err, data){
		assert.equal(data.responseCode, 200, "responseCode");
		assert.equal(data.id, 'http://www.html5rocks.com/en/', "id");
		done();
	});
});

it('should return mobile results from PageSpeed Insights', function (done) {
	insights({
		url: 'http://html5rocks.com',
		locale: 'en_GB',
		strategy: 'mobile',
		threshold: 73
	}, function(err, data){
		assert.equal(data.score, 73, "score");
		assert.equal(data.responseCode, 200, "responseCode");
		assert.equal(data.id, 'http://www.html5rocks.com/en/', "id");
		done();
	});
});
