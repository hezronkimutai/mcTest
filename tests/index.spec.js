import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src";
import jwt from "jsonwebtoken";
import axios from 'axios'
import {
  createValidUserData,
  createValidArticleData,
  createCompanyValidData,
  editCompanyValidData,
  createinValidUserData,
  inValidSinginData,
  createCompanyinValidData,
  createValidCategoryData,
  createValidPortfolioData
} from "./__mocks__";
chai.use(chaiHttp);
chai.should();
let validUserToken, companyId, userId, articleId;

const runTest = (testObj) => {
  switch (testObj.type) {
    case 'get':
      chai
        .request(app)
        .get(testObj.url)
        .set({ authorization: `Bearer ${testObj.token}` })
        .end((err, res) => {
          res.should.have.status(testObj.exp.status || 200);
          if (testObj.url === "/api/users") {
            userId = res.body.data[0].id;
          }
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
          if (testObj.exp.status === 200 && testObj.url === "/api/auth/signin") {
            validUserToken = res.body.data;
          }
          if (testObj.exp.status === 201 && testObj.url === "/api/companies/create") {
            companyId = res.body.data.id;
          }
          if (testObj.exp.status === 201 && testObj.url === `/api/articles/create/${companyId}`) {
            articleId = res.body.data.id;
          }
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


/**
 * User tests
 */
describe("Users", () => {
  it("Payments", (done) => {
    // axios.post('https://guidde-backend.herokuapp.com/api/payments/plan', {
    //   planId: "plan_EmdonWhgTjv7JE",
    //   planName: "",
    //   planDescription: "",
    //   billingAmmount: "",
    //   billingFrequency: "",
    //   notes: "",
    // })
    runTest({
      done: done,
      url: '/api/payments/plan',
      bdy: {
        planId: "plan_EmdonWhgTjv7JE",
        planName: "",
        planDescription: "",
        billingAmmount: "",
        billingFrequency: "",
        notes: "",
      },
      type: 'post',
      exp: {
        status: 201
      }
    })
  });
  it("signup", (done) => {
    runTest({
      done: done,
      url: '/api/auth/signup',
      bdy: createValidUserData,
      type: 'post',
      exp: {
        status: 201
      }
    })
  });
  it("Doesn't create an accout of an already existing user", (done) => {
    runTest({
      done: done,
      url: '/api/auth/signup',
      bdy: createValidUserData,
      type: 'post',
      exp: {
        status: 409
      }
    })
  });

  it("Doesn't create an account with invalid data", (done) => {
    runTest({
      done: done,
      url: '/api/auth/signup',
      bdy: createinValidUserData,
      type: 'post',
      exp: {
        status: 400
      }
    })
  });
  it("signin", (done) => {
    const { password, email, ...others } = createValidUserData;
    runTest({
      done: done,
      url: "/api/auth/signin",
      bdy: { password, email },
      type: 'post',
      exp: {
        status: 200
      }
    })
  });
  it("Cannot signin invalid signin details", (done) => {
    runTest({
      done: done,
      url: "/api/auth/signin",
      bdy: {},
      type: 'post',
      exp: {
        status: 400
      }
    })
  });
  it("Cannot signin invalid signin details", (done) => {
    runTest({
      done: done,
      url: "/api/auth/signin",
      bdy: inValidSinginData,
      type: 'post',
      exp: {
        status: 401
      }
    })
  });
  it("Fetch all users", (done) => {
    runTest({
      done: done,
      url: "/api/users",
      token: validUserToken,
      type: 'get',
      exp: {
        status: 200
      }
    })
  });
  it("Fetch single user", (done) => {
    runTest({
      done: done,
      url: `/api/users/${userId}`,
      token: validUserToken,
      type: 'get',
      exp: {
        status: 200
      }
    })
  });
  it("Edit profile", (done) => {
    chai
      .request(app)
      .put("/api/users/edit-profile")
      .field(createValidUserData)
      .attach("profileImage", "tests/__mocks__/test.png")
      .set({ authorization: `Bearer ${validUserToken}` })
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
});


/**
 * Company tests
 */
describe("Company", () => {
  it("create company", (done) => {
    runTest({
      done: done,
      url: "/api/companies/create",
      bdy: createCompanyValidData,
      token: validUserToken,
      type: 'post',
      exp: {
        status: 201
      }
    })
  });
  it("cannot create a company with invalid user token", (done) => {
    runTest({
      done: done,
      url: "/api/companies/create",
      bdy: createCompanyValidData,
      token: 'invalidUserToken',
      type: 'post',
      exp: {
        status: 401
      }
    })
  });
  it("cannot create company that already exist", (done) => {
    runTest({
      done: done,
      url: "/api/companies/create",
      bdy: createCompanyValidData,
      token: validUserToken,
      type: 'post',
      exp: {
        status: 409
      }
    });
  });
  it("fetch all user companies", (done) => {
    runTest({
      done: done,
      url: `/api/companies/team`,
      token: validUserToken,
      type: 'get',
      exp: {
        status: 200
      }
    });
  });
  it("fetch all  companies", (done) => {
    runTest({
      done: done,
      url: `/api/companies`,
      token: validUserToken,
      type: 'get', exp: {
        status: 200
      }
    });
  });
  it("Cannot create company with invalid data", (done) => {
    runTest({
      done: done,
      url: "/api/companies/create",
      bdy: createCompanyinValidData,
      token: validUserToken,
      type: 'post',
      exp: {
        status: 400
      }
    });
  });
  it("Edit company", (done) => {
    chai
      .request(app)
      .put(`/api/companies/edit/${companyId}`)
      .field(editCompanyValidData)
      .attach("companyFavicon", "tests/__mocks__/test.png")
      .attach("companyLogo", "tests/__mocks__/test.png")
      .attach("companySocialCover", "tests/__mocks__/test.png")
      .set({ authorization: `Bearer ${validUserToken}` })
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
});
describe("Article", () => {
  it("create article", (done) => {
    runTest({
      url: `/api/articles/create/${companyId}`,
      done: done,
      type: 'post',
      token: validUserToken,
      bdy: createValidArticleData,
      exp: {
        status: 201
      }
    })
  });
  it("Fetch company articles", (done) => {
    runTest({
      done: done,
      url: `/api/articles/${companyId}`,
      type: 'get',
      exp: {
        status: 200
      }
    })
  });
  it("Fetch single article", (done) => {
    runTest({
      done: done,
      url: `/api/articles/${companyId}/${articleId}`,
      type: 'get',
      exp: {
        status: 200
      }
    })
  });
});

describe("Category", () => {
  it("create category", (done) => {
    runTest({
      url: `/api/categories/create/${companyId}`,
      done: done,
      type: 'post',
      token: validUserToken,
      bdy: createValidCategoryData,
      exp: {
        status: 201
      }
    })
  });
});

describe("Portfolio", () => {
  it("create portfolio", (done) => {
    runTest({
      url: `/api/portfolios/create/${companyId}`,
      done: done,
      type: 'post',
      token: validUserToken,
      bdy: createValidPortfolioData,
      exp: {
        status: 201
      }
    })
  });
  it("Fetch company portfolios", (done) => {
    runTest({
      url: `/api/portfolios/${companyId}`,
      done: done,
      type: 'get',
      token: validUserToken,
      bdy: createValidPortfolioData,
      exp: {
        status: 200
      }
    })
  });
});