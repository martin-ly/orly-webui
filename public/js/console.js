define(['jquery'], function($) {
  if (!'WebSocket' in window) {
    alert('WebSockets not supported by your browser.');
    return;
  }  // if
  var websocket = new WebSocket('ws://echo.websocket.org/');
  websocket.onmessage = function(result) {
    alert('Result: ' + result.data);
  };
  $("input[value='Run']").bind('click', function() {
    query = $("textarea[name='query']").val();
    websocket.send(query);
  });
});

