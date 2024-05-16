import socket

# Definir el host y el puerto del servidor al que se conectará el cliente
HOST = '192.168.228.239'  # Dirección IP o nombre de host del servidor
PUERTO = 65432       # Puerto del servidor

# Crear un objeto de socket UDP
with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as cliente:
    # Enviar datos al servidor
    mensaje = "Hola, servidor UDP!"
    cliente.sendto(mensaje.encode('utf-8'), (HOST, PUERTO))
    print("Mensaje enviado al servidor:", mensaje)

