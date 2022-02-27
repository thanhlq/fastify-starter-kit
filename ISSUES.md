# FACED ISSUES / WORKAROUND

## RangeError: Maximum call stack size exceeded at recursiveTypeRelatedTo after upgrading to 3.0 #2178

* https://github.com/Vincit/objection.js/issues/2178
* https://github.com/microsoft/TypeScript/issues/33460

Here is a workaround:

"strict": false
"strictNullChecks": false  in tsconfig.json
Downgrade ts to "typescript": < "4.5.3"

## Mocha.js / Typescript / ESM

Ref

* [Node 12 ESM](https://stackoverflow.com/questions/59787574/typescript-tsconfig-settings-for-node-js-12)
* [Typescript with ts-node and ESM support #47](https://github.com/mochajs/mocha-examples/issues/47)


## Jest / Typescript / ESM


## Important Notes

* This application is based on ECMAScript Module supported by Node 12+
* [By using ECMAScript modules (ESM), the file extensions are mandatory](https://nodejs.org/api/esm.html#esm_mandatory_file_extensions)
