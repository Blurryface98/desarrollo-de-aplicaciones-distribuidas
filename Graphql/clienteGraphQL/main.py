import requests
import tkinter as tk
from tkinter import ttk
from tkinter import messagebox


class AplicacionCRUD:
    def __init__(self, root):
        self.root = root
        self.root.title("Aplicación CRUD")

        self.crear_interfaz()

    def crear_interfaz(self):
        self.tabla = ttk.Treeview(self.root, columns=("ID","Nombre", "Apellidos", "Edad", "País"), show="headings")
        self.tabla.heading("ID", text="ID")
        self.tabla.heading("Nombre", text="Nombre")
        self.tabla.heading("Apellidos", text="Apellidos")
        self.tabla.heading("Edad", text="Edad")
        self.tabla.heading("País", text="País")
        self.tabla.pack(padx=10, pady=10)

        btn_frame = tk.Frame(self.root)
        btn_frame.pack(padx=10, pady=5)

        btn_actualizar = tk.Button(btn_frame, text="Actualizar", command=self.mostrar_ventana_actualizar)
        btn_actualizar.grid(row=0, column=0, padx=5)

        btn_agregar = tk.Button(btn_frame, text="Agregar", command=self.mostrar_ventana_agregar)
        btn_agregar.grid(row=0, column=1, padx=5)

        btn_borrar = tk.Button(btn_frame, text="Borrar", command=self.borrar_datos)
        btn_borrar.grid(row=0, column=2, padx=5)

        self.actualizar_tabla()

    def actualizar_tabla(self):
        self.tabla.delete(*self.tabla.get_children())
        datos = self.obtener_datos()
        for fila in datos:
            self.tabla.insert("", "end", values=fila)

    def obtener_datos(self):
        response = requests.post("http://localhost:4000/graphql",
                                 json={"query": "{ mostrar { id nombre apellidos edad pais } }"})
        datos = response.json()["data"]["mostrar"]
        return [(fila["id"], fila["nombre"], fila["apellidos"], fila["edad"], fila["pais"]) for fila in datos]

    def mostrar_ventana_agregar(self):
        ventana_agregar = tk.Toplevel(self.root)
        ventana_agregar.title("Agregar Datos")

        lbl_nombre = tk.Label(ventana_agregar, text="Nombre:")
        lbl_nombre.grid(row=0, column=0, padx=5, pady=5)
        self.entry_nombre = tk.Entry(ventana_agregar)
        self.entry_nombre.grid(row=0, column=1, padx=5, pady=5)

        lbl_apellidos = tk.Label(ventana_agregar, text="Apellidos:")
        lbl_apellidos.grid(row=1, column=0, padx=5, pady=5)
        self.entry_apellidos = tk.Entry(ventana_agregar)
        self.entry_apellidos.grid(row=1, column=1, padx=5, pady=5)

        lbl_edad = tk.Label(ventana_agregar, text="Edad:")
        lbl_edad.grid(row=2, column=0, padx=5, pady=5)
        self.entry_edad = tk.Entry(ventana_agregar)
        self.entry_edad.grid(row=2, column=1, padx=5, pady=5)

        lbl_pais = tk.Label(ventana_agregar, text="País:")
        lbl_pais.grid(row=3, column=0, padx=5, pady=5)
        self.entry_pais = tk.Entry(ventana_agregar)
        self.entry_pais.grid(row=3, column=1, padx=5, pady=5)

        btn_agregar = tk.Button(ventana_agregar, text="Agregar", command=self.agregar_datos)
        btn_agregar.grid(row=4, column=0, columnspan=2, padx=5, pady=5)

    def mostrar_ventana_actualizar(self):
        seleccion = self.tabla.selection()
        if seleccion:
            id_seleccionado = self.tabla.item(seleccion, "values")[0]
            ventana_actualizar = tk.Toplevel(self.root)
            ventana_actualizar.title("Actualizar Datos")

            lbl_nombre = tk.Label(ventana_actualizar, text="Nombre:")
            lbl_nombre.grid(row=0, column=0, padx=5, pady=5)
            self.entry_nombre = tk.Entry(ventana_actualizar)
            self.entry_nombre.grid(row=0, column=1, padx=5, pady=5)

            lbl_apellidos = tk.Label(ventana_actualizar, text="Apellidos:")
            lbl_apellidos.grid(row=1, column=0, padx=5, pady=5)
            self.entry_apellidos = tk.Entry(ventana_actualizar)
            self.entry_apellidos.grid(row=1, column=1, padx=5, pady=5)

            lbl_edad = tk.Label(ventana_actualizar, text="Edad:")
            lbl_edad.grid(row=2, column=0, padx=5, pady=5)
            self.entry_edad = tk.Entry(ventana_actualizar)
            self.entry_edad.grid(row=2, column=1, padx=5, pady=5)

            lbl_pais = tk.Label(ventana_actualizar, text="País:")
            lbl_pais.grid(row=3, column=0, padx=5, pady=5)
            self.entry_pais = tk.Entry(ventana_actualizar)
            self.entry_pais.grid(row=3, column=1, padx=5, pady=5)

            # Obtener los datos del registro seleccionado y ponerlos en los campos de entrada
            datos_seleccionados = self.tabla.item(seleccion, "values")[1:]
            self.entry_nombre.insert(0, datos_seleccionados[0])
            self.entry_apellidos.insert(0, datos_seleccionados[1])
            self.entry_edad.insert(0, datos_seleccionados[2])
            self.entry_pais.insert(0, datos_seleccionados[3])

            btn_actualizar = tk.Button(ventana_actualizar, text="Actualizar",
                                       command=lambda: self.actualizar_datos(id_seleccionado, ventana_actualizar))
            btn_actualizar.grid(row=4, column=0, columnspan=2, padx=5, pady=5)
        else:
            messagebox.showwarning("Advertencia", "Por favor seleccione un registro para actualizar")

    def agregar_datos(self):
        nombre = self.entry_nombre.get()
        apellidos = self.entry_apellidos.get()
        edad = self.entry_edad.get()
        pais = self.entry_pais.get()

        if nombre and apellidos and edad and pais:
            # Realizar la solicitud POST al servidor GraphQL para agregar el nuevo registro
            mutation = '''
                mutation($nombre: String!, $apellidos: String!, $edad: String!, $pais: String!) {
                  createPost(post: {nombre: $nombre, apellidos: $apellidos, edad: $edad, pais: $pais}) {
                    id
                    nombre
                    apellidos
                    edad
                    pais
                  }
                }
            '''
            variables = {"nombre": nombre, "apellidos": apellidos, "edad": edad, "pais": pais}
            response = requests.post("http://localhost:4000/graphql", json={"query": mutation, "variables": variables})

            if response.status_code == 200:
                messagebox.showinfo("Éxito", "Datos agregados correctamente")
                self.actualizar_tabla()
            else:
                messagebox.showerror("Error", "No se pudo agregar los datos")
        else:
            messagebox.showwarning("Advertencia", "Por favor complete todos los campos")

    def actualizar_datos(self, id_registro, ventana_actualizar):
        nombre = self.entry_nombre.get()
        apellidos = self.entry_apellidos.get()
        edad = self.entry_edad.get()
        pais = self.entry_pais.get()

        if nombre and apellidos and edad and pais:
            # Realizar la solicitud POST al servidor GraphQL para actualizar el registro
            mutation = '''
                mutation($id: String!, $nombre: String!, $apellidos: String!, $edad: String!, $pais: String!) {
                  updatePost(id: $id, post: {nombre: $nombre, apellidos: $apellidos, edad: $edad, pais: $pais}) {
                    id
                    nombre
                    apellidos
                    edad
                    pais
                  }
                }
            '''
            variables = {"id": id_registro, "nombre": nombre, "apellidos": apellidos, "edad": edad, "pais": pais}
            print(variables)
            response = requests.post("http://localhost:4000/graphql", json={"query": mutation, "variables": variables})

            if response.status_code == 200:
                messagebox.showinfo("Éxito", "Datos actualizados correctamente")
                ventana_actualizar.destroy()  # Cerrar la ventana emergente
                self.actualizar_tabla()
            else:
                messagebox.showerror("Error", "No se pudo actualizar los datos")
        else:
            messagebox.showwarning("Advertencia", "Por favor complete todos los campos")

    def borrar_datos(self):
        seleccion = self.tabla.selection()
        if seleccion:
            if messagebox.askyesno("Confirmación", "¿Estás seguro de que deseas borrar este registro?"):
                id_seleccionado = self.tabla.item(seleccion, "values")[0]
                mutation = '''
                       mutation($id: String!) {
                         deletePost(id: $id)
                       }
                   '''
                variables = {"id": id_seleccionado}
                response = requests.post("http://localhost:4000/graphql",
                                         json={"query": mutation, "variables": variables})
                if response.status_code == 200:
                    messagebox.showinfo("Éxito", "Registro eliminado correctamente")
                    self.actualizar_tabla()
                else:
                    messagebox.showerror("Error", "No se pudo eliminar el registro")
        else:
            messagebox.showwarning("Advertencia", "Por favor seleccione un registro para borrar")


if __name__ == "__main__":
    root = tk.Tk()
    app = AplicacionCRUD(root)
    root.mainloop()


