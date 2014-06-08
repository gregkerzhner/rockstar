angular.module('rockstar.common.directives.linegraph', [])
  .directive('linegraph', function(){
    return {
      restrict: "A",
      scope: {
        points: "=points",
        attrX: "@",
        attrY: "@",
        scaleX: "@",
        scaleY: "@",
        cropX: "@",
        cropY: "@",
        axisLabelX: "@",
        axisLabelY: "@"
      },
      //templateUrl: 'common/directives/3dplot.tpl.html',
      controller: "LinegraphController",
      link: function (scope, element, attrs) {
      }
    }
  })
  .controller('LinegraphController', function($scope, $element){
    $scope.points;
    var margin = [80, 80, 80, 80]; 
    var width = ($element[0].offsetWidth - margin[1] - margin[3])/2; 
    var height = width; 
    $scope.minX;
    $scope.minY;
    $scope.maxX;
    $scope.maxY;

    $scope.scaleXFn = function(){
      return parseFloat($scope.scaleX || 1);
    }

    $scope.scaleYFn = function(){
     return parseFloat($scope.scaleY || 1); 
    }

    $scope.cropXFn = function(){
      return $scope.cropX ? $scope.minX : 0;
    }

    $scope.cropYFn = function(){
      return $scope.cropY ? $scope.minY : 0;
    }

    $scope.draw = function(){
      if(!$scope.points) return;
      
      $scope.minX = d3.min($scope.points, function(d) { return d[$scope.attrX]; });
      $scope.maxX = d3.max($scope.points, function(d) { return d[$scope.attrX]; });

      $scope.minY = d3.min($scope.points, function(d) { return d[$scope.attrY]; });
      $scope.maxY = d3.max($scope.points, function(d) { return d[$scope.attrY]; });

      if($scope.cropX){
        var x = d3.scale.linear().domain([0.00, ($scope.maxX-$scope.minX)*$scope.scaleXFn()]).range([0, width]);
      }
      else{
        var x = d3.scale.linear().domain([$scope.minX*$scope.scaleXFn(), $scope.maxX*$scope.scaleXFn()]).range([0, width]);
      }

      if($scope.cropY){
        var y = d3.scale.linear().domain([0.00, ($scope.maxY-$scope.minY)*$scope.scaleYFn()]).range([height, 0]); 
      }
      else{
        var y = d3.scale.linear().domain([$scope.minY* $scope.scaleYFn(), $scope.maxY* $scope.scaleYFn()]).range([height, 0]); 
      }
      var line = d3.svg.line().x(function(d,i) { 
        return x((d[$scope.attrX]-$scope.cropXFn())*$scope.scaleXFn()); 
      }).y(function(d) { 
        return y((d[$scope.attrY]-$scope.cropYFn())*$scope.scaleYFn());
      })
 
      var graph = d3.select("#graph").append("svg:svg")
            .attr("width", width + margin[1] + margin[3])
            .attr("height", height + margin[0] + margin[2])
          .append("svg:g")
            .attr("transform", "translate(" + margin[3] + "," + margin[0] + ")");
 
      var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(4);
      graph.append("svg:g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + (height)+ ")")
            .call(xAxis); 

      graph.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height - 6)
        .text($scope.axisLabelX);
      
      var yAxisLeft = d3.svg.axis().scale(y).ticks(4).orient("left");
      graph.append("svg:g")
            .attr("class", "y axis")
            .call(yAxisLeft);  

      graph.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", 6)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text($scope.axisLabelY);    

      graph.append("svg:path").attr("d", line($scope.points));
    }  

    $scope.$watch('points', $scope.draw)   
  });