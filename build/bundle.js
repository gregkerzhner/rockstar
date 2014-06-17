require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = angular.module('event-dispatcher', [])
/**
 * This factory provides a constructor to mixin with an
 * AngularJS controller constructor. It provides some
 * syntax sugar for making memory-leak safe eventing.
 */
  .factory('DispatchingController', function ($rootScope) {
    function DispatchingController($scope) {
      var delisteners = [];

      if (!$scope) {
        throw new Error("A DispatchingController must have $scope to function. It wasn't found.")
      }

      this.dispatch = $rootScope.$emit.bind($rootScope);

      this.listen = function () {
        var args = Array.prototype.slice.call(arguments),
          deListenFunc = $rootScope.$on.apply($rootScope, args);
        delisteners.push(deListenFunc);
        return deListenFunc;
      };

      $scope.$on('$destroy', function () {
        delisteners.forEach(function (deListenFunc) {
          if(_.isFunction(deListenFunc)) {
            deListenFunc.call();
          }
        })
      })
    }

    return DispatchingController;
  })
/**
 * This factory provides a `dispatch` function as
 * an injectable. The dispatch function is a wrapper
 * around $rootScope.$emit, but allows us to inject
 * just the single piece of functionality we want
 * into ANY service/factory/etc and facilitate event
 * dispatching.
 */
  .factory('dispatch', function (Dispatcher) {
    var dispatcher = new Dispatcher();
    return dispatcher.dispatch;
  })
/**
 * This factor creates a Dispatcher constructor. This can
 * be used as a method for mixing in dispatching capabilities.
 */
  .factory('Dispatcher', function($rootScope) {
    function Dispatcher() {}

    Dispatcher.prototype.dispatch = function () {
      var args = Array.prototype.slice.call(arguments);
      $rootScope.$emit.apply($rootScope, args);
    };

    return Dispatcher;
  })
;


},{}],"modules/modules":[function(require,module,exports){
module.exports=require('Vym1fJ');
},{}],"Vym1fJ":[function(require,module,exports){
angular.module('rockstar.modules', [require('angular-browserify-event-dispatcher').name]);
;
},{"angular-browserify-event-dispatcher":1}],"8jpQTo":[function(require,module,exports){
module.exports = angular.module('test', [

])

  .service('test', function($rootScope) {

  })

;

},{}],"modules/test/index":[function(require,module,exports){
module.exports=require('8jpQTo');
},{}]},{},["Vym1fJ"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvZ3JlZy9jb2Rlcy9yb2Nrc3Rhci9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2dyZWcvY29kZXMvcm9ja3N0YXIvbm9kZV9tb2R1bGVzL2FuZ3VsYXItYnJvd3NlcmlmeS1ldmVudC1kaXNwYXRjaGVyL2luZGV4LmpzIiwiL1VzZXJzL2dyZWcvY29kZXMvcm9ja3N0YXIvc3JjL21vZHVsZXMvbW9kdWxlcy5qcyIsIi9Vc2Vycy9ncmVnL2NvZGVzL3JvY2tzdGFyL3NyYy9tb2R1bGVzL3Rlc3QvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUM5REE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHMgPSBhbmd1bGFyLm1vZHVsZSgnZXZlbnQtZGlzcGF0Y2hlcicsIFtdKVxuLyoqXG4gKiBUaGlzIGZhY3RvcnkgcHJvdmlkZXMgYSBjb25zdHJ1Y3RvciB0byBtaXhpbiB3aXRoIGFuXG4gKiBBbmd1bGFySlMgY29udHJvbGxlciBjb25zdHJ1Y3Rvci4gSXQgcHJvdmlkZXMgc29tZVxuICogc3ludGF4IHN1Z2FyIGZvciBtYWtpbmcgbWVtb3J5LWxlYWsgc2FmZSBldmVudGluZy5cbiAqL1xuICAuZmFjdG9yeSgnRGlzcGF0Y2hpbmdDb250cm9sbGVyJywgZnVuY3Rpb24gKCRyb290U2NvcGUpIHtcbiAgICBmdW5jdGlvbiBEaXNwYXRjaGluZ0NvbnRyb2xsZXIoJHNjb3BlKSB7XG4gICAgICB2YXIgZGVsaXN0ZW5lcnMgPSBbXTtcblxuICAgICAgaWYgKCEkc2NvcGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQSBEaXNwYXRjaGluZ0NvbnRyb2xsZXIgbXVzdCBoYXZlICRzY29wZSB0byBmdW5jdGlvbi4gSXQgd2Fzbid0IGZvdW5kLlwiKVxuICAgICAgfVxuXG4gICAgICB0aGlzLmRpc3BhdGNoID0gJHJvb3RTY29wZS4kZW1pdC5iaW5kKCRyb290U2NvcGUpO1xuXG4gICAgICB0aGlzLmxpc3RlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpLFxuICAgICAgICAgIGRlTGlzdGVuRnVuYyA9ICRyb290U2NvcGUuJG9uLmFwcGx5KCRyb290U2NvcGUsIGFyZ3MpO1xuICAgICAgICBkZWxpc3RlbmVycy5wdXNoKGRlTGlzdGVuRnVuYyk7XG4gICAgICAgIHJldHVybiBkZUxpc3RlbkZ1bmM7XG4gICAgICB9O1xuXG4gICAgICAkc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZGVsaXN0ZW5lcnMuZm9yRWFjaChmdW5jdGlvbiAoZGVMaXN0ZW5GdW5jKSB7XG4gICAgICAgICAgaWYoXy5pc0Z1bmN0aW9uKGRlTGlzdGVuRnVuYykpIHtcbiAgICAgICAgICAgIGRlTGlzdGVuRnVuYy5jYWxsKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9XG5cbiAgICByZXR1cm4gRGlzcGF0Y2hpbmdDb250cm9sbGVyO1xuICB9KVxuLyoqXG4gKiBUaGlzIGZhY3RvcnkgcHJvdmlkZXMgYSBgZGlzcGF0Y2hgIGZ1bmN0aW9uIGFzXG4gKiBhbiBpbmplY3RhYmxlLiBUaGUgZGlzcGF0Y2ggZnVuY3Rpb24gaXMgYSB3cmFwcGVyXG4gKiBhcm91bmQgJHJvb3RTY29wZS4kZW1pdCwgYnV0IGFsbG93cyB1cyB0byBpbmplY3RcbiAqIGp1c3QgdGhlIHNpbmdsZSBwaWVjZSBvZiBmdW5jdGlvbmFsaXR5IHdlIHdhbnRcbiAqIGludG8gQU5ZIHNlcnZpY2UvZmFjdG9yeS9ldGMgYW5kIGZhY2lsaXRhdGUgZXZlbnRcbiAqIGRpc3BhdGNoaW5nLlxuICovXG4gIC5mYWN0b3J5KCdkaXNwYXRjaCcsIGZ1bmN0aW9uIChEaXNwYXRjaGVyKSB7XG4gICAgdmFyIGRpc3BhdGNoZXIgPSBuZXcgRGlzcGF0Y2hlcigpO1xuICAgIHJldHVybiBkaXNwYXRjaGVyLmRpc3BhdGNoO1xuICB9KVxuLyoqXG4gKiBUaGlzIGZhY3RvciBjcmVhdGVzIGEgRGlzcGF0Y2hlciBjb25zdHJ1Y3Rvci4gVGhpcyBjYW5cbiAqIGJlIHVzZWQgYXMgYSBtZXRob2QgZm9yIG1peGluZyBpbiBkaXNwYXRjaGluZyBjYXBhYmlsaXRpZXMuXG4gKi9cbiAgLmZhY3RvcnkoJ0Rpc3BhdGNoZXInLCBmdW5jdGlvbigkcm9vdFNjb3BlKSB7XG4gICAgZnVuY3Rpb24gRGlzcGF0Y2hlcigpIHt9XG5cbiAgICBEaXNwYXRjaGVyLnByb3RvdHlwZS5kaXNwYXRjaCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgICRyb290U2NvcGUuJGVtaXQuYXBwbHkoJHJvb3RTY29wZSwgYXJncyk7XG4gICAgfTtcblxuICAgIHJldHVybiBEaXNwYXRjaGVyO1xuICB9KVxuO1xuXG4iLCJhbmd1bGFyLm1vZHVsZSgncm9ja3N0YXIubW9kdWxlcycsIFtyZXF1aXJlKCdhbmd1bGFyLWJyb3dzZXJpZnktZXZlbnQtZGlzcGF0Y2hlcicpLm5hbWVdKTtcbjsiLCJtb2R1bGUuZXhwb3J0cyA9IGFuZ3VsYXIubW9kdWxlKCd0ZXN0JywgW1xuXG5dKVxuXG4gIC5zZXJ2aWNlKCd0ZXN0JywgZnVuY3Rpb24oJHJvb3RTY29wZSkge1xuXG4gIH0pXG5cbjtcbiJdfQ==
