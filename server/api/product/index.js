'use strict';

var express = require('express');
var controller = require('./product.controller');
var uploadOptions = { autoFile: true, uploadDir: 'client/assets/uploads/'}
var multiparty = require('connect-multiparty');

var router = express.Router();
// cada uma das acoes está associada a uma rota no product.controller(require)
// id torna as rotas disponiveis para o product controller que chama elas usando (req.params.id)
router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.post('/:id/upload', multiparty(uploadOptions), controller.upload);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
