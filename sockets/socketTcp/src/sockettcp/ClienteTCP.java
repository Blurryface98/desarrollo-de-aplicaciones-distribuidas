/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package sockettcp;

import java.io.*;
import java.net.*;

public class ClienteTCP {
    public static void main(String[] args) {
        final String HOST = "localhost";
        final int PUERTO = 12345;
        
        try {
            // Nos conectamos al servidor
            Socket clienteSocket = new Socket(HOST, PUERTO);
            
            // Creamos streams de entrada y salida para comunicarnos con el servidor
            PrintWriter out = new PrintWriter(clienteSocket.getOutputStream(), true);
            BufferedReader in = new BufferedReader(new InputStreamReader(clienteSocket.getInputStream()));
            
            // Enviamos un mensaje al servidor
            out.println("Hola, servidor TCP!");
            
            // Leemos la respuesta del servidor y la imprimimos en consola
            String respuestaServidor = in.readLine();
            System.out.println("Respuesta del servidor: " + respuestaServidor);
            
            // Cerramos los streams y el socket
            out.close();
            in.close();
            clienteSocket.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

