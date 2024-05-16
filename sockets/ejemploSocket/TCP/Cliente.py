import socket
import tkinter as tk
import threading


def enviar_mensaje():
    mensaje = mensaje_a_enviar.get()
    mensaje_de_texto.insert(tk.END, "Cliente: " + mensaje + '\n')
    mensaje_a_enviar.delete(0, tk.END)
    cliente.send(mensaje.encode("utf-8"))

def recibir_mensajes():
    while True:
        try:
            mensaje = cliente.recv(1024).decode("utf-8")
            mensaje_de_texto.insert("Servidor: "+ tk.END, mensaje + '\n')
        except Exception as e:
            print(f"Error al recibir mensaje del servidor: {e}")
            cliente.close()
            break

cliente = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
cliente.connect(('192.168.228.239', 12345))

# Configuración de la interfaz gráfica
ventana = tk.Tk()
ventana.title("Cliente")

mensaje_de_texto = tk.Text(ventana)
mensaje_de_texto.pack()

mensaje_a_enviar = tk.Entry(ventana)
mensaje_a_enviar.pack()

boton_enviar = tk.Button(ventana, text="Enviar", command=enviar_mensaje)
boton_enviar.pack()

# Iniciar hilo para recibir mensajes del servidor
threading.Thread(target=recibir_mensajes).start()

ventana.mainloop()
