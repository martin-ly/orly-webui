packages = {
  'matrix' : {
    'address' : 'ws://127.0.0.1:8082/',
    'data' : 'matrix.bin',
    'source' : '/* Matrix */\n' +
               '\n' +
               '/* Set up nodes and edges. */\n' +
               'setup = (<{.type: "null"}>) effecting {\n' +
               '  new <[0]> <- "Neo";\n' +
               '  new <[1]> <- "Morpheus";\n' +
               '  new <[2]> <- "Trinity";\n' +
               '  new <[3]> <- "Cypher";\n' +
               '  new <[4]> <- "Agent Smith";\n' +
               '  new <[5]> <- "The Architect";\n' +
               '  new <[0, "Knows", 1]> <- true;\n' +
               '  new <[0, "Loves", 2]> <- true;\n' +
               '  new <[1, "Knows", 2]> <- true;\n' +
               '  new <[1, "Knows", 3]> <- true;\n' +
               '  new <[3, "Knows", 4]> <- true;\n' +
               '  new <[4, "CodedBy", 5]> <- true;\n' +
               '};\n' +
               '\n' +
               'node_t is <{.name: str}>;\n' +
               'link_t is <{.source: int, .type: str, .target: int}>;\n' +
               '\n' +
               'display_graph = (<{.type: "graph",\n' +
               '                   .data: <{.nodes: nodes as [node_t],\n' +
               '                            .links: links as [link_t]}>}>) where {\n' +
               '  nodes = <{.name: *(keys (str) @ <[free::(int)]>)::(str)}>;\n' +
               '  links = (<{.source: tuples.0, .type: tuples.1, .target: tuples.2}>) where {\n' +
               '    tuples = keys (bool) @ <[free::(int), free::(str), free::(int)]>;\n' +
               '  };\n' +
               '};\n' +
               '\n' +
               '/* Type aliases. */\n' +
               'path_t is [int];\n' +
               'entry_t is {str: str};\n' +
               '\n' +
               '/* Given a path, explore one more depth and return a list of paths. */\n' +
               'get_neighbors_helper = (path + [next] as [path_t]) where {\n' +
               '  path = given::(path_t);\n' +
               '  edge = given::(str);\n' +
               '  visited = given::({int});\n' +
               '  last = path[length_of path - 1];\n' +
               '  next = (keys (bool) @ <[last, edge, free::(int)]>).2 if not (that in visited);\n' +
               '};\n' +
               '\n' +
               '/* Given a list of paths of length N, explore one more depth to return a list of\n' +
               '   paths of length N + 1. */\n' +
               'get_neighbors = (seq reduce start empty [path_t] + that) where {\n' +
               '  paths = given::([path_t]);\n' +
               '  edge = given::(str);\n' +
               '  visited = given::({int});\n' +
               '  seq = get_neighbors_helper(.path: **paths, .edge: edge, .visited: visited);\n' +
               '};\n' +
               '\n' +
               '/* Returns a list of valid paths. */\n' +
               'bfs_helper = ((paths \n' +
               '               if neighbors is empty else \n' +
               '               paths + bfs_helper(.paths: neighbors, .edge: edge, .visited: new_visited))) where {\n' +
               '  paths = given::([path_t]);\n' +
               '  edge = given::(str);\n' +
               '  visited = given::({int});\n' +
               '  new_visited = visited | (**paths reduce start empty {int} | (**that as {int}));\n' +
               '  neighbors = get_neighbors(.paths: paths, .edge: edge, .visited: new_visited);\n' +
               '};\n' +
               '\n' +
               'bfs = (bfs_helper(.paths: init, .edge: edge, .visited: visited)) where {\n' +
               '  n = given::(int);\n' +
               '  edge = given::(str);\n' +
               '  paths = [[n]];\n' +
               '  visited = {n};\n' +
               '  init = get_neighbors(.paths : paths, .edge: edge, .visited: visited);\n' +
               '};\n' +
               '\n' +
               '/* Format a path to an dict of type {str}. */\n' +
               'format = ({"A: first": first, "B: path": join(.strs: (seq as [str]), .delimiter: " -> "), "C: last": last}) where {\n' +
               '  path = given::(path_t);\n' +
               '  first = *<[path[0]]>::(str);\n' +
               '  last = *<[path[length_of path - 1]]>::(str);\n' +
               '  seq = *<[**path]>::(str);\n' +
               '};\n' +
               '\n' +
               'display_bfs = (<{.type: "table",\n' +
               '                 .data: format(.path: **bfs(.n: n, .edge: edge)) as [entry_t]}>) where {\n' +
               '  n = given::(int);\n' +
               '  edge = given::(str);\n' +
               '};\n' +
               '\n' +
               'join = (("" if strs is empty else \n' +
               '         strs[0] + (**(strs[1:]) reduce start "" + delimiter + that))) where {\n' +
               '  strs = given::([str]);\n' +
               '  delimiter = given::(str);\n' +
               '};\n' +
               '\n' +
               'test {\n' +
               '  join(.strs: empty [str], .delimiter: ", ") == "";\n' +
               '  join(.strs: ["x"], .delimiter: ", ") == "x";\n' +
               '  join(.strs: ["x", "y"], .delimiter: ", ") == "x, y";\n' +
               '};\n' +
               '\n' +
               'test {\n' +
               '  setup.type == "null" {\n' +
               '    bfs(.n: 0, .edge: "Knows") == [[0, 1], [0, 1, 2], [0, 1, 3], [0, 1, 3, 4]];\n' +
               '  };\n' +
               '};\n',
    'package_num' : 0,
    'functions' : {
      'setup': {},
      'display_bfs' : {
        'n' : 0,
        'edge' : '"Knows"'
      },
      'display_graph' : {},
    }
  },
  'beer' : {
    'address' : 'ws://127.0.0.1:8084/',
    'data' : 'beer.bin',
    'source' : '/* Beer */\n' +
                '\n' +
                'package #1;\n',
    'package_num' : 1,
    'functions' : {
      'beer' : {
        /*
        'n' : 101
        */
      }
    }
  },
};

define(['jquery', 'bootstrap', 'd3'], function($, bootstrap, d3) {
  // Append text to the log box.
  function log(text) {
    $('#log').val(function(idx, val) {
      return val + text + '\n';
    });
  }
  function empty() {
    $('#table').empty();
    $('#graph').empty();
    $('#legend').empty();
  }
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
  }
  function render_graph(data) {
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
    var nodes = data.nodes.slice(), links = [], bilinks = [];
    data.links.forEach(function(link) {
      var source = nodes[link.source],
          edge = {},
          target = nodes[link.target],
          type = link.type;
      nodes.push(edge);
      links.push({source: source, target: edge}, {source: edge, target: target});
      bilinks.push({
        source: source,
        edge: edge,
        target: target,
        type: link.type
      });
    });
    force.nodes(nodes)
         .links(links)
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
                    .data(data.nodes)
                    .enter()
                    .append('circle')
                    .attr('class', 'node')
                    .attr('r', 6)
                    .style('fill', function(d) { return color(d.name); })
                    .call(force.drag);
    node.append('title').text(function(d) { return d.name; });
    var link_types = $.unique(data.links.map(function(d) { return d.type; }));
    var legend = d3.select('#legend')
                   .append('svg')
                   .attr('width', 720)
                   .attr('height', 10 + Math.max(data.nodes.length, link_types.length) * 20);
    var legend_node = legend.selectAll('.legend_node')
                            .data(data.nodes)
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
  }
  // The packages that we have available.
  $.each(packages, function(name, info) {
    var button = $('#' + name);
    var websocket = null;
    // Send a message via web sockets with a onmessage handler.
    // Note. Used to simulate synchronous send calls.
    var send = function(msg, onmessage) {
      websocket.onmessage = function(resp) {
        log('received: ' + resp.data);
        if (onmessage) {
          onmessage(resp);
        }  // if
      };
      websocket.send(msg);
      log('sent: ' + msg);
    }
    button.one('change', function() {
      websocket = new WebSocket(info.address);
      websocket.onerror = function(resp) {
        alert("Failed to connect.");
      };
      websocket.onopen = function(resp) {
        send('new session;', function(resp) {
          /*
          send('begin import;', function(resp) {
            send('import "' + info.data + '" 1 1 1;', function(resp) {
              send('end import;', function(resp) {
              */
                send('install ' + name + '.' + info.package_num + ';', function(resp) {
                  send('new fast private pov;', function(resp) {
                    var data = $.parseJSON(resp.data);
                    var id = data.result;
                    button.change(function() {
                      // Display source.
                      $('#orlyscript').val(info.source);
                      // Populate the list of functions.
                      $('#function').empty();
                      $.each(info.functions, function(key, val) {
                        $('#function').append($('<option></option>')
                                              .attr('value', key).text(key));
                      });
                      // Populate the args table depending on the selected function.
                      $('#function').unbind().change(function() {
                        $('#args tbody').empty();
                        $.each(info.functions[$('#function').val()], function(key, val) {
                          $('#args tbody').append(
                              '<tr>' +
                              '<td>' + key + '</td>' +
                              "<td><input id=" + key + " type='text' value='" + val + "'></td>" +
                              '</tr>');
                        });
                      }).change();
                      // Bind run button to the 'try' statement.
                      $('#run').unbind().click(function() {
                        var args = [];
                        $.each($('#args input'), function(idx, input) {
                          var id = $(input).attr('id');
                          var val = $(input).val();
                          args.push('.' + id + ':' + val);
                        });
                        send('try {' + id + '} ' + name + ' ' +
                             $('#function').val() + ' ' +
                             '<{' + args.join(', ') + '}>;', function(resp) {
                          var data = $.parseJSON(resp.data);
                          if (data.status !== "ok") {
                            return;
                          }  // if
                          var result = data.result;
                          switch (result.type) {
                            case 'null': {
                              break;
                            }  // case
                            case 'table': {
                              render_table(result.data);
                              break;
                            }  // case
                            case 'graph': {
                              render_graph(result.data);
                              break;
                            }  // case
                          }  // switch
                        });
                      });
                    }).change();
                  });
                });
                /*
              });
            });
          });
        */
        });
      }
    });
  });
  $('.btn').button();  // Activate buttons.
});

