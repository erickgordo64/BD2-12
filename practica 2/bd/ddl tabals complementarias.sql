-- Tabla Rol
CREATE TABLE Rol (
    codigo INT PRIMARY KEY AUTO_INCREMENT,
    rol VARCHAR(15) NOT NULL
);

-- Tabla Log
CREATE TABLE Log (
    codigo INT PRIMARY KEY AUTO_INCREMENT,
    usuario VARCHAR(64) NOT NULL,
    actividad VARCHAR(75) NOT NULL,
    fecha_hora DATETIME NOT NULL
);

-- Tabla Usuario
CREATE TABLE Usuario (
    codigo INT PRIMARY KEY AUTO_INCREMENT,
    usuario VARCHAR(64) NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    rol_codigo INT,
    FOREIGN KEY (rol_codigo) REFERENCES Rol(codigo)
);

-- Tabla Permisos
CREATE TABLE Permisos (
    codigo INT PRIMARY KEY AUTO_INCREMENT,
    permiso VARCHAR(25) NOT NULL
);

-- Tabla Rol_Permisos (tabla intermedia para la relación uno a muchos)
CREATE TABLE Rol_Permisos (
    codigo INT PRIMARY KEY AUTO_INCREMENT,
    rol_codigo INT,
    permiso_codigo INT,
    FOREIGN KEY (rol_codigo) REFERENCES Rol(codigo),
    FOREIGN KEY (permiso_codigo) REFERENCES Permisos(codigo)
);