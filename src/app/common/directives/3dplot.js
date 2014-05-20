angular.module('rockstar.common.directives.3dplot', [])
  .directive('3dplot', function(){
    return {
      restrict: "A",
      scope: {
        attempt: "=attempt"
      },
      //templateUrl: 'common/directives/3dplot.tpl.html',
      controller: "3DPlotController",
      link: function (scope, element, attrs) {

      }
    }
  })
  .controller('3DPlotController', function($scope, $element){
    $scope.attempt;
    var height = 600;
    var width = 600;

    var camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );
    var scene = new THREE.Scene();    
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    document.getElementById($element.attr('id')).appendChild(renderer.domElement);

    var terrainSize = 60;
    var projection = d3.geo.transverseMercator()
      .translate([terrainSize / 2, terrainSize / 2])
      .scale(terrainSize * 106.4)
      //.rotate([-9, 0, 0])
      .center([-105.28164850466801, 40.01374124251033]); 
    camera.position.set(0, -terrainSize / 2, terrainSize / 2);

    $scope.draw = function(){
      if(!$scope.attempt) return;
      var coordinates = $scope.attempt.coordinates;
      var geometry = new THREE.Geometry();
      for(var i = 0 ; i<coordinates.length; i++){
        var coordinate = coordinates[i];
        coord = $scope.translate(projection([coordinate.longitude, coordinate.latitude]));
        geometry.vertices.push(new THREE.Vector3(coord[0], coord[1], coordinate.altitude)); 
      }
      var material = new THREE.LineBasicMaterial({
        color: 0xffffff,
        linewidth: 2
      });

      var line = new THREE.Line(geometry, material);
      debugger;
      scene.add(line);

      $scope.render()
    }  


    $scope.render = function(){
      requestAnimationFrame($scope.render);
      renderer.render(scene, camera);
    }

    $scope.translate = function(point) {
      return [point[0] - (terrainSize / 2), (terrainSize / 2) - point[1]];
    }

    $scope.$watch('attempt', $scope.draw)   
    $scope.render();
  });
