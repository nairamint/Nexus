// Test file to check module import issues using the compiled JS file

import { SFDRComplianceValidator } from './dist/domain/sfdr/validator.js';

console.log('Import successful:', !!SFDRComplianceValidator);
console.log('Node.js version:', process.version);