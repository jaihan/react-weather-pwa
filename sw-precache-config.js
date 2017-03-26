module.exports = {
  stripPrefix: 'build/',
  staticFileGlobs: [
    'build/*.html',
    'build/manifest.json',
    'build/static/**/!(*map*)'
  ],
  runtimeCaching: [{
    urlPattern: /^https:\/\/query.yahooapis.com\/v1\/public\/yql/,
    handler: 'networkFirst',
    options: {
      cache: {
        maxEntries: 10,
        name: 'weather-data-cache'
      }
    }
  }],
  dontCacheBustUrlsMatching: /\.\w{8}\./,
  swFilePath: 'build/service-worker.js'
};
