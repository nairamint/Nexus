# ES Module Import Guide

## Overview

This document provides guidance on how to properly configure and use ES modules in the SFDR Navigator Agent project. The project is currently configured to use ES modules (`"type": "module"` in `package.json`), but there are some issues with the TypeScript configuration and import statements that need to be addressed.

## Current Configuration

- `package.json` specifies `"type": "module"`, indicating that all JavaScript files are treated as ES modules by default
- `tsconfig.json` has been updated to use `"module": "NodeNext"` and `"moduleResolution": "NodeNext"`
- The project builds to the `dist` directory, but there are issues with import statements in TypeScript files

## Issues and Solutions

### 1. File Extensions in Import Statements

When using ES modules with `NodeNext` module resolution, all relative import statements must include file extensions.

**Problem:**
```typescript
// This won't work with ES modules
import { Something } from './types';
```

**Solution:**
```typescript
// Add .js extension (even for TypeScript files)
import { Something } from './types.js';
```

> **Important:** Even though you're importing from a `.ts` file, you need to use the `.js` extension in the import statement. This is because TypeScript compiles to JavaScript, and the import statements in the compiled code will reference `.js` files.

### 2. Module Resolution in tsconfig.json

The `tsconfig.json` file needs to be configured correctly for ES modules.

**Required Configuration:**
```json
{
  "compilerOptions": {
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    // other options...
  }
}
```

### 3. Running TypeScript Files with ES Modules

To run TypeScript files directly with ES modules:

- Use `ts-node` with the `--esm` flag:
  ```
  ts-node --esm src/index.ts
  ```

- Or use `tsx` which supports ESM by default:
  ```
  tsx src/index.ts
  ```

### 4. Importing ES Modules in JavaScript Files

When importing ES modules in JavaScript files:

- Always include file extensions in import statements
- Use dynamic imports with `await import()` syntax for top-level await
- For CommonJS compatibility, consider using the `.cjs` extension for CommonJS files

## Testing ES Module Imports

The `test-import-esm.js` file demonstrates how to properly import modules from the project when using ES modules. It imports the validator module from the `dist` directory and tests its functionality.

```javascript
// Example of dynamic import with proper file extension
const validatorModule = await import('./dist/domain/sfdr/validator.js');
```

## Next Steps

To fix the build issues in the project:

1. Update all relative import statements in TypeScript files to include `.js` extensions
2. Ensure `tsconfig.json` and `tsconfig.ai.json` have the correct module resolution settings
3. Rebuild the project with `npm run build`
4. Test the imports with `node test-import-esm.js`

## References

- [TypeScript ESM/CommonJS Interop](https://www.typescriptlang.org/docs/handbook/esm-node.html)
- [Node.js ECMAScript Modules](https://nodejs.org/api/esm.html)
- [ES Modules in Node.js](https://nodejs.org/api/packages.html#packages_package_json_and_file_extensions)