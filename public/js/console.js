pkgs = {
  /*
  beer: {
    desc: 'Beer',
    src: '',
    version: 0,
  },
  complete_graph: {
    desc: 'Complete Graph',
    version: 0,
  },
  game_of_thrones: {
    desc: 'Game of Thrones',
    version: 0,
  },
  money_laundering: {
    desc: 'Money Laundering',
    version: 0,
  },
  belgian_beer: {
    desc: 'Belgian Beer',
    version: 0,
  },
  friends_of_friends: {
    desc: 'Friends of Friends',
    version: 0,
  },
  */
  matrix: {
    desc: 'The Matrix',
    src: '/* matrix.orly\n' +
         '\n' +
         '   This is a package written to play with the matrix data for the js web console.  */\n' +
         '\n' +
         '/* Set up nodes and edges. */\n' +
         'setup = (true) effecting {\n' +
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
         '/* Convenience type aliases. */\n' +
         'link_t is <{.source: str, .type: str, .target: str}>;\n' +
         '\n' +
         '/* Returns the matrix graph in a format expected by the web client. */\n' +
         'display_graph = (<{.type: "graph", .data: links as [link_t]}>) where {\n' +
         '  get_name = (*<[uid]>::(str)) where {\n' +
         '    uid = given::(int);\n' +
         '  };\n' +
         '  links = (<{.source: get_name(.uid: tuples.0),\n' +
         '             .type: tuples.1,\n' +
         '             .target: get_name(.uid: tuples.2)}>) where {\n' +
         '    tuples = keys (bool) @ <[free::(int), free::(str), free::(int)]>;\n' +
         '  };\n' +
         '};\n' +
         '\n' +
         '/* Convenience type aliases. */\n' +
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
         'bfs_helper = ((paths\n' +
         '               if neighbors is empty else\n' +
         '               paths + bfs_helper(.paths: neighbors, .edge: edge, .visited: new_visited))) where {\n' +
         '  paths = given::([path_t]);\n' +
         '  edge = given::(str);\n' +
         '  visited = given::({int});\n' +
         '  new_visited = visited | (**paths reduce start empty {int} | (**that as {int}));\n' +
         '  neighbors = get_neighbors(.paths: paths, .edge: edge, .visited: new_visited);\n' +
         '};\n' +
         '\n' +
         '/* Returns a list of valid paths starting from n following a given edge type. */\n' +
         'bfs = (bfs_helper(.paths: init, .edge: edge, .visited: visited)) where {\n' +
         '  n = given::(int);\n' +
         '  edge = given::(str);\n' +
         '  paths = [[n]];\n' +
         '  visited = {n};\n' +
         '  init = get_neighbors(.paths : paths, .edge: edge, .visited: visited);\n' +
         '};\n' +
         '\n' +
         '/* Format a path to an dict of type {str}. */\n' +
         'format = ({"A: first": first, "B: path": join(.texts: (seq as [str]), .delimiter: " -> "), "C: last": last}) where {\n' +
         '  path = given::(path_t);\n' +
         '  first = *<[path[0]]>::(str);\n' +
         '  last = *<[path[length_of path - 1]]>::(str);\n' +
         '  seq = *<[**path]>::(str);\n' +
         '};\n' +
         '\n' +
         '/* Format each of the paths from calling bfs and return it as table data. */\n' +
         'display_bfs = (<{.type: "table",\n' +
         '                 .data: format(.path: **bfs(.n: n, .edge: edge)) as [entry_t]}>) where {\n' +
         '  n = given::(int);\n' +
         '  edge = given::(str);\n' +
         '};\n' +
         '\n' +
         '/* Helper function used in format. */\n' +
         'join = (("" if texts is empty else\n' +
         '         texts[0] + (**(texts[1:]) reduce start "" + delimiter + that))) where {\n' +
         '  texts = given::([str]);\n' +
         '  delimiter = given::(str);\n' +
         '};\n' +
         '\n' +
         'test {\n' +
         '  join(.texts: empty [str], .delimiter: ", ") == "";\n' +
         '  join(.texts: ["x"], .delimiter: ", ") == "x";\n' +
         '  join(.texts: ["x", "y"], .delimiter: ", ") == "x, y";\n' +
         '};\n' +
         '\n' +
         'test {\n' +
         '  setup {\n' +
         '    bfs(.n: 0, .edge: "Knows") == [[0, 1], [0, 1, 2], [0, 1, 3], [0, 1, 3, 4]];\n' +
         '  };\n' +
         '};\n',
    version: 0,
  },
  /*
  shakespeare: {
    desc: 'Shakespeare',
    version: 0,
  },
  */
  twitter: {
    desc: 'Twitter',
    src: 'package #1;\n' +
         '\n' +
         'user_tweet_ident = 13;\n' +
         'tweet_user_ident = 17;\n' +
         '\n' +
         '/* <[id, text, username, retweet_count, favorite_count, reply_to_status_id, reply_to_user_id]> */\n' +
         'tweet_t is <[int, str, str, int, int, int, int]>;\n' +
         '\n' +
         '/* Schema.\n' +
         '  <[tweet_user_ident, tweet_id, user_id]> <- tweet_t\n' +
         '  <[user_tweet_ident, user_id, tweet_id]> <- tweet_t\n' +
         '  <[user_id, reply_to_status_id, tweet_id]> <- bool\n' +
         '  <[user_id, reply_to_user_id, tweet_id]> <- int\n' +
         '  <[reply_to_user_id, user_id, tweet_id]> <- str\n' +
         '*/\n' +
         '\n' +
         'users = (keys (tweet_t) @ <[user_tweet_ident, free::(int), free::(int)]>).1 as {int};\n' +
         '\n' +
         'total_tweet_count = (keys (tweet_t) @ <[tweet_user_ident, free::(int), free::(int)]> reduce start(0) + 1);\n' +
         '\n' +
         'tweet_count = (keys (tweet_t) @ <[user_tweet_ident, uid, free::(int)]> reduce start(0) + 1) where {\n' +
         '  uid = given::(int);\n' +
         '};\n' +
         '\n' +
         'tweets = (*(keys (tweet_t) @ <[user_tweet_ident, uid, free::(int)]>)::(tweet_t) as [tweet_t]) where {\n' +
         '  uid = given::(int);\n' +
         '};\n' +
         '\n' +
         'responded_to = (keys (str) @ <[uid, free::(int), free::(int)]>.1 as {int}) where {\n' +
         '  uid = given::(int);\n' +
         '};\n' +
         '\n' +
         'all_tweets = *(keys (tweet_t) @ <[user_tweet_ident, free::(int), free::(int)]>)::(tweet_t);\n' +
         '\n' +
         'top_users = (<{.type: "table",\n' +
         '               .data: format(.entry: **sorted_users take n) as [{str: str}]}>) where {\n' +
         '  n = given::(int);\n' +
         '  tweet_count_per_user = (all_tweets collated_by start(0) + 1 having that.2) collected_by lhs + rhs;\n' +
         '  sorted_users = (**tweet_count_per_user as [<[str, int]>]) sorted_by lhs.1 > rhs.1;\n' +
         '  format = ({"1: Username": entry.0, "2: Tweets Sent": entry.1 as str}) where {\n' +
         '    entry = given::(<[str, int]>);\n' +
         '  };\n' +
         '};\n' +
         '\n' +
         'get_kgrams_recur = \n' +
         '    ((empty [[str]]\n' +
         '      if length_of texts < k \n' +
         '      else [texts[:k]] + get_kgrams_recur(.texts: texts[1:], .k: k))) where {\n' +
         '  texts = given::([str]);\n' +
         '  k = given::(int);\n' +
         '};\n' +
         '\n' +
         'get_kgrams = (get_kgrams_recur(.texts: split_text, .k: k)) where {\n' +
         '  text = given::(str);\n' +
         '  k = given::(int);\n' +
         '  split_text = ((text split "[ ,]").0 if not (that is empty)) as [str];\n' +
         '};\n' +
         '\n' +
         'test {\n' +
         '  get_kgrams(.text: "hello there, what\'s up?", .k: 2) ==\n' +
         '  [["hello", "there"],\n' +
         '   ["there", "what\'s"],\n' +
         '   ["what\'s", "up?"]];\n' +
         '};\n' +
         '\n' +
         '/* Helper function used in format. */\n' +
         'join = (("" if texts is empty else\n' +
         '         texts[0] + (**(texts[1:]) reduce start "" + delimiter + that))) where {\n' +
         '  texts = given::([str]);\n' +
         '  delimiter = given::(str);\n' +
         '};\n' +
         '\n' +
         'test {\n' +
         '  join(.texts: empty [str], .delimiter: ", ") == "";\n' +
         '  join(.texts: ["x"], .delimiter: ", ") == "x";\n' +
         '  join(.texts: ["x", "y"], .delimiter: ", ") == "x, y";\n' +
         '};\n' +
         '\n' +
         '/* Returns top N K-grams from all of the tweets. */\n' +
         'top_kgrams = (<{.type: "table",\n' +
         '                .data: format(.entry: **sorted_kgrams take n ) as [{str: str}]}>) where {\n' +
         '  n = given::(int);\n' +
         '  k = given::(int);\n' +
         '  all_kgrams = get_kgrams(.text: all_tweets.1, .k: k) reduce start(empty [[str]]) + that;\n' +
         '  collated_kgrams = **all_kgrams collated_by start(0) + 1 having that;\n' +
         '  collected_kgrams = collated_kgrams collected_by lhs + rhs;\n' +
         '  sorted_kgrams = (**collected_kgrams as [<[[str], int]>]) sorted_by lhs.1 > rhs.1;\n' +
         '  format = ({"1: " + (k as str) + "-gram": join(.texts: entry.0, .delimiter: " "),\n' +
         '             "2: Count": entry.1 as str}) where {\n' +
         '    entry = given::(<[[str], int]>);\n' +
         '  };\n' +
         '};\n' +
         '\n' +
         '/* Returns top N pair of users in terms of the number of replies from user A to user B. */\n' +
         'top_pairs = (<{.type: "table",\n' +
         '               .data: format(.entry: **sorted_replies take n) as [{str: int}]}>) where {\n' +
         '  n = given::(int);\n' +
         '  all_replies = keys (int) @ <[free::(int), free::(int), free::(int)]>; \n' +
         '  collated_replies = all_replies collated_by start(0) + 1 having [that.0, that.1];\n' +
         '  collected_replies = collated_replies collected_by lhs + rhs;\n' +
         '  sorted_replies = (**collected_replies as [<[[int], int]>]) sorted_by lhs.1 > rhs.1;\n' +
         '  format = ({"1: From": pair[0], "2: To": pair[1], "3: Tweets Sent": entry.1}) where {\n' +
         '    entry = given::(<[[int], int]>);\n' +
         '    pair = entry.0;\n' +
         '  };\n' +
         '};\n' +
         '\n' +
         '/* Returns top N users who have the most number of reply tweets. */\n' +
         'top_replied = (<{.type: "table",\n' +
         '                 .data: format(.entry: **sorted_replies take n) as [{str: int}]}>) where {\n' +
         '  n = given::(int);\n' +
         '  all_replies = keys (str) @ <[free::(int), free::(int), free::(int)]>;\n' +
         '  collated_replies = all_replies collated_by start(0) + 1 having that.0;\n' +
         '  collected_replies = collated_replies collected_by lhs + rhs;\n' +
         '  sorted_replies = (**collected_replies as [<[int, int]>]) sorted_by lhs.1 > rhs.1;\n' +
         '  format = ({"1: User Id": entry.0, "2: Replied Tweet Count": entry.1}) where {\n' +
         '    entry = given::(<[int, int]>);\n' +
         '  };\n' +
         '};\n',
    version: 1,
  },
};

define(['jquery', 'bootstrap', 'd3'], function($, bootstrap, d3) {
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
        var result = $.parseJSON(data.result);
        var pkg_info = result.packages.filter(function(elem, idx) {
          return elem.name == name;
        })[0];
        // Populate the list of functions.
        $('#function').empty();
        if (pkgs[name] === undefined) {
          pkgs[name] = {}
        }  // if
        pkgs[name].functions = {};
        $.each(pkg_info.functions, function(fn_name, signature) {
          pkgs[name].functions[fn_name] = {};
          $.each(signature.parameters, function(param_name, type) {
            pkgs[name].functions[fn_name][param_name] = type;
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
                  "<td><input id=" + key + " type='text' value='" + val + "'></td>" +
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
            modal.modal('hide');
          });  // try
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
            var result = $.parseJSON(data.result);
            load(result.name, result.version);
            modal.modal('hide');
          });
        });
      });  // new fast private pov
      // Bind install/listing functions for each pkg.
      $.each(pkgs, function(name, info) {
        var btn = $('#' + name);
        btn.change(function() {
          $('#orlyscript').val(info.src);
          load(name, info.version);
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

