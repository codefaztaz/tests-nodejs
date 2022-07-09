'use strict'

var validator = require('validator');
var bcrypt = require('bcrypt-nodejs');
var fs = require('fs');
var path = require('path');
var User = require('../models/user');


var controller = {

save: function(req, res)
{
    var params = req.body;
    var user = new User();

    user.name = params.name;
    user.email = params.email;
    user.age = params.age;


    user.save((err, userStored) => {
        if (err) {
            return res.status(500).send({
                message: "Error al guardar el usuario"
            });
        }

        if (!userStored) {
            return res.status(400).send({
                message: "El usuario no se ha guardado"
            });
        }

        // Devolver respuesta
        return res.status(200).send({
            status: 'success',
            userStored
        });



    }); // close save

},

getUser: function(req,res)
{
    User.findById(req.params.id, function (err, result) {
        if (err) {
            return handleError(err);
        }

        return res.json(result);
    });

},

getUsers: function(req, res) {
    //Query the DB and if no errors, send all the users
    let query = User.find({});
    query.exec((err, users) => {
        if(err) res.send(err);
        //If no errors, send them back to the client
        res.json(users);
    });
},

update: function(req, res)
{
    // res.send('User route')
    User.findOneAndUpdate(req.params.id, req.body).then((result) => {
        res.json(result);
    }).catch((err) => {
        handleError(res, err);
    });

},

delete:function(req,res)
{
    User.findOneAndDelete({id: req.params.id, name: 'foo'}).then((result) => {
        res.json(result);
        console.log('usuario eliminado', result);
    }).catch((err) => {
        handleError(res, err);
    });

}





}

module.exports = controller;