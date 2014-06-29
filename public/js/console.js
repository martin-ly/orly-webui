require(['jquery', 'bootstrap', 'd3', 'packages'],
         function($, bootstrap, d3, pkgs) {
  // Append text to the log box.
  function log(text) {
    $('#log').val(function(idx, val) {
      return val + text + '\n';
    });
  };  // log
  function empty() {
    $('#table').empty();
    $('#graph').empty();
    $('#legend').empty();
  };  // empty
  function render_table(data) {
    empty();
    $('#table').append('<thead></thead><tbody></tbody>');
    $.each(data, function(idx, entry) {
      if (idx == 0) {
        var thead = '';
        thead += '<tr>';
        $.each(entry, function(key, val) {
          thead += '<th>' + key + '</th>';
        });
        thead += '</tr>';
        $('#table thead').append(thead);
      }  // if
      var tbody = '';
      tbody += '<tr>';
      $.each(entry, function(key, val) {
        tbody += '<td>' + val + '</td>';
      });
      tbody += '</tr>';
      $('#table tbody').append(tbody);
    });
  };  // render_table
  function render_graph(links) {
    empty();
    var width = 720, height = 300;
    var color = d3.scale.category10();
    var force = d3.layout.force()
                         .linkDistance(30)
                         .size([width, height]);
    var graph = d3.select('#graph')
                  .append('svg')
                  .attr('width', width)
                  .attr('height', height);
    graph.append('svg:defs')
         .selectAll('marker')
         .data(['end'])      // Different link/path types can be defined here
         .enter()
         .append('svg:marker')    // This section adds in the arrows
         .attr('id', String)
         .attr('viewBox', '0 -5 10 10')
         .attr('refX', 20)
         .attr('refY', 0)
         .attr('markerWidth', 6)
         .attr('markerHeight', 6)
         .attr('orient', 'auto')
         .append('svg:path')
         .attr('d', 'M0,-5L10,0L0,5');
    var node_map = {}, augmented_links = [], bilinks = [];
    links.forEach(function(link) {
      link.source = node_map[link.source] ||
                    (node_map[link.source] = {name : link.source});
      link.target = node_map[link.target] ||
                    (node_map[link.target] = {name : link.target});
    });
    var nodes = d3.values(node_map);
    var augmented_nodes = d3.values(node_map);
    links.forEach(function(link) {
      var source = link.source,
          edge = {},
          target = link.target,
          type = link.type;
      augmented_nodes.push(edge);
      augmented_links.push({source: source, target: edge}, {source: edge, target: target});
      bilinks.push({
        source: source,
        edge: edge,
        target: target,
        type: link.type
      });
    });
    force.nodes(augmented_nodes)
         .links(augmented_links)
         .charge(-300)
         .start();
    var link = graph.selectAll('.link')
                    .data(bilinks)
                    .enter()
                    .append('path')
                    .attr('class', 'link')
                    .attr('marker-end', 'url(#end)')
                    .style('stroke', function(d) { return color(d.type); });
    var node = graph.selectAll('.node')
                    .data(nodes)
                    .enter()
                    .append('circle')
                    .attr('class', 'node')
                    .attr('r', 6)
                    .style('fill', function(d) { return color(d.name); })
                    .call(force.drag);
    node.append('title').text(function(d) { return d.name; });
    var link_types = $.unique(links.map(function(d) { return d.type; }));
    var legend = d3.select('#legend')
                   .append('svg')
                   .attr('width', 720)
                   .attr('height', 10 + Math.max(nodes.length, link_types.length) * 20);
    var legend_node = legend.selectAll('.legend_node')
                            .data(nodes)
                            .enter()
                            .append('g')
                            .attr('class', 'legend_node')
                            .attr('transform',
                                  function(d, i) {
                                    return 'translate(10, ' + (10 + i * 20) + ')';
                                  });
    legend_node.append('circle')
               .attr('r', 6)
               .style('fill', function(d) { return color(d.name); });
    legend_node.append('text')
               .attr('x', 10)
               .attr('y', 4)
               .text(function(d) { return d.name; });
    var legend_link = legend.selectAll('.legend_link')
                            .data(link_types)
                            .enter()
                            .append('g')
                            .attr('class', 'legend_link')
                            .attr('transform',
                                  function(d, i) {
                                    return 'translate(370, ' + (10 + i * 20) + ')';
                                  });
    legend_link.append('line')
               .attr('x1', 0)
               .attr('y1', 0)
               .attr('x2', 20)
               .attr('y2', 0)
               .style('stroke-width', 3)
               .style('stroke', function(type) { return color(type); });
    legend_link.append('text')
               .attr('x', 25)
               .attr('y', 4)
               .text(function(type) { return type; });
    force.on('tick', function() {
      link.attr('d', function(d) {
        return 'M' + d.source.x + ',' + d.source.y +
               'S' + d.edge.x + ',' + d.edge.y +
               ' ' + d.target.x + ',' + d.target.y;
      });
      node.attr('transform', function(d) {
          return 'translate(' + d.x + ',' + d.y + ')';
      });
    });
  }  // render_graph
  var websocket = new WebSocket('ws://' + location.hostname + ':8082/');
  var pov_id = null;
  // Used to make synchronous calls to the server.
  function send(cmd, cb) {
    websocket.onmessage = function(resp) {
      log('received: ' + resp.data);
      if (cb) {
        cb($.parseJSON(resp.data));
      }  // if
    };
    websocket.send(cmd);
    log('sent: ' + cmd);
  };  // send
  function load(name, version) {
    send('install ' + name + '.' + version + ';', function() {
      send('list_packages;', function(data) {
        var result = data.result;
        var pkg_info = result.packages.filter(function(elem, idx) {
          return elem.name == name;
        })[0];
        // Populate the list of functions.
        $('#function').empty();
        if (typeof pkgs[name] === 'undefined') {
          pkgs[name] = {}
        }  // if
        if (typeof pkgs[name].functions === 'undefined') {
          pkgs[name].functions = {};
        }  // if
        $.each(pkg_info.functions, function(fn_name, signature) {
          if (typeof pkgs[name].functions[fn_name] === 'undefined') {
            pkgs[name].functions[fn_name] = {};
          }  // if
          $.each(signature.parameters, function(param_name, type) {
            if (typeof pkgs[name].functions[fn_name][param_name] === 'undefined') {
              pkgs[name].functions[fn_name][param_name] = type;
            }  // if
          });
          $('#function').append($('<option></option>')
                        .attr('value', fn_name).text(fn_name));
          // Populate the args table depending on the selected function.
          $('#function').unbind().change(function() {
            var fn_name = $('#function').val();
            $('#args tbody').empty();
            $.each(pkgs[name].functions[fn_name], function(key, val) {
              $('#args tbody').append(
                  '<tr>' +
                  '<td>' + key + '</td>' +
                  "<td><input id=" + key + " type='text' value=" +
                  JSON.stringify(val) + "></td>" +
                  '</tr>');
            });
          }).change();
        });
        // Bind run button to the 'try' statement.
        $('#run').unbind().click(function() {
          $('#modal-message').text('Running...');
          var modal = $('#modal');
          modal.modal('show');
          var args = [];
          $.each($('#args input'), function(idx, input) {
            var id = $(input).attr('id');
            var val = $(input).val();
            args.push('.' + id + ':' + val);
          });
          send('try {' + pov_id + '} ' + name + ' ' +
               $('#function').val() + ' ' +
               '<{' + args.join(', ') + '}>;', function(data) {
            try {
              if (data.status !== "ok") {
                return;
              }  // if
              var result = $.parseJSON(data.result);
              switch (result.type) {
                case 'table': {
                  render_table(result.data);
                  break;
                }  // case
                case 'graph': {
                  render_graph(result.data);
                  break;
                }  // case
                default: {
                  console.log(result);
                  break;
                }  // default
              }  // switch
            } finally {
              modal.modal('hide');
            }  // try
          });  // try_stmt
        });  // bind run
      });  // list_packages
    });  // install
  };  // load
  // For each preset package, the first time it gets pressed, install the package.
  $.each(pkgs, function(name, info) {
    // Construct a label and attach to dataset buttons.
    var label = $('<label></label>')
                    .attr('class', 'btn btn-default dataset')
                    .attr('id', name)
                    .append($('<input>').attr('type', 'radio'))
                    .append(info.desc);
    $('#datasets').append(label);
  });
  websocket.onclose = function() {
    $('#connection').removeClass('alert-success')
                    .addClass('alert-danger')
                    .text('Connection closed');
  };
  websocket.onerror = function() {
    $('#connection').removeClass('alert-success')
                    .addClass('alert-danger')
                    .text('Failed to connect');
  };
  websocket.onopen = function() {
    $('#connection').removeClass('alert-danger')
                    .addClass('alert-success')
                    .text('Connected');
    // Create a session.
    send('new session;', function() {
      // Create a new pov to perform try statements.
      send('new fast private pov;', function(data) {
        pov_id = data.result;
        $('#compile').click(function() {
          $('#modal-message').text('Compiling...');
          var modal = $('#modal');
          modal.modal('show');
          send('compile ' + JSON.stringify($('#orlyscript').val()) + ';', function(data) {
            try {
              var result = data.result;
              load(result.name, result.version);
              // Uncheck the radio button.
              $('.dataset').removeClass('active');
            } finally {
              modal.modal('hide');
            }  // try
          });
        });
      });  // new fast private pov
      // Bind install/listing functions for each pkg.
      $.each(pkgs, function(name, info) {
        var btn = $('#' + name);
        btn.change(function() {
          send('get_source ' + name + ';', function(data) {
            var result = data.result;
            $('#orlyscript').val(result.code);
            load(name, info.version);
          });  // get_source
        });  // bind event
      });  // for each pkg
    });  // new session
  };
  $('#modal').modal({
    backdrop: 'static',
    keyboard: false,
    show: false,
  });
  $('.dataset').button();  // Activate buttons.
});
