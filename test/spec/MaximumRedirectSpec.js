'use strict';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

var ADTAG = 'https://www.radiantmediaplayer.com/vast/tags/redirect-redirect-redirect.xml';


describe("Test for MaximumRedirectSpec", function () {

  var id = 'rmpPlayer';
  var container = document.getElementById(id);
  var params = {
    maxNumRedirects: 2
  };
  var rmpVast = new RmpVast(id, params);
  var fw = rmpVast.getFW();
  var testResults = document.getElementById('test-results');

  it("should load adTag and trigger an error", function (done) {
    var validSteps = 0;

    var _incrementAndLog = function (event) {
      validSteps++;
      if (event && event.type) {
        fw.log('RMP-VAST-TEST: ' + event.type);
      }
    };

    container.addEventListener('adtagloaded', function (e) {
      _incrementAndLog(e);
    });

    container.addEventListener('adfollowingredirect', function (e) {
      _incrementAndLog(e);
    });

    container.addEventListener('aderror', function (e) {
      _incrementAndLog(e);
      expect(rmpVast.getAdVastErrorCode()).toBe(302);
    });

    container.addEventListener('addestroyed', function (e) {
      _incrementAndLog(e);
      expect(validSteps).toBe(8);
      if (validSteps === 8) {
        testResults.style.display = 'block';
      }
      setTimeout(function () {
        done();
      }, 2000);
    });

    rmpVast.loadAds(ADTAG);
  });


});
