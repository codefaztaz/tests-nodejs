'use strict'

var express = require('express');

var UserController = require('../controllers/user');

var router = express.Router();
var md_auth = require('../middleware/auth');

//var multipart = require('connect-multiparty');
//var md_upload = multipart({ uploadDir: './uploads/rooms' });



// Rutas de usuarios
router.post('/save/', UserController.save);
router.get('/user/:id', UserController.getUser);
router.get('/users/', UserController.getUsers);
router.put('/update/:id', UserController.update);
router.delete('/delete/:id', UserController.delete);


































module.exports = router;