console.log("Console online");
const calculador= document.getElementById('calcBody');//Capturar div id:"calcBody"
console.log(calculador);
const tds =document.querySelectorAll('td');//Captura tds de la tabla
console.log(tds);
const pantalla =document.getElementById('screenCalc');//Captura div id:"screenCalc"


var ceroDefault = true;

tds.forEach(function(elemento){//Para cada tds
    elemento.addEventListener('click',function(elemento){//Al capturar evento click
        this.style.transform= 'scale(0.9)';//Cambio a escala 0.9
        setTimeout(() => {//Vuelvo a escala 1 a los 150ms
            this.style.transform = 'scale(1)';
        }, 150);
        if (ceroDefault==true){
            pantalla.innerText="";
            ceroDefault=false;
        }
        const contenidoBoton=this.innerText;//Capturo el contenido alfanumerico de td (boton)
        console.log(contenidoBoton);
        const textoNodo =document.createTextNode(contenidoBoton);//Creo el nodo con el contenido capturado
        pantalla.appendChild(textoNodo)//creo un nodo nuevo "hijo" de pantalla
    })
})

