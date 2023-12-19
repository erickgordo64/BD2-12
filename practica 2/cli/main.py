import mysql.connector

class HospitalCLI:
    def __init__(self):
        self.logged_in_user = None
        self.db_connection = None

    def conectar_bd(self, username, password):
        try:
            self.db_connection = mysql.connector.connect(
                host="tu_host",
                user=username,
                password=password,
                database="tu_base_de_datos"
            )
            return True
        except mysql.connector.Error as err:
            print(f"Error al conectar con la base de datos: {err}")
            return False

    def iniciar_sesion(self):
        print("*** INICIO DE SESION ***")
        username = input("INGRESE USUARIO: ")
        password = input("INGRESE CONTRASEÑA: ")

        if self.conectar_bd(username, password):
            print(f"Bienvenido, {username}! Sesión iniciada.")
            self.logged_in_user = username

    def registrar_usuario(self):
        print("*** REGISTRO DE NUEVO USUARIO ***")
        nuevo_usuario = input("INGRESE NUEVO USUARIO: ")
        nueva_contrasena = input("INGRESE CONTRASEÑA: ")
        usuario_admin = input("INGRESE USUARIO ADMINISTRADOR: ")
        contrasena_admin = input("INGRESE CONTRASEÑA ADMINISTRADOR: ")
        rol_nuevo_usuario = input("INGRESE EL ROL DEL NUEVO USUARIO: ")

        if self.conectar_bd(usuario_admin, contrasena_admin):
            cursor = self.db_connection.cursor()

            # Verificar si el usuario administrador y la contraseña son correctos
            query_admin = "SELECT * FROM usuarios WHERE username = %s"
            cursor.execute(query_admin, (usuario_admin,))
            admin_data = cursor.fetchone()

            if not admin_data:
                print("Credenciales del administrador incorrectas. No se puede registrar el nuevo usuario.")
            else:
                # Si las credenciales del administrador son correctas, registrar el nuevo usuario
                insert_query = "INSERT INTO usuarios (username, password, rol) VALUES (%s, %s, %s)"
                cursor.execute(insert_query, (nuevo_usuario, nueva_contrasena, rol_nuevo_usuario))
                self.db_connection.commit()
                print(f"Usuario {nuevo_usuario} registrado exitosamente como {rol_nuevo_usuario}.")

            cursor.close()
            self.db_connection.close()

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

