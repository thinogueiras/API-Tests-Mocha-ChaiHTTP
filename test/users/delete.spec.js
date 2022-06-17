const chai = require('chai');
const chaiHttp = require('chai-http');
const { faker } = require('@faker-js/faker');
const { before, after } = require('mocha');

chai.use(chaiHttp);

const { expect } = chai;
const request = chai.request('https://gorest.co.in/public/v2');
let id = 0;

describe('DELETE /users', () => {
    const TOKEN = '20abea7da79d0e57a7db0ff37db3d60fd05a7ba681ad69d4c9e7e27106ceb6e1';

    context('Quando eu excluo um usuário com sucesso', () => {
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

        it('Então deve retornar o statusCode = 204 - No Content', (done) => {
            request
                .delete(`/users/${id}`)
                .auth(TOKEN, { type: 'bearer' })
                .then((res) => {
                    expect(res).to.has.status(204);
                    expect(res.body).to.be.empty;
                    done();
                })
                .catch((err) => done(err));
        });
    });

    context('Quando eu tento excluir um usuário inexistente', () => {
        it('Então deve retornar o statusCode = 404 - Not Found', (done) => {
            request
                .delete(`/users/${id}`)
                .auth(TOKEN, { type: 'bearer' })
                .then((res) => {
                    expect(res).to.has.status(404);
                    expect(res.body).to.eql({ message: 'Resource not found' });
                    done();
                })
                .catch((err) => done(err));
        });
    });
});
