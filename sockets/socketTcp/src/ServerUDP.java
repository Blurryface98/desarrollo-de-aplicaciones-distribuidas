import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.net.SocketException;
import java.nio.file.Files;
import java.nio.file.Paths;


public class ServerUDP {
    public static void main(String[] args) {
        final int PORT = 9999;
        byte[] buffer = new byte[1024];
        boolean done = false;
        ServerUDP serverUDP = new ServerUDP(); 
        String path = "src\\chat_history.txt";
        IHistory history = serverUDP.new HistoryChatByTxt(path); // Use the instance to instantiate HistoryChatByTxt
        try {
            System.out.println("El server esta escuchando en el puerto " + PORT);
            DatagramSocket server = new DatagramSocket(PORT);
            while(!done){
                DatagramPacket packet = new DatagramPacket(buffer, buffer.length);
                try{
                    server.receive(packet);
                } catch (IOException e){
                    e.printStackTrace();
                }
                String message = new String(packet.getData());
                message = message.replaceAll("\u0000.*", "");
                System.out.println("El mensaje es: " + message);
                int clientPort = packet.getPort();
                System.out.println("El puerto del cliente es: " + clientPort);
                InetAddress clientAddress = packet.getAddress();
                if (message.contains("GET")){

                    String response = history.readHistoryChat();   // Use the instance to call the method readHistoryChat

                    DatagramPacket packet2 = new DatagramPacket
                                    (response.getBytes(), response.getBytes().length, clientAddress, clientPort);
                    server.send(packet2);
                    System.out.println("El historial de mensajes ha sido enviado");
                }else if (message.contains("POST")){
                    FileDB fileDB = serverUDP.new FileDB(path, message, history); // Use the instance to instantiate FileDB
                    fileDB.write();
                }else{
                    done = true;
                    System.out.println("El mensaje no es GET ni POST");
                }

            }
            server.close();
        } catch (SocketException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        
    }

    public class FileDB{
        private String path;
        private String message;
        private IHistory history;
        public FileDB(String path, String message, IHistory history){
            this.path = path;
            this.message = message;
            this.history = history;
        }

        public void write(){
            File file = new File(path);

            // Obtener el contenido actual del archivo

            String historyChat = history.readHistoryChat();


            StringBuilder sb = new StringBuilder(historyChat);
            
            if (message.startsWith("POST/") && message.contains(": ")) {
                // Agregar la nueva línea al final del archivo
                sb.append(message.substring(5)); // Ignorar "POST/"
                System.out.println("Esto es lo que se va a agregar: " + "'" +message.substring(5)+ "'");
                sb.append('\n');
            }
            // Sobrescribir el archivo con el contenido actualizado
            try{
                FileWriter fw = new FileWriter(file);
                fw.write(sb.toString());
                fw.close();
                System.out.println("Se ha actualizado el archivo exitosamente.");
            }catch (IOException e){
                System.err.println("Error al procesar el archivo: " + e.getMessage());
            }
        }
    }

    public class HistoryChatByTxt implements IHistory{
        private String path;
        public HistoryChatByTxt(String path){
            this.path = path;
        }

        public String readHistoryChat(){
            String historyChat = "";
            try {
                historyChat = new String(Files.readAllBytes(Paths.get(path)));
            } catch (IOException e) {
                e.printStackTrace();
            }
            return historyChat;
        }
    }

    public interface IHistory {
        public String readHistoryChat();
    }
    
}

