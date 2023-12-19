import mysql.connector

class HospitalCLI:
    def __init__(self):
        self.logged_in_user = None
        self.db_connection = None

    def iniciar_sesion(self):
        print("*** INICIO DE SESION ***")
        username = input("INGRESE USUARIO: ")
        password = input("INGRESE CONTRASEÑA: ")

        try:
            self.db_connection = mysql.connector.connect(
                host="localhost",
                user=username,
                password=password,
                database="practica1"
            )
            print(f"Bienvenido, {username}! Sesión iniciada.")
            self.logged_in_user = username
        except mysql.connector.Error as err:
            print(f"Error al conectar con la base de datos: {err}")
            self.db_connection = None

    def registrar_usuario(self):
        cursor = self.db_connection.cursor()

        print("*** REGISTRO DE NUEVO USUARIO ***")
        username = input("INGRESE UN NOMBRE DE USUARIO: ")
        password = input("INGRESE UNA CONTRASEÑA: ")

        query = "SELECT * FROM usuarios WHERE username = %s"
        cursor.execute(query, (username,))
        existing_user = cursor.fetchone()

        if existing_user:
            print("El nombre de usuario ya está en uso. Por favor, elija otro.")
        else:
            insert_query = "INSERT INTO usuarios (username, password) VALUES (%s, %s)"
            cursor.execute(insert_query, (username, password))
            self.db_connection.commit()
            print(f"Usuario {username} registrado exitosamente.")

        cursor.close()

    def menu_principal(self):
        while True:
            print("*** CLI HOSPITAL BIENVENIDO ***")
            print("1. INICIAR SESION")
            print("2. REGISTRAR UN NUEVO USUARIO")
            print("3. SALIR")

            opcion = input("INGRESE UNA OPCION: ")

            if opcion == "1":
                self.iniciar_sesion()
            elif opcion == "2":
                self.registrar_usuario()
            elif opcion == "3":
                print("Saliendo del programa. ¡Hasta luego!")
                if self.db_connection:
                    self.db_connection.close()
                break
            else:
                print("Opción no válida. Por favor, ingrese un número del 1 al 3.")

if __name__ == "__main__":
    hospital_cli = HospitalCLI()
    hospital_cli.menu_principal()
