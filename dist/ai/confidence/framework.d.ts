/**
 * SFDR Navigator Agent - Confidence Framework
 * Phase 1B: Confidence-Driven Classification
 *
 * Implements a confidence-driven classification framework for SFDR regulatory compliance
 * with explainability, risk assessment, and human review triggers.
 */
import type { ConfidenceDrivenClassification } from '../agents/types.js';
import type { SFDRClassificationRequest, ValidationResult } from '../../domain/sfdr/types.js';
/**
 * Confidence-Driven Classification Framework
 * Implements a comprehensive confidence assessment for SFDR classifications
 */
export declare class ConfidenceFramework {
    private readonly version;
    /**
     * Generate a confidence-driven classification with explainability
     */
    generateClassification(request: SFDRClassificationRequest, validationResult: ValidationResult): ConfidenceDrivenClassification;
    /**
     * Determine the primary SFDR classification based on request data
     */
    private determinePrimaryClassification;
    /**
     * Check if request meets Article 9 criteria
     */
    private meetsArticle9Criteria;
    /**
     * Check if request meets Article 8 criteria
     */
    private meetsArticle8Criteria;
    /**
     * Calculate confidence factors for the classification
     */
    private calculateConfidenceFactors;
    /**
     * Count missing or incomplete fields in the request
     */
    private countMissingFields;
    /**
     * Generate alternative classifications when confidence is not high
     */
    private generateAlternativeClassifications;
    /**
     * Generate explainability response for the classification
     */
    private generateExplainabilityResponse;
    /**
     * Generate summary explanation based on classification
     */
    private generateExplainabilitySummary;
    /**
     * Generate confidence statement based on confidence factors
     */
    private generateConfidenceStatement;
    /**
     * Assess regulatory risk based on classification and confidence
     */
    private assessRegulatoryRisk;
    /**
     * Generate risk assessment rationale
     */
    private generateRiskRationale;
    /**
     * Determine if human review is needed based on confidence and risk
     */
    private determineReviewTriggers;
    /**
     * Get framework version
     */
    getVersion(): string;
}
/**
 * Singleton instance of the Confidence Framework
 */
export declare const confidenceFramework: ConfidenceFramework;
//# sourceMappingURL=framework.d.ts.map