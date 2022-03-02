/* Thanh LE */
/* Utility script for getting the paths - could be improved depending on the deployment */
/* ECMAScript */

import * as dotenv from 'dotenv';
// import * as path from 'path'
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const appPath = resolve(__dirname)
const buildPath = resolve(__dirname, 'dist')

console.log('ROOT APP PATH: ' + appPath)
console.log('BUILD PATH: ' + buildPath)

process.env.APP_ROOT = global.appRoot = appPath

export {
  appPath,
  buildPath
}

export default appPath;
