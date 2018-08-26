'use strict';

/**
 * @ngdoc overview
 * @name demoApp
 * @description
 * # demoApp
 *
 * Main module of the application.
 */
angular
  .module('demoApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'nvd3',
    'pathgather.popeye',
    'ngAudio',
    'angucomplete-alt'
  ])
  .factory('pathService', function () {
    return {
      imagepath: 'images/',
      profilepath: '/#/profiles/',
      usericonpath: 'images/user_images/',
      depticonpath: 'images/dept_icons/',
      leveliconpath: 'images/level_icons/'
    };
  })
  .factory('loginService', function () {
    return {
      userId: 1
    };
  })
  .factory('cardService', function () {
    var cid = 15;
    return {
      setModalId: function (id) {
        cid = id;
        return cid;
      },
      getModalId: function () {
        return cid;
      }
    };
  })
  .factory('dataService', function ($http) {
    return {
      getUser: function (id) {
        return $http.get('../user.json');
      },
      getAllUsers: function () {
        return $http.get('../users.json');
      },
      getCardSummary: function (id) {
        return $http.get('../summary.json');
      },
      getCoreValues: function () {
        return $http.get('../corevalues.json');
      },
      getCardById: function (id) {
        return $http.get('http://localhost/demo/api/cards/' + id);
      },
      getCards: function (id, type, limit, offset) {
        return $http.get('../received.json');
      },
      getFeed: function () {
        return $http.get('../events.json');
      },
      getCoreValueTypes: function () {
        return $http.get('http://localhost/demo/api/corevaluetypes/');
      },
      getScoreboardTypes: function () {
        return $http.get('../boardtypes.json');
      },
      getScoreboardData: function (id, limit) {
        return $http.get('http://localhost/demo/api/scoreboardtypes/' + id + '?subcategoryid=0&limit=' + limit + '&offset=0');
      },
      sendCard: function (obj) {
        return $http.post('http://localhost/demo/api/cards/', JSON.stringify(obj));
      },
      readCard: function (id, obj) {
        return $http.post('http://localhost/demo/api/cards/' + id + '/isread', JSON.stringify(obj));
      }

    };
    //getCardsSent: function(id, limit) {
    //  return $http.get('/api/users/userid/cards/cardssent?limit='+limit+'&offset=0');
    // };
    //  getCardsRecieved: function(id, limit) {
    //    return $http.get('/api/users/userid/cards/cardsreceived?limit='+limit+'&offset=0');
    //  };
  })
  .factory('slackService', function ($http) {
    return {
      postSentCard: function (card) {
        var s = card.sender.senderName;
        var r = card.receiver.receiverName;
        var c = card.coreValueType.coreValueName;
        var a = card.numCoins;
        var m = card.message;

        var t = '*' + r + '* was just sent a(n) ' + c + ' card with ' + a + ' coins by *' + s + '*! \n "' + m + '"';
        //var o = {'new-bot-name':'demo', 'text':t};
        // var o = {'new-bot-name':'demo', 'text':'meow'};
        //console.log(o);
        //return $http.post('https://hooks.slack.com/services/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', o);

        $http.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf8';

        $http({
          url: 'https://hooks.slack.com/services/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',
          dataType: 'json',
          method: 'POST',
          headers: {'Content-Type': 'text/plain'}, //or whatever type
          data: {
            'username': 'demo',
            'icon_emoji': ':demo:',
            'text': t
          }
        });


      }
    };
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main',
        feed: true
      })
      .when('/homepage', {
        templateUrl: 'views/homepage.html',
        controller: 'LoginCtrl',
        controllerAs: 'homepage',
        feed: false
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login',
        feed: false
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'LoginCtrl',
        controllerAs: 'login',
        feed: false
      })
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'UserCtrl',
        controllerAs: 'user',
        feed: false
      })
      .when('/imageupload', {
        templateUrl: 'views/imageupload.html',
        controller: 'UserCtrl',
        controllerAs: 'user',
        feed: false
      })
      .when('/sendcard', {
        templateUrl: 'views/sendcard.html',
        controller: 'SendCardCtrl',
        controllerAs: 'sendcard',
        feed: false
      })
      .when('/viewcard', {
        templateUrl: 'views/viewcard.html',
        controller: 'CardCtrl',
        controllerAs: 'card',
        feed: false
      })
      .when('/gallery', {
        templateUrl: 'views/gallery.html',
        controller: 'GalleryCtrl',
        controllerAs: 'gallery',
        feed: false
      })
      .when('/scoreboard', {
        templateUrl: 'views/scoreboard.html',
        controller: 'ScoreboardCtrl',
        controllerAs: 'scoreboard',
        feed: false
      })
      .otherwise({
        redirectTo: '/'
      });

  });
