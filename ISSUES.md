# FACED ISSUES / WORKAROUND

## RangeError: Maximum call stack size exceeded at recursiveTypeRelatedTo after upgrading to 3.0 #2178

* https://github.com/Vincit/objection.js/issues/2178
* https://github.com/microsoft/TypeScript/issues/33460

Here is a workaround:

"strict": false
"strictNullChecks": false  in tsconfig.json
Downgrade ts to "typescript": < "4.5.3"

## Mocha.js / Typescript

Ref

* [Node 12 ESM](https://stackoverflow.com/questions/59787574/typescript-tsconfig-settings-for-node-js-12)
* [typescript with ts-node and ESM support #47](https://github.com/mochajs/mocha-examples/issues/47)

* This test framework does not work with ESM & Typescript yet, have a look at: https://github.com/mochajs/mocha-examples/issues/47