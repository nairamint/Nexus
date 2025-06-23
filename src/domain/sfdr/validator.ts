/**
 * SFDR Navigator Agent - Compliance Validator
 * Phase 1B: Regulatory Validation Logic
 * 
 * Implements comprehensive SFDR regulatory validation based on:
 * - SFDR Regulation (EU) 2019/2088
 * - Commission Delegated Regulation (EU) 2022/1288
 * - ESMA Guidelines and Technical Standards
 */

import type {
  SFDRClassificationRequest,
  ValidationResult,
  ValidationIssue,
  ValidationRule,
  PAIIndicator,
  TaxonomyEnvironmentalObjective,
  SFDRArticleClassification
} from './types.js';

// ============================================================================
// REGULATORY VALIDATION RULES
// ============================================================================

/**
 * SFDR Compliance Validator
 * Implements regulatory validation logic with proper error handling
 */
export class SFDRComplianceValidator {
  private readonly validationRules: ValidationRule[];
  private readonly version: string = '1.0.0';

  constructor() {
    this.validationRules = this.initializeValidationRules();
  }

  /**
   * Validate complete SFDR classification request
   */
  public async validateRequest(request: SFDRClassificationRequest): Promise<ValidationResult> {
    const issues: ValidationIssue[] = [];
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
    } catch (error) {
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
  public validateArticleClassification(
    request: SFDRClassificationRequest
  ): { isValid: boolean; recommendedClassification: SFDRArticleClassification; reasoning: string[] } {
    const reasoning: string[] = [];
    let recommendedClassification: SFDRArticleClassification = 'Article6';

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

  private initializeValidationRules(): ValidationRule[] {
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
            if (!request.marketingMaterials?.promotesESGCharacteristics) {
              return [{
                code: 'ARTICLE8_ESG_CHARACTERISTICS_REQUIRED',
                message: 'Article 8 funds must explicitly promote E/S characteristics in marketing materials',
                severity: 'ERROR',
                field: 'marketingMaterials.promotesESGCharacteristics',
                regulatoryReference: 'SFDR Art. 8 - ESG Characteristics Promotion',
                suggestedAction: 'Ensure marketing materials clearly promote E/S characteristics'
              }];
            }
          }
          return [];
        }
      },

      // PAI consideration validation
      {
        code: 'PAI_INDICATORS_REQUIRED',
        description: 'PAI indicators must be considered and reported',
        regulatoryReference: 'SFDR Art. 4 - Principal Adverse Impacts',
        severity: 'ERROR',
        validate: (request) => {
          if (request.esgIntegration.considersPAI) {
            if (!request.esgIntegration.paiIndicators || 
                request.esgIntegration.paiIndicators.length < 3) {
              return [{
                code: 'PAI_INDICATORS_REQUIRED',
                message: 'At least 3 PAI indicators must be considered when PAI consideration is enabled',
                severity: 'ERROR',
                field: 'esgIntegration.paiIndicators',
                regulatoryReference: 'SFDR Art. 4 - Principal Adverse Impacts',
                suggestedAction: 'Select at least 3 PAI indicators to monitor and report'
              }];
            }
          }
          return [];
        }
      },

      // Taxonomy alignment validation
      {
        code: 'TAXONOMY_ALIGNMENT_REQUIRED',
        description: 'Taxonomy alignment information required for Article 8/9 funds',
        regulatoryReference: 'Taxonomy Regulation (EU) 2020/852',
        severity: 'WARNING',
        validate: (request) => {
          if (['Article8', 'Article9'].includes(request.fundProfile.targetArticleClassification)) {
            if (!request.taxonomyAlignment) {
              return [{
                code: 'TAXONOMY_ALIGNMENT_REQUIRED',
                message: 'Taxonomy alignment information is recommended for Article 8/9 funds',
                severity: 'WARNING',
                field: 'taxonomyAlignment',
                regulatoryReference: 'Taxonomy Regulation (EU) 2020/852',
                suggestedAction: 'Provide taxonomy alignment information'
              }];
            }
          }
          return [];
        }
      },

      // Sustainable investment criteria validation for Article 9
      {
        code: 'SUSTAINABLE_INVESTMENT_CRITERIA_REQUIRED',
        description: 'Sustainable investment criteria required for Article 9 funds',
        regulatoryReference: 'SFDR Art. 9 - Sustainable Investment Objective',
        severity: 'ERROR',
        validate: (request) => {
          if (request.fundProfile.targetArticleClassification === 'Article9') {
            if (!request.sustainableInvestment) {
              return [{
                code: 'SUSTAINABLE_INVESTMENT_CRITERIA_REQUIRED',
                message: 'Article 9 funds must define sustainable investment criteria',
                severity: 'ERROR',
                field: 'sustainableInvestment',
                regulatoryReference: 'SFDR Art. 9 - Sustainable Investment Objective',
                suggestedAction: 'Define sustainable investment criteria including measurement methodology'
              }];
            }
          }
          return [];
        }
      },

      // Sustainability risk integration validation
      {
        code: 'SUSTAINABILITY_RISK_INTEGRATION_REQUIRED',
        description: 'Sustainability risk integration approach required',
        regulatoryReference: 'SFDR Art. 3 - Sustainability Risk Integration',
        severity: 'ERROR',
        validate: (request) => {
          const { identificationProcess, assessmentMethodology, integrationInDecisionMaking } = 
            request.sustainabilityRiskIntegration;
            
          if (!identificationProcess || identificationProcess.length < 10 ||
              !assessmentMethodology || assessmentMethodology.length < 10 ||
              !integrationInDecisionMaking || integrationInDecisionMaking.length < 10) {
            return [{
              code: 'SUSTAINABILITY_RISK_INTEGRATION_REQUIRED',
              message: 'Comprehensive sustainability risk integration approach required',
              severity: 'ERROR',
              field: 'sustainabilityRiskIntegration',
              regulatoryReference: 'SFDR Art. 3 - Sustainability Risk Integration',
              suggestedAction: 'Provide detailed information on sustainability risk integration'
            }];
          }
          return [];
        }
      },

      // Due diligence policies validation
      {
        code: 'DUE_DILIGENCE_POLICIES_REQUIRED',
        description: 'Due diligence policies required for ESG integration',
        regulatoryReference: 'SFDR Art. 4 - Due Diligence Policies',
        severity: 'ERROR',
        validate: (request) => {
          const { esgIntegration, sustainabilityRisks, adverseImpacts } = 
            request.esgIntegration.dueDiligencePolicies;
            
          if (!esgIntegration || !sustainabilityRisks || !adverseImpacts) {
            return [{
              code: 'DUE_DILIGENCE_POLICIES_REQUIRED',
              message: 'All due diligence policies must be implemented',
              severity: 'ERROR',
              field: 'esgIntegration.dueDiligencePolicies',
              regulatoryReference: 'SFDR Art. 4 - Due Diligence Policies',
              suggestedAction: 'Implement all required due diligence policies'
            }];
          }
          return [];
        }
      },

      // Engagement policies validation
      {
        code: 'ENGAGEMENT_POLICIES_RECOMMENDED',
        description: 'Engagement policies recommended for Article 8/9 funds',
        regulatoryReference: 'SFDR Art. 8/9 - Good Governance',
        severity: 'WARNING',
        validate: (request) => {
          if (['Article8', 'Article9'].includes(request.fundProfile.targetArticleClassification)) {
            const { shareholderEngagement, votingPolicy } = 
              request.esgIntegration.engagementPolicies;
              
            if (!shareholderEngagement || !votingPolicy) {
              return [{
                code: 'ENGAGEMENT_POLICIES_RECOMMENDED',
                message: 'Shareholder engagement and voting policies recommended for Article 8/9 funds',
                severity: 'WARNING',
                field: 'esgIntegration.engagementPolicies',
                regulatoryReference: 'SFDR Art. 8/9 - Good Governance',
                suggestedAction: 'Implement shareholder engagement and voting policies'
              }];
            }
          }
          return [];
        }
      }
    ];
  }

  /**
   * Check if request meets Article 9 compliance criteria
   */
  private isArticle9Compliant(request: SFDRClassificationRequest): boolean {
    // Must have sustainable investment objective
    if (!request.fundProfile.sustainabilityObjective || 
        request.fundProfile.sustainabilityObjective.length < 10) {
      return false;
    }

    // Must have sustainable investment criteria
    if (!request.sustainableInvestment) {
      return false;
    }

    // Must have minimum 80% sustainable investment allocation
    if (request.sustainableInvestment.sustainableInvestmentMinimum < 80) {
      return false;
    }

    // Must have sustainability indicators and measurement methodology
    if (!request.sustainableInvestment.sustainabilityIndicators || 
        request.sustainableInvestment.sustainabilityIndicators.length === 0 ||
        !request.sustainableInvestment.measurementMethodology ||
        request.sustainableInvestment.measurementMethodology.length < 10) {
      return false;
    }

    // Must consider PAI
    if (!request.esgIntegration.considersPAI) {
      return false;
    }

    return true;
  }

  /**
   * Check if request meets Article 8 compliance criteria
   */
  private isArticle8Compliant(request: SFDRClassificationRequest): boolean {
    // Must promote E/S characteristics
    if (!request.marketingMaterials?.promotesESGCharacteristics) {
      return false;
    }

    // Must have ESG integration policies
    if (!request.esgIntegration.dueDiligencePolicies.esgIntegration) {
      return false;
    }

    // Must have sustainability risk integration
    const { identificationProcess, assessmentMethodology } = request.sustainabilityRiskIntegration;
    if (!identificationProcess || identificationProcess.length < 10 ||
        !assessmentMethodology || assessmentMethodology.length < 10) {
      return false;
    }

    return true;
  }

  /**
   * Get validator version
   */
  public getVersion(): string {
    return this.version;
  }
}

// ============================================================================
// REGULATORY COMPLIANCE UTILITIES
// ============================================================================

/**
 * Regulatory Compliance Utilities
 * Helper functions for SFDR compliance validation
 */
export class RegulatoryComplianceUtils {
  /**
   * Check if PAI indicators meet minimum requirements
   */
  public static validatePAIIndicators(indicators: PAIIndicator[]): boolean {
    // Minimum required indicators from Table 1
    const requiredIndicators: PAIIndicator[] = [
      'GHG_EMISSIONS',
      'CARBON_FOOTPRINT',
      'GHG_INTENSITY'
    ];

    // Check if all required indicators are included
    return requiredIndicators.every(required => 
      indicators.includes(required)
    );
  }

  /**
   * Check if taxonomy objectives are valid
   */
  public static validateTaxonomyObjectives(
    objectives: TaxonomyEnvironmentalObjective[]
  ): { isValid: boolean; message: string } {
    // All possible objectives
    const allObjectives: TaxonomyEnvironmentalObjective[] = [
      'CLIMATE_CHANGE_MITIGATION',
      'CLIMATE_CHANGE_ADAPTATION',
      'WATER_MARINE_RESOURCES',
      'CIRCULAR_ECONOMY',
      'POLLUTION_PREVENTION',
      'BIODIVERSITY_ECOSYSTEMS'
    ];

    // Check if all specified objectives are valid
    const invalidObjectives = objectives.filter(
      obj => !allObjectives.includes(obj)
    );

    if (invalidObjectives.length > 0) {
      return {
        isValid: false,
        message: `Invalid taxonomy objectives: ${invalidObjectives.join(', ')}`
      };
    }

    return {
      isValid: true,
      message: 'All taxonomy objectives are valid'
    };
  }

  /**
   * Format validation issues for reporting
   */
  public static formatValidationIssues(issues: ValidationIssue[]): string {
    if (issues.length === 0) {
      return 'No validation issues found.';
    }

    const errorCount = issues.filter(i => i.severity === 'ERROR').length;
    const warningCount = issues.filter(i => i.severity === 'WARNING').length;
    const infoCount = issues.filter(i => i.severity === 'INFO').length;

    let report = `Validation Report: ${errorCount} errors, ${warningCount} warnings, ${infoCount} info\n\n`;

    // Group by severity
    const groupedIssues = {
      ERROR: issues.filter(i => i.severity === 'ERROR'),
      WARNING: issues.filter(i => i.severity === 'WARNING'),
      INFO: issues.filter(i => i.severity === 'INFO')
    };

    // Format errors
    if (groupedIssues.ERROR.length > 0) {
      report += 'ERRORS:\n';
      groupedIssues.ERROR.forEach(issue => {
        report += `- [${issue.code}] ${issue.message}\n`;
        if (issue.field) report += `  Field: ${issue.field}\n`;
        report += `  Ref: ${issue.regulatoryReference}\n`;
        if (issue.suggestedAction) report += `  Action: ${issue.suggestedAction}\n`;
        report += '\n';
      });
    }

    // Format warnings
    if (groupedIssues.WARNING.length > 0) {
      report += 'WARNINGS:\n';
      groupedIssues.WARNING.forEach(issue => {
        report += `- [${issue.code}] ${issue.message}\n`;
        if (issue.field) report += `  Field: ${issue.field}\n`;
        report += `  Ref: ${issue.regulatoryReference}\n`;
        if (issue.suggestedAction) report += `  Action: ${issue.suggestedAction}\n`;
        report += '\n';
      });
    }

    // Format info
    if (groupedIssues.INFO.length > 0) {
      report += 'INFO:\n';
      groupedIssues.INFO.forEach(issue => {
        report += `- [${issue.code}] ${issue.message}\n`;
        if (issue.field) report += `  Field: ${issue.field}\n`;
        report += '\n';
      });
    }

    return report;
  }

  /**
   * Get utility version
   */
  public static getVersion(): string {
    return '1.0.0';
  }
}

// ============================================================================
// SINGLETON INSTANCE
// ============================================================================

/**
 * Singleton instance of the SFDR Compliance Validator
 */
export const sfrValidator = new SFDRComplianceValidator();