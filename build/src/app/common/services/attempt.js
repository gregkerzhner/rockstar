angular.module('rockstar.common.services.attempt', [
  'ngCookies',
  'geolocation'
]).factory('Attempt', [
  '$http',
  '$q',
  '$timeout',
  'geolocation',
  function ($http, $q, $timeout, geolocation) {
    var Attempt = function (options) {
      for (var key in options) {
        if (options.hasOwnProperty(key)) {
          this[key] = options[key];
        }
      }
      this.coordinates = [];
      this.finished = false;
    };
    Attempt.prototype.track = function () {
      this.startTime = new Date().getTime();
      this.getLocation();
    };
    Attempt.prototype.stop = function () {
      this.finished = true;
      this.endTime = new Date().getTime();
    };
    Attempt.prototype.save = function () {
      return $http.post('/attempt', this);
    };
    Attempt.prototype.getLocation = function () {
      if (this.finished === true)
        return;
      var attempt = this;
      geolocation.getLocation().then(function (data) {
        var coords = data.coords;
        coords['time'] = new Date().getTime();
        attempt.coordinates.push(coords);
        setTimeout(function () {
          attempt.getLocation();
        }, 1000);
      });
    };
    Attempt.prototype.getAccuracy = function () {
      return geolocation.getAccuracy();
    };
    return Attempt;
  }
]);
;