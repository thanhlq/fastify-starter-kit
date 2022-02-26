import {
  IHttpRequest as HttpRequest,
  IHttpResponse as HttpResponse
} from '../../core/interfaces/http';
import { logger } from '../../core/logger/index';
import User from '../../database/models/User';

export { ListUsers, GetUser, GetUserConfig, CreateUser, PatchUser };


async function CreateUser(req: HttpRequest, res: HttpResponse) {
  const payload = req.body

  const createdUser = await User.query().insert({
    ...payload,
  })

  res.send(createdUser)
}

async function GetUser(req: HttpRequest, res: HttpResponse) {
  const userId = req.params.userId

  const user = await User.query().findById(userId);

  if (user) {
    res.send(user);
  } else {
    res.notFound('User is not found!')
  }
}

async function ListUsers(req: HttpRequest, res: HttpResponse) {
  const params = req.params
  const users = await User.query()
  res.send(users);
}

async function PatchUser(req: HttpRequest, res: HttpResponse) {
  const partialPayload = req.body
  const userId = req.params.userId

  try {
    const dbResult = await User.forge().patch({
      ...partialPayload,
      // Not working (prefered) new Date().toISOString()
      updated_at: new Date()
    }).findById(userId)

    res.send(dbResult)
  } catch (e) {
    logger.error('Error happened when updating user')
    logger.error(e)
    res.badRequest()
  }
}

async function GetUserConfig(req: HttpRequest, res: HttpResponse) {
  res.send({
    role: 'admin',
  });
}
