const server = require("./app");

server.listen(3000, async function () {
  console.log("Servidor nfe em funcionamento !");


  let Sorteio = require("./api/models/sorteios")
  let sorteio = await Sorteio.findOne({ _id: "64cb09099e2283506d33c615" })
  let cont = 0
  for (let i = 0; i < sorteio.vendedores.length; i++) {

    for (let ii = 0; ii < sorteio.vendedores[i].cartelas.length; ii++) {
      
      for (let iii = 0; iii < sorteio.vendedores[i].cartelas[ii].numeros.length; iii++) {
        
        if(sorteio.vendedores[i].cartelas[ii].numeros[iii] == "7831")
          console.log(sorteio.vendedores[i].vendedor)        
      }
   
    //  console.log(cont)
    }
   

  }
  // console.log(sorteio)
})