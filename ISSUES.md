# FACED ISSUES / WORKAROUND

## RangeError: Maximum call stack size exceeded at recursiveTypeRelatedTo after upgrading to 3.0 #2178

* https://github.com/Vincit/objection.js/issues/2178
* https://github.com/microsoft/TypeScript/issues/33460

Here is a workaround:

"strict": false
"strictNullChecks": false  in tsconfig.json
Downgrade ts to "typescript": < "4.5.3"
