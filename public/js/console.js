define(['jquery'], function($) {
  function toggle_ui(is_connected) {
    $('#connect').prop('disabled', is_connected);
    $('#query').prop('disabled', !is_connected);
    $('#disconnect').prop('disabled', !is_connected);
    $('#run').prop('disabled', !is_connected);
  }
  var websocket = null;
  $('#connect').click(function() {
    if (!'WebSocket' in window) {
      alert('WebSockets not supported by your browser.');
      return;
    }  // if
    websocket = new WebSocket('ws://echo.websocket.org');
    // TODO: Talk to the orlyi websocket interface.
    // websocket = new WebSocket('ws://127.0.0.1:8082/');
    websocket.onopen = function(result) {
      toggle_ui(true /* is_connected */);
    };
    websocket.onclose = function(result) {
      toggle_ui(false /* is_connected */);
    };
    websocket.onerror = function(result) {
      alert("Failed to connect.");
    };
    websocket.onmessage = function(result) {
      // TODO: Use $.parseJSON to parse the data.
      //       orlyi doesn't seem to be returning
      //       well-formatted JSON at this point.
      $('#result').val(result.data);
    };
  });
  $('#disconnect').click(function() {
    websocket.close();
  });
  $('#run').click(function() {
    query = $("#query").val();
    websocket.send(query);
  });
});

