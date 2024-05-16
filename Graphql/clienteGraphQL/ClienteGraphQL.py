import requests
import tkinter as tk
from tkinter import ttk


class CRUDApp:
    def __init__(self, root):
        self.root = root
        self.root.title("CRUD App")

        self.create_ui()

    def create_ui(self):
        self.table = ttk.Treeview(self.root, columns=("ID", "Nombre", "Apellidos", "Edad", "País"), show="headings")
        self.table.heading("ID", text="ID")
        self.table.heading("Nombre", text="Nombre")
        self.table.heading("Apellidos", text="Apellidos")
        self.table.heading("Edad", text="Edad")
        self.table.heading("País", text="País")
        self.table.pack(padx=10, pady=10)

        btn_frame = tk.Frame(self.root)
        btn_frame.pack(padx=10, pady=5)

        btn_refresh = tk.Button(btn_frame, text="Refrescar", command=self.refresh_data)
        btn_refresh.grid(row=0, column=0, padx=5)

        btn_add = tk.Button(btn_frame, text="Agregar", command=self.add_data)
        btn_add.grid(row=0, column=1, padx=5)

        btn_update = tk.Button(btn_frame, text="Actualizar", command=self.update_data)
        btn_update.grid(row=0, column=2, padx=5)

        btn_delete = tk.Button(btn_frame, text="Borrar", command=self.delete_data)
        btn_delete.grid(row=0, column=3, padx=5)

        self.refresh_data()

    def refresh_data(self):
        self.table.delete(*self.table.get_children())
        data = self.get_data()
        for row in data:
            self.table.insert("", "end", values=row)

    def get_data(self):
        response = requests.post("http://localhost:4000/graphql",
                                 json={"query": "{ mostrar { id nombre apellidos edad pais } }"})
        data = response.json()["data"]["mostrar"]
        return [(row["id"], row["nombre"], row["apellidos"], row["edad"], row["pais"]) for row in data]

    def add_data(self):
        # Aquí puedes implementar la lógica para agregar datos
        pass

    def update_data(self):
        # Aquí puedes implementar la lógica para actualizar datos
        pass

    def delete_data(self):
        # Aquí puedes implementar la lógica para borrar datos
        pass


if __name__ == "__main__":
    root = tk.Tk()
    app = CRUDApp(root)
    root.mainloop()
