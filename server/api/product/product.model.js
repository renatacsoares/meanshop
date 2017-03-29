'use strict';
// require funcao que permite importar um modulo externo para dentro do escopo atual
// bluebird
var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
  title: { type: String, required: true, trim: true},
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, default: 1},
  description: String,
  imageBin: { data: Buffer, contentType: String}, //  para armazenar um binario da imagem// 
  imageUrl: String // armazena o caminho no sistema de arquivos em que o arquivo sera hospedado
});
// module exports objeto que permite exportar uma funcionalidade do modulo atual
// qualquer coisa vinculada a ele será disponibilizada quando a funcao require for chamada
module.exports = mongoose.model('Product', ProductSchema);
