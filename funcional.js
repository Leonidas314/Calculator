//Function that reccibe a string and return a list of the numeric values 

let string1="55*2/5*4/9*45"
console.log("String de prueba:",string1)
//The next two functions filters the numeric values and the operators
function listNumValues (string){
    var numbers= string.match(/\d+/g);
    return numbers.map(numbers => parseFloat(numbers));
}

function listOperator (string){
    return string.match(/[^\d]/g);
}
//This function recibes a Numeric list and returns an object with the first two elements of the list and this without them 
function removeTwoElem(numList){
    if (numList.length === 0) {
        //If the list its empty returns an objet with an error mensage
        return { numList: [], elementoRemovido: null, error: "La lista está vacía" };
    } else {
        // Remove first element an save it in a variable
        const elementoRemovido = numList.splice(0,2);
        //returns an object with the first element and a list without it
        return { numList: numList, elementoRemovido: elementoRemovido, error: null };
    }

}
//This function recibes a list with operators and returns the firstone and the list without it in a object 
function removeFirstElem(opList){
    if (opList.length===0) {
        //If the list its empty returns an objet with an error mensage
        return { opList: [], elementoRemovido: null, error: "La lista está vacía" };
    } else {
        // Remove first element an save it in a variable
        const elementoRemovido = opList.shift();
        //returns an object with the first element and a list without it
        return { opList: opList, elementoRemovido: elementoRemovido, error: null };
    }

}

//I need a function that evalues two firts numbers and fisrt operator on the numList and opList

function evalExpression(nlist,olist){
    console.log("Lista Numerica:",nlist,"\n", "Lista operadores:",olist);
    if (nlist.length==1){
        return nlist[0];
    }else{
        //Obtain objects with removed elements to be evaluated and lists
        var nObjt=removeTwoElem(nlist);
        var opObjt=removeFirstElem(olist);
        console.log("Objeto Numerico:","\n",nObjt,"\n","Objeto operador:","\n",opObjt)
        var aux =eval(nObjt.elementoRemovido[0]+opObjt.elementoRemovido+nObjt.elementoRemovido[1]);
        nlist=[aux,...nlist];
        olist=opObjt.opList;
         return evalExpression(nlist,olist);////Recursion////
    }
  
}

function reductionExpresion(expression){
    if(expression.length==1){
        return parseFloat(expression[0]);
    }else{
        //Funcion que recibe una expresion dos listas y devueve su reduccion 

        //Mostrar lista de numeros y lista de operadores

        return evalExpression(listNumValues(expression),listOperator(expression));
    }


}
var resultado=reductionExpresion(string1);
console.log("resultado final=",resultado)