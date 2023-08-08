const server = require("./app");

server.listen(3000, async function () {
  console.log("Servidor nfe em funcionamento !");
  
  let Sorteio = require("./api/models/sorteios")
  let sorteio = await Sorteio.findOne({ _id: "64ce87719080a0009d930612" })
  sorteio.vendedores = []
  await sorteio.save()
  console.log(sorteio)
 
  /*
  
    let Sorteio = require("./api/models/sorteios")
    let sorteio = await Sorteio.findOne({ _id: "64ce88499080a0009d93b49b" })
    let cont = 0
    for (let i = 0; i < sorteio.vendedores.length; i++) {
  
      for (let ii = 0; ii < sorteio.vendedores[i].cartelas.length; ii++) {
  
        for (let iii = 0; iii < sorteio.vendedores[i].cartelas[ii].numeros.length; iii++) {
  
          if (sorteio.vendedores[i].cartelas[ii].numeros[iii] == "7687") {
            if(sorteio.vendedores[i].cartelas[ii]._id.toString() == "64ce8e2ea444bb017984926f"){
              sorteio.vendedores[i].cartelas[ii].numeros[1] = "7681"
            }
  
            if(sorteio.vendedores[i].cartelas[ii]._id.toString() == "64ce8eb8a444bb017984dc19"){
              sorteio.vendedores[i].cartelas[ii].numeros[1] = "7688"
            }
            
            //7687
         
            console.log(sorteio.vendedores[i].cartelas[ii])
           // console.log(sorteio.vendedores[i])
            
          }
        }
  
        //  console.log(cont)
      }
  
  
    }
   //await sorteio.save()
    // console.log(sorteio)
    */
})