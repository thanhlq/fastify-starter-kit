/* Thanh LE */
/* Utility script for getting the paths - could be improved depending on the deployment */
/* ECMAScript */

import * as dotenv from 'dotenv';
// import * as path from 'path'
import { fileURLToPath } from 'url';
import path, { dirname, resolve } from 'path';
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const appPath = resolve(__dirname)
// const buildPath = resolve(__dirname, 'dist')

const dotEnvFile = path.join(appPath, '.env')
console.log('ROOT APP PATH: ' + appPath)

try {
  console.log('.env file: ' + dotEnvFile)
  if (fs.existsSync(dotEnvFile)) {
    dotenv.config({debug: true, path: dotEnvFile})
  } else {
    console.error('.env file not existed: ' + dotEnvFile)
  }
} catch(err) {
  console.error(err)
}

// console.log('BUILD PATH: ' + buildPath)
process.env.APP_ROOT = global.appRoot = appPath

export {
  appPath,
  // buildPath
}

export default appPath;
