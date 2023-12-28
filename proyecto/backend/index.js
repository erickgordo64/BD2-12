const express = require('express');
const neo4j = require('neo4j-driver');
const { MongoClient } = require('mongodb');
const multer = require('multer');
const path = require('path');
const cors = require('cors'); // Agrega la librería cors

const app = express();
const port = 4000;

let neo4jDriver, neo4jSession, mongoDb;

// Conexión a Neo4j sin credenciales
neo4jDriver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', 'root'));
neo4jSession = neo4jDriver.session();

// Conexión a MongoDB (reemplaza la URL con la de tu instancia de MongoDB)
const mongoUrl = 'mongodb://localhost:27017';

// Intentar conectar a MongoDB
MongoClient.connect(mongoUrl, { useUnifiedTopology: true })
  .then((client) => {
    console.log('Conexión a MongoDB establecida');
    mongoDb = client.db('proyecto'); // Reemplaza 'proyecto' con el nombre de tu base de datos MongoDB
  })
  .catch((err) => {
    console.error('Error al conectar a MongoDB:', err);
    process.exit(1); // Salir de la aplicación en caso de error de conexión a MongoDB
  });

// Configuración de multer para el manejo de archivos
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.use(cors()); // Agrega CORS a todas las rutas
// Middleware para parsear el cuerpo de la solicitud como JSON
app.use(express.json());


// Endpoint para iniciar sesión
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar al usuario por correo electrónico en Neo4j
    const result = await neo4jSession.run(
      'MATCH (u:User {email: $email, password: $password}) RETURN u',
      { email, password }
    );

    const user = result.records[0]?.get('u');

    // Verificar si el usuario existe
    if (user) {
      // Usuario autenticado
      res.status(200).json({ message: 'Inicio de sesión exitoso' });
    } else {
      // Usuario no encontrado o contraseña incorrecta
      res.status(401).json({ message: 'Credenciales incorrectas' });
    }
  } catch (error) {
    console.error('Error en la ruta /login:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Ruta para registrar un nuevo usuario
app.post('/register', upload.single('photo'), async (req, res) => {
  const { username, email, age, specialty, password } = req.body;

  // Guardar la foto en MongoDB y obtener el ID generado
  const photoId = await savePhotoToMongo(req.file);
  // Crear un nodo de usuario en Neo4j y relacionarlo con la foto almacenada en MongoDB
  let photoIdMongo = photoId.toString()

  const resultNeo4j = await neo4jSession.run(
    `
    CREATE (u:User {username: $username, email: $email, age: $age, specialty: $specialty, password: $password, photoId: $photoIdMongo})
    RETURN u
    `,
    { username, email, age, specialty, password, photoIdMongo }
  );
  const newUser = resultNeo4j.records[0]?.get('u');

  if (newUser) {
    res.status(200).json({ message: 'Usuario registrado exitosamente', user: newUser });
  } else {
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
});

// Función para guardar la foto en MongoDB y obtener el ID generado
async function savePhotoToMongo(file) {
  const collection = mongoDb.collection('photos'); // Reemplaza 'photos' con el nombre de tu colección
  //const result = await collection.insertOne({ file: file.path });
  const result = await collection.insertOne({ file: 'proyecto/backend/uploads/foto.jpeg' });
  return result.insertedId;
}

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

// Cerrar las sesiones al salir
process.on('exit', () => {
  neo4jSession.close();
  neo4jDriver.close();
  if (mongoDb) {
    mongoDb.close();
  }
});
