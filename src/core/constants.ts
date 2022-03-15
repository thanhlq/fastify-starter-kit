/**
 * @author Thanh LE
 * @brief Generic constants
 */

/**
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

export const PRODUCTION_ENV = 'production';
export const DEVELOPMENT_ENV = 'development';
export const STAGING_ENV = 'staging';
export const TEST_ENV = 'production';

const env = process.env;
export const isProduction = env.NODE_ENV == PRODUCTION_ENV;

export const MIDDLEWARE_SWAGGER_DOC_CK = 'SWAGGER_DOCS';
export const MIDDLEWARE_STATIC_FILE_CK = 'STATIC_FILE_SERVING';
export const MIDDLEWARE_I18N_CK = 'I18N';
export const ON_VALUE = 'ON';
export const OFF_VALUE = 'OFF';
