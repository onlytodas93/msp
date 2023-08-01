const api = require('axios');

class Usuarios {

    async autenticacao(req, res) {
        try {
            let Usuario = require('../models/usuario')
            let usuario = await Usuario.findOne({ email: req.body.usuario.toString().toLowerCase(), senha: req.body.senha, status: true })
            if (usuario) {
                const jwt = require("jsonwebtoken");
                return res.json({
                    nome: usuario.nome,
                    tipo: usuario.tipo,
                    token: jwt.sign({ usuario: usuario._id }, "b03e148fc2d70bb33bfbbf15b7eee9e7"),
                    idVendedor: usuario._id
                });
            } else {
                res.status(500).send()
            }
        } catch (ee) {
            res.status(500).send()
        }
    }

    async cadastrarVendedor(req, res) {

        try {
            let Usuario = require("../models/usuario")
            let usuario = new Usuario({
                nome: req.body.nome,
                email: req.body.email.toLowerCase(),
                tipo: "V",
                senha: "123456"

            })

            await usuario.save()
            res.send()

        } catch {
            res.status(500).send()
        }



    }

    async selecionaVendedores(req, res) {
        let Usuario = require("../models/usuario")
        let usuarios = await Usuario.find({ status: true, tipo: "V" })
        res.send(usuarios)
    }

    async selecionaVendedoresDoSorteio(req, res) {
        console.log(req.params)
        let Sorteios = require("../models/sorteios")
        let Usuario = require("../models/usuario")
        let vendedores = await Sorteios.findOne({ _id: req.params.id }).populate("vendedores.vendedor")
        console.log(vendedores.vendedores)
        res.send(vendedores.vendedores)
    }

    async vincularUsuario(req, res) {
        try {

            let Sorteio = require("../models/sorteios")
            let sorteio = await Sorteio.findOne({ _id: req.body.id, "vendedores.vendedor": req.body.vendedor, "vendedores.status": true })

            if (sorteio == null) {

                sorteio = await Sorteio.findOne({ _id: req.body.id })
                sorteio.vendedores.push({
                    vendedor: req.body.vendedor,
                    quantidade: 0,
                    ingressos: []
                })

                await sorteio.save()
                res.send()
            } else {
                res.status(500).send()
            }

        } catch {
            res.status(500).send()
        }
    }

    async trocarSenha(req, res) {
        let Usuario = require("../models/usuario")
        let usuario = await Usuario.findOne({ _id: req.id })
        usuario.senha = req.body.senha
        await usuario.save()
        res.send()
    }

    async resetarSenha(req, res) {
        let Usuario = require("../models/usuario")
        let usuario = await Usuario.findOne({ _id: req.body.id })
        usuario.senha = "123456"
        await usuario.save()
        res.send()
    }


}

module.exports = new Usuarios();