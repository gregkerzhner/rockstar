angular.module('templates-main', ['common/directives/3dplot.tpl.html', 'common/directives/screensaver.tpl.html', 'common/directives/spinner.tpl.html', 'common/layout/header.tpl.html', 'common/layout/sidebar.tpl.html', 'dashboard/attempt.tpl.html', 'dashboard/dashboard-container.tpl.html', 'dashboard/dashboard.tpl.html', 'dashboard/user-climb.tpl.html', 'dashboard/user-climbs.tpl.html', 'login/login.tpl.html', 'tracker/new-climb.tpl.html', 'tracker/tracker.tpl.html']);

angular.module("common/directives/3dplot.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/directives/3dplot.tpl.html",
    "{{attempt}}");
}]);

angular.module("common/directives/screensaver.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/directives/screensaver.tpl.html",
    "<audio id=\"audio\" controls=\"controls\" onended=\"this.play();\" src=\"http://www.culturebully.com/wp-content/uploads/2011/04/01%20-%20Girl%20Talk%20-%20What%20It%27s%20All%20About.mp3\"  autobuffer></audio>");
}]);

angular.module("common/directives/spinner.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/directives/spinner.tpl.html",
    "<div class=\"row overlay big-font\" ng-if=\"show\">\n" +
    "    <div class=\"col-md-6\">\n" +
    "      Recording climb\n" +
    "    </div>\n" +
    "    <div class=\"col-md-6\">\n" +
    "      <img src=\"assets/ajax-loader.gif\"></img>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-6\">\n" +
    "      Location accuracy: {{accuracy.accuracy}}\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"col-md-6\">\n" +
    "      Altitude accuracy: {{accuracy.altitudeAccuracy || \"Not Available\"}}\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("common/layout/header.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/layout/header.tpl.html",
    "<div class=\"row\">\n" +
    "  <div class=\"col-md-12 small-pad\">\n" +
    "    <h1 class=\"pull-left\">Welcome {{currentUser.displayName}}</h1>\n" +
    "    <img class=\"pull-right pad\" src='{{currentUser.facebookPicture}}'></img>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("common/layout/sidebar.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/layout/sidebar.tpl.html",
    "<div class=\"col-md-2\">\n" +
    "  <div class=\"col-md-12 pad\">\n" +
    "    <a class=\"btn btn-info stretch\" ui-sref=\"rockstar.dashboard-container.dashboard.user-climbs\">Your Climbs</a>\n" +
    "  </div>\n" +
    "  <div class=\"col-md-12 pad\">\n" +
    "    <a class=\"btn btn-info stretch\" ui-sref=\"rockstar.tracker\">Record new attempt</a>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("dashboard/attempt.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("dashboard/attempt.tpl.html",
    "<div class=\"col-md-10\">\n" +
    "  <h1>Attempt</h1>\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-md-12\">\n" +
    "      Climb duration: {{climbDuration}} seconds.\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-md-12\">\n" +
    "      Climb notes: {{attempt.notes}}\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-md-12\">\n" +
    "      <div linegraph \n" +
    "        points=\"coordinates\" \n" +
    "        id=\"graph\" \n" +
    "        attr-x=\"time\"\n" +
    "        attr-y=\"altitude\"\n" +
    "        scale-x=\"0.001\"\n" +
    "        crop-x=\"true\"\n" +
    "        crop-y=\"true\"\n" +
    "        axis-label-x=\"Time (Seconds)\"\n" +
    "        axis-label-y=\"Height (Meters)\"\n" +
    "        ></div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"col-md-12\">\n" +
    "      <div linegraph \n" +
    "        points=\"coordinates\" \n" +
    "        id=\"graph\" \n" +
    "        attr-x=\"time\"\n" +
    "        attr-y=\"speed\"\n" +
    "        scale-x=\"0.001\"\n" +
    "        crop-x=\"true\"\n" +
    "        crop-y=\"true\"\n" +
    "        axis-label-x=\"Time (Seconds)\"\n" +
    "        axis-label-y=\"Speed (Meters/second)\"\n" +
    "        ></div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("dashboard/dashboard-container.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("dashboard/dashboard-container.tpl.html",
    "<div ui-view=\"header\"></div>\n" +
    "  <div ui-view=\"sidebar\"></div>\n" +
    "  <div ui-view></div>");
}]);

angular.module("dashboard/dashboard.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("dashboard/dashboard.tpl.html",
    "<!--<div ui-view=\"header\"></div>\n" +
    "<div ui-view=\"sidebar\"></div>\n" +
    "\n" +
    "-->\n" +
    "<div ng-include=\"'common/layout/header.tpl.html'\" ng-controller=\"HeaderController\"></div>\n" +
    "<div ng-include=\"'common/layout/sidebar.tpl.html'\" ng-controller=\"SidebarController\"></div>\n" +
    "<div ui-view=\"content\"></div>");
}]);

angular.module("dashboard/user-climb.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("dashboard/user-climb.tpl.html",
    "<div class=\"col-md-10\">\n" +
    "  <h1>Your {{attempts[attempts.length-1].number}} tries for climb {{userClimb.climb.name}}</h1>\n" +
    "  <table class=\"table table-striped\">\n" +
    "  	<th>\n" +
    "  		<td>Number</td>\n" +
    "      <td>Date</td>\n" +
    "      <td>Length</td>\n" +
    "	 </th>\n" +
    "		<tr ng-repeat=\"attempt in attempts\" class=\"small-pad\">\n" +
    "      <td></td>\n" +
    "      <td>\n" +
    "        <a ui-sref=\"rockstar.dashboard.attempt({ user_climb_id: userClimbId,\n" +
    "        attempt_id: attempt._id\n" +
    "        })\">{{attempt.number}}</a>\n" +
    "      </td>\n" +
    "      <td>        \n" +
    "        <a ui-sref=\"rockstar.dashboard.attempt({ user_climb_id: userClimbId,\n" +
    "        attempt_id: attempt._id\n" +
    "        })\">{{attempt.date}}</a>\n" +
    "      </td>\n" +
    "      <td>\n" +
    "        {{attempt.duration}} seconds  \n" +
    "      </td>\n" +
    "	  </tr>\n" +
    "  </table>\n" +
    "</div>");
}]);

angular.module("dashboard/user-climbs.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("dashboard/user-climbs.tpl.html",
    "<div class=\"col-md-8\">\n" +
    "  <h1>Your climbs</h1>\n" +
    "  <table class=\"table table-striped\">\n" +
    "  	<tr>\n" +
    "      <th/>\n" +
    "	  	<th sort by=\"order\" reverse=\"reverse\" order=\"'climb.name'\">Name</th>\n" +
    "	  	<th sort by=\"order\" reverse=\"reverse\" order=\"'area.name'\">Area</th> \n" +
    "		</tr>\n" +
    "		<tr ng-repeat=\"userClimb in userClimbs | orderBy:order:reverse\" \n" +
    "        class=\"small-pad\">\n" +
    "			<td></td>\n" +
    "			<td>\n" +
    "	    	<a ui-sref=\"rockstar.dashboard.user-climb({ user_climb_id: userClimb._id})\">{{userClimb.climb.name}}</a>\n" +
    "	    </td>\n" +
    "	    <td>\n" +
    "	    	<a href=\"rockstar.dashboard.user-climb({ user_climb_id: userClimb._id})\">{{userClimb.area.name}}</a>\n" +
    "	    </td>\n" +
    "	  </tr>\n" +
    "  </table>\n" +
    "</div>");
}]);

angular.module("login/login.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("login/login.tpl.html",
    "<div class=\"col-md-6 col-md-offset-3 top-margin big-font\">\n" +
    "  <div class=\"small-pad well\">\n" +
    "    Rockstar is Nike Plus for rock climbing. Climb with it in your pocket and it will record your climb.  Or, just use it to log your attempts and take notes.  Either way, with Rockstar, you can dork out like never before! \n" +
    "    <a href=\"/auth/facebook\" target=\"_self\">\n" +
    "      <img src=\"rockstar/img/login_fb.png\" class=\"facebook-image\"></img>\n" +
    "    </a>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("tracker/new-climb.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("tracker/new-climb.tpl.html",
    "<div class=\"col-md-8\">\n" +
    "  <div class=\"small-pad\">\n" +
    "    <form ng-submit=\"submit()\">\n" +
    "      <span>Name</span>\n" +
    "      <input ng-model=\"name\"></input>\n" +
    "      <button type=\"submit\" class=\"btn btn-success\">Create</button>\n" +
    "    </form>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("tracker/tracker.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("tracker/tracker.tpl.html",
    "<div screensaver state=\"state\"></div>\n" +
    "<div class=\"relative col-md-12\">\n" +
    "  <div ng-if=\"state=='begin'\">\n" +
    "    <div class=\"row\">\n" +
    "    	<div class=\"col-md-12\">\n" +
    "    	  Select a climb\n" +
    "    	  <select ng-model=\"attempt.climb\" ng-options=\"c['_id'] as c.name for c in climbs\" class=\"strech small-margin-top-bottom\" ></select>\n" +
    "    	</div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "    	<div class=\"col-md-12\">\n" +
    "    	  <a class=\"btn btn-success strech small-margin-top-bottom\" href=\"/new-climb\">Add New Climb</a>\n" +
    "    	</div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "    	<div class=\"col-md-12\">\n" +
    "    	  <a class=\"btn btn-warning strech small-margin-top-bottom\" ng-click=\"startClimb()\">Start</a>\n" +
    "    	</div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "	<div class=\"row\" ng-if=\"state=='recording'\">\n" +
    "    <div class=\"col-md-6\">\n" +
    "      Recording climb\n" +
    "    </div>\n" +
    "    <div class=\"col-md-6\">\n" +
    "      <img src=\"assets/ajax-loader.gif\"></img>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-6\">\n" +
    "      Location accuracy: {{accuracy.accuracy}}\n" +
    "    </div>\n" +
    "    <div class=\"col-md-6\">\n" +
    "      Altitude accuracy: {{accuracy.altitudeAccuracy || \"Not Available\"}}\n" +
    "    </div>\n" +
    "    <div class=\"col-md-12\">\n" +
    "      <a class=\"btn btn-danger strech small-margin-top-bottom\" ng-click=\"stopClimb()\">Stop</a>\n" +
    "    </div>\n" +
    "	</div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"col-md-12\" ng-if=\"state=='recorded'\">\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-md-12\">Notes</div>\n" +
    "  </div>\n" +
    "  <textarea\n" +
    "    ng-model=\"attempt.notes\"\n" +
    "  >    \n" +
    "  </textarea>\n" +
    "  <div class=\"row\">\n" +
    "    <a class=\"btn btn-success strech small-margin-top-bottom\" ng-click=\"saveClimb()\">Save</a>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div ng-if=\"state=='begin'\">\n" +
    "  <div class=\"col-md-6\">\n" +
    "    Location accuracy: {{accuracy.accuracy}}\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"col-md-6\">\n" +
    "    Altitude accuracy: {{accuracy.altitudeAccuracy || \"Not Available\"}}\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);
