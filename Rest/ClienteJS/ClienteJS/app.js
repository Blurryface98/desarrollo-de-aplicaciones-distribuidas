const http = require('http');
const fs = require('fs');
const path = require('path');
const { sumar, restar, factorial, multiplicacion, division, potencia, modulo, raizCuadrada, logaritmo, sin, cos, tan, e, senh, cosh, tanh } = require('./clienteCalculadora');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        // Sirve el archivo HTML
        fs.readFile(path.join(__dirname, 'calculadora.html'), (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error al leer el archivo HTML');
                return;
            }

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else if (req.method === 'POST') {
        // Maneja las solicitudes de operaciones matemáticas
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // Convertir el buffer a string
        });
        req.on('end', async () => {
            if (req.url === '/sumar') {
                handleOperation(body, sumar, res);
            } else if (req.url === '/restar') {
                handleOperation(body, restar, res);
            } else if (req.url === '/factorial') {
                handleOperation(body, factorial, res);
            } else if (req.url === '/multiplicacion') {
                handleOperation(body, multiplicacion, res);
            } else if (req.url === '/division') {
                handleOperation(body, division, res);
            } else if (req.url === '/potencia') {
                handleOperation(body, potencia, res);
            } else if (req.url === '/modulo') {
                handleOperation(body, modulo, res);
            } else if (req.url === '/raizCuadrada') {
                handleOperation(body, raizCuadrada, res);
            } else if (req.url === '/logaritmo') {
                handleOperation(body, logaritmo, res);
            } else if (req.url === '/sin') {
                handleOperation(body, sin, res);
            } else if (req.url === '/cos') {
                handleOperation(body, cos, res);
            } else if (req.url === '/tan') {
                handleOperation(body, tan, res);
            } else if (req.url === '/e') {
                handleOperation(body, e, res);
            } else if (req.url === '/sinh') {
                handleOperation(body, senh, res);
            } else if (req.url === '/cosh') {
                handleOperation(body, cosh, res);
            } else if (req.url === '/tanh') {
                handleOperation(body, tanh, res);
            } else {
                res.writeHead(404);
                res.end('Página no encontrada');
            }
        });
    } else {
        res.writeHead(405);
        res.end('Método no permitido');
    }
});

function handleOperation(body, operationFunc, res) {
    const { num1, num2 } = JSON.parse(body);
    operationFunc(num1, num2)
        .then(resultado => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ resultado }));
        })
        .catch(error => {
            res.writeHead(500);
            res.end(`Error al llamar al servicio: ${error.message}`);
        });
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});



/*
const http = require('http');
const fs = require('fs');
const path = require('path');
const { sumar, restar } = require('./clienteCalculadora');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        // Sirve el archivo HTML
        fs.readFile(path.join(__dirname, 'calculadora.html'), (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error al leer el archivo HTML');
                return;
            }

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else if (req.url === '/sumar') {
        // Maneja la solicitud de suma
        if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString(); // Convertir el buffer a string
            });
            req.on('end', async () => {
                const { num1, num2 } = JSON.parse(body);
                try {
                    const resultado = await sumar(num1, num2);
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ resultado }));
                } catch (error) {
                    res.writeHead(500);
                    res.end(`Error al llamar al servicio: ${error.message}`);
                }
            });
        } else {
            res.writeHead(405);
            res.end('Método no permitido');
        }
    } else if (req.url === '/restar') {
        // Maneja la solicitud de resta
        if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString(); // Convertir el buffer a string
            });
            req.on('end', async () => {
                const { num1, num2 } = JSON.parse(body);
                try {
                    const resultado = await restar(num1, num2);
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ resultado }));
                } catch (error) {
                    res.writeHead(500);
                    res.end(`Error al llamar al servicio: ${error.message}`);
                }
            });
        } else {
            res.writeHead(405);
            res.end('Método no permitido');
        }
    } else {
        res.writeHead(404);
        res.end('Página no encontrada');
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
*/