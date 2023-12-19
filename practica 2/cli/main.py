import mysql.connector

class HospitalCLI:
    def __init__(self):
        self.logged_in_user = None
        self.db_connection = None

    def conectar_bd(self, username, password):
        try:
            self.db_connection = mysql.connector.connect(
                host="localhost",
                user=username,
                password=password,
                database="practica1"
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
            if self.validar_credenciales(username, password):
                print(f"Bienvenido, {username}! Sesión iniciada.")
                self.logged_in_user = username
                self.menu_sesion_iniciada()

    def validar_credenciales(self, username, password):
        cursor = self.db_connection.cursor()

        # Consulta para verificar las credenciales en la base de datos
        query = "SELECT * FROM Usuario WHERE username = %s AND password = %s"
        cursor.execute(query, (username, password))
        user_data = cursor.fetchone()

        cursor.close()

        return user_data is not None


    def menu_sesion_iniciada(self):
        while True:
            print(f"***** BIENVENIDO USUARIO: {self.logged_in_user} *****")
            print("MENU:")
            print("1. CONSULTAS")
            print("2. ACTUALIZAR REGISTROS")
            print("3. AGREGAR REGISTROS")
            print("4. ELIMINAR REGISTROS")
            print("5. REALIZAR RESPALDO COMPLETO")
            print("6. VER RESPALDOS REALIZADOS")
            print("7. RESTAURAR RESPALDO")
            print("0. CERRAR SESION")

            opcion = input("INGRESE UNA OPCION: ")

            if opcion == "1":
                self.consultas()
            elif opcion == "2":
                self.actualizar_registros()
            elif opcion == "3":
                self.agregar_registros()
            elif opcion == "4":
                self.eliminar_registros()
            elif opcion == "5":
                self.realizar_respaldo_completo()
            elif opcion == "6":
                self.ver_respaldos_realizados()
            elif opcion == "7":
                self.restaurar_respaldo()
            elif opcion == "0":
                print("Cerrando sesión. ¡Hasta luego!")
                if self.db_connection:
                    self.db_connection.close()
                self.logged_in_user = None
                break
            else:
                print("Opción no válida. Por favor, ingrese un número del 0 al 7.")

    def actualizar_registros(self):
        while True:
            print(f"***** BIENVENIDO USUARIO: {self.logged_in_user} *****")
            print("MENU:")
            print("1. PACIENTES")
            print("2. HABITACIONES")
            print("3. LOG ACTIVIDAD")
            print("4. LOG HABITACION")
            print("0. CERRAR SESION")

            opcion = input("INGRESE UNA OPCION: ")

            if opcion == "1":
                self.submenu_pacientes()
            elif opcion == "2":
                self.submenu_habitaciones()
            elif opcion == "3":
                self.submenu_log_actividad()
            elif opcion == "4":
                self.submenu_log_habitacion()
            elif opcion == "0":
                print("Cerrando sesión. ¡Hasta luego!")
                if self.db_connection:
                    self.db_connection.close()
                self.logged_in_user = None
                break
            else:
                print("Opción no válida. Por favor, ingrese un número del 0 al 4.")

    def consultas(self):
        while True:
            print(f"***** BIENVENIDO USUARIO: {self.logged_in_user} *****")
            print("MENU:")
            print("1. PACIENTES")
            print("2. HABITACIONES")
            print("3. LOG ACTIVIDAD")
            print("4. LOG HABITACION")
            print("0. CERRAR SESION")

            opcion = input("INGRESE UNA OPCION: ")

            if opcion == "1":
                self.submenu_pacientes()
            elif opcion == "2":
                self.submenu_habitaciones()
            elif opcion == "3":
                self.submenu_log_actividad()
            elif opcion == "4":
                self.submenu_log_habitacion()
            elif opcion == "0":
                print("Cerrando sesión. ¡Hasta luego!")
                if self.db_connection:
                    self.db_connection.close()
                self.logged_in_user = None
                break
            else:
                print("Opción no válida. Por favor, ingrese un número del 0 al 4.")

    def agregar_registros(self):
        while True:
            print(f"***** BIENVENIDO USUARIO: {self.logged_in_user} *****")
            print("MENU:")
            print("1. PACIENTES")
            print("2. HABITACIONES")
            print("3. LOG ACTIVIDAD")
            print("4. LOG HABITACION")
            print("0. CERRAR SESION")

            opcion = input("INGRESE UNA OPCION: ")

            if opcion == "1":
                self.submenu_pacientes()
            elif opcion == "2":
                self.submenu_habitaciones()
            elif opcion == "3":
                self.submenu_log_actividad()
            elif opcion == "4":
                self.submenu_log_habitacion()
            elif opcion == "0":
                print("Cerrando sesión. ¡Hasta luego!")
                if self.db_connection:
                    self.db_connection.close()
                self.logged_in_user = None
                break
            else:
                print("Opción no válida. Por favor, ingrese un número del 0 al 4.")

    def eliminar_registros(self):
        while True:
            print(f"***** BIENVENIDO USUARIO: {self.logged_in_user} *****")
            print("MENU:")
            print("1. PACIENTES")
            print("2. HABITACIONES")
            print("3. LOG ACTIVIDAD")
            print("4. LOG HABITACION")
            print("0. CERRAR SESION")

            opcion = input("INGRESE UNA OPCION: ")

            if opcion == "1":
                self.submenu_pacientes()
            elif opcion == "2":
                self.submenu_habitaciones()
            elif opcion == "3":
                self.submenu_log_actividad()
            elif opcion == "4":
                self.submenu_log_habitacion()
            elif opcion == "0":
                print("Cerrando sesión. ¡Hasta luego!")
                if self.db_connection:
                    self.db_connection.close()
                self.logged_in_user = None
                break
            else:
                print("Opción no válida. Por favor, ingrese un número del 0 al 4.")

    def realizar_respaldo_completo(self):
        # Implementa la lógica para realizar un respaldo completo
        pass

    def ver_respaldos_realizados(self):
        # Implementa la lógica para ver respaldos realizados
        pass

    def restaurar_respaldo(self):
        # Implementa la lógica para restaurar un respaldo
        pass

    def submenu_pacientes(self):
        pass

    def submenu_habitaciones(self):
        pass

    def submenu_log_actividad(self):
        pass

    def submenu_log_habitacion(self):
       pass

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
