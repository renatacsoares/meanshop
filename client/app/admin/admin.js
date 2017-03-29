'use strict';
// possui visoes nas quais o administrador pode apagar do sistema outros usuarios// 
angular.module('meanshopApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('admin', {
        url: '/admin',
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminCtrl'
      });
  });
