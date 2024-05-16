/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package calcu;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;

public class Servidor {
    public static void main(String[] args) {
        try {
            // Crear el objeto remoto
            Sumador sumador = new SumadorImpl();

            // Registrar el objeto remoto en el registro RMI
            Registry registry = LocateRegistry.createRegistry(1099);
            registry.rebind("Sumador", sumador);

            System.out.println("Servidor listo...");
        } catch (Exception e) {
            System.err.println("Excepción en el servidor: " + e.toString());
            e.printStackTrace();
        }
    }
}

