'use strict';
exports.init = function () {
    var DEFAULT_THRESHOLD, config, exports, key, locale, paths, strategy, url, urls;
    exports = {};
    config = {};
    DEFAULT_THRESHOLD = 70;
    key = function () {
        if (!config["key"]) {
            throw new Error("API key is mandatory");
        }
        return config["key"];
    };
    url = function () {
        if (config["url"]) {
            return config["url"];
        }
    };
    urls = function () {
        if (config["urls"]) {
            return config["urls"];
        }
        if (!config["urls"]) {
            return [];
        }
    };
    paths = function () {
        if (config["paths"]) {
            return config["paths"];
        }
        if (!config["paths"]) {
            return [''];
        }
    };
    locale = function () {
        if (!config["locale"]) {
            throw new Error("Locale key is mandatory");
        }
        if (config["locale"]) {
            return config["locale"];
        }
    };
    strategy = function () {
        if (config["strategy"]) {
            return config["strategy"];
        }
    };
    exports.params = function (options) {
        var index, param, params, path;
        config = options;
        params = (function () {
            var _ref, _results;
            _ref = paths();
            _results = [];
            for (index in _ref) {
                path = _ref[index];
                param = {};
                param["key"] = key();
                param["url"] = url() + path;
                param["locale"] = locale();
                param["strategy"] = strategy();
                _results.push(param);
            }
            return _results;
        })();
        return params;
    };
    exports.threshold = function () {
        if (!config["threshold"]) {
            return DEFAULT_THRESHOLD;
        }
        return config["threshold"];
    };
    return exports;
};