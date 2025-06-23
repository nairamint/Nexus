/**
 * Jest Test Setup
 * Global test configuration and utilities
 */
import 'jest';
declare global {
    namespace jest {
        interface Matchers<R> {
            toBeValidSFDRClassification(): R;
            toHaveConfidenceLevel(level: string): R;
        }
    }
}
//# sourceMappingURL=setup.d.ts.map