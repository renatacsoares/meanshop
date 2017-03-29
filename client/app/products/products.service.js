'use strict';
// fabrica de produtos que será chamada no controller e no html por $scope.products//
// $resource conecta os produtos a API //
angular.module('meanshopApp')
  .factory('Product', function($resource){
    return $resource('api/products/id',null,{
      'update': {method: 'PUT'}
    });
  });
