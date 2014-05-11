var orly_console = {

  connect : function() {
    if (!'WebSocket' in window) {
      alert('WebSockets not supported by your browser.');
      return;
    }  // if
    websocket = new WebSocket('ws://echo.websocket.org/');
    websocket.onmessage = function(result) {
      alert('Result: ' + result.data);
    };
  },

  run : function() {
    query = $("textarea[name='query']").val();
    websocket.send(query);
  },

  websocket : null,

};

$(function() {
  orly_console.connect();
  $("input[value='Run']").bind('click', orly_console.run);
});

