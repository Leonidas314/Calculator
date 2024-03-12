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
            if (disableScreen== false){
                let aux = 0; //Auxliar donde guardar primer posicion del substring
                for(i=0; i<screenString.length;i++){
                    if(screenString[i]=="+" || screenString[i]=="-" || i==screenString.length-1){
                        console.log("Signo"+ screenString[i]+"En poscisicon"+(i+1));
                        console.log(screenString.substring(aux,i))
                        
                        aux=i+1;
                    }
                    console.log(screenString.substring(aux,i+1))

                }
            }
       }
       console.log("Largo string"+screenString.length)

})
