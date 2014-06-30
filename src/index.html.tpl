<!DOCTYPE html>
<html ng-app="rockstar">
<head>
  <base href="/">
  <title>Rockstar Project Tracker</title>
  <link rel="stylesheet" type="text/css" href="<%- stylesheet %>"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"> 
</head>
<body ng-class="{loginbackground: $root.login==true}">
  <div class="container-fluid">
    <div ui-view="content"></div>
  </div>
</body>
<script type="text/javascript" src="<%- javascript %>"></script>
</html>