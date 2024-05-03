//Function that reccibe a string and return a list of the numeric values 

let string1="55*2/5*4/9*45"
let string2="86*10/2+2/11+5*34-10"
console.log("String de prueba:",string2)

//Function that filter the type expresion likely 
function listProdCocc(string){
return string.match(/\d+|[*/]|\d+/gy).join('');//This regular expression takes the mathematical expression only with numeric values and "*" "/" symbols, this ,between "+" "-" operators 
}
var expressionVector= listProdCocc(string2);
console.log("Vector:" + expressionVector);


//The next two functions filters the numeric values and the operators with regular expressions
function listNumValues (string){
    var numbers= string.match(/\d+/g);
    return numbers.map(numbers => parseFloat(numbers));
}

//Funcion that returns the non numeric values of the string
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
    //console.log("Lista Numerica:",nlist,"\n", "Lista operadores:",olist);
    if (nlist.length==1){
        return nlist[0];
    }else{
        //Obtain objects with removed elements to be evaluated and lists
        var nObjt=removeTwoElem(nlist);
        var opObjt=removeFirstElem(olist);
        //console.log("Objeto Numerico:","\n",nObjt,"\n","Objeto operador:","\n",opObjt)
        var aux =eval(nObjt.elementoRemovido[0]+opObjt.elementoRemovido+nObjt.elementoRemovido[1]);
        nlist=[aux,...nlist];
        olist=opObjt.opList;
         return evalExpression(nlist,olist);////Recursion////
    }
  
}

function reductionExpression(expression){
    if(expression.length==1){
        return parseFloat(expression[0]);
    }else{
        //Funcion que recibe una expresion dos listas y devueve su reduccion 

        //Mostrar lista de numeros y lista de operadores

        return evalExpression(listNumValues(expression),listOperator(expression));
    }


}
var reducir = reductionExpression(expressionVector);
console.log ("Primer termino reducido:"+ reducir)

//Funcion que recibe una expresion y devuelve a la misma sin el primer termino
function tailExpresion (string, regX){
 const regex = string.match(/\d+|[*/]|\d+/gy).join('');
 console.log(regex)
 return string.replace(regex,''); //Ready to go!
}

console.log("tailExpression: "+tailExpresion(string2))
//Funcion que utilice la reduccion y vuelva a llamarse con el siguiente termino del string

function Calculator (expression){
    const regexNum = /^[0-9]+$/;
    if(regexNum.test(expression)){
        return parseFloat(expression)
    }else if (expression[0]=='+'){
        return reductionExpression(expression) + Calculator(expression.replace(expression[0],''));
    }
    else if (expression[0]=='-'){
        return reductionExpression(expression) - Calculator(expression.replace(expression[0],''));
    }
}

console.log(Calculator(string2))