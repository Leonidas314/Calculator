//Proyecto: Calculator
//Autor: Dellafiore Leon Lucas
//Descripción: Calculadora Web... 

//-------------------Variables y elementos capturados del DOM---------------------------------------------

const calculador= document.getElementById('calcBody');//Capturar div id:"calcBody"
const tds =document.querySelectorAll('td');//Captura tds de la tabla
let simbolNum=document.querySelectorAll('.number, .symbol');//Captura 2 clases
const pantalla =document.getElementById('screenCalc');//Captura div id:"screenCalc"
var ceroDefault = true;
var screenString = "";//Inicialización
const equalButom= document.getElementById('equalBotton');//Capturar boton =
const symbols = document.getElementsByClassName('symbol');//Captura boton clases symbol 
const clearBoton = document.getElementById('clearBotton');


var disableScreen=false;

//Necesito separar las acciones de efectos visuales de las acciones con funcionalidades??
//Usar estrucutras condicionales para diferenciar funcionalidades de los botones?? 0 bien capturar por separado los diferentes botones y crear modulos separados para cad funcionalidad


//--------------------Funciones------------------//////
//Function that filter the type expresion likely 
function listProdCocc(string){
return string.match(/\d+|[*/]|\d+/gy).join('');//This regular expression takes the mathematical expression only with numeric values and "*" "/" symbols, this ,between "+" "-" operators 
}
//var expressionVector= listProdCocc(string2);
//console.log("Vector:" + expressionVector);


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
//var reducir = reductionExpression(expressionVector);
//console.log ("Primer termino reducido:"+ reducir)

//Funcion que recibe una expresion y devuelve a la misma sin el primer termino
function tailExpresion (string){
    if(string==[]){
        return 0;
    }else{
        const regex = string.match(/\|[+-]|\d+|[*/]|\d+/gy).join('');
        console.log(regex)
        return string.replace(regex,''); //Ready to go!
    }
}



//Visual effects to buttons, concatenate string on screen with buttons content
tds.forEach(function(elemento){//Para cada tds
    elemento.addEventListener('click',function(elemento){//Al capturar evento click
        this.style.transform= 'scale(0.9)';//Cambio a escala 0.9
        setTimeout(() => {//Vuelvo a escala a los 150ms
            this.style.transform = 'scale(1)';
        }, 150);
        if (ceroDefault==true){
            pantalla.innerText="";
            ceroDefault=false;
        }
    })
})

//Print on screen a string with key content
simbolNum.forEach(function(elemento){
    elemento.addEventListener('click',function(elemento ){
        if(disableScreen==false){
            const contenidoBoton=this.innerText;//Capturo el contenido alfanumerico de td (boton)
            screenString=screenString+contenidoBoton;
            const textoNodo =document.createTextNode(contenidoBoton);//Creo el nodo con el contenido capturado
            pantalla.appendChild(textoNodo)//creo un nodo nuevo "hijo" de pantalla
    
        }
    })

})


//Clear screen
clearBoton.addEventListener('click',function(){
    pantalla.innerText="";
    pantalla.innerText="0";
    screenString="";
    ceroDefault=true;
    disableScreen=false;
})

//Analysis

//Capture string on screen and ,

//Identify simbols like +,-,*,/

//I need to check that if at both sides of each mathematical symbol there´s only numbesr, in order to have an expression mathematically logical, this is, for example: 2+2 is fine, +3*/ isn´t.


//I need to disable the screen print functionality  if an SYNTHAX ERROR happens:
equalButom.addEventListener('click',function(){
    console.log("click on equal key")
   if(screenString.charCodeAt(0)<48 || screenString.charCodeAt(0)>57){
    pantalla.innerText="SYNTHAX ERROR";
    disableScreen=true;
   }else
   if(screenString.charCodeAt(screenString.length-1)<48 || screenString.charCodeAt(screenString.length-1)>57){
        pantalla.innerText="SYNTHAX ERROR";
        disableScreen=true;
   }else
   if(screenString.length>2){
        for(let i=1;i<screenString.length-1;i++){
            if((screenString.charCodeAt(i)<48 || screenString.charCodeAt(i)>57)&&(screenString.charCodeAt(i-1)<48 || screenString.charCodeAt(i-1)>57)){
                pantalla.innerText="SYNTHAX ERROR";
                disableScreen=true;
            }
        }
        if (disableScreen== false){//La expresion matematica se puede calcular
            var termVector=[];
            let auxTerm=0;
            //*-------------------------------------------------------------------------- */
            let aux = 0; //Auxliar donde guardar primer posicion del substring
            var vectorIndices= [];
            for(i=0; i<screenString.length;i++){
                if(screenString[i]=="+" || screenString[i]=="-"){
                    vectorIndices[aux]=i;
                    aux=aux+1;
                }
            }
            console.log(vectorIndices,vectorIndices.length);
            aux=0;
            if(vectorIndices.length==0){
                termVector.push(reductionExpression(screenString))
            }else{

                for(i=0;i<vectorIndices.length;i++){//Recorrer vectorIndices
                    if(i<=vectorIndices.length-1){//Aislar los length-1 terminos
                        termVector[auxTerm]=reductionExpression(screenString.substring(aux,vectorIndices[i]));
                        auxTerm++;
                        console.log(screenString.substring(aux,vectorIndices[i]))
                        aux=vectorIndices[i]+1;
                    }
                    if(i==vectorIndices.length-1){//Si es el ultimo elemento del vector (posicion del ultimo operador + o -)
                        let n=screenString.length-vectorIndices[i];
                        termVector[auxTerm]=reductionExpression(screenString.slice(-n+1));
                        console.log(screenString.slice(-n+1))
                    }
                }
                for(let j=0;j<vectorIndices.length;j++){
                    if(screenString[vectorIndices[j]]==='-'){
                        termVector[j+1]=(-1)*termVector[j+1];
                    }
                }
            }
            //Sumatoria de los elementos del vector de terminos 
            var suma = termVector.reduce((acumulador, valorActual) => {
                return acumulador + valorActual;
            }, 0); // El 0 es un valor inicial para el acumulador
        }
   }
   console.log("Terminos: "+termVector + " Sumatoria: "+ suma);

   console.log("Largo string "+screenString.length)
})
