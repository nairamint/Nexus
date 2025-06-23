import { SFDRComplianceValidator, RegulatoryComplianceUtils } from './dist/domain/sfdr/validator.js';

try {
  console.log('Testing SFDRComplianceValidator...');
  const validator = new SFDRComplianceValidator();
  console.log('✓ SFDRComplianceValidator instantiated successfully');
  
  console.log('Testing methods...');
  console.log('Version:', validator.getVersion());
  console.log('Validation rules count:', validator.getAllValidationRules().length);
  
  console.log('Testing RegulatoryComplianceUtils...');
  console.log('ISIN validation:', RegulatoryComplianceUtils.validateISIN('US0378331005'));
  
  console.log('✓ All tests passed!');
} catch (error) {
  console.error('✗ Error:', error.message);
  console.error(error.stack);
}