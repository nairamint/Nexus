/**
 * SFDR Navigator Agent - Compliance Validator
 * Phase 1B: Regulatory Validation Logic
 *
 * Implements comprehensive SFDR regulatory validation based on:
 * - SFDR Regulation (EU) 2019/2088
 * - Commission Delegated Regulation (EU) 2022/1288
 * - ESMA Guidelines and Technical Standards
 */
import type { SFDRClassificationRequest, ValidationResult, ValidationIssue, PAIIndicator, TaxonomyEnvironmentalObjective, SFDRArticleClassification } from './types.js';
/**
 * SFDR Compliance Validator
 * Implements regulatory validation logic with proper error handling
 */
export declare class SFDRComplianceValidator {
    private readonly validationRules;
    private readonly version;
    constructor();
    /**
     * Validate complete SFDR classification request
     */
    validateRequest(request: SFDRClassificationRequest): Promise<ValidationResult>;
    /**
     * Validate specific article classification logic
     */
    validateArticleClassification(request: SFDRClassificationRequest): {
        isValid: boolean;
        recommendedClassification: SFDRArticleClassification;
        reasoning: string[];
    };
    private initializeValidationRules;
    /**
     * Check if request meets Article 9 compliance criteria
     */
    private isArticle9Compliant;
    /**
     * Check if request meets Article 8 compliance criteria
     */
    private isArticle8Compliant;
    /**
     * Get validator version
     */
    getVersion(): string;
}
/**
 * Regulatory Compliance Utilities
 * Helper functions for SFDR compliance validation
 */
export declare class RegulatoryComplianceUtils {
    /**
     * Check if PAI indicators meet minimum requirements
     */
    static validatePAIIndicators(indicators: PAIIndicator[]): boolean;
    /**
     * Check if taxonomy objectives are valid
     */
    static validateTaxonomyObjectives(objectives: TaxonomyEnvironmentalObjective[]): {
        isValid: boolean;
        message: string;
    };
    /**
     * Format validation issues for reporting
     */
    static formatValidationIssues(issues: ValidationIssue[]): string;
    /**
     * Get utility version
     */
    static getVersion(): string;
}
/**
 * Singleton instance of the SFDR Compliance Validator
 */
export declare const sfrValidator: SFDRComplianceValidator;
//# sourceMappingURL=validator.d.ts.map