'use strict';
var googleapis = require('googleapis');

exports.init = function () {
    var exports;
    exports = {};

    exports.run = function (runs, responseHandler, done) {
        var current, index, numOfRuns, run, _results;
        numOfRuns = runs.length;
        index = 0;
        _results = [];
        for (current in runs) {
            run = runs[current];
            _results.push(googleapis.discover("pagespeedonline", "v1").execute(function (err, client) {
                var request;
                if (err) {
                    throw new Error(err);
                }
                console.log('Pagespeed Insights: API Discovered');
                console.log('Pagespeed Insights: Sending request');
                request = client.pagespeedonline.pagespeedapi.runpagespeed(run);
                return request.execute(function (err, response) {
                    index++;
                    console.log('Pagespeed Insights: Request completed');
                    if (err) {
                        throw new Error(JSON.stringify(err));
                    }
                    if (index === numOfRuns) {
                        return responseHandler(run, response, done);
                    }
                    return responseHandler(run, response);
                });
            }));
        }
        return _results;
    };
    return exports;
};