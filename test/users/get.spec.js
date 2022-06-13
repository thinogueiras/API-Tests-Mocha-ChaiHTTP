const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;
const request = chai.request('https://gorest.co.in/public/v2');

describe('GET /users', () => {
    it('Deve retornar uma lista de usuários', (done) => {
        request
            .get('/users')
            .then((res) => {
                expect(res).to.has.status(200);
                expect(res.body).to.be.an('array').that.not.empty;
                done();
            })
            .catch((err) => done(err));
    });

    it('Deve filtrar o usuário por ID', (done) => {
        request
            .get(`/users/${1000}`)
            .then((res) => {
                expect(res).to.has.status(200);
                expect(res.body).to.be.an('object').that.not.empty;
                done();
            })
            .catch((err) => done(err));
    });
});
