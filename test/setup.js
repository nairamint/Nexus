/**
 * Jest Test Setup
 * Global test configuration and utilities
 */
// Extend Jest matchers
import 'jest';
// Global test timeout
jest.setTimeout(30000);
// Mock console methods in tests to reduce noise
const originalConsole = console;
beforeAll(() => {
    // Suppress console output during tests unless explicitly needed
    global.console = {
        ...originalConsole,
        log: jest.fn(),
        info: jest.fn(),
        warn: jest.fn(),
        error: jest.fn(),
        debug: jest.fn()
    };
});
afterAll(() => {
    // Restore console
    global.console = originalConsole;
});
// Global test utilities
global.createMockLogger = () => ({
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    debug: jest.fn()
});
// Mock Date.now for consistent testing
const mockDateNow = jest.fn(() => 1640995200000); // 2022-01-01T00:00:00.000Z
Date.now = mockDateNow;
// Reset mocks between tests
beforeEach(() => {
    jest.clearAllMocks();
    mockDateNow.mockReturnValue(1640995200000);
});
// Custom matchers
expect.extend({
    toBeValidSFDRClassification(received) {
        const validArticles = ['ARTICLE_6', 'ARTICLE_8', 'ARTICLE_9'];
        const pass = validArticles.includes(received);
        if (pass) {
            return {
                message: () => `expected ${received} not to be a valid SFDR classification`,
                pass: true
            };
        }
        else {
            return {
                message: () => `expected ${received} to be a valid SFDR classification (${validArticles.join(', ')})`,
                pass: false
            };
        }
    },
    toHaveConfidenceLevel(received, expectedLevel) {
        const validLevels = ['VERY_HIGH', 'HIGH', 'MEDIUM', 'LOW', 'VERY_LOW'];
        const pass = received.confidence?.level === expectedLevel;
        if (pass) {
            return {
                message: () => `expected confidence level not to be ${expectedLevel}`,
                pass: true
            };
        }
        else {
            return {
                message: () => `expected confidence level to be ${expectedLevel}, but received ${received.confidence?.level}`,
                pass: false
            };
        }
    }
});
//# sourceMappingURL=setup.js.map