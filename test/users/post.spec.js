const chai = require('chai');
const chaiHttp = require('chai-http');
const { faker } = require('@faker-js/faker');

chai.use(chaiHttp);

const { expect } = chai;
const request = chai.request('https://gorest.co.in/public/v2');

describe('POST /users', () => {
    const TOKEN = '20abea7da79d0e57a7db0ff37db3d60fd05a7ba681ad69d4c9e7e27106ceb6e1';

    context('Quando eu cadastro um usuário com sucesso', () => {
        it('Então deve retornar o statusCode = 201', (done) => {
            const newUser = {
                name: faker.name.findName(),
                email: faker.internet.email(),
                gender: 'male',
                status: 'Active',
            };
            request
                .post('/users')
                .auth(TOKEN, { type: 'bearer' })
                .send(newUser)
                .then((res) => {
                    expect(res).to.has.status(201);
                    expect(res.body).to.include.all.keys('id', 'name', 'email', 'gender', 'status');
                    expect(res.body.name).to.be.an('string');
                    expect(res.body.email).to.be.an('string');
                    expect(res.body).to.have.property('id').which.is.a('number').above(0).and.satisfy(Number.isInteger);
                    done();
                })
                .catch((err) => done(err));
        });
    });

    context('Quando eu não informo o nome do usuário', () => {
        it('Então deve retornar o statusCode = 422', (done) => {
            const newUser = {
                email: faker.internet.email(),
                gender: 'male',
                status: 'Active',
            };
            request
                .post('/users')
                .auth(TOKEN, { type: 'bearer' })
                .send(newUser)
                .then((res) => {
                    expect(res).to.has.status(422);
                    expect(res.body).to.eql([{ field: 'name', message: "can't be blank" }]);
                    done();
                })
                .catch((err) => done(err));
        });
    });

    context('Quando eu não informo o email do usuário', () => {
        it('Então deve retornar o statusCode = 422', (done) => {
            const newUser = {
                name: faker.name.findName(),
                gender: 'male',
                status: 'Active',
            };
            request
                .post('/users')
                .auth(TOKEN, { type: 'bearer' })
                .send(newUser)
                .then((res) => {
                    expect(res).to.has.status(422);
                    expect(res.body).to.eql([{ field: 'email', message: "can't be blank" }]);
                    done();
                })
                .catch((err) => done(err));
        });
    });

    context('Quando eu não informo o gênero do usuário', () => {
        it('Então deve retornar o statusCode = 422', (done) => {
            const newUser = {
                name: faker.name.findName(),
                email: faker.internet.email(),
                status: 'Active',
            };
            request
                .post('/users')
                .auth(TOKEN, { type: 'bearer' })
                .send(newUser)
                .then((res) => {
                    expect(res).to.has.status(422);
                    expect(res.body).to.eql([{ field: 'gender', message: "can't be blank, can be male or female" }]);
                    done();
                })
                .catch((err) => done(err));
        });
    });

    context('Quando eu não informo o status do usuário', () => {
        it('Então deve retornar o statusCode = 422', (done) => {
            const newUser = {
                name: faker.name.findName(),
                email: faker.internet.email(),
                gender: 'male',
            };
            request
                .post('/users')
                .auth(TOKEN, { type: 'bearer' })
                .send(newUser)
                .then((res) => {
                    expect(res).to.has.status(422);
                    expect(res.body).to.eql([{ field: 'status', message: "can't be blank" }]);
                    done();
                })
                .catch((err) => done(err));
        });
    });
});
