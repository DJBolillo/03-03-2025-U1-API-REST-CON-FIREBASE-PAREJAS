const express = require('express');
const router = express.Router();
const taskController = require("../controllers/TaskController");
router.get("/", taskController.mostrarTareas);
router.post("/agregar", taskController.agregarTarea);
router.post("/actualizar", taskController.actualizarTarea);
router.post("/borrar",taskController.eliminarTarea);



module.exports=router;