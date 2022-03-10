
//Thanh LE: Note, starting the test service directly in here having issue (cannot load mysql connection... damm)


import { agent as request } from "supertest";
import { build } from './helper-fastify.js'

const host = process.env.HOST || 'http://localhost:3000'

let app;

beforeAll(async () => {
  app = await build()
})

afterAll(async () => {
  await app.close()
});

it("App instantiated", (done) => {
  expect(app).not.toBeNull()
  done()
})

it("GET /health", async () => {
  // const result = await request(app).get("/health");
  const result = await request(host).get('/health');
  const obj = JSON.parse(result.text)
  // console.log(result.text)
  expect(result.statusCode).toEqual(200);
  expect(obj.message).toEqual('OK');
});
