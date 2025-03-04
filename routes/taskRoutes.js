const express = require('express');
const router = express.Router();
const taskController = require("../controllers/TaskController")
router.get('/',taskController.getAllTasks);
router.get('/:id',taskController.getTaskById);
router.post('/',taskController.createTask);
router.put('/:id',taskController.updateTask);

module.exports=router;