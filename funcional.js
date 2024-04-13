
console.log("Funcion  filtar expresiones numericas")

//Function that reccibe a string and return a list of the numeric values 


let string1="44*3*456/55/88"

function listNumValues (string){
    return string.match(/\d+/g);;
}

function listOperator (string){
    return string.match(/[^\d]/g);
}


console.log(listNumValues(string1),"\n", listOperator(string1));

//Next to do: numeric values on list from string to Float and "merge" the list with operator on list operator