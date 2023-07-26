const express = require('express');
const router = express.Router();
const Usuario = require('../controllers/usuario');

router.post("/autenticacao", Usuario.autenticacao);
router.post('/vendedor', Usuario.cadastrarVendedor);
router.post("/vincularvendedor", Usuario.vincularUsuario);
router.post("/trocarsenha", Usuario.trocarSenha)

router.get('/vendedores', Usuario.selecionaVendedores);
router.get('/vendedores/:id', Usuario.selecionaVendedoresDoSorteio);


module.exports = router; 