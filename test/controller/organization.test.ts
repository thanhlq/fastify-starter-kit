import { agent as request } from "supertest";
import { build } from '../helper-fastify.js'

import * as TestDB from '../db/db.js'

const host = process.env.HOST || 'http://localhost:3000'

const organizations = TestDB.default.organizations;

let app;

beforeAll(async () => {
  app = await build()
});

afterAll(async () => {
  await app.close()
});

describe('Test Organization Api', () => {
  it('Test organization CRUD API(s)', async () => {
    const orgData = organizations[0];

    // Create
    const result = await request(host)
      .post('/api/v1/organizations')
      .send(orgData);
    const obj = JSON.parse(result.text)
    expect(result.statusCode).toEqual(200);
    expect(obj.message).toEqual("Organization Created Successfully");
    expect(obj.data).not.toBeNull()
    expect(obj.data.code).toEqual(orgData.code)

    // Partial Update
    const partialUpdateResult = await request(host)
      .patch('/api/v1/organizations/' + orgData.id)
      .send({ name: 'Test name 1' })
    const updated = JSON.parse(partialUpdateResult.text)
    expect(partialUpdateResult.statusCode).toEqual(200);
    expect(updated.message).toEqual("Organization Patched Successfully");
    expect(updated.data.id).toEqual(orgData.id)

    //Get
    const getOrgResult = await request(host)
      .get('/api/v1/organizations/' + orgData.id)
      .send({ name: 'Test name 1' })
    const getOrg = JSON.parse(getOrgResult.text)
    expect(getOrgResult.statusCode).toEqual(200);
    expect(getOrg.message).toEqual("Organization Get Successfully");
    expect(getOrg.data.id).toEqual(orgData.id)
    expect(getOrg.data.name).toEqual('Test name 1')

  })
})
