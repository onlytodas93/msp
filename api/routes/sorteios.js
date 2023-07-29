const express = require('express');
const router = express.Router();
const Sorteios = require('../controllers/sorteios');

router.post('/sorteios', Sorteios.cadastrar);
router.post("/cartelas/atualizacartelavendedor", Sorteios.atualizarQuantidadeCartela)
router.post("/cartela/vender",  Sorteios.vender)
router.post("/removervendedor",  Sorteios.removerVendedor)
router.post("/sorteiofinalizado", Sorteios.finalizar)
router.post("/fecharvenda", Sorteios.fecharVendas)
router.post("/abrirvenda", Sorteios.abrirVendas)
router.post("/excluirvendedor", Sorteios.excluirvendedor)

router.get('/sorteios', Sorteios.selecionar);
router.get('/sorteios/:id', Sorteios.selecionarID);
router.get('/sorteiosid/:id', Sorteios.selecionarIDCompra);



module.exports = router; 