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
      functions: {
        bfs_helper: {
          paths: "[[0, 1]]",
          edge: "'Knows'",
          visited: "{0}",
        },
        bfs: {
          edge: "'Knows'",
          n: 0,
        },
        display_bfs: {
          edge: "'Knows'",
          n: 0,
        },
        display_graph: {},
        format: {
          path: "[1, 2, 3]",
        },
        get_neighbors: {
          paths: "[[0]]",
          edge: "'Knows'",
          visited: "{0}",
        },
        get_neighbors_helper: {
          path: "[0, 1]",
          edge: "'Knows'",
          visited: "{0, 1}",
        },
        join: {
          delimiter: "', '",
          texts: "['a', 'b', 'c']",
        },
        setup: {},
      },
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
      functions: {
        user_tweet_ident: {},
        tweet_user_ident: {},
        users: {},
        total_tweet_count: {},
        tweet_count: {
          uid: 93376512,
        },
        tweets: {
          uid: 93376512,
        },
        responded_to: {
          uid: 181561712,
        },
        get_kgrams_recur: {
          texts: "['Lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur']",
          k: 3,
        },
        get_kgrams: {
          text: "'Lorem ipsum dolor sit amet, consectetur'",
          k: 3,
        },
        join: {
          delimiter: "', '",
          texts: "['a', 'b', 'c']",
        },
        top_users: {
          n: 20,
        },
        top_kgrams: {
          k: 3,
          n: 20,
        },
        top_pairs: {
          n: 20,
        },
        top_replied: {
          n: 20,
        },
      },
    },
    twitter_ego: {
      desc: 'Twitter-EGO',
      version: 0,
      functions: {
        abxys: {},
        are_friends: {
          x: 12,
          y: 13,
        },
        as_pair: {
          friends: "<['follow', 0, 0]>",
        },
        common_hashtags: {
          x: 428333,
          y: 9245812,
        },
        common_mentions: {
          x: 648,
          y: 15485441,
        },
        get_intros: {
          friends: "<[12, 13]>",
        },
        prod: {
          x: "[0, 1, 2]",
          y: "[0, 1, 2]",
        },
        prod_helper: {
          x: 0,
          y: "[0, 1, 2]",
        },
        prod_helper_helper: {
          x: 0,
          y: 0,
        },
      },
    },
  };
  return result;
});
