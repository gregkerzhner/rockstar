angular.module('rockstar.common.directives.linegraph', [])
  .directive('linegraph', function(){
    return {
      restrict: "A",
      scope: {
        attempt: "=attempt"
      },
      //templateUrl: 'common/directives/3dplot.tpl.html',
      controller: "LinegraphController",
      link: function (scope, element, attrs) {

      }
    }
  })
  .controller('LinegraphController', function($scope, $element){
    $scope.attempt;
    var margin = [80, 80, 80, 80]; // margins
    var width = $element[0].offsetWidth - margin[1] - margin[3]; // width
    var height = $element[0].offsetWidth - margin[0] - margin[2]; // height
    $scope.draw = function(){
      if(!$scope.attempt) return;
      var minHeight = $scope.attempt.coordinates[0].altitude;
      var startTime =  $scope.attempt.coordinates[0].time;
      var maxHeight = $scope.attempt.coordinates[$scope.attempt.coordinates.length - 1].altitude
      var endTime = $scope.attempt.coordinates[$scope.attempt.coordinates.length - 1].time
      var x = d3.scale.linear().domain([startTime, endTime]).range([0, width]);
      var y = d3.scale.linear().domain([minHeight, maxHeight]).range([height, 0]);

      var line = d3.svg.line()
      // assign the X function to plot our line as we wish
      .x(function(d,i) { 
        // verbose logging to show what's actually being done
        console.log('Plotting X value for data point: ' + d + ' using index: ' + i + ' to be at: ' + x(d.time) + ' using our xScale.');
        // return the X coordinate where we want to plot this datapoint
        return x(d.time); 
      })
      .y(function(d) { 
        // verbose logging to show what's actually being done
        console.log('Plotting Y value for data point: ' + d + ' to be at: ' + (d.altitude) + " using our yScale.");
        // return the Y coordinate where we want to plot this datapoint
        return y(d.altitude); 
      })
 
      // Add an SVG element with the desired dimensions and margin.
      var graph = d3.select("#graph").append("svg:svg")
            .attr("width", width + margin[1] + margin[3])
            .attr("height", height + margin[0] + margin[2])
          .append("svg:g")
            .attr("transform", "translate(" + margin[3] + "," + margin[0] + ")");
 
      // create yAxis
      var xAxis = d3.svg.axis().scale(x).tickSize(-height).tickSubdivide(true);
      // Add the x-axis.
      graph.append("svg:g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);
 
 
      // create left yAxis
      var yAxisLeft = d3.svg.axis().scale(y).ticks(4).orient("left");
      // Add the y-axis to the left
      graph.append("svg:g")
            .attr("class", "y axis")
            .attr("transform", "translate(-25,0)")
            .call(yAxisLeft);
      
        // Add the line by appending an svg:path element with the data line we created above
      // do this AFTER the axes above so that the line is above the tick-lines
        graph.append("svg:path").attr("d", line($scope.attempt.coordinates));
    }  

    $scope.$watch('attempt', $scope.draw)   
  });