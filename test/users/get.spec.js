const chai = require('chai');
const chaiHttp = require('chai-http');
const { faker } = require('@faker-js/faker');
const { before } = require('mocha');

chai.use(chaiHttp);

const { expect } = chai;
const request = chai.request('https://gorest.co.in/public/v2');
var id = 0;

describe('GET /users', () => {
    const TOKEN = '20abea7da79d0e57a7db0ff37db3d60fd05a7ba681ad69d4c9e7e27106ceb6e1';

    context('Quando eu envio uma requisição para o endpoint de usuários', () => {
        it('Então deve retornar uma lista de usuários e o statusCode = 200 - OK', (done) => {
            request
                .get('/users')
                .then((res) => {
                    expect(res).to.has.status(200);
                    expect(res.body).to.be.an('array').to.be.an.instanceOf(Object);
                    done();
                })
                .catch((err) => done(err));
        });
    });

    context('Quando eu envio uma requisição com filtro de ID para o endpoint de usuários', () => {
        const newUser = {
            name: faker.name.findName(),
            email: faker.internet.email(),
            gender: 'male',
            status: 'Active',
        };

        before((done) => {
            request
                .post('/users')
                .auth(TOKEN, { type: 'bearer' })
                .send(newUser)
                .then((res) => {
                    expect(res).to.has.status(201);
                    id = res.body.id;
                    done();
                })
                .catch((err) => done(err));
        });

        it('Então deve filtrar o usuário por ID e retornar o statusCode = 200 - OK', (done) => {
            request
                .get(`/users/${id}`)
                .auth(TOKEN, { type: 'bearer' })
                .then((res) => {
                    expect(res).to.has.status(200);
                    expect(res.body).to.have.property('id').which.is.a('number').equal(id).and.satisfy(Number.isInteger);
                    done();
                })
                .catch((err) => done(err));
        });
    });
});
