const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller');

// Define routes using the controller methods
router.post('/singup', userController.userSingup);
router.post('/singin', userController.userSingin);
router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUserById);
router.post('/sendMail', userController.sendMail);
module.exports = router;