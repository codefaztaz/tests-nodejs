const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised);
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const rewire = require('rewire');


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
        it('should check for an id', (done)=>{
            users.getUser( (err, result)=>{
                expect(err).to.exist;
                expect(err.message).to.equal('Invalid user id');
                done();
            })
        })

        it('should call findUserById with id and return result', (done)=>{
            sandbox.restore();
            let stub = sandbox.stub(mongoose.Model, 'findById').yields(null, {name: 'foo'});

            users.getUser(123, (err, result)=>{
                expect(err).to.not.exist;
                expect(stub).to.have.been.calledOnce;
                expect(stub).to.have.been.calledWith(123);
                expect(result).to.be.a('object');
                expect(result).to.have.property('name').to.equal('foo');

                done();
            })
        })

    })

})
