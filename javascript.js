console.log("Console online");
const calculador= document.getElementById('calcBody');
console.log(calculador);
const tds =document.querySelectorAll('td');
console.log(tds);
const pantalla =document.getElementById('screenCalc');
var texto="";
tds.forEach(function(elemento){
    elemento.addEventListener('click',function(elemento){
        this.style.transform= 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
        const contenidoBoton=this.innerText;
        // texto=texto+contenidoBoton;
        console.log(contenidoBoton);
        console.log(texto);
        const textoNodo =document.createTextNode(contenidoBoton);
        pantalla.appendChild(textoNodo)
    })
})