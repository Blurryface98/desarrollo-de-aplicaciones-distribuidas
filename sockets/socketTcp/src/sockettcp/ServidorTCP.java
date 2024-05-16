package sockettcp;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;

public class ServidorTCP {
    public static void main(String[] args) {
        final int PORT = 12345;

        try {
            ServerSocket serverSocket = new ServerSocket(PORT);
            System.out.println("Servidor TCP iniciado en el puerto " + PORT);

            // Espera a que el primer cliente se conecte
            Socket clientSocket1 = serverSocket.accept();
            System.out.println("Cliente 1 conectado desde " + clientSocket1.getInetAddress());

            // Espera a que el segundo cliente se conecte
            Socket clientSocket2 = serverSocket.accept();
            System.out.println("Cliente 2 conectado desde " + clientSocket2.getInetAddress());

            // Inicializa un hilo para manejar la comunicación con el cliente 1
            Thread clientHandler1 = new Thread(new ClientHandler(clientSocket1));
            clientHandler1.start();

            // Inicializa un hilo para manejar la comunicación con el cliente 2
            Thread clientHandler2 = new Thread(new ClientHandler(clientSocket2));
            clientHandler2.start();

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    static class ClientHandler implements Runnable {
        private final Socket clientSocket;
        private BufferedReader input;
        private PrintWriter output;

        public ClientHandler(Socket socket) {
            this.clientSocket = socket;
            try {
                input = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
                output = new PrintWriter(clientSocket.getOutputStream(), true);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        @Override
        public void run() {
            try {
                String message;
                while ((message = input.readLine()) != null) {
                    System.out.println("Mensaje recibido desde " + clientSocket.getInetAddress() + ": " + message);
                    // Envía el mensaje recibido de vuelta al cliente
                    output.println("Mensaje recibido: " + message);
                }
            } catch (IOException e) {
                e.printStackTrace();
            } finally {
                try {
                    clientSocket.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}