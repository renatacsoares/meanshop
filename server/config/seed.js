/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Product = require('../api/product/product.model');
var User = require('../api/user/user.model');

Product.find({}).removeAsync()
  .then(function(){
    Product.createAsync({
      title: 'Means ecommerce book',
      imageUrl: '/assets/uploads/meanbook.jpg',
      price: 25,
      stock: 250,
      description:'Build a powerful ecommerce...'
    }, {
      title: 'tshirt',
      imageUrl: 'assets/uploads/meanshirt.jpg',
      price: 15,
      stock: 100,
      description: 'tshirt with the mean logo'
    }, {
      title: 'cofee mug',
      imageUrl: 'assets/uploads/meanmug.jpg',
      price: 8,
      stock: 50,
      description: 'Convert coffee into a mean code'
    })
    .then(function(){
      console.log('finished populating products');
    });
  });


User.find({}).removeAsync()
  .then(function() {
    User.createAsync({
      provider: 'local',
      name: 'Test User',
      email: 'test@test.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@admin.com',
      password: 'admin'
    })
    .then(function() {
      console.log('finished populating users');
    });
  });
