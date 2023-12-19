CREATE USER 'asistente'@'localhost' IDENTIFIED BY 'asistente';
CREATE USER 'doctor'@'localhost' IDENTIFIED BY 'doctor';
CREATE USER 'soporte'@'localhost' IDENTIFIED BY 'soporte';
CREATE USER 'administrador'@'localhost' IDENTIFIED BY 'administrador';

GRANT SELECT ON practica1.habitacion TO 'asistente'@'localhost';
GRANT SELECT ON practica1.paciente TO 'asistente'@'localhost';
GRANT UPDATE ON practica1.paciente TO 'asistente'@'localhost';
GRANT INSERT ON practica1.log TO 'asistente'@'localhost';

GRANT SELECT ON practica1.paciente TO 'doctor'@'localhost';
GRANT INSERT ON practica1.log TO 'doctor'@'localhost';

GRANT INSERT, SELECT, UPDATE ON practica1.log_actividad TO 'soporte'@'localhost';
GRANT INSERT, SELECT, UPDATE ON practica1.log_habitacion TO 'soporte'@'localhost';
GRANT INSERT ON practica1.log TO 'soporte'@'localhost';

GRANT ALL privileges ON practica1.* TO 'administrador'@'localhost';


select * from usuario;