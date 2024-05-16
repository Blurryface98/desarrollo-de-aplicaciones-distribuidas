import socket
import threading
import tkinter as tk

def aceptar_conexiones():
    while True:
        cliente_socket, direccion = servidor.accept()
        print(f"Cliente conectado desde {direccion[0]}:{direccion[1]}")

        clientes.append(cliente_socket)

        # Iniciar un hilo para manejar las comunicaciones con el cliente
        threading.Thread(target=atender_cliente, args=(cliente_socket,)).start()

def atender_cliente(cliente_socket):
    while True:
        try:
            mensaje = cliente_socket.recv(1024).decode("utf-8")
            mensaje_de_texto.insert(tk.END, mensaje + '\n')
        except Exception as e:
            print(f"Error al recibir mensaje del cliente: {e}")
            clientes.remove(cliente_socket)
            cliente_socket.close()
            break

def enviar_mensaje():
    mensaje = mensaje_a_enviar.get()
    mensaje_de_texto.insert(tk.END, "Servidor: " + mensaje + '\n')
    mensaje_a_enviar.delete(0, tk.END)
    for cliente in clientes:
        cliente.send(mensaje.encode("utf-8"))

servidor = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
servidor.bind(('192.168.228.239',54321))
servidor.listen(5)

clientes = []

# Configuración de la interfaz gráfica
ventana = tk.Tk()
ventana.title("Servidor")

mensaje_de_texto = tk.Text(ventana)
mensaje_de_texto.pack()

mensaje_a_enviar = tk.Entry(ventana)
mensaje_a_enviar.pack()

boton_enviar = tk.Button(ventana, text="Enviar", command=enviar_mensaje)
boton_enviar.pack()

# Iniciar hilo para aceptar conexiones de clientes
threading.Thread(target=aceptar_conexiones).start()

ventana.mainloop()
