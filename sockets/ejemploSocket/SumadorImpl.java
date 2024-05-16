package calcu;
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;

public class SumadorImpl extends UnicastRemoteObject implements Sumador {
    public SumadorImpl() throws RemoteException {
        super();
    }

    public int sumar(int a, int b) throws RemoteException {
        return a + b;
    }
}
