var appFiles = {
  // source, but NO specs
  js: [ 'src/**/*.js', 'tmp/templates.js', '!src/**/*.spec.js', '!src/modules/**/*.js' ],
  modules: ['src/modules/**/*.js'],
  jsunit: [ 'src/**/*.spec.js' ],
  // our partial templates
  atpl: [ 'src/**/*.tpl.html' ],
  ctpl: [ 'src/**/*.tpl.html' ],
  // the index.html
  html: [ 'src/index.html' ],
  less: 'src/less/main.less',
  styles: [ 'src/less/**/*.less']
}

var vendorFiles =  {
  js: [
    'vendor/angular/angular.js',
    'vendor/angular-ui-router/release/angular-ui-router.js',
    'vendor/angular-resource/angular-resource.js',
    'vendor/jquery/dist/jquery.js',
    'vendor/bootstrap/dist/js/bootstrap.js',
    'vendor/d3/d3.js'
  ],
  css: [

  ],
  assets: [
    'vendor/strobe/**/*'
  ]
}

var testFiles = {
  js: [
    'vendor/jquery/jquery.js',
    'vendor/angular-mocks/angular-mocks.js',
    'vendor/jasmine-jquery/lib/jasmine-jquery.js'
  ]
}


module.exports = {

  build_dir: 'public',

  appFiles: appFiles,

  testFiles: testFiles,

  vendorFiles: vendorFiles,

  jsFiles: vendorFiles.js.concat(appFiles.js)
};