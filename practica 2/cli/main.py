import mysql.connector
from datetime import datetime
import subprocess
import os
class HospitalCLI:
    def __init__(self):
        self.logged_in_user = None
        self.db_connection = None
        self.logged_in_role = None

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
                self.insertar_log("inicio sesion")
                rol_usuario = self.obtener_rol(username)
                print(f"Rol del usuario: {rol_usuario}")
                self.logged_in_role = rol_usuario
                self.menu_sesion_iniciada()

    def validar_credenciales(self, username, password):
        cursor = self.db_connection.cursor()

        # Consulta para verificar las credenciales en la base de datos
        query = "SELECT * FROM usuario WHERE usuario = %s AND contrasena = %s"
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
        self.Hacer_respaldo(1)

    def ver_respaldos_realizados(self):
        self.Hacer_respaldo(2)

    def restaurar_respaldo(self):
        self.Hacer_respaldo(3)

    def submenu_pacientes(self):
        self.validar_rol_permiso()
    def submenu_habitaciones(self):
        self.validar_rol_permiso()

    def submenu_log_actividad(self):
        self.validar_rol_permiso()

    def submenu_log_habitacion(self):
        self.validar_rol_permiso()

    def validar_rol_permiso(self):
        query = input ("Ingrese su query: ")
        instruccion = query.split(" ", 1)
        if self.logged_in_role !=3:
            cursor = self.db_connection.cursor()
            
            instrution = instruccion[0].lower()
            
            query_codigo = f"SELECT codigo FROM Permisos WHERE permiso = '{instrution}'"
            
            cursor.execute(query_codigo)
            
            resultado_permiso = cursor.fetchone()
           
            if resultado_permiso:
                codigo_permiso = resultado_permiso[0]
                
                consulta_validacion = f"SELECT * FROM Rol_Permisos WHERE rol_codigo = '{self.logged_in_role}' AND permiso_codigo = '{codigo_permiso}'"

                cursor.execute(consulta_validacion)
                resultado_validar = cursor.fetchone()
                
                if resultado_validar:
                    try:
                        cursor.execute(query)

                        resultados = cursor.fetchall()

                        if resultados:
                            for resultado in resultados:
                                print(resultado)
                        else:
                            print("No se encontraron resultados.")

                        self.db_connection.commit()
                        print("Query ejecutado exitosamente")
                        self.insertar_log("Instruccion realizada: " + instruccion[0])
                    except Exception as e:
                        print(f"Error al realizar consulta: {e}")
                        self.insertar_log(e)
                else:
                    print ("No cuenta con los permisos necesarios")
                    self.insertar_log("No cuenta con permisos para realizar: " + instruccion[0])
            else:
                print("Permiso no encontrado ")
            cursor.close()
        else:
            cursor = self.db_connection.cursor()
            cursor.execute(query)
            resultados = cursor.fetchall()

            if resultados:
                for resultado in resultados:
                    print(resultado)
            else:
                print("No se encontraron resultados.")
            cursor.close()
            self.insertar_log("Instruccion realizada: " + instruccion[0])

    def Hacer_respaldo (self, opcion):
        if self.logged_in_role == 3:
            if opcion == 1:
                fecha_actual = datetime.now().strftime("%Y%m%d_%H%M%S")
                archivo_respaldo = f"{fecha_actual}.sql"

                # Construir el comando mysqldump
                comando = [
                    'mysqldump',
                    '-u', "root",
                    '-p',
                    '--databases', "practica1",
                    '--result-file', archivo_respaldo
                ]
                try:
                    subprocess.run(comando, check=True)

                    print(f"Respaldo completo de practica1 exitoso. Guardado en '{archivo_respaldo}'")
                    ruta = os.getcwd() + '/'+archivo_respaldo
                    query = f"INSERT INTO respaldo (nombre, ruta) values ('{archivo_respaldo}','{ruta}')"
                    cursor = self.db_connection.cursor()
                    cursor.execute(query)
                    cursor.close()
                    self.insertar_log("Respaldo realizado")

                except subprocess.CalledProcessError as e:
                    print(f"Error al realizar el respaldo: {e}")

            elif opcion == 2:
                query = "SELECT * FROM respaldo"
                cursor = self.db_connection.cursor()
                cursor.execute(query)
                resultados = cursor.fetchall()
                if resultados:
                    for resultado in resultados:
                        print(resultado)
                else:
                    print("No se encontraron resultados.")

                cursor.close()
                self.insertar_log("Select de respaldo realizado")
            elif opcion == 3:
                numero_respaldo = input("Ingrese el numero de respaldo: ")
                query =f"SELECT nombre FROM respaldo where id = '{numero_respaldo}'"
                cursor = self.db_connection.cursor()
                cursor.execute(query)
                nombre_respaldo = cursor.fetchone()
                cursor.close()
                self.delete_tablas()
                comando = [
                    'mysql',
                    '-u', 'root',
                    '-p',
                    "practica1",
                    '<', nombre_respaldo[0]
                ]

                try:
                    # Ejecutar el comando mysql para restaurar el respaldo
                    subprocess.run(' '.join(comando), shell=True, check=True)

                    print(f"Restauración del respaldo en practica1 exitosa.")
                    self.insertar_log("restauracion de respaldo ejecutado")

                except subprocess.CalledProcessError as e:
                    print(f"Error al restaurar el respaldo: {e}")
                self.insertar_log("restauracion de respaldo fallido")
        else:
            print(f"No cuenta con permisos para realizar respaldo")
            self.insertar_log("No cuenta con permisos para realizar respaldo")

    def delete_tablas(self):
        cursor = self.db_connection.cursor()
        query="delete from log_actividad;"
        query1="delete from log_habitacion;"
        query2="delete from habitacion;"
        query3="delete from paciente;"
        cursor.execute(query)
        cursor.execute(query1)
        cursor.execute(query2)
        cursor.execute(query3)
        cursor.close()
        self.insertar_log("eliminacion de tablas realizada")

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
            query_admin = "SELECT * FROM usuario WHERE usuario = %s"
            cursor.execute(query_admin, (usuario_admin,))
            admin_data = cursor.fetchone()

            rol_usuario = self.obtener_rol(usuario_admin)

            if rol_usuario == 3:
                if not admin_data:
                    print("Credenciales del administrador incorrectas. No se puede registrar el nuevo usuario.")
                else:
                    # Si las credenciales del administrador son correctas, obtener el código del rol
                    rol_codigo = self.obtener_codigo_rol(rol_nuevo_usuario)
                    self.logged_in_user = usuario_admin
                    if rol_codigo is not None:
                        # Registrar el nuevo usuario con el código del rol obtenido
                        insert_query = "INSERT INTO usuario (usuario, contrasena, rol_codigo) VALUES (%s, %s, %s)"
                        cursor.execute(insert_query, (nuevo_usuario, nueva_contrasena, rol_codigo))
                        self.db_connection.commit()
                        self.insertar_log("se registro un nuevo usuario en el sistema")
                        print(f"Usuario {nuevo_usuario} registrado exitosamente como {rol_nuevo_usuario}.")

                        # Crear el usuario en MySQL
                        self.crear_usuario_mysql(nuevo_usuario, nueva_contrasena, rol_nuevo_usuario)
                    else:
                        print(f"Rol {rol_nuevo_usuario} no válido. No se puede registrar el nuevo usuario.")
            else:
                print("usted no es un usuario administrador no puede crear usuarios")

            cursor.close()
            self.db_connection.close()

    def crear_usuario_mysql(self, usuario, contrasena, rol):
        cursor = self.db_connection.cursor()

        try:
            # Ejemplo de consulta para crear un usuario en MySQL
            create_user_query = f"CREATE USER '{usuario}'@'localhost' IDENTIFIED BY '{contrasena}'"
            cursor.execute(create_user_query)

            # Otorgar privilegios según el rol
            if rol == 'asistente':
                grant_privileges_query = (
                    "GRANT SELECT ON practica1.habitacion TO '{usuario}'@'localhost';"
                    "GRANT SELECT, UPDATE ON practica1.paciente TO '{usuario}'@'localhost';"
                    "GRANT INSERT ON practica1.log TO '{usuario}'@'localhost';"
                )
            elif rol == 'doctor':
                grant_privileges_query = (
                    "GRANT SELECT ON practica1.paciente TO '{usuario}'@'localhost';"
                    "GRANT INSERT ON practica1.log TO '{usuario}'@'localhost';"
                )
            elif rol == 'soporte':
                grant_privileges_query = (
                    "GRANT SELECT, UPDATE, INSERT ON practica1.log_actividad TO '{usuario}'@'localhost';"
                    "GRANT SELECT, UPDATE, INSERT ON practica1.log_habitacion TO '{usuario}'@'localhost';"
                    "GRANT INSERT ON practica1.log TO '{usuario}'@'localhost';"
                )
            elif rol == 'administrador':
                grant_privileges_query = "GRANT ALL PRIVILEGES ON practica1.* TO '{usuario}'@'localhost';"
            else:
                print(f"Rol no reconocido. No se otorgan privilegios específicos.")

            cursor.execute(grant_privileges_query)
            self.db_connection.commit()

            print(f"Usuario {usuario} creado exitosamente con privilegios para el rol {rol}.")

        except Exception as e:
            print(f"Error al crear usuario: {e}")

        finally:
            cursor.close()


    def obtener_codigo_rol(self, rol_nombre):
        cursor = self.db_connection.cursor()

        # Consulta para obtener el código del rol
        query_rol = "SELECT codigo FROM rol WHERE rol = %s"
        cursor.execute(query_rol, (rol_nombre,))
        rol_codigo = cursor.fetchone()

        cursor.close()

        return rol_codigo[0] if rol_codigo else None

    def insertar_log(self, actividad):
        cursor = self.db_connection.cursor()
        fecha_actual = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        # Inserta un registro en la tabla de log
        query = "INSERT INTO Log (usuario, actividad, fecha_hora) VALUES (%s, %s, %s)"
        cursor.execute(query, (self.logged_in_user, actividad, fecha_actual))
        self.db_connection.commit()

        cursor.close()

    def obtener_rol(self, username):
        cursor = self.db_connection.cursor()

        # Consulta para obtener el rol del usuario
        query = "SELECT rol_codigo FROM usuario WHERE usuario = %s"
        cursor.execute(query, (username,))
        rol_usuario = cursor.fetchone()

        cursor.close()

        return rol_usuario[0] if rol_usuario else None

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
