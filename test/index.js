const suma = (...nums) => {
    if(nums.length === 0) return 0
    
    let validInput = true;

    for(let i = 0; i < nums.length; i++){
        if(typeof nums[i] !== "number"){
            validInput = false;
        }
    }
    if(!validInput) return null

    let result = 0

    for(let i = 0; i < nums.length; i++){
        result += nums[i];
    }
    return result
}

let testPasados = 0;

// caso 1 la funcion tiene que devolver null si algun parametro no es un numero

let resultTest1 = suma("1", 8)

if(resultTest1===null){
    console.log("test 1 pasado")
    testPasados++
} else{
    console.log(`test fallado, se recibio ${resultTest1} y se esperaba un valor de null `)
}

//caso 2 la funcion tiene que devolver 0 si no se le pasa ningun parametro

let resultTest2 = suma()

if (resultTest2 === 0) {
    console.log("test 2 pasado")
    testPasados++
} else{
    console.log(`test fallado, se recibio ${resultTest2} y se esperaba un valor de 0 `)
}

//caso 3 la funcion suma tiene que sumar 2 numero correctamente

let resultTest3 = suma(10, 5);

if (resultTest3 === 15) {
    console.log("test 3 pasado")
    testPasados++
} else{
    console.log(`test fallado, se recibio ${resultTest3} y se esperaba un valor de 15 `)
}

//caso 4 la funcion suma debe poder sumar varios numeros

let resultTest4 = suma(10, 5, 2, 5)

if (resultTest4 === 22) {
    console.log("test 4 pasado")
    testPasados++
} else{
    console.log(`test fallado, se recibio ${resultTest4} y se esperaba un valor de 22 `)
}

//verificacion general

if (testPasados == 4) {
    console.log("todos los test pasaron")
} else{
    console.log(`no todos los test pasaron: ${testPasados} de 4`)
}

console.log("fin de los test")