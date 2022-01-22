import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src";

chai.use(chaiHttp);
chai.should();

const runTest = (testObj) => {
  switch (testObj.type) {
    case 'get':
      chai
        .request(app)
        .get(testObj.url)
        .set({ authorization: `Bearer ${testObj.token}` })
        .end((err, res) => {
          res.should.have.status(testObj.exp.status || 200);
          testObj.done();
        });
      break;
    case 'post':
      chai
        .request(app)
        .post(testObj.url)
        .set({ authorization: `Bearer ${testObj.token}` })
        .send(testObj.bdy)
        .end((err, res) => {
          res.should.have.status(testObj.exp.status || 201);
          testObj.done();
        });
      break;
    case 'put':

      break;
    case 'delete':

      break;
    default:
      break;
  }
}
describe("Welcome to home", () => {
  it("landing page", (done) => {
    runTest({
      done: done, url: '/', type: 'get', exp: {
        status: 200
      }
    })
  });
});

