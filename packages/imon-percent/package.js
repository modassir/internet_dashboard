Package.describe({
  name: 'imon-percent',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');

  api.use(['imon-data', 'underscore', 'widget', 'country-info']);
  api.use(['templating', 'fortawesome:fontawesome'], 'client');

  api.addFiles(['imon_percent.js']);
  api.addFiles([
    'client/info.html',
    'client/settings.html',
    'client/settings.js',
    'client/widget.html',
    'client/widget.js',
    'client/widget.css',
    ], 'client');

  api.export('IMonPercent');
});
