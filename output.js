'use strict';
// Based on the reporting in grunt-pagespeed by James Cryer
// TODO: Refactor further as this still uses patterns that
// are based on Grunt conventions.

exports.init = function () {
    var addSpacesToWords, bufferSpace, divder, exports, firstToUpperCaseAndAddSpace, generateRuleSetResults, generateScore, generateStatistics, print, score, threshold;
    score = 0;
    threshold = 70;
    exports = {};

    generateScore = function (strategy, response) {
        var output;
        output = "URL:      " + response.id + "\nStrategy: " + strategy + " \nScore:    " + score;
        return console.log(output);
    };

    generateRuleSetResults = function (rulesets) {
        var result, ruleImpact, title, _results;
        _results = [];
        for (title in rulesets) {
            result = rulesets[title];
            title = firstToUpperCaseAndAddSpace(title);
            title += bufferSpace(title);
            ruleImpact = Math.ceil(result.ruleImpact * 100) / 100;
            _results.push(console.log("" + title + "| " + ruleImpact));
        }
        return _results;
    };

    generateStatistics = function (statistics) {
        var result, title, _results;
        _results = [];
        for (title in statistics) {
            result = statistics[title];
            title = firstToUpperCaseAndAddSpace(title);
            title += bufferSpace(title);
            _results.push(console.log("" + title + "| " + result));
        }
        return _results;
    };
    print = function (msg) {
        if (score >= threshold) {
            console.log(msg);
        }
        if (score < threshold) {
            throw new Error(msg);
        }
    };
    bufferSpace = function (msg, length) {
        var buffer;
        if (length == null) {
            length = 50;
        }
        buffer = "";
        if (length - msg.length > 0) {
            buffer = Array(length - msg.length).join(" ");
        }
        return buffer;
    };
    firstToUpperCaseAndAddSpace = function (msg) {
        return msg.charAt(0).toUpperCase() + addSpacesToWords(msg.slice(1));
    };
    addSpacesToWords = function (msg) {
        return msg.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, "$1");
    };
    divder = function (length) {
        if (length == null) {
            length = 65;
        }
        console.log("");
        console.log(Array(length).join("-"));
        return console.log("");
    };
    exports.threshold = function (limit) {
        return threshold = limit;
    };
    exports.process = function (parameters, response, done) {
        if (done == null) {
            done = (function () {});
        }
        if (parameters.threshold !== null) {
            threshold = parameters.threshold;
        }
        console.log('Pagespeed Insights: Processing results');
        score = response.score;
        divder();
        generateScore(parameters.strategy, response);
        divder();
        generateStatistics(response.pageStats);
        divder();
        generateRuleSetResults(response.formattedResults.ruleResults);
        divder();
        if (response.score < threshold) {
            throw new Error("Threshold of " + threshold + " not met with score of " + response.score);
        }
        return done();
    };
    return exports;
};
