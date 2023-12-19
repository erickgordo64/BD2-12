-- Insertar registros en la tabla Rol
INSERT INTO Rol (rol) VALUES ('doctor');
INSERT INTO Rol (rol) VALUES ('asistente');
INSERT INTO Rol (rol) VALUES ('administrador');
INSERT INTO Rol (rol) VALUES ('soporte');

-- Insertar un usuario en la tabla Usuario
INSERT INTO Usuario (usuario, contrasena, rol_codigo) 
VALUES ('administrador', 'administrador', (SELECT codigo FROM Rol WHERE rol = 'administrador'));

-- Insertar permisos en la tabla Permisos
INSERT INTO Permisos (permiso) VALUES ('insert');
INSERT INTO Permisos (permiso) VALUES ('update');
INSERT INTO Permisos (permiso) VALUES ('select');

-- Asignar todos los permisos al rol 'administrador'
INSERT INTO Rol_Permisos (rol_codigo, permiso_codigo) VALUES (3,1);
INSERT INTO Rol_Permisos (rol_codigo, permiso_codigo) VALUES (3,2);
INSERT INTO Rol_Permisos (rol_codigo, permiso_codigo) VALUES (3,3);

-- Asignar solo el permiso 'select' al rol 'doctor'
INSERT INTO Rol_Permisos (rol_codigo, permiso_codigo) VALUES (1,3);

-- Asignar los permisos 'update' y 'select' al rol 'asistente'
INSERT INTO Rol_Permisos (rol_codigo, permiso_codigo) VALUES (2,2);
INSERT INTO Rol_Permisos (rol_codigo, permiso_codigo) VALUES (2,3);

-- Asignar los permisos 'select', 'insert' y 'update' al rol 'soporte'
INSERT INTO Rol_Permisos (rol_codigo, permiso_codigo) VALUES (4,1);
INSERT INTO Rol_Permisos (rol_codigo, permiso_codigo) VALUES (4,2);
INSERT INTO Rol_Permisos (rol_codigo, permiso_codigo) VALUES (4,3);