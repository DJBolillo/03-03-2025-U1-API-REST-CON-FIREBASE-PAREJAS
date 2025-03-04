
const express = require("express");
const bodyParser = require("body-parser");
const taskController = require("./controllers/TaskController");

const app = express();

// Middleware para procesar datos de formularios
app.use(bodyParser.urlencoded({ extended: true }));



app.set('views','./vistas')
app.set('view engine','ejs')

app.use(express.urlencoded({extended:true}))


const PORT = process.env.PORT || 3001;

app.listen(PORT, ()=>{
    console.log('Servidor corriendo en el puerto '+PORT);
})


app.get("/", taskController.mostrarTareas);
app.post("/agregar", taskController.agregarTarea);
app.post("/actualizar", taskController.actualizarTarea);
app.post("/borrar",taskController.eliminarTarea);




