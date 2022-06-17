const chai = require('chai');
const chaiHttp = require('chai-http');
const { faker } = require('@faker-js/faker');

chai.use(chaiHttp);

const { expect } = chai;
const request = chai.request('https://gorest.co.in/public/v2');
var id = 0;

describe('PUT /users', () => {
    const TOKEN = '20abea7da79d0e57a7db0ff37db3d60fd05a7ba681ad69d4c9e7e27106ceb6e1';

    context('Quando eu edito um usuário com sucesso', () => {
        const newUser = {
            name: 'Test User 2022 GO REST',
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

        it('Então deve retornar o StatusCode = 200 - OK', (done) => {
            const userUpdated = {
                name: 'API REST GO Test User 2022',
                email: faker.internet.email(),
                gender: 'female',
                status: 'Inactive',
            };
            request
                .put(`/users/${id}`)
                .auth(TOKEN, { type: 'bearer' })
                .send(userUpdated)
                .then((res) => {
                    expect(res).to.has.status(200);
                    expect(res.body).to.have.property('id').which.is.a('number').equal(id).and.satisfy(Number.isInteger);
                    expect(res.body.name).equal(userUpdated.name);
                    expect(res.body.email).equal(userUpdated.email);
                    expect(res.body.gender).equal(userUpdated.gender);
                    expect(res.body.status).equal(userUpdated.status.toLowerCase());
                    done();
                })
                .catch((err) => done(err));
        });
    });

    after((done) => {
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
