// Static package information.
//   Next step would be to send the source to the server and get it to compile
//   the package, etc and provide these information.
//   The list of functions for example are available in `<package_name>.orly.sig`.
packages = {
  'hello_world' :
    {'source' : '/* Hello World! */\n' +
                '\n' +
                'hello_world = (\"Hello, world! My name is \" + name + \".\") where {\n' +
                '  name = given::(str);\n' +
                '};\n',
     'package_num' : 0,
     'functions' : ['hello_world']},
  'database' :
    {'source' : '/* Database */\n' +
                '\n' +
                'package #1;\n' +
                '\n' +
                '/* Reads an integer from a location */\n' +
                "read_val = (*<['values', n]>::(int)) where {\n" +
                '    n = given::(int);\n' +
                '};\n' +
                '\n' +
                '/* Writes an integer to a location */\n' +
                'write_val = ((true) effecting {\n' +
                "  new <['values', n]> <- x;\n" +
                '} ) where {\n' +
                '  n = given::(int);\n' +
                '  x = given::(int);\n' +
                '};\n' +
                '\n' +
                '/* conditional append function */\n' +
                'conditional_append = (((true) effecting {\n' +
                '  *<[n]>::([int]) += [x];\n' +
                '} if *<[n]>::([int]?) is known else (true) effecting {\n' +
                '  new <[n]> <- [x];\n' +
                '} ))\n' +
                'where {\n' +
                '  n = given::(int);\n' +
                '  x = given::(int);\n' +
                '};',
     'package_num' : 1,
     'functions' : ['read_val', 'write_val', 'conditional_append']}
};

define([ 'jquery', 'bootstrap' ], function($) {
  var websocket = null;
  // Append text to the log box.
  function log(text) {
    $('#log').val(function(idx, val) {
      return val + text + '\n';
    });
  }
  // Send a message via web sockets with a onmessage handler.
  // Note. Used to simulate synchronous send calls.
  function send(msg, onmessage) {
    websocket.onmessage = function(resp) {
      log('received: ' + resp.data);
      if (onmessage) {
        onmessage(resp);
      }  // if
    };
    websocket.send(msg);
    log('sent: ' + msg);
  }
  // Set the functions options.
  function set_functions(options) {
    $('#function').empty();
    $.each(options, function(key, val) {
      $('#function').append($('<option></option>')
                    .attr('value', val).text(val));
    });
  }
  // Toggle the UI based on the state of the console.
  function toggle_ui(is_connected) {
    $('#connect').prop('disabled', is_connected);
    $('#disconnect').prop('disabled', !is_connected);
    $('.dataset').attr('disabled', !is_connected);
    if (!is_connected) {
      $('.dataset').removeClass('active');
      $('#run').prop('disabled', true);
    }  // if
  }
  // Connect button.
  $('#connect').click(function() {
    if (!'WebSocket' in window) {
      alert('WebSockets not supported by your browser.');
      return;
    }  // if
    websocket = new WebSocket('ws://127.0.0.1:8082/');
    websocket.onopen = function(resp) {
      toggle_ui(true);
    };
    websocket.onclose = function(resp) {
      toggle_ui(false);
    };
    websocket.onerror = function(resp) {
      alert("Failed to connect.");
    };
  });
  // Disconnect button.
  $('#disconnect').click(function() {
    send('exit;', function(resp) { websocket.close(); });
  });
  // The packages that we have available.
  $.each(packages, function(name, info) {
    button = $('#' + name);
    button.click(function() {
      if (button.hasClass('active')) {
        return;
      }  // if
      $('#orlyscript').val(info.source);
      send('new session;', function(resp) {
        send('new fast private pov;', function(resp) {
          var data = $.parseJSON(resp.data);
          var id = data.result;
          send('install ' + name + '.' + info.package_num + ';', function(resp) {
            set_functions(info.functions);
            $('#run').unbind('click').click(function() {
              send('try {' + id + '} ' + name + ' ' +
                   $('#function').val() + ' ' + $('#args').val() + ';');
            });
            $('#run').prop('disabled', false);
          });
        });
      });
    });
  });
  $('.btn').button();  // Activate buttons.
  toggle_ui(false);  // Start in a disconnected state.
});

