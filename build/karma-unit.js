module.exports = function ( karma ) {
  karma.set({
    /** 
     * From where to look for files, starting with the location of this file.
     */
    basePath: '../',

    /**
     * This is the list of file patterns to load into the browser during testing.
     */
    files: [
      'vendor/lodash/dist/lodash.underscore.js',
      'vendor/moment/moment.js',
      'vendor/angular/angular.js',
      'vendor/angular-cookies/angular-cookies.js',
      'vendor/angular-sanitize/angular-sanitize.js',
      'vendor/angular-moment/angular-moment.js',
      'vendor/angular-ui-router/release/angular-ui-router.js',
      'vendor/angular-bootstrap/ui-bootstrap-tpls.js',
      'vendor/mixin/object-mixin.js',
      'vendor/d3/d3.js',
      'vendor/three/three.min.js',
      'build/templates-app.js',
      'vendor/jquery/jquery.js',
      'vendor/angular-mocks/angular-mocks.js',
      'vendor/jasmine-jquery/lib/jasmine-jquery.js',
      
      'src/**/*.js',
      '!src/modules/**/*.js',
      'build/bundle.js',
      {pattern: 'data/**/*.json', watched: true, served: true, included: false}
    ],
    exclude: [
      'src/assets/**/*.js'
    ],
    frameworks: [ 'jasmine' ],
    plugins: [ 'karma-jasmine', 'karma-firefox-launcher', 'karma-chrome-launcher', 'karma-phantomjs-launcher', 'karma-osx-reporter', 'karma-junit-reporter' ],

    /**
     * On which port should the browser connect, on which port is the test runner
     * operating, and what is the URL path for the browser to use.
     */
    port: 9018,
    runnerPort: 9100,
    urlRoot: '/',

    /** 
     * Disable file watching by default.
     */
    autoWatch: false,
    singleRun: true,

    reporters: ['progress'],



    /**
     * The list of browsers to launch to test on. This includes only "Firefox" by
     * default, but other browser names include:
     * Chrome, ChromeCanary, Firefox, Opera, Safari, PhantomJS
     *
     * Note that you can also use the executable name of the browser, like "chromium"
     * or "firefox", but that these vary based on your operating system.
     *
     * You may also leave this blank and manually navigate your browser to
     * http://localhost:9018/ when you're running tests. The window/tab can be left
     * open and the tests will automatically occur there during the build. This has
     * the aesthetic advantage of not launching a browser every time you save.
     */
    browsers: [
      'PhantomJS'
    ]
  });
};

