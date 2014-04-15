module.exports = {

  build_dir: 'build',
  compile_dir: 'bin',
  bundle: '<%= build_dir %>/bundle.js',

  app_files: {
    // source, but NO specs
    js: [ 'src/**/*.js', '!src/**/*.spec.js', '!src/modules/**/*.js' ],
    modules: ['src/modules/**/*.js'],
    jsunit: [ 'src/**/*.spec.js' ],
    // our partial templates
    atpl: [ 'src/app/**/*.tpl.html' ],
    ctpl: [ 'src/common/**/*.tpl.html' ],
    // the index.html
    html: [ 'src/index.html' ],
    less: 'src/less/main.less',
    styles: [ 'src/less/**/*.less']
  },

  test_files: {
    js: [
      'vendor/jquery/jquery.js',
      'vendor/angular-mocks/angular-mocks.js',
      'vendor/jasmine-jquery/lib/jasmine-jquery.js'
    ]
  },

  vendor_files: {
    js: [
      'vendor/lodash/dist/lodash.underscore.js',
      'vendor/moment/moment.js',
      'vendor/angular/angular.js',
      'vendor/angular-cookies/angular-cookies.js',
      'vendor/angular-sanitize/angular-sanitize.js',
      'vendor/angular-moment/angular-moment.js',
      'vendor/angular-ui-router/release/angular-ui-router.js',
      'vendor/angular-bootstrap/ui-bootstrap-tpls.js',
      'vendor/mixin/object-mixin.js'
    ],
    css: [

    ],
    assets: [
      'vendor/strobe/**/*'
    ]
  }
};