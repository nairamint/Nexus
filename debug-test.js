// Simple debug test to check validator functionality
import { SFDRComplianceValidator } from './src/domain/sfdr/validator.js';

try {
  const validator = new SFDRComplianceValidator();
  console.log('Validator created successfully');
  console.log('Version:', validator.getVersion());
  console.log('Rules count:', validator.getAllValidationRules().length);
} catch (error) {
  console.error('Error:', error.message);
  console.error('Stack:', error.stack);
}