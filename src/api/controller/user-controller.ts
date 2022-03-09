import {
  IHttpRequest,
  IHttpResponse,
} from '../../core/interfaces/http.js';
import { logger } from '../../core/logger/index.js';
import User from '../../database/models/User.js';

export { ListUsers, GetUser, GetUserConfig, CreateUser, PatchUser };

async function CreateUser(req: IHttpRequest, res: IHttpResponse) {
  const payload = req.body;

  const createdUser = await User.query().insert({
    ...payload,
  });

  res.send(createdUser);
}

async function GetUser(req: IHttpRequest, res: IHttpResponse) {
  const userId = req.params.userId;

  const user = await User.query().findById(userId);

  if (user) {
    res.send(user);
  } else {
    res.notFound('User is not found!');
  }
}

async function ListUsers(req: IHttpRequest, res: IHttpResponse) {
  const users = await User.query();
  res.send(users);
}

async function PatchUser(req: IHttpRequest, res: IHttpResponse) {
  const partialPayload = req.body;
  const userId = req.params.userId;

  try {
    const dbResult = await User.forge().$q
      .patch({
        ...partialPayload,
        // Not working (prefered) new Date().toISOString()
        updated_at: new Date(),
      })
      .findById(userId);

    res.send(dbResult);
  } catch (e) {
    logger.error('Error happened when updating user');
    logger.error(e);
    res.badRequest();
  }
}

async function GetUserConfig(req: IHttpRequest, res: IHttpResponse) {
  res.send({
    role: 'admin',
  });
}
