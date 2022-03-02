import { agent as request } from "supertest";
import { build } from './helper-fastify.js'

let app;

beforeAll(async () => {
  app = await build()
});

afterAll(async () => {
  await app.close()
});

it("App instantiated", async () => {
  expect(app).not.toBeNull()
})

it("GET / health", async () => {
  // const result = await request(app).get("/health");
  const result = await request('http://localhost:3000').get("/health");
  const obj = JSON.parse(result.text)
  expect(result.statusCode).toEqual(200);
  expect(obj.message).toEqual("OK");
});


