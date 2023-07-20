

class Sorteios {

    async cadastrar(req, res) {
        try {
            let Sorteio = require('../models/sorteios')
            let sorteio = new Sorteio(req.body)
            await sorteio.save()
            res.send()
        } catch (ee) {
            console.log(ee)
            res.status(500).send()
        }
    }

    async removerVendedor(req, res) {
        let dados = req.body
        console.log(dados)
        let Sorteio = require('../models/sorteios')
        let sorteio = await Sorteio.findOne({ _id: dados.sorteio })
        console.log(sorteio)
        for (let i = 0; i < sorteio.vendedores.length; i++) {

            if (sorteio.vendedores[i]._id == dados.vendedor)
                sorteio.vendedores[i].status = false

        }
        await sorteio.save()
        res.send()
    }

    async finalizar(req, res) {

        let dados = req.body
        let Sorteio = require('../models/sorteios')
        let sorteio = await Sorteio.findOne({ _id: dados.sorteio })

        if (dados.ganhador.length > 0) {
            sorteio.ganhador = dados.ganhador[0].nome
            sorteio.contatoGanhador = dados.ganhador[0].nome
            sorteio.numeroSorteado = dados.ganhador[0].numero
            sorteio.vendedor = dados.ganhador[0].vendedor
            sorteio.status = "F"
        }else{
            sorteio.status = "FF"
        }
        await sorteio.save()

        res.send()
    }

    async atualizarQuantidadeCartela(req, res) {
        try {
            let dados = req.body
            let Sorteio = require('../models/sorteios')
            let sorteio = await Sorteio.findOne({ _id: dados.sorteio })

            let quantidade = 0
            for (let i = 0; i < sorteio.vendedores.length; i++) {
                if (sorteio.vendedores[i]._id.toString() == dados.vendedor)
                    quantidade = sorteio.vendedores[i].cartelas.length
            }


            if (quantidade < dados.quantidade) {
                dados.quantidade = dados.quantidade - quantidade
                let modelo = sorteio.quantidade // Modelo da cartela
                // For para a quantidade de cartela
                let i = 1
                for (let i = 0; i < dados.quantidade; i++) {

                    //Enquanto nao sortear um numero que nao saiu mantem inserindo cartelas
                    let numeroCriado = ""
                    let deuCerto = false

                    // Insere insere o numero
                    while (deuCerto == false) {
                        let auxNumero = ""
                        let achou = false

                        // Sorteio numero
                        for (let i2 = 0; i2 < modelo; i2++) {

                            let deuCerto = false
                            let auxAchou = false
                            let nSorteado = ""
                            while (deuCerto == false) {
                                auxAchou = false
                                nSorteado = parseInt(Math.floor(Math.random() * 10))


                                for (let ii = 0; ii < auxNumero.length; ii++) {
                                    if (nSorteado == parseInt(auxNumero.charAt(ii))) {
                                        auxAchou = true
                                    }
                                }


                                if (auxAchou == false)
                                    deuCerto = true
                            }

                            auxNumero += nSorteado;
                        }



                        // Roda os vendedores
                        for (let i2 = 0; i2 < sorteio.vendedores.length; i2++) {

                            // Roda as cartelas dos vendedores
                            for (let i3 = 0; i3 < sorteio.vendedores[i2].cartelas.length; i3++) {
                                if (auxNumero.toString() == sorteio.vendedores[i2].cartelas[i3].numero)
                                    achou = true
                            }
                        }

                        if (achou == false) {
                            numeroCriado = auxNumero
                            deuCerto = true
                        }
                    }

                    for (let i2 = 0; i2 < sorteio.vendedores.length; i2++) {
                        if (sorteio.vendedores[i2]._id == dados.vendedor) {
                            sorteio.vendedores[i2].cartelas.push({
                                numero: numeroCriado
                            })
                        }
                    }

                }
                //  console.log(sorteio)
                await sorteio.save()
                //   console.log(sorteio)

                res.send()
                //res.send()
            }
        } catch (ee) {
            console.log(ee)
            res.status(500).send()
        }
    }

    async selecionar(req, res) {
        try {
            let Sorteio = require('../models/sorteios')

            let sorteio = await Sorteio.find({})
            res.send(sorteio)
        } catch (ee) {
            console.log(ee)
            res.status(500).send()
        }
    }

    async selecionarID(req, res) {
        try {
            let Sorteio = require('../models/sorteios')
            let Usuario = require('../models/usuario')
            let sorteio = await Sorteio.findOne({ _id: req.params.id }).populate("vendedores.vendedor")
            res.send(sorteio)
        } catch (ee) {
            console.log(ee)
            res.status(500).send()
        }
    }

    async vender(req, res) {

        let Sorteio = require('../models/sorteios')
        console.log(req.body)
        let sorteio = await Sorteio.findOne({ _id: req.body.sorteio })

        console.log(sorteio)
        // For nos vendedores 
        for (let i = 0; i < sorteio.vendedores.length; i++) {
            if (sorteio.vendedores[i]._id == req.body.vendedor) {

                for (let i2 = 0; i2 < sorteio.vendedores[i].cartelas.length; i2++) {

                    // Procura a cartela selecionada
                    for (let i3 = 0; i3 < req.body.cartelas.length; i3++) {
                        if (req.body.cartelas[i3].id == sorteio.vendedores[i].cartelas[i2]._id) {
                            sorteio.vendedores[i].cartelas[i2].status = "V"
                            sorteio.vendedores[i].cartelas[i2].nome = req.body.nome
                            sorteio.vendedores[i].cartelas[i2].whatsapp = req.body.whatsapp
                        }

                    }


                }
            }
        }

        await sorteio.save()

        //  console.log(req.body)

        res.send()
    }

}

module.exports = new Sorteios();