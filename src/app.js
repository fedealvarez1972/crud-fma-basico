const express = require("express"); 
const db = require("./utils/database"); // OJO CON LA IMPORTACION ENTRE () (SOLO VA UN PUNTO './XXXXX/XXXX.XXXX');
// COMENTARIO PARA REINICIAR EL NODEMON1
const Todos = require('./models/todos.model'); // OJO CON LA IMPORTACION ENTRE () (SOLO VA UN PUNTO './XXXXX/XXXX.XXXX');
// SE IMPORTO EL COMPONENTE TODOS //
const { json } = require("sequelize");
const cors = require('cors');
require('dotenv').config();



const PORT = process.env.PORT || 8000;


db.authenticate() // ES UNA FUNCION ASINCRONA//
  .then(() => console.log("BASE DE DATOS CONECTADA OK!"))
  .catch((error) => console.log(error));

db.sync() // ES UNA FUNCION QUE SINCRONIZA LA BASE DE DATOS Y CREA O MODIFICA LA TABLA o TABLAS //
  .then(() => console.log("BASE DE DATOS SINCRONIZADA OK!"))
  .catch((error) => console.log(error));

  const app = express();

  app.use(cors());
  
  app.use(express.json());


app.get("/", (req, res) => {
  res.status(200).json({ message: "Server OK" });
});

// axios.post (url, {body}); //

app.post("/todos", async (req, res)=> {
  try {
    // EXTRAEMOS EL CUERPO DE LA PETICION //
    // (id, title, description, completed) //
    const newTodos = req.body;
    // INSERT INTO todos (id, title, description, completed) VALUES ( ) //
    await Todos.create(newTodos);
    // RESPUESTA DEL STATUS DE LA PETICION CON 201 - CREATED //
    res.status(201).send();

  } catch (error) {
    // SI ALGO SALE MAL RESPONDEMOS CON EL ERROR //
    res.status(400).json(error);
  }
});

// OBTENER TODAS LA TAREAS DE LA BASE DE DATOS //
//SELECT * FROM todos; //
// Todos findAll(); //
app.get('/todos', async (req, res) => {
  try {
    const todos = await Todos.findAll();
    res.json(todos);
  } catch (error) {
    res.status(400).json(error);
  }
});

// OBTENER UNA TAREA POR SU ID DE LA BASE DE DATOS //
//SELECT "id",etc, FROM todos; //
app.get('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.params);
    const todos = await Todos.findByPk(id);
    res.json(todos);
    
  } catch (error) {
    res.status(400).json(error);
  }
});

// ELIMINAR UNA TAREA //
// DELETE FROM todos WHERE id=3
app.delete('/todos/:id', async (req, res) =>{
  try {
    const {id} = req.params;
    await Todos.destroy({
      where: {id}
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json(error);
  }
});

// actualizar UPDATE //
// UPDATE todos SET title = "xvalor", description = "xvalor" WHERE id = x //
app.put('/todos/:id', async (req,res) =>{
  try {
    const {id} = req.params;
    const { title, description } = req.body;
    // actualiza el title //
    // actualiza el description //
    // se actualizan los dos //
    await Todos.update ({ title, description}, {
      where: {id},
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json(error);
  }
});


app.listen(PORT, () => {
  console.log(`SERVIDOR ESCUCHANDO EN EL PUERTO ${PORT}`);
});

// seguridad para la base de datos con variables de entorno //
console.log(process.env);

