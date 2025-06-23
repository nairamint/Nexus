"use strict";
/**
 * SFDR Navigator Agent - Compliance Validator
 * Phase 1B: Regulatory Validation Logic
 *
 * Implements comprehensive SFDR regulatory validation based on:
 * - SFDR Regulation (EU) 2019/2088
 * - Commission Delegated Regulation (EU) 2022/1288
 * - ESMA Guidelines and Technical Standards
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.sfrValidator = exports.RegulatoryComplianceUtils = exports.SFDRComplianceValidator = void 0;
// ============================================================================
// REGULATORY VALIDATION RULES
// ============================================================================
/**
 * SFDR Compliance Validator
 * Implements regulatory validation logic with proper error handling
 */
class SFDRComplianceValidator {
    validationRules;
    version = '1.0.0';
    constructor() {
        this.validationRules = this.initializeValidationRules();
    }
    /**
     * Validate complete SFDR classification request
     */
    async validateRequest(request) {
        const issues = [];
        const validatedAt = new Date().toISOString();
        try {
            // Run all validation rules
            for (const rule of this.validationRules) {
                const ruleIssues = rule.validate(request);
                issues.push(...ruleIssues);
            }
            // Determine overall validation status
            const hasErrors = issues.some(issue => issue.severity === 'ERROR');
            const isValid = !hasErrors;
            return {
                isValid,
                issues,
                validatedAt,
                validatorVersion: this.version
            };
        }
        catch (error) {
            // Handle unexpected validation errors
            issues.push({
                code: 'VALIDATION_SYSTEM_ERROR',
                message: `Validation system error: ${error instanceof Error ? error.message : 'Unknown error'}`,
                severity: 'ERROR',
                regulatoryReference: 'SFDR Art. 4 - Due Diligence',
                suggestedAction: 'Contact system administrator'
            });
            return {
                isValid: false,
                issues,
                validatedAt,
                validatorVersion: this.version
            };
        }
    }
    /**
     * Validate specific article classification logic
     */
    validateArticleClassification(request) {
        const reasoning = [];
        let recommendedClassification = 'Article6';
        // Article 9 validation logic
        if (this.isArticle9Compliant(request)) {
            recommendedClassification = 'Article9';
            reasoning.push('Fund has sustainable investment objective with minimum 80% allocation');
            reasoning.push('Comprehensive sustainability measurement methodology defined');
        }
        // Article 8 validation logic
        else if (this.isArticle8Compliant(request)) {
            recommendedClassification = 'Article8';
            reasoning.push('Fund promotes environmental or social characteristics');
            reasoning.push('PAI consideration and ESG integration policies in place');
        }
        // Default to Article 6
        else {
            recommendedClassification = 'Article6';
            reasoning.push('Fund does not meet Article 8 or 9 requirements');
            reasoning.push('No sustainability claims or insufficient ESG integration');
        }
        const isValid = recommendedClassification === request.fundProfile.targetArticleClassification;
        if (!isValid) {
            reasoning.push(`Target classification (${request.fundProfile.targetArticleClassification}) does not match recommended (${recommendedClassification})`);
        }
        return {
            isValid,
            recommendedClassification,
            reasoning
        };
    }
    // ============================================================================
    // PRIVATE VALIDATION METHODS
    // ============================================================================
    initializeValidationRules() {
        return [
            // Metadata validation rules
            {
                code: 'METADATA_ENTITY_ID_REQUIRED',
                description: 'Entity ID must be a valid UUID',
                regulatoryReference: 'SFDR Art. 4 - Transparency Requirements',
                severity: 'ERROR',
                validate: (request) => {
                    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
                    if (!uuidRegex.test(request.metadata.entityId)) {
                        return [{
                                code: 'METADATA_ENTITY_ID_REQUIRED',
                                message: 'Entity ID must be a valid UUID format',
                                severity: 'ERROR',
                                field: 'metadata.entityId',
                                regulatoryReference: 'SFDR Art. 4 - Transparency Requirements',
                                suggestedAction: 'Provide a valid UUID for entity identification'
                            }];
                    }
                    return [];
                }
            },
            // Article 9 specific validation
            {
                code: 'ARTICLE9_SUSTAINABILITY_OBJECTIVE_REQUIRED',
                description: 'Article 9 funds must have a clear sustainability objective',
                regulatoryReference: 'SFDR Art. 9 - Sustainable Investment Objective',
                severity: 'ERROR',
                validate: (request) => {
                    if (request.fundProfile.targetArticleClassification === 'Article9') {
                        if (!request.fundProfile.sustainabilityObjective ||
                            request.fundProfile.sustainabilityObjective.length < 10) {
                            return [{
                                    code: 'ARTICLE9_SUSTAINABILITY_OBJECTIVE_REQUIRED',
                                    message: 'Article 9 funds must define a specific sustainability objective (minimum 10 characters)',
                                    severity: 'ERROR',
                                    field: 'fundProfile.sustainabilityObjective',
                                    regulatoryReference: 'SFDR Art. 9 - Sustainable Investment Objective',
                                    suggestedAction: 'Define a clear and specific sustainability objective'
                                }];
                        }
                    }
                    return [];
                }
            },
            {
                code: 'ARTICLE9_SUSTAINABLE_INVESTMENT_MINIMUM',
                description: 'Article 9 funds must have minimum 80% sustainable investment allocation',
                regulatoryReference: 'SFDR Art. 9 + Delegated Regulation (EU) 2022/1288',
                severity: 'ERROR',
                validate: (request) => {
                    if (request.fundProfile.targetArticleClassification === 'Article9') {
                        if (!request.sustainableInvestment ||
                            request.sustainableInvestment.sustainableInvestmentMinimum < 80) {
                            return [{
                                    code: 'ARTICLE9_SUSTAINABLE_INVESTMENT_MINIMUM',
                                    message: 'Article 9 funds must allocate minimum 80% to sustainable investments',
                                    severity: 'ERROR',
                                    field: 'sustainableInvestment.sustainableInvestmentMinimum',
                                    regulatoryReference: 'SFDR Art. 9 + Delegated Regulation (EU) 2022/1288',
                                    suggestedAction: 'Increase sustainable investment allocation to at least 80%'
                                }];
                        }
                    }
                    return [];
                }
            },
            // Article 8 specific validation
            {
                code: 'ARTICLE8_ESG_CHARACTERISTICS_REQUIRED',
                description: 'Article 8 funds must promote environmental or social characteristics',
                regulatoryReference: 'SFDR Art. 8 - ESG Characteristics Promotion',
                severity: 'ERROR',
                validate: (request) => {
                    if (request.fundProfile.targetArticleClassification === 'Article8') {
                        const hasESGIntegration = request.esgIntegration.dueDiligencePolicies.esgIntegration;
                        const considersPAI = request.esgIntegration.considersPAI;
                        if (!hasESGIntegration || !considersPAI) {
                            return [{
                                    code: 'ARTICLE8_ESG_CHARACTERISTICS_REQUIRED',
                                    message: 'Article 8 funds must have ESG integration and PAI consideration',
                                    severity: 'ERROR',
                                    field: 'esgIntegration',
                                    regulatoryReference: 'SFDR Art. 8 - ESG Characteristics Promotion',
                                    suggestedAction: 'Enable ESG integration and PAI consideration in due diligence'
                                }];
                        }
                    }
                    return [];
                }
            },
            // PAI validation rules
            {
                code: 'PAI_INDICATORS_CONSISTENCY',
                description: 'PAI consideration must be consistent with indicators selection',
                regulatoryReference: 'SFDR Art. 4(1)(a) + Delegated Regulation Annex I',
                severity: 'WARNING',
                validate: (request) => {
                    if (request.esgIntegration.considersPAI && request.esgIntegration.paiIndicators.length === 0) {
                        return [{
                                code: 'PAI_INDICATORS_CONSISTENCY',
                                message: 'If PAI are considered, at least one PAI indicator must be selected',
                                severity: 'WARNING',
                                field: 'esgIntegration.paiIndicators',
                                regulatoryReference: 'SFDR Art. 4(1)(a) + Delegated Regulation Annex I',
                                suggestedAction: 'Select relevant PAI indicators or set considersPAI to false'
                            }];
                    }
                    return [];
                }
            },
            // Taxonomy alignment validation
            {
                code: 'TAXONOMY_ALIGNMENT_METHODOLOGY',
                description: 'Taxonomy alignment calculation methodology must be specified',
                regulatoryReference: 'Taxonomy Regulation (EU) 2020/852 + SFDR Integration',
                severity: 'ERROR',
                validate: (request) => {
                    if (request.taxonomyAlignment &&
                        (!request.taxonomyAlignment.alignmentCalculationMethod ||
                            request.taxonomyAlignment.alignmentCalculationMethod.length < 10)) {
                        return [{
                                code: 'TAXONOMY_ALIGNMENT_METHODOLOGY',
                                message: 'Taxonomy alignment calculation methodology must be clearly specified',
                                severity: 'ERROR',
                                field: 'taxonomyAlignment.alignmentCalculationMethod',
                                regulatoryReference: 'Taxonomy Regulation (EU) 2020/852 + SFDR Integration',
                                suggestedAction: 'Provide detailed methodology for calculating taxonomy alignment'
                            }];
                    }
                    return [];
                }
            },
            // Sustainability risk integration
            {
                code: 'SUSTAINABILITY_RISK_INTEGRATION_REQUIRED',
                description: 'All funds must integrate sustainability risks in investment decisions',
                regulatoryReference: 'SFDR Art. 3 - Sustainability Risk Integration',
                severity: 'ERROR',
                validate: (request) => {
                    const riskIntegration = request.sustainabilityRiskIntegration;
                    if (!riskIntegration.identificationProcess ||
                        !riskIntegration.assessmentMethodology ||
                        !riskIntegration.integrationInDecisionMaking) {
                        return [{
                                code: 'SUSTAINABILITY_RISK_INTEGRATION_REQUIRED',
                                message: 'Complete sustainability risk integration process must be defined',
                                severity: 'ERROR',
                                field: 'sustainabilityRiskIntegration',
                                regulatoryReference: 'SFDR Art. 3 - Sustainability Risk Integration',
                                suggestedAction: 'Define comprehensive sustainability risk identification, assessment, and integration processes'
                            }];
                    }
                    return [];
                }
            },
            // Data quality validation
            {
                code: 'FUND_NAME_LENGTH_VALIDATION',
                description: 'Fund name must be between 1 and 200 characters',
                regulatoryReference: 'SFDR Art. 4 - Transparency Requirements',
                severity: 'ERROR',
                validate: (request) => {
                    const fundName = request.fundProfile.fundName;
                    if (!fundName || fundName.length === 0 || fundName.length > 200) {
                        return [{
                                code: 'FUND_NAME_LENGTH_VALIDATION',
                                message: 'Fund name must be between 1 and 200 characters',
                                severity: 'ERROR',
                                field: 'fundProfile.fundName',
                                regulatoryReference: 'SFDR Art. 4 - Transparency Requirements',
                                suggestedAction: 'Provide a valid fund name within character limits'
                            }];
                    }
                    return [];
                }
            }
        ];
    }
    /**
     * Check if fund meets Article 9 requirements
     */
    isArticle9Compliant(request) {
        // Must have sustainability objective
        if (!request.fundProfile.sustainabilityObjective ||
            request.fundProfile.sustainabilityObjective.length < 10) {
            return false;
        }
        // Must have sustainable investment criteria with minimum 80% allocation
        if (!request.sustainableInvestment ||
            request.sustainableInvestment.sustainableInvestmentMinimum < 80) {
            return false;
        }
        // Must have comprehensive measurement methodology
        if (!request.sustainableInvestment.measurementMethodology ||
            request.sustainableInvestment.measurementMethodology.length < 20) {
            return false;
        }
        // Must consider PAI
        if (!request.esgIntegration.considersPAI) {
            return false;
        }
        return true;
    }
    /**
     * Check if fund meets Article 8 requirements
     */
    isArticle8Compliant(request) {
        // Must have ESG integration in due diligence
        if (!request.esgIntegration.dueDiligencePolicies.esgIntegration) {
            return false;
        }
        // Must consider sustainability risks
        if (!request.esgIntegration.dueDiligencePolicies.sustainabilityRisks) {
            return false;
        }
        // Must have sustainability risk integration process
        const riskIntegration = request.sustainabilityRiskIntegration;
        if (!riskIntegration.identificationProcess ||
            !riskIntegration.assessmentMethodology ||
            !riskIntegration.integrationInDecisionMaking) {
            return false;
        }
        // Should consider PAI (not mandatory but recommended)
        if (request.esgIntegration.considersPAI && request.esgIntegration.paiIndicators.length === 0) {
            return false;
        }
        return true;
    }
    /**
     * Get validation rule by code
     */
    getValidationRule(code) {
        return this.validationRules.find(rule => rule.code === code);
    }
    /**
     * Get all validation rules
     */
    getAllValidationRules() {
        return [...this.validationRules];
    }
    /**
     * Get validator version
     */
    getVersion() {
        return '1.0.0';
    }
}
exports.SFDRComplianceValidator = SFDRComplianceValidator;
/**
 * SFDR Compliance Validator Class End
 */
// ============================================================================
// REGULATORY COMPLIANCE UTILITIES
// ============================================================================
/**
 * Utility functions for regulatory compliance checks
 */
class RegulatoryComplianceUtils {
    /**
     * Validate ISIN format
     */
    static validateISIN(isin) {
        const isinRegex = /^[A-Z]{2}[A-Z0-9]{9}[0-9]$/;
        return isinRegex.test(isin);
    }
    /**
     * Validate LEI format
     */
    static validateLEI(lei) {
        const leiRegex = /^[A-Z0-9]{18}[0-9]{2}$/;
        return leiRegex.test(lei);
    }
    /**
     * Check if PAI indicators are mandatory for fund type
     */
    static isPAIMandatory(fundType, aum) {
        // Large funds (>€500M AUM) must consider PAI
        if (aum && aum > 500000000) {
            return true;
        }
        // Certain fund types have different thresholds
        switch (fundType) {
            case 'UCITS':
                return aum ? aum > 500000000 : false;
            case 'AIF':
                return aum ? aum > 500000000 : false;
            default:
                return false;
        }
    }
    /**
     * Get required PAI indicators for fund classification
     */
    static getRequiredPAIIndicators(classification) {
        const basePAI = [
            'GHG_EMISSIONS',
            'CARBON_FOOTPRINT',
            'GHG_INTENSITY'
        ];
        switch (classification) {
            case 'Article9':
                return [
                    ...basePAI,
                    'FOSSIL_FUEL_EXPOSURE',
                    'BIODIVERSITY_IMPACT',
                    'WATER_EMISSIONS'
                ];
            case 'Article8':
                return basePAI;
            default:
                return [];
        }
    }
    /**
     * Validate taxonomy environmental objectives combination
     */
    static validateTaxonomyObjectives(objectives) {
        // At least one objective must be selected
        if (objectives.length === 0) {
            return false;
        }
        // Check for conflicting objectives (example business logic)
        const hasClimateObjectives = objectives.some(obj => obj === 'CLIMATE_CHANGE_MITIGATION' || obj === 'CLIMATE_CHANGE_ADAPTATION');
        const hasPollutionPrevention = objectives.includes('POLLUTION_PREVENTION');
        // Example: If focusing on pollution prevention, should also consider climate
        if (hasPollutionPrevention && !hasClimateObjectives) {
            // This is a warning, not an error - return true but could flag as warning
            return true;
        }
        return true;
    }
}
exports.RegulatoryComplianceUtils = RegulatoryComplianceUtils;
// Export singleton instance
exports.sfrValidator = new SFDRComplianceValidator();
//# sourceMappingURL=validator.js.map