import {
  IHttpRequest,
  IHttpResponse,
} from '../../core/interfaces/http.js';
import { logger } from '../../core/logger/index.js';
import Organization from '../../database/models/Organization.js';

export {
  handle_ListOrganizations,
  handle_GetOrganization,
  handle_GetOrganizationConfig,
  handle_CreateOrganization,
  handle_PatchOrganization
};

async function handle_CreateOrganization(req: IHttpRequest, res: IHttpResponse) {
  const payload = req.body;

  const createdOrganization = await Organization.query().insert({
    ...payload,
  });

  res.send({
    message: "Organization Created Successfully",
    data: createdOrganization
  });
}

async function handle_GetOrganization(req: IHttpRequest, res: IHttpResponse) {
  const orgId = req.params.orgId;

  const org = await Organization.query().findById(orgId);

  if (org) {
    res.send({
      message: 'Organization Get Successfully',
      data: org
    });
  } else {
    res.notFound('Organization is not found!');
  }
}

async function handle_ListOrganizations(req: IHttpRequest, res: IHttpResponse) {
  const results = await Organization.query();
  res.send({
    message: 'Organization Listed Successfully',
    data: results
  });
}

async function handle_PatchOrganization(req: IHttpRequest, res: IHttpResponse) {
  const partialPayload = req.body;
  const orgId = req.params.orgId;

  logger.debug(`Updating organization: ${orgId}: ${JSON.stringify(partialPayload)}`)

  try {
    const dbResult = await Organization.forge().$q
      .patch({
        ...partialPayload,
        // Not working (prefered) new Date().toISOString()
        updated_at: new Date(),
      })
      .findById(orgId);

    res.send({
      data: { ...dbResult, id: orgId },
      message: 'Organization Patched Successfully',
    });
  } catch (e) {
    logger.error('Error happened when updating Organization');
    logger.error(e);
    res.badRequest();
  }
}

async function handle_GetOrganizationConfig(req: IHttpRequest, res: IHttpResponse) {
  res.send({
    role: 'admin',
  });
}
