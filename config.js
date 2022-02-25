/* Thanh LE */
/* Utility script for getting the paths - could be improved depending on the deployment */

import * as path from 'path'
import * as dotenv from 'dotenv';

dotenv.config();

const appPath = path.resolve(__dirname)
const buildPath = path.resolve(__dirname, 'build')

// console.log(appPath)
// console.log(buildPath)

global.appRoot = appPath

export {
  appPath,
  buildPath
}
