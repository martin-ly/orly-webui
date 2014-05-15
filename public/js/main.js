require.config({
  baseUrl: "js",
  paths: {
    "bootstrap": "bootstrap.min",
    "jquery": "jquery.min",
  },
  shim: {
    "bootstrap": ["jquery"]
  }
});

// TODO: Only load console if we get routed to /console.
require(['console']);

