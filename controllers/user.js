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
    user.image = null;


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

uploadAvatar: function(req,res)
{
    var params = JSON.parse(JSON.stringify(req.body));
    var userId = req.params.id;

   
     
    console.log("userid", userId);

    var file = req.files.file0.path;
    console.log(JSON.stringify(req.files.file0.path));

        // // ** Adventencia ** En linux o mac
    var file_split = file.split('/');

    // // Nombre del archivo
        var file_name = file_split[2];
    // console.log(file_name);

    // // Extensión del archivo
    var ext_split = file_name.split('\.');
    console.log(ext_split);
    var file_ext = ext_split[1];
    console.log(file_ext);

    if (file_ext != 'png' && file_ext != 'jpg' && file_ext != 'jpeg' && file_ext != 'gif') {
        fs.unlink(file, (err) => {

            return res.status(400).send({
                status: 'error',
                message: 'La extensión del archivo no es valida.'
            });

        });

    } else 
    {

       
            // return res.status(200).send({
            //     status: 'success',
            //     image: file_name,
            // });
            

            if (file_name) 
            {
                
                User.findOneAndUpdate({ _id: userId }, { image: file_name }, { new: true }, (err, userUpdate) => {
                    if (err || !userUpdate) 
                    {
                        console.log(err);
                        // Devolver respuesta
                        return res.status(500).send({
                            status: 'error',
                            message: 'Error al guardar la habitación'
                        });
                    }                  
                 
                });
                return res.status(200).send({
                    status: 'success',
                    image: file_name,

                });
            
              

            }    

    }

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

// update: function(req, res)
// {
    
//     // res.send('User route')
//     User.findOneAndUpdate(req.params.id, req.body).then((result) => {
//         res.json(result);
//     }).catch((err) => {
//         handleError(res, err);
//     });

// },

update: function(req, res)
{
    var params = JSON.parse(JSON.stringify(req.body));
   // var params = req.body;
    params.age = Number(req.body.age);
    console.log('params',params);
    var userId = req.params.id;
    console.log('userid', userId);
    User.findOneAndUpdate({ _id: userId }, params, { new: true }, (err, userUpdated) => {
        console.log(err);
        if (err) {
            return res.status(500).send({
                status: 'error 500',
                message: 'Error al actualizar usuario'
                
            });
           
        }

        if (!userUpdated) {
            return res.status(200).send({
                status: 'error',
                message: 'No se a actualizado el usuario'
            });
        }

        // Devolver respuesta
        return res.status(200).send({
            status: 'success',
            user: userUpdated
        });

    });
},

delete:function(req,res)
{
    // User.findOneAndDelete({id: req.params.id, name: 'foo'}).then((result) => {
    //     res.json(result);
    //     console.log('usuario eliminado', result);
    // }).catch((err) => {
    //     handleError(res, err);
    // });

    User.findOneAndDelete({id: req.params.id}).then((result) => {
        //res.json(result);
        // Devolver respuesta
        return res.status(200).send({
            status: 'user deleted',
            user: result
        
       });
    }).catch((err) => {
        handleError(res, err);
    });

}





}

module.exports = controller;