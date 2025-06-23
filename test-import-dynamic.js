// Test file to check module import issues using dynamic imports

async function testImport() {
  try {
    const validator = await import('./src/domain/sfdr/validator.js');
    console.log('Import successful');
    console.log('Exports available:', Object.keys(validator));
    console.log('SFDRComplianceValidator exists:', !!validator.SFDRComplianceValidator);
  } catch (error) {
    console.error('Import failed:', error.message);
  }
  console.log('Node.js version:', process.version);
}

testImport();