const chai = require('chai');
const chaiHttp = require('chai-http');
const { faker } = require('@faker-js/faker');

chai.use(chaiHttp);

const { expect } = chai;
const request = chai.request('https://gorest.co.in/public/v2');

describe('PUT /users', () => {

});
