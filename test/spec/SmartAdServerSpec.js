'use strict';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000;

var ADTAG = 'http://diff.smartadserver.com/ac?siteid=55181&pgid=570478&fmtid=29117&vaf=1&vpaidt=flash&vpaidv=1,2&tgt=vpp%3Dflash%3Bvpv%3Djw6.0%3Brevision%3D115353&oc=1&ps=1&visit=M&out=vast3&vcn=c&ab=1&pgDomain=http%3A%2F%2Fgallery.smartadserver.com%2Fpreroll-midroll-postroll-instream-ad-format&vpw=600&vph=338&tmstp=1491922191941';


describe("Test for Smart Ad Server ad", function () {

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

    container.addEventListener('addestroyed', function (e) {
      _incrementAndLog(e);
      expect(validSteps).toBe(7);
      if (validSteps === 7) {
        testResults.style.display = 'block';
      }
      setTimeout(function () {
        done();
      }, 2000);
    });

    rmpVast.loadAds(ADTAG);
  });


});
