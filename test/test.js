'use strict';

var assert    = require('assert');
var insights  = require('../index');
var Output    = require('../output');
var fs        = require('fs');
var Path      = require('path');

describe("PSI formatting", function () {
  beforeEach(function () {
    var World            = this;
    this.Log             = console.log;
    this.output          = Output.init();
    this.response        = require('./fixtures/response');
    this.Output          = fs.readFileSync(Path.join(__dirname, "fixtures/output.txt"), "utf8")
    this.formattedOutput = "";

    console.log = function(content) {
      World.formattedOutput += content + "\n"
      this.Log(content);
    }.bind(this);
  });

  afterEach(function () {
    console.log = this.Log;
  });

  it('should correctly format PageSpeed Insights response', function () {
    this.output.process({strategy: "desktop"}, this.response);
    assert.equal(this.formattedOutput, this.Output);
  });
});

describe("CLI Error handling", function() {
  it('should throw if no valid URL is provided', function (done) {
    insights({}, function(err, data){
      assert.equal(err.message, "Missing required param: url");
      done()
    });
  });
});
