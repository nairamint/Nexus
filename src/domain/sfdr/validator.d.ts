/**
 * SFDR Navigator Agent - Compliance Validator
 * Phase 1B: Regulatory Validation Logic
 *
 * Implements comprehensive SFDR regulatory validation based on:
 * - SFDR Regulation (EU) 2019/2088
 * - Commission Delegated Regulation (EU) 2022/1288
 * - ESMA Guidelines and Technical Standards
 */
import type { SFDRClassificationRequest, ValidationResult, ValidationRule, PAIIndicator, TaxonomyEnvironmentalObjective, SFDRArticleClassification } from './types';
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
     * Check if fund meets Article 9 requirements
     */
    private isArticle9Compliant;
    /**
     * Check if fund meets Article 8 requirements
     */
    private isArticle8Compliant;
    /**
     * Get validation rule by code
     */
    getValidationRule(code: string): ValidationRule | undefined;
    /**
     * Get all validation rules
     */
    getAllValidationRules(): ValidationRule[];
    /**
     * Get validator version
     */
    getVersion(): string;
}
/**
 * SFDR Compliance Validator Class End
 */
/**
 * Utility functions for regulatory compliance checks
 */
export declare class RegulatoryComplianceUtils {
    /**
     * Validate ISIN format
     */
    static validateISIN(isin: string): boolean;
    /**
     * Validate LEI format
     */
    static validateLEI(lei: string): boolean;
    /**
     * Check if PAI indicators are mandatory for fund type
     */
    static isPAIMandatory(fundType: string, aum?: number): boolean;
    /**
     * Get required PAI indicators for fund classification
     */
    static getRequiredPAIIndicators(classification: SFDRArticleClassification): PAIIndicator[];
    /**
     * Validate taxonomy environmental objectives combination
     */
    static validateTaxonomyObjectives(objectives: TaxonomyEnvironmentalObjective[]): boolean;
}
export declare const sfrValidator: SFDRComplianceValidator;
//# sourceMappingURL=validator.d.ts.map