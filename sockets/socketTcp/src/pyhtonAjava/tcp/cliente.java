package pyhtonAjava.tcp;
import java.io.*;
import java.net.*;

public class cliente {
    public static void main(String[] args) {
        String serverHost = "192.168.228.239";
        int serverPort = 8888;

        try {
            Socket socket = new Socket(serverHost, serverPort);

            // Obtenemos los streams de entrada y salida
            BufferedReader input = new BufferedReader(new InputStreamReader(socket.getInputStream()));
            PrintWriter output = new PrintWriter(socket.getOutputStream(), true);

            // Enviamos un mensaje al servidor
            output.println("Mensaje desde el cliente TCP");

            // Leemos la respuesta del servidor
            String response = input.readLine();
            System.out.println("Respuesta del servidor: " + response);

            // Cerramos la conexión
            socket.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
