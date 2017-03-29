'use strict';
// mostra o resumo de todos os produtos// 
angular.module('meanshopApp')
  .controller('MainCtrl', function($scope, $http, socket, Product) {
    $scope.products = Product.query();
  });
