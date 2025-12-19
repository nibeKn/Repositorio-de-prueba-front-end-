
const num1 = document.getElementById("num1");
const num2 = document.getElementById("num2");
const resultado = document.getElementById("resultado");

// 2. Funciones de operación

document.getElementById("btnSumar").addEventListener("click", function() {
    const val1 = Number(num1.value);
    const val2 = Number(num2.value);
    resultado.textContent = (val1 + val2); 
});

document.getElementById("btnRestar").addEventListener("click", function() {
    const val1 = Number(num1.value);
    const val2 = Number(num2.value);
    resultado.textContent = (val1 - val2); 
});

document.getElementById("btnMultiplicar").addEventListener("click", function() {
    const val1 = Number(num1.value);
    const val2 = Number(num2.value);
    resultado.textContent = (val1 * val2); 
});

document.getElementById("btnDividir").addEventListener("click", function() {
    const val1 = Number(num1.value);
    const val2 = Number(num2.value);
    
    if(val2 === 0) {
        resultado.textContent = "Error"; // Manejo simple de error
    } else {
        resultado.textContent = (val1 / val2); 
    }
});