'use strict';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

var ADTAG = 'https://www.radiantmediaplayer.com/vast/tags/iab/vast2/Inline_LinearRegular_VAST2.0.xml';


describe("Test for Inline Linear ad (IAB VAST2)", function () {

  var id = 'rmpPlayer';
  var container = document.getElementById(id);
  var rmpVast = new RmpVast(id);
  var fw = rmpVast.getFW();
  var testResults = document.getElementById('test-results');

  it("should load adTag and play it", function (done) {
    var validSteps = 0;

    var _incrementAndLog = function (event) {
      validSteps++;
      if (event && event.type) {
        fw.log('RMP-VAST-TEST: ' + event.type);
      }
    };

    container.addEventListener('adloaded', function (e) {
      _incrementAndLog(e);
    });
    container.addEventListener('addurationchange', function (e) {
      _incrementAndLog(e);
    });
    container.addEventListener('adimpression', function (e) {
      _incrementAndLog(e);
    });
    container.addEventListener('adstarted', function (e) {
      _incrementAndLog(e);
    });
    container.addEventListener('adtagstartloading', function (e) {
      _incrementAndLog(e);
    });
    container.addEventListener('adtagloaded', function (e) {
      _incrementAndLog(e);
    });
    container.addEventListener('adpaused', function (e) {
      // adpaused fires also just before adcomplete
      _incrementAndLog(e);
    });
    container.addEventListener('adresumed', function (e) {
      _incrementAndLog(e);
    });
    container.addEventListener('adcomplete', function (e) {
      _incrementAndLog(e);
    });
    container.addEventListener('adfirstquartile', function (e) {
      _incrementAndLog(e);
    });
    container.addEventListener('admidpoint', function (e) {
      _incrementAndLog(e);
    });
    container.addEventListener('adthirdquartile', function (e) {
      _incrementAndLog(e);
    });
    container.addEventListener('addestroyed', function (e) {
      _incrementAndLog(e);
      expect(validSteps).toBe(12);
      if (validSteps === 12) {
        testResults.style.display = 'block';
      }
      setTimeout(function () {
        done();
      }, 2000);
    });

    rmpVast.loadAds(ADTAG);
  });


});
