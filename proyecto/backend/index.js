const express = require('express');
const neo4j = require('neo4j-driver');

const app = express();
const port = 3000;

// Conexión a Neo4j
const driver = neo4j.driver('bolt://localhost:7687');
const session = driver.session();

// Middleware para parsear el cuerpo de la solicitud como JSON
app.use(express.json());

// Ruta para autenticar al usuario
app.post('/auth', async (req, res) => {
  const { email, password } = req.body;

  // Ejemplo básico de consulta para verificar las credenciales
  const result = await session.run(
    'MATCH (u:User {email: $email, password: $password}) RETURN u',
    { email, password }
  );

  const user = result.records[0]?.get('u');

  if (user) {
    res.status(200).json({ message: 'Autenticación exitosa', user });
  } else {
    res.status(401).json({ message: 'Credenciales incorrectas' });
  }
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

// Cerrar la sesión de Neo4j al salir
process.on('exit', () => {
  session.close();
  driver.close();
});
