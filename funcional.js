
console.log("Funcion  filtar expresiones numericas")

//Function that convert the first numerical value into a list with the digits 

function listFirtsNum (string){
    var list = string.match(/\d+/g)
    return list;
}

console.log(listFirtsNum("44+55Hola88"));