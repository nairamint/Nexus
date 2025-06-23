/**
 * Test file for ES module imports
 * 
 * This file demonstrates how to properly import modules from the project
 * when using ES modules (package.json type: "module")
 */

console.log('Starting ES module import test...');

// Test importing from dist directory
async function testImport() {
  console.log('Testing import from dist directory...');
  try {
    // Try to import the validator module
    console.log('Attempting to import validator.js from dist...');
    const validatorModule = await import('./dist/domain/sfdr/validator.js');
    
    console.log('Successfully imported validator module');
    console.log('Available exports:', Object.keys(validatorModule));
    
    // Check if SFDRComplianceValidator is exported
    if (validatorModule.SFDRComplianceValidator) {
      console.log('SFDRComplianceValidator is available!');
      
      // Create an instance to verify it works
      const validator = new validatorModule.SFDRComplianceValidator();
      console.log('Successfully created validator instance');
      
      // Test some methods if they exist
      if (typeof validator.getVersion === 'function') {
        console.log('Validator version:', validator.getVersion());
      } else if (validator.version) {
        console.log('Validator version property:', validator.version);
      }
      
      if (typeof validator.getAllValidationRules === 'function') {
        console.log('Validation rules available:', validator.getAllValidationRules().length);
      }
    } else {
      console.log('SFDRComplianceValidator is NOT available!');
    }
    
    // Check if RegulatoryComplianceUtils is exported
    if (validatorModule.RegulatoryComplianceUtils) {
      console.log('RegulatoryComplianceUtils is available!');
      
      // Test some utility methods if they exist
      const utils = validatorModule.RegulatoryComplianceUtils;
      if (typeof utils.validateISIN === 'function') {
        console.log('ISIN validation test:', utils.validateISIN('US0378331005')); // Apple Inc.
      }
      
      if (typeof utils.validateLEI === 'function') {
        console.log('LEI validation test:', utils.validateLEI('HWUPKR0MPOU8FGXBT394')); // Example LEI
      }
    } else {
      console.log('RegulatoryComplianceUtils is NOT available!');
    }
    
    // Check if sfrValidator singleton is exported
    if (validatorModule.sfrValidator) {
      console.log('sfrValidator singleton is available!');
      console.log('Singleton type:', typeof validatorModule.sfrValidator);
    } else {
      console.log('sfrValidator singleton is NOT available!');
    }
    
    console.log('\nImport test completed successfully!');
    
  } catch (error) {
    console.error('Import failed:', error.message);
    console.error('Error stack:', error.stack);
  }
  
  console.log('\nEnvironment information:');
  console.log('Node.js version:', process.version);
  console.log('Module type:', process.env.NODE_OPTIONS || 'Not specified');
}

// Run the import test
testImport();

// Provide guidance on how to fix import issues
console.log('\nGuidance for ES Module imports:');
console.log('1. When using "type": "module" in package.json, all imports must use file extensions');
console.log('2. For TypeScript projects, update tsconfig.json to use:');
console.log('   - "module": "NodeNext"');
console.log('   - "moduleResolution": "NodeNext"');
console.log('3. In TypeScript source files, add .js extension to imports:');
console.log('   - import { Something } from "./file.js"; // NOT "./file"');
console.log('4. To run TypeScript files directly with ES modules:');
console.log('   - Use ts-node with --esm flag');
console.log('   - Or use tsx which supports ESM by default');