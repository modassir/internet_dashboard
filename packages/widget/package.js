Package.describe({
  name: 'widget',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.3.2');
  api.addFiles('widget.js');
  api.use(['underscore', 'mongo', 'aldeed:simple-schema']);
  api.use(['templating'], 'client');
  api.export('Widget');
  api.export('Widgets');
});
