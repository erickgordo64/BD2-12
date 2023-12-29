const express = require('express');
const neo4j = require('neo4j-driver');
const { MongoClient, ObjectId } = require('mongodb');
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


// Endpoint para iniciar sesión sin cifrado de contraseñas
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar al usuario por correo electrónico en Neo4j
    const result = await neo4jSession.run(
      'MATCH (u:User {email: $email}) RETURN u',
      { email }
    );

    const user = result.records[0]?.get('u');

    // Verificar si el usuario existe y comparar contraseñas
    if (user) {
      const storedPassword = user.properties.password;

      // Comparar la contraseña proporcionada con la almacenada
      if (password === storedPassword) {
        // Contraseña válida, usuario autenticado
        const userData = {
          username: user.properties.username,
        };

        res.status(200).json({ message: 'Inicio de sesión exitoso', user: userData });
      } else {
        // Contraseña incorrecta
        res.status(401).json({ message: 'Credenciales incorrectas' });
      }
    } else {
      // Usuario no encontrado
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error en la ruta /login:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});


// Ruta para registrar un nuevo usuario
app.post('/register', upload.single('photo'), async (req, res) => {
  const { username, email, age, specialty, password, photo } = req.body;

  // Guardar la foto en MongoDB y obtener el ID generado
  const photoId = await savePhotoToMongo(photo);
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

// Endpoint para actualizar los datos de un usuario en Neo4j y MongoDB
app.put('/register', async (req, res) => {
  try {
    const { username, email, age, specialty, photoUrl } = req.body;

    // Verificar si el usuario existe por nombre de usuario
    const existingUser = await neo4jSession.run(
      'MATCH (u:User {username: $username}) RETURN u',
      { username }
    );

    const user = existingUser.records[0]?.get('u');

    if (!user) {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }

    let photoIdMongo = ''

    // Actualizar la foto en MongoDB si se proporciona un nuevo photoId
    if (photoUrl) {
      console.log(photoUrl)
      // Guardar la foto en MongoDB y obtener el ID generado
      const photoId = await savePhotoToMongo(photoUrl);
      // Crear un nodo de usuario en Neo4j y relacionarlo con la foto almacenada en MongoDB
      photoIdMongo = photoId.toString()
    }

    // Actualizar los datos del usuario en Neo4j
    const updateResult = await neo4jSession.run(
      'MATCH (u:User {username: $username}) SET u.email = $email, u.age = $age, u.specialty = $specialty, u.photoId = $photoIdMongo RETURN u',
      { username, email, age, specialty, photoIdMongo }
    );

    const updatedUser = updateResult.records[0]?.get('u');

    if (updatedUser) {
      res.status(200).json({ message: 'Datos del usuario actualizados', user: updatedUser.properties });
    } else {
      res.status(500).json({ message: 'Error al actualizar los datos del usuario en Neo4j' });
    }
  } catch (error) {
    console.error('Error en la ruta update /register:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Función para guardar la foto en MongoDB y obtener el ID generado
async function savePhotoToMongo(file) {
  const collection = mongoDb.collection('photos'); // Reemplaza 'photos' con el nombre de tu colección
  //const result = await collection.insertOne({ file: file.path });
  const result = await collection.insertOne({ file: file });
  return result.insertedId;
}

// Endpoint para obtener el perfil del usuario por username
app.get('/profile/:username', async (req, res) => {
  try {
    const username = req.params.username;

    // Buscar al usuario por username en Neo4j
    const result = await neo4jSession.run(
      'MATCH (u:User {username: $username}) RETURN u',
      { username }
    );

    const user = result.records[0]?.get('u');

    // Verificar si el usuario existe
    if (user) {
      const userProfile = {
        username: user.properties.username,
        email: user.properties.email,
        age: user.properties.age,
        specialty: user.properties.specialty,
        // Agrega más propiedades según sea necesario
        photoUrl: await getPhotoUrl(user.properties.photoId),
      };
      res.status(200).json({ profile: userProfile });
    } else {
      // Usuario no encontrado
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error en la ruta /profile/:username:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Función para obtener la URL de la foto desde MongoDB
async function getPhotoUrl(photoId) {
  try {
    // Conectar a MongoDB
    const collection = mongoDb.collection('photos');

    // Obtener la foto por ID
    const photo = await collection.findOne({ _id: new ObjectId(photoId) });
    // Devolver la URL de la foto
    return photo ? photo.file : null;
  } catch (error) {
    console.error('Error al obtener la URL de la foto desde MongoDB:', error);
    return null;
  }
}

// Endpoint para que un usuario agregue a otro como amigo en Neo4j
app.post('/add-friend', async (req, res) => {
  try {
    const { currentUserUsername, friendUsername } = req.body;

    // Verificar si los usuarios existen
    const checkUsersResult = await neo4jSession.run(
      'MATCH (requester:User {username: $currentUserUsername}), (friend:User {username: $friendUsername}) RETURN requester, friend',
      { currentUserUsername, friendUsername }
    );

    const requester = checkUsersResult.records[0]?.get('requester');
    const friend = checkUsersResult.records[0]?.get('friend');

    if (!requester || !friend) {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }

    // Verificar si ya son amigos
    const checkFriendshipResult = await neo4jSession.run(
      'MATCH (user1:User {username: $currentUserUsername})-[:FRIENDS_WITH]-(user2:User {username: $friendUsername}) RETURN EXISTS((user1)-[:FRIENDS_WITH]-(user2)) AS areFriends',
      { currentUserUsername, friendUsername }
    );

    if (checkFriendshipResult.records != []) {
      res.status(400).json({ message: 'Ya son amigos' });
      return;
    }

    // Crear la relación de amistad en Neo4j
    await neo4jSession.run(
      'MATCH (requester:User {username: $currentUserUsername}), (friend:User {username: $friendUsername}) CREATE (requester)-[:FRIENDS_WITH]->(friend)',
      { currentUserUsername, friendUsername }
    );

    res.status(200).json({ message: 'Amigo agregado exitosamente' });
  } catch (error) {
    console.error('Error en la ruta /add-friend/:username:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Endpoint para eliminar amistad
app.post('/remove-friend', async (req, res) => {
  const { currentUserUsername, friendUsername } = req.body;

  try {
    // Ejecuta la consulta para eliminar la relación de amistad
    await neo4jSession.run(
      'MATCH (user1:User {username: $user1})-[r:FRIENDS_WITH]->(user2:User {username: $user2}) ' +
      'DELETE r',
      { user1: currentUserUsername, user2: friendUsername }
    );

    res.json({ success: true, message: 'Amistad eliminada con éxito.' });
  } catch (error) {
    console.error('Error al eliminar la amistad en Neo4j:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
});

// Endpoint para buscar profesionales por especialidad en Neo4j
app.get('/search-professionals-by-specialty/:specialty', async (req, res) => {
  try {
    const specialty = req.params.specialty;

    // Realizar la búsqueda por especialidad de profesionales en Neo4j
    const searchResult = await neo4jSession.run(
      'MATCH (professional:User) ' +
      'WHERE professional.specialty CONTAINS $specialty ' +
      'RETURN professional.username, professional.email, professional.age, professional.specialty',
      { specialty }
    );

    const professionals = searchResult.records.map(record => record.toObject());

    res.status(200).json({ professionals });
  } catch (error) {
    console.error('Error en la ruta /search-professionals-by-specialty/:specialty:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Endpoint para buscar profesionales por nombre en Neo4j
app.get('/search-professionals-by-name/:name', async (req, res) => {
  try {
    const name = req.params.name;

    // Realizar la búsqueda por nombre de profesionales en Neo4j
    const searchResult = await neo4jSession.run(
      'MATCH (professional:User) ' +
      'WHERE professional.username CONTAINS $name ' +
      'RETURN professional.username, professional.email, professional.age, professional.specialty',
      { name }
    );

    const professionals = searchResult.records.map(record => record.toObject());

    res.status(200).json({ professionals });
  } catch (error) {
    console.error('Error en la ruta /search-professionals-by-name/:name:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Endpoint para buscar amigos en común en Neo4j
app.get('/common-friends/:doctorUsername/:friendUsername', async (req, res) => {
  try {
    const doctorUsername = req.params.doctorUsername;
    const friendUsername = req.params.friendUsername;

    // Realizar la búsqueda de amigos en común en Neo4j
    const commonFriendsResult = await neo4jSession.run(
      'MATCH (doctor:User)-[:FRIENDS_WITH]->(commonFriend:User)<-[:FRIENDS_WITH]-(friend:User) ' +
      'WHERE doctor.username = $doctorUsername AND friend.username = $friendUsername ' +
      'RETURN commonFriend.username, commonFriend.email, commonFriend.age, commonFriend.specialty',
      { doctorUsername, friendUsername }
    );

    const commonFriends = commonFriendsResult.records.map(record => record.toObject());

    res.status(200).json({ commonFriends });
  } catch (error) {
    console.error('Error en la ruta /common-friends/:doctorUsername/:friendUsername:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

app.get('/get-friends/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const FriendsResult = await neo4jSession.run(
      'MATCH (user:User {username: $username}) ' +
      'MATCH (user)-[:FRIENDS_WITH]->(friend:User) ' +
      'RETURN friend.username AS friendUsername, friend.photoId AS photoId',
      { username }
    );

    const friendList = FriendsResult.records.map(record => {
      return {
        username: record.get('friendUsername'),
        photoId: record.get('photoId'),
      };
    });

    const friendsWithPhotos = await Promise.all(
      friendList.map(async (friend) => {
        if (friend) {
          const { username, photoId } = friend;
          // Utiliza la función getPhotoUrl para obtener la URL de la foto
          //const photoUrl = await getPhotoUrl(photoId);
          //console.log(photoUrl)
          return {
            username,
            photo: await getPhotoUrl(photoId),
          };
        }

        return null;
      })
    );

    res.json({ friends: friendsWithPhotos });
  } catch (error) {
    console.error('Error al obtener la lista de amigos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.post('/create-post', async (req, res) => {
  const { username, content } = req.body;

  try {
    // Crea el post asociado al usuario en Neo4j
    const createPostResult = await neo4jSession.run(
      `
      MATCH (user:User {username: $username})
      CREATE (user)-[:POSTED_BY]->(post:Post {content: $content, timestamp: timestamp()})
      RETURN post
      `,
      { username, content }
    );

    const createdPost = createPostResult.records[0]?.get('post');

    if (createdPost) {
      res.status(201).json({ message: 'Publicación creada con éxito.', post: createdPost.properties });
    } else {
      res.status(500).json({ message: 'Error al crear la publicación en Neo4j.' });
    }
  } catch (error) {
    console.error('Error al crear la publicación en Neo4j:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

app.get('/get-user-posts/:username', async (req, res) => {
  const { username } = req.params;

  try {
    // Obtener los posts realizados por el usuario en Neo4j
    const getUserPostsResult = await neo4jSession.run(
      `
      MATCH (user:User {username: $username})
      OPTIONAL MATCH (user)-[:POSTED_BY]->(userPost:Post)
      RETURN user.username AS username, COLLECT({ content: userPost.content, timestamp: userPost.timestamp }) AS userPosts
      `,
      { username }
    );

    // Obtener los amigos del usuario y sus posts en Neo4j
    const getFriendPostsResult = await neo4jSession.run(
      `
      MATCH (user:User {username: $username})-[:FRIENDS_WITH]-(friend:User)
      OPTIONAL MATCH (friend)-[:POSTED_BY]->(friendPost:Post)
      RETURN friend.username AS friendUsername, COLLECT({ content: friendPost.content, timestamp: friendPost.timestamp }) AS friendPosts
      `,
      { username }
    );

    const userPosts = getUserPostsResult.records.map(record => {
      const username = record.get('username');
      const userPosts = record.get('userPosts') || [];
      return { username, posts: userPosts };
    });

    const friendPosts = getFriendPostsResult.records.map(record => {
      const friendUsername = record.get('friendUsername');
      const friendPosts = record.get('friendPosts') || [];
      return { username: friendUsername, posts: friendPosts };
    });

    res.status(200).json({ userPosts: userPosts.concat(friendPosts) });
  } catch (error) {
    console.error('Error al obtener los posts en Neo4j:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Endpoint para crear un mensaje en el chat
app.post('/create-message', async (req, res) => {
  const { senderUsername, receiverUsername, content } = req.body;

  try {
    // Verifica que ambos usuarios existan en Neo4j antes de crear el mensaje
    const usersExistResult = await neo4jSession.run(
      'MATCH (sender:User {username: $senderUsername}), (receiver:User {username: $receiverUsername}) RETURN sender, receiver',
      { senderUsername, receiverUsername }
    );

    const sender = usersExistResult.records[0]?.get('sender');
    const receiver = usersExistResult.records[0]?.get('receiver');

    if (!sender || !receiver) {
      return res.status(404).json({ message: 'Uno o ambos usuarios no encontrados.' });
    }

    // Crea el mensaje y la relación en Neo4j
    const createMessageResult = await neo4jSession.run(
      `
      MATCH (sender:User {username: $senderUsername}), (receiver:User {username: $receiverUsername})
      CREATE (message:Message {content: $content, timestamp: timestamp()})
      MERGE (sender)-[:SENT]->(message)-[:TO]->(receiver)
      RETURN message
      `,
      { senderUsername, receiverUsername, content }
    );

    const createdMessage = createMessageResult.records[0]?.get('message');

    if (createdMessage) {
      res.status(200).json({ message: 'Mensaje creado con éxito.', createdMessage });
    } else {
      res.status(500).json({ message: 'Error al crear el mensaje en Neo4j.' });
    }
  } catch (error) {
    console.error('Error al crear el mensaje en Neo4j:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Endpoint para obtener todos los mensajes entre dos usuarios
app.get('/get-all-messages/:username1/:username2', async (req, res) => {
  const { username1, username2 } = req.params;

  try {
    // Verifica que ambos usuarios existan en Neo4j antes de buscar los mensajes
    const usersExistResult = await neo4jSession.run(
      'MATCH (user1:User {username: $username1}), (user2:User {username: $username2}) RETURN user1, user2',
      { username1, username2 }
    );

    const user1 = usersExistResult.records[0]?.get('user1');
    const user2 = usersExistResult.records[0]?.get('user2');

    if (!user1 || !user2) {
      return res.status(404).json({ message: 'Uno o ambos usuarios no encontrados.' });
    }

    // Recupera todos los mensajes enviados entre los dos usuarios (en ambas direcciones)
    const getAllMessagesResult = await neo4jSession.run(
      `
      MATCH (user1:User {username: $username1})-[:SENT]->(message:Message)-[:TO]->(user2:User {username: $username2})
      RETURN message.content AS content, message.timestamp AS timestamp, user1.username AS sender, user2.username AS receiver
      UNION
      MATCH (user1:User {username: $username2})-[:SENT]->(message:Message)-[:TO]->(user2:User {username: $username1})
      RETURN message.content AS content, message.timestamp AS timestamp, user1.username AS sender, user2.username AS receiver
      ORDER BY timestamp DESC
      `,
      { username1, username2 }
    );

    const messages = getAllMessagesResult.records.map(record => ({
      content: record.get('content'),
      timestamp: record.get('timestamp'),
      sender: record.get('sender'),
      receiver: record.get('receiver'),
    }));

    res.status(200).json({ messages });
  } catch (error) {
    console.error('Error al obtener los mensajes en Neo4j:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
                                        //mongo//
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////


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
