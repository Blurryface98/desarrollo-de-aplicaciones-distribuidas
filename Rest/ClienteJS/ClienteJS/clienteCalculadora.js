const axios = require('axios');

const baseUrl = 'http://192.168.225.15:8080/CalculadoraREST/webresources/operaciones/';

// Ejemplo de llamada al método suma
async function sumar(num1, num2) {
    try {
        const response = await axios.get(baseUrl + 'suma', {
            params: {
                num1: num1,
                num2: num2
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(`Error al llamar al servicio: ${error.message}`);
    }
}

// Ejemplo de llamada al método resta
async function restar(numeroUno, numeroDos) {
    try {
        const response = await axios.get(baseUrl + 'resta', {
            params: {
                numeroUno: numeroUno,
                numeroDos: numeroDos
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(`Error al llamar al servicio: ${error.message}`);
    }
}

// Función para llamar al método factorial
async function factorial(base) {
    try {
        const response = await axios.get(baseUrl + 'factorial', {
            params: {
                base: base
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(`Error al llamar al servicio: ${error.message}`);
    }
}

// Función para llamar al método multiplicacion
async function multiplicacion(num1, num2) {
    try {
        const response = await axios.get(baseUrl + 'multiplicacion', {
            params: {
                numeroUno: num1,
                numeroDos: num2
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(`Error al llamar al servicio: ${error.message}`);
    }
}

// Función para llamar al método division
async function division(num1, num2) {
    try {
        const response = await axios.get(baseUrl + 'division', {
            params: {
                numero_1: num1,
                numero_2: num2
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(`Error al llamar al servicio: ${error.message}`);
    }
}

// Función para llamar al método potencia
async function potencia(num1, num2) {
    try {
        const response = await axios.get(baseUrl + 'potencia', {
            params: {
                num1: num1,
                num2: num2
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(`Error al llamar al servicio: ${error.message}`);
    }
}

// Función para llamar al método modulo
async function modulo(num1, num2) {
    try {
        const response = await axios.get(baseUrl + 'modulo', {
            params: {
                num1: num1,
                num2: num2
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(`Error al llamar al servicio: ${error.message}`);
    }
}

// Función para llamar al método raizCuadrada
async function raizCuadrada(raiz) {
    try {
        const response = await axios.get(baseUrl + 'raizCuadrada', {
            params: {
                raiz: raiz
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(`Error al llamar al servicio: ${error.message}`);
    }
}

// Función para llamar al método logaritmo
async function logaritmo(log) {
    try {
        const response = await axios.get(baseUrl + 'logaritmo', {
            params: {
                log: log
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(`Error al llamar al servicio: ${error.message}`);
    }
}

// Función para llamar al método sin
async function sin(seno) {
    try {
        const response = await axios.get(baseUrl + 'sin', {
            params: {
                seno: seno
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(`Error al llamar al servicio: ${error.message}`);
    }
}

// Función para llamar al método cos
async function cos(cos) {
    try {
        const response = await axios.get(baseUrl + 'cos', {
            params: {
                cos: cos
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(`Error al llamar al servicio: ${error.message}`);
    }
}

// Función para llamar al método tan
async function tan(tan) {
    try {
        const response = await axios.get(baseUrl + 'tan', {
            params: {
                tan: tan
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(`Error al llamar al servicio: ${error.message}`);
    }
}

// Función para llamar al método e
async function e(e) {
    try {
        const response = await axios.get(baseUrl + 'e', {
            params: {
                e: e
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(`Error al llamar al servicio: ${error.message}`);
    }
}

// Función para llamar al método sinh
async function senh(senoh) {
    try {
        const response = await axios.get(baseUrl + 'sinh', {
            params: {
                senoh: senoh
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(`Error al llamar al servicio: ${error.message}`);
    }
}

// Función para llamar al método cosh
async function cosh(cosh) {
    try {
        const response = await axios.get(baseUrl + 'cosh', {
            params: {
                cosh: cosh
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(`Error al llamar al servicio: ${error.message}`);
    }
}

// Función para llamar al método tanh
async function tanh(tanh) {
    try {
        const response = await axios.get(baseUrl + 'tanh', {
            params: {
                tanh: tanh
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(`Error al llamar al servicio: ${error.message}`);
    }
}

module.exports = { sumar, restar, factorial, multiplicacion, division, potencia, modulo, raizCuadrada, logaritmo, sin, cos, tan, e, senh, cosh, tanh };



/*const axios = require('axios');

const baseUrl = 'http://localhost:8080/calculadora1/webresources/operaciones/';

// Ejemplo de llamada al método suma
async function sumar(num1, num2) {
    try {
        const response = await axios.get(baseUrl + 'suma', {
            params: {
                num1: num1,
                num2: num2
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(`Error al llamar al servicio: ${error.message}`);
    }
}

// Ejemplo de llamada al método resta
async function restar(numeroUno, numeroDos) {
    try {
        const response = await axios.get(baseUrl + 'resta', {
            params: {
                numeroUno: numeroUno,
                numeroDos: numeroDos
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(`Error al llamar al servicio: ${error.message}`);
    }
}

// Puedes agregar más funciones para llamar a otros métodos del servicio aquí

module.exports = { sumar, restar }; // Exporta las funciones para usarlas en otros archivos
*/