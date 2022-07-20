'use strict'

var express = require('express');

var UserController = require('../controllers/user');

var router = express.Router();
var md_auth = require('../middleware/auth');

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/rooms' });




// User routes
router.post('/save/', md_upload, UserController.save);
router.post('/upload-avatar/:id',md_upload, UserController.uploadAvatar);
//router.post('/saveimg/:id', UserController.saveImg);
router.get('/user/:id', UserController.getUser);
router.get('/users/', UserController.getUsers);
router.put('/update/:id', UserController.update);
router.delete('/delete/:id', UserController.delete);



module.exports = router;