require.config({
  baseUrl: "js",
  paths: {
    "bootstrap": "bootstrap.min",
    "jquery": "jquery.min",
    "d3": "http://d3js.org/d3.v3.min",
    "packages": "packages",
  },
  shim: {
    "bootstrap": ["jquery"]
  }
});

// TODO: Only load console if we get routed to /console.
require(['console']);
