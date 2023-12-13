use practica1;

SELECT @@GLOBAL.secure_file_priv; -- cuando se hace el select muestra la direccion de la carpeta donde se deben poner los archivos

SET SQL_SAFE_UPDATES = 0;

select * from paciente;
select * from habitacion;
select count(*) from log_habitacion;
select count(*) from log_actividad;
select * from log_actividad;

delete from habitacion;
delete from paciente;
delete from log_actividad;
delete from log_habitacion;

LOAD DATA INFILE 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\Pacientes.csv'
INTO TABLE paciente
FIELDS TERMINATED BY ';'
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES;

LOAD DATA INFILE 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\Habitaciones.csv'
INTO TABLE habitacion
FIELDS TERMINATED BY ';'
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES;

LOAD DATA INFILE 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\LogHabitacion.csv'
INTO TABLE log_habitacion
FIELDS TERMINATED BY ';'
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES;

LOAD DATA INFILE 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\LogActividades1.csv'
INTO TABLE log_actividad
FIELDS TERMINATED BY ';'
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(timestampx, actividad, PACIENTE_idPaciente, HABITACION_idHabitacion);

LOAD DATA INFILE 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\LogActividades2.csv'
INTO TABLE log_actividad
FIELDS TERMINATED BY ';'
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(timestampx, actividad, PACIENTE_idPaciente, HABITACION_idHabitacion);