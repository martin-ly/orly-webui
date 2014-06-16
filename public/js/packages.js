define(['jquery'], function($) {
  var result = {
    /*
    beer: {
      desc: 'Beer',
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
      version: 1,
    },
  };
  $.each(result, function(key, val) {
    $.get('packages/' + key + '.orly', function(data) {
      val.src = data;
    });
  });
  return result;
});
