from zeep import Client
import tkinter as tk
from tkinter import ttk, messagebox

# Crear el cliente
cliente = Client('http://192.168.218.141:8080/ws/products.wsdl')


def get_products():
    try:
        # Obtener los productos
        productos = cliente.service.getProducts()

        # Crear una ventana secundaria para mostrar la tabla
        ventana_productos = tk.Toplevel(root)
        ventana_productos.title("Lista de Productos")

        # Crear la tabla
        tree = ttk.Treeview(ventana_productos)
        tree["columns"] = ( "nombre","descripcion", "precio")

        # Configurar las columnas
        tree.column("#0", width=0, stretch=tk.NO)
        tree.column("nombre", anchor=tk.W, width=200)
        tree.column("descripcion", anchor=tk.W, width=200)
        tree.column("precio", anchor=tk.W, width=100)

        # Configurar los encabezados de las columnas
        tree.heading("nombre", text="Nombre")
        tree.heading("descripcion", text="descripcion")
        tree.heading("precio", text="Precio")

        # Agregar los productos a la tabla
        for producto in productos:
            tree.insert("", tk.END, values=(producto['name'], producto['description'], producto['price']))

        tree.pack(expand=True, fill="both")

    except Exception as e:
        messagebox.showerror('Error', f'Error al enviar la solicitud: {str(e)}')


root = tk.Tk()
root.title('Cliente SOAP Python')

get_products_button = tk.Button(root, text='Mostrar Productos', command=get_products)
get_products_button.pack(pady=20)

root.mainloop()
