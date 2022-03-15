import { IHttpRequest, IHttpResponse } from "../../core/interfaces/http.js";
import { PLATFORM_CORE_VERSION } from "../../version.js";

/**
 * GET /health
 *
 * @param req
 * @param res
 */
async function handleHealthCheck(req: IHttpRequest, res: IHttpResponse) {
  // req.i18n.locale('kr')
  // console.log(req.server.i18n.t('Login'))
  // req.i18n.locale('vi-VN')
  // console.log(req.server.i18n.t('Login'))

  // TODO: DYNAMICALLY CHANGE THE LOCALE NOT WORKING YET

  const server = {
    version: PLATFORM_CORE_VERSION,
    upTime: toHHMMSS(process.uptime()),
    responseTime: new Date().toISOString(),
    message: req.server.i18n.t('OK'),
    locale: req.i18n.locale()
  };

  res.send(server);
}

function toHHMMSS(sec_num) {
  const date = new Date(0);
  date.setSeconds(sec_num);
  const timeString = date.toISOString().substr(11, 8);
  // console.log(timeString)
  return timeString;
}

export { handleHealthCheck }