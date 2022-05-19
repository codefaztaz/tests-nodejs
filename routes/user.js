'use strict'

var express = require('express');

var UserController = require('../controllers/user');

var router = express.Router();
var md_auth = require('../middleware/auth');

//var multipart = require('connect-multiparty');
//var md_upload = multipart({ uploadDir: './uploads/rooms' });



// Rutas de usuarios
router.post('/user',md_auth.isAuthorized, UserController.user);
router.get('/user/:id', UserController.getUser);
router.put('/update', UserController.update);
router.delete('/user/:id',md_auth.isAuthorized, UserController.delete);


































module.exports = router;