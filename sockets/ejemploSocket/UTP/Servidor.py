import socket

# Definir el host y el puerto en el que el servidor escuchará
HOST = '192.168.228.239'  # Escucha en todas las interfaces disponibles
PUERTO = 65432  # Puerto para la conexión

# Crear un objeto de socket UDP
with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as servidor:
    # Enlace del socket a la dirección y el puerto
    servidor.bind((HOST, PUERTO))

    print("Servidor UDP esperando conexiones...")

    # Bucle infinito para recibir mensajes
    while True:
        # Recibir datos del cliente
        datos, direccion = servidor.recvfrom(1024)
        print('Mensaje recibido desde:', direccion)
        print('Datos recibidos del cliente:', datos.decode())
