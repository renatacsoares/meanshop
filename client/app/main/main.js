'use strict';
// stateProvider está ligando a url da pagina index html com todos arquivos html//
// e com a pagina MainCtrl//
angular.module('meanshopApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
  });
