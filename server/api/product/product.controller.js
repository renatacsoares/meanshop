/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/products              ->  index
 * POST    /api/products              ->  create
 * GET     /api/products/:id          ->  show
 * PUT     /api/products/:id          ->  update
 * DELETE  /api/products/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Product = require('./product.model');
var path = require('path');

function saveFile(res, file) {
  return function (entity) {
    var newPath = '/assets/uploads/' + path.basename(file.path);
    entity.imageUrl = newPath;
    return entity.saveAsync().spread(function(updated){
      console.log(updated);
      return updated;
    });
  }
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(function(updated) {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(function() {
          res.status(204).end();
        });
    }
  };
}
// a palavra exports faz com que essas acoes sejam publicas e acessiveis
// a qualquer modulo da aplicacao em que o arquivo for incluido (com require)
// Gets a list of Products(obtem uma lista de produtos)
exports.index = function(req, res) {
  Product.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single Product from the DB
exports.show = function(req, res) {
  Product.findByIdAsync(req.params.id) // req.params.id usado para chamar a rota do index.js//
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Product in the DB
exports.create = function(req, res) {
  Product.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Product in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Product.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Product from the DB
exports.destroy = function(req, res) {
  Product.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
// faz o upload de uma nova imagem de produto para o banco de dados//
// a funcao upload chama a funcao safeFile que atualiza o atributo imageUrl no produto. 
exports.upload = function (req,res) {
  var file = rew.files.file;
  if(!file){
    return handleError(res)('File not provided');
  };
  Product.findByIdAsync(req.params.id)
  .then(handleEntityNotFound(res))
  .then(saveFile(res,file))
  .then(responseWithResult(res))
  .catch(handleError(res));
};