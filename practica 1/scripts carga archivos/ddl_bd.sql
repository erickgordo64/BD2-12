use practica1;

-- Tabla de actividad

CREATE TABLE LOG_ACTIVIDAD (
  id_log_actividad INT NOT NULL AUTO_INCREMENT,
  timestampx VARCHAR(100) NOT NULL,
  actividad VARCHAR(500) NOT NULL,
  PACIENTE_idPaciente INT NOT NULL,
  HABITACION_IdHabitacion INT NOT NULL,
  PRIMARY KEY (id_log_actividad),
  INDEX idx_log_actividad_paciente (PACIENTE_idPaciente),
  INDEX idx_log_actividad_habitacion (HABITACION_IdHabitacion)
);

-- Tabla de habitación

CREATE TABLE HABITACION (
  idHabitacion INT NOT NULL,
  habitacion VARCHAR(50) NOT NULL,
  PRIMARY KEY (idHabitacion)
);

-- Tabla de paciente

CREATE TABLE PACIENTE (
  idPaciente INT NOT NULL,
  edad INT NOT NULL,
  genero VARCHAR(20) NOT NULL,
  PRIMARY KEY (idPaciente)
);

-- Tabla de log de habitación

CREATE TABLE LOG_HABITACION (
  timestampx VARCHAR(100) NOT NULL,
  statusx VARCHAR(45) NOT NULL,
  idHabitacion INT NOT NULL,
  PRIMARY KEY (timestampx, idHabitacion),
  INDEX idx_log_habitacion_habitacion (idHabitacion)
);

-- Relaciones entre tablas

ALTER TABLE LOG_ACTIVIDAD
  ADD CONSTRAINT fk_log_actividad_paciente
  FOREIGN KEY (PACIENTE_idPaciente)
  REFERENCES PACIENTE (idPaciente);

ALTER TABLE LOG_ACTIVIDAD
  ADD CONSTRAINT fk_log_actividad_habitacion
  FOREIGN KEY (HABITACION_IdHabitacion)
  REFERENCES HABITACION (idHabitacion);
