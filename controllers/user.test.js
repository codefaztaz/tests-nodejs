process.env.NODE_ENV = 'test';
const chai = require('chai');
//const expect = chai.expect;
const should = chai.should();
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised);
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const rewire = require('rewire');
chaiHttp = require('chai-http');
var fs = require('fs');

const server = require('../app')
chai.use(chaiHttp);


var mongoose = require('mongoose');
var users = rewire('./user');


var User = require('../models/user');

//var sandbox = sinon.sandbox.createSandbox();

var sandbox = require("sinon").createSandbox();

describe('users', ()=>{
    let findStub;
    let deleteStub;
    let sampleUser;
    let mailerStub;

    beforeEach(()=>{
        sampleUser = {
            _id: 123,
            name: 'foo',
            email: 'foo@bar.com',
            save: sandbox.stub().resolves()
        }

        findStub = sandbox.stub(mongoose.Model, 'findById').resolves(sampleUser);
        deleteStub = sandbox.stub(mongoose.Model, 'remove').resolves('fake_remove_result');
      //  mailerStub = sandbox.stub(mailer, 'sendWelcomeEmail').resolves('fake_email');
    })

    afterEach(()=>{
        sandbox.restore();
        users = rewire('./user');
    })

    context('get', ()=>{
        // it('should check for an id', (done)=>{
        //     users.getUser( (err, result)=>{
        //         expect(err).to.exist;
        //         expect(err.message).to.equal('Invalid user id');
        //         done();
        //     })
        // })



        it.skip('should have 200 code response', (done)=>{
            chai.request('http://localhost:3999/api/')
            .get('users')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(20);
            done();
          });
          
        })

        // it('should call findUserById with id and return result', (done)=>{
        //     sandbox.restore();
        //     let stub = sandbox.stub(mongoose.Model, 'findById').yields(null, {name: 'foo'});

        //     users.getUser(123, (err, result)=>{
        //         expect(err).to.not.exist;
        //         expect(stub).to.have.been.calledOnce;
        //         expect(stub).to.have.been.calledWith(123);
        //         expect(result).to.be.a('object');
        //         expect(result).to.have.property('name').to.equal('foo');

        //         done();
        //     })
        // })

        it.skip('should get a user with his ID', (done)=>{
           const  userID= '628661634ff314d839e811de';
            chai.request('http://localhost:3999/api/')
            .get('user/' + userID)
            .end((err, res) => {
                //res.should.have.status(200);
                res.body.should.have.property('name').eql('pedro');
                //res.body.length.should.be.eql(3);
            done();
          });
          
        });

        it('should post a user', (done)=>{
            let userStored = {
                name : "susana",
                email: "susana@gmail.com",
                age: 34
            }
            chai.request('http://localhost:3999/api/')
            .post('save')
            .send(userStored)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('status').eql('success');
                res.body.userStored.should.have.property('_id');
                res.body.userStored.should.have.property('name');
                res.body.userStored.should.have.property('email');
                res.body.userStored.should.have.property('age');
                res.body.userStored.should.have.property('__v');
             
                  
            done();  
            });
            
        });

        it.skip('it should UPDATE a user given the id', (done)=>{
            let userId="62c937b6fa7be991d306b7d6";
            chai.request('http://localhost:3999/api/')
            
            .put('update/'+ userId)
            .send({name: "jodete", email:"mira@hotmail.com", age: 26})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('status').eql('success');
                res.body.user.should.have.property('age').eql(26);

            done();
        });
    });

       it('it should DELETE a user by the id', (done)=>{
            let userId="62c935e73bc86de19b67b368";
            chai.request('http://localhost:3999/api/')
            .delete('delete/'+ userId)
            .end((err,res)=>{
                res.should.have.status(200);
                      res.body.should.be.a('object');
                      res.body.should.have.property('status').eql('user deleted');
            done();
            });
       });

       it('it should upload an image into a user by id', (done)=>{
        let userId="62d8587302d62e5aab65e266";
        chai.request('http://localhost:3999/api/')
            .post('upload-avatar/'+ userId)
            .attach('file0',
        fs.readFileSync('/home/bug/Documentos/roomd2.jpg'),
        'roomd2.jpg')
            .end((err,res)=>{
                res.should.have.status(200);
                      res.body.should.be.a('object');
                      res.body.should.have.property('status').eql('success');
            done();
            });
       });


       
});

})


//ObjectId("62c935e73bc86de19b67b368")