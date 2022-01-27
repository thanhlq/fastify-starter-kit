import { IHttpRequest as HttpRequest, IHttpResponse as HttpResponse } from "../../core/interfaces/http";

export {
  GetUser,
  GetUserConfig
};

async function GetUser(req: HttpRequest, res: HttpResponse) {
  res.send({
    balance: '$3,277.32',
    picture: 'http://placehold.it/32x32',
    age: 30,
    query: req?.query,
    name: 'Leonor Cross',
    gender: 'female',
    company: 'GRONK',
    email: 'leonorcross@gronk.com',
  });
}

async function GetUserConfig(req: HttpRequest, res: HttpResponse) {
  res.send({
    role: 'admin'
  });
}
