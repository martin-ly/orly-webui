require.config({
  baseUrl: "js",
  paths: {
    "jquery": "jquery.min",
  }
});

// TODO: Only load console if we get routed to /console.
require(['console']);

