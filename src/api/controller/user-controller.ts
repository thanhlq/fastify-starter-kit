import {
  IHttpRequest as HttpRequest,
  IHttpResponse as HttpResponse,
} from '../../core/interfaces/http';
import { logger } from '../../core/platform-fastify';
import { nanoId } from '../../core/utils';
import User from '../../database/models/User';

export { ListUsers, GetUser, GetUserConfig, CreateUser };

async function CreateUser(req: HttpRequest, res: HttpResponse) {
  const payload = req.body

  // todo: validate

  const createdUser = await User.query().insert({
    ...payload,
    id: nanoId(),
  })

  res.send(createdUser)
}

async function GetUser(req: HttpRequest, res: HttpResponse) {
  const userId = req.params.userId

  logger.debug('Get user by id: ' + userId)

  const user = await User.query().findById(userId);

  if (user) {
    res.send(user);
  } else {
    res.notFound('User is not found!')
  }
}

async function ListUsers(req: HttpRequest, res: HttpResponse) {
  const params = req.params

  logger.debug('List users', params)

  const users = await User.query()
  res.send(users);
}

async function GetUserConfig(req: HttpRequest, res: HttpResponse) {
  res.send({
    role: 'admin',
  });
}
