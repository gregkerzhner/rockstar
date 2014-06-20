require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == 'function' && require;
        if (!u && a)
          return a(o, !0);
        if (i)
          return i(o, !0);
        throw new Error('Cannot find module \'' + o + '\'');
      }
      var f = n[o] = { exports: {} };
      t[o][0].call(f.exports, function (e) {
        var n = t[o][1][e];
        return s(n ? n : e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = typeof require == 'function' && require;
  for (var o = 0; o < r.length; o++)
    s(r[o]);
  return s;
}({
  1: [
    function (require, module, exports) {
      module.exports = angular.module('event-dispatcher', []).factory('DispatchingController', [
        '$rootScope',
        function ($rootScope) {
          function DispatchingController($scope) {
            var delisteners = [];
            if (!$scope) {
              throw new Error('A DispatchingController must have $scope to function. It wasn\'t found.');
            }
            this.dispatch = $rootScope.$emit.bind($rootScope);
            this.listen = function () {
              var args = Array.prototype.slice.call(arguments), deListenFunc = $rootScope.$on.apply($rootScope, args);
              delisteners.push(deListenFunc);
              return deListenFunc;
            };
            $scope.$on('$destroy', function () {
              delisteners.forEach(function (deListenFunc) {
                if (_.isFunction(deListenFunc)) {
                  deListenFunc.call();
                }
              });
            });
          }
          return DispatchingController;
        }
      ]).factory('dispatch', [
        'Dispatcher',
        function (Dispatcher) {
          var dispatcher = new Dispatcher();
          return dispatcher.dispatch;
        }
      ]).factory('Dispatcher', [
        '$rootScope',
        function ($rootScope) {
          function Dispatcher() {
          }
          Dispatcher.prototype.dispatch = function () {
            var args = Array.prototype.slice.call(arguments);
            $rootScope.$emit.apply($rootScope, args);
          };
          return Dispatcher;
        }
      ]);
      ;
    },
    {}
  ],
  'Vym1fJ': [
    function (require, module, exports) {
      angular.module('rockstar.modules', [require('angular-browserify-event-dispatcher').name]);
    },
    { 'angular-browserify-event-dispatcher': 1 }
  ],
  'modules/modules': [
    function (require, module, exports) {
      module.exports = require('Vym1fJ');
    },
    {}
  ],
  'modules/test/index': [
    function (require, module, exports) {
      module.exports = require('8jpQTo');
    },
    {}
  ],
  '8jpQTo': [
    function (require, module, exports) {
      module.exports = angular.module('test', []).service('test', [
        '$rootScope',
        function () {
        }
      ]);
    },
    {}
  ]
}, {}, ['Vym1fJ']);