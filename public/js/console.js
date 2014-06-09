packages = {
  'matrix' : {
    'address' : 'ws://127.0.0.1:8082/',
    'source' : '/* Matrix */\n' +
               '\n' +
               'package #1;\n',
    'package_num' : 0,
    'functions' : {
      'setup': {},
      'display_bfs' : {
        'n' : 0,
        'edge' : '"Knows"',
      },
      'display_graph' : {},
    },
  },
  'twitter' : {
    'address' : 'ws://127.0.0.1:8082/',
    'source' : '/* Twitter */\n' +
                '\n' +
                'package #1;\n',
    'package_num' : 1,
    'functions' : {
      'users' : {},
      'total_tweet_count' : {},
      'tweet_count' : {
        'uid': 0,
      },
      'tweets' : {
        'uid': 0,
      },
      'responded_to' : {
        'uid': 0,
      },
      'top_users' : {
        'n': 10,
      },
      'top_kgrams' : {
        'n': 10,
        'k': 2,
      },
      'top_pairs': {
        'n': 10,
      },
      'top_replied': {
        'n': 10,
      },
    },
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
    console.log(links);
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
                  });
                });
              }).change();
            });
          });
        });
      }
    });
  });
  $('.btn').button();  // Activate buttons.
});

