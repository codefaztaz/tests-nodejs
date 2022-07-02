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



        it('should have 200 code response', (done)=>{
            chai.request('http://localhost:3999/api/')
            .get('users')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(3);
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

        it('should get a user with his ID', (done)=>{
           const  userID= '628661634ff314d839e811de';
            chai.request('http://localhost:3999/api/')
            .get('user/' + userID)
            .end((err, res) => {
                //res.should.have.status(200);
                res.body.should.have.property('name').eql('pedro');
                //res.body.length.should.be.eql(3);
            done();
          });
          
        })
    })

})
