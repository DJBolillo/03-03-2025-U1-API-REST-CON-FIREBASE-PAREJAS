
require('dotenv').config();

var admin = require("firebase-admin");

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://tareas-a7650.firebaseio.com" 
});

const db = admin.firestore()
db.settings({ ignoreUndefinedProperties: true });

const mostrarTareas = async (req, res) => {
    try {
      const tasksSnapshot = await db.collection("tasks").get(); // Obtener todas las tareas
      const tareas = tasksSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()  // Obtener los datos del documento
      }));
  
      // Pasa las tareas a la vista
      res.render("index", { tareas });  // 'tareas' es lo que se pasa a la vista
    } catch (error) {
      console.error("Error al obtener las tareas:", error);
      res.status(500).send("Error al obtener las tareas.");
    }
  };

const agregarTarea = async (req, res) => {
    const title = req.body.title?.trim();
    const taskId = req.body.id?.trim();
    if (!title || !taskId) {
        return res.status(400).send("El título e ID es obligatorio y no puede estar vacío.");
    }

    try {
        const taskRef = db.collection("tasks").doc(taskId); // Crear doc con ID personalizado
        await taskRef.set({ title: title }); // Guardar la tarea en Firestore
        console.log("Tarea añadida correctamente."+taskId);
        res.redirect("/");
    } catch (error) {
        console.error("Error al agregar la tarea:", error);
        res.status(500).send("Error al guardar la tarea.");
    }
}


const actualizarTarea = async (req, res) => {
    const taskId = req.body.idActualizar?.trim(); // ID ingresado por el usuario
    const newTitle = req.body.titleActualizar?.trim(); // Nuevo título de la tarea
  
    if (!taskId || !newTitle) {
      return res.status(400).send("El ID y el nuevo título son obligatorios.");
    }
  
    try {
      const taskRef = db.collection("tasks").doc(taskId);
  
      // Verificar si el documento existe antes de actualizarlo
      const docSnapshot = await taskRef.get();
      if (!docSnapshot.exists) {
        return res.status(404).send("La tarea con ese ID no existe.");
      }
  
      await taskRef.update({ title: newTitle });
  
      console.log(`Tarea ${taskId} actualizada correctamente.`);
      res.redirect("/");
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
      res.status(500).send("Error al actualizar la tarea.");
    }
  };

  const eliminarTarea = async (req, res) => {
    const taskId = req.body.idBorrar?.trim(); // ID ingresado por el usuario
  
    if (!taskId) {
      return res.status(400).send("El ID de la tarea es obligatorio.");
    }
  
    try {
      const taskRef = db.collection("tasks").doc(taskId);
  
      // Verificar si la tarea existe antes de eliminarla
      const docSnapshot = await taskRef.get();
      if (!docSnapshot.exists) {
        return res.status(404).send("La tarea con ese ID no existe.");
      }
  
      await taskRef.delete(); // 🔹 Eliminar la tarea de Firestore
      console.log(`Tarea ${taskId} eliminada correctamente.`);
      
      res.redirect("/");
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
      res.status(500).send("Error al eliminar la tarea.");
    }
  };

module.exports = {
    agregarTarea,
    actualizarTarea,
    eliminarTarea,
    mostrarTareas
    
    
};