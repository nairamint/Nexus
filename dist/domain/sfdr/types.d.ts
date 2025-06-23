/**
 * SFDR Navigator Agent - Domain Types
 * Phase 1A: Regulatory Domain Modeling
 *
 * Core SFDR regulatory domain types based on:
 * - SFDR Regulation (EU) 2019/2088
 * - Commission Delegated Regulation (EU) 2022/1288
 * - ESMA Guidelines and Q&A
 */
/**
 * SFDR Article Classification
 * Based on SFDR Articles 6, 8, and 9
 */
export type SFDRArticleClassification = 'Article6' | 'Article8' | 'Article9';
/**
 * EU Fund Types subject to SFDR
 * Based on regulatory scope definitions
 */
export type EUFundType = 'UCITS' | 'AIF' | 'ELTIF' | 'EuVECA' | 'EuSEF';
/**
 * Principal Adverse Impact (PAI) Indicators
 * Based on Annex I of Delegated Regulation (EU) 2022/1288
 */
export type PAIIndicator = 'GHG_EMISSIONS' | 'CARBON_FOOTPRINT' | 'GHG_INTENSITY' | 'FOSSIL_FUEL_EXPOSURE' | 'NON_RENEWABLE_ENERGY' | 'ENERGY_CONSUMPTION' | 'WATER_EMISSIONS' | 'HAZARDOUS_WASTE' | 'WATER_USAGE' | 'BIODIVERSITY_IMPACT' | 'UNGA_GLOBAL_COMPACT' | 'CONTROVERSIAL_WEAPONS' | 'BOARD_GENDER_DIVERSITY' | 'ANTI_CORRUPTION_POLICIES';
/**
 * EU Taxonomy Environmental Objectives
 * Based on Taxonomy Regulation (EU) 2020/852
 */
export type TaxonomyEnvironmentalObjective = 'CLIMATE_CHANGE_MITIGATION' | 'CLIMATE_CHANGE_ADAPTATION' | 'WATER_MARINE_RESOURCES' | 'CIRCULAR_ECONOMY' | 'POLLUTION_PREVENTION' | 'BIODIVERSITY_ECOSYSTEMS';
/**
 * Submission Types for SFDR Reporting
 */
export type SFDRSubmissionType = 'INITIAL' | 'AMENDMENT' | 'PERIODIC';
/**
 * Core metadata for SFDR submissions
 */
export interface SFDRMetadata {
    entityId: string;
    reportingPeriod: string;
    regulatoryVersion: string;
    submissionType: SFDRSubmissionType;
    submissionDate: string;
    preparerId: string;
    reviewerId?: string;
}
/**
 * Fund profile with SFDR-specific characteristics
 */
export interface SFDRFundProfile {
    fundType: EUFundType;
    fundName: string;
    isin?: string;
    lei?: string;
    investmentStrategy: string;
    targetArticleClassification: SFDRArticleClassification;
    sustainabilityObjective?: string;
    investmentUniverse: string;
    geographicalFocus?: string[];
    sectorFocus?: string[];
    minimumInvestmentHorizon?: number;
}
/**
 * ESG Integration and Sustainability Approach
 */
export interface ESGIntegration {
    considersPAI: boolean;
    paiIndicators: PAIIndicator[];
    paiStatement?: string;
    dueDiligencePolicies: {
        esgIntegration: boolean;
        sustainabilityRisks: boolean;
        adverseImpacts: boolean;
    };
    engagementPolicies: {
        shareholderEngagement: boolean;
        votingPolicy: boolean;
        escalationProcedures: boolean;
    };
}
/**
 * EU Taxonomy Alignment Information
 */
export interface TaxonomyAlignment {
    environmentalObjectives: TaxonomyEnvironmentalObjective[];
    minimumAlignmentPercentage: number;
    alignmentCalculationMethod: string;
    doNoSignificantHarmAssessment: boolean;
    minimumSafeguardsCompliance: boolean;
    alignmentBreakdown?: {
        objective: TaxonomyEnvironmentalObjective;
        alignmentPercentage: number;
        contributionDescription: string;
    }[];
}
/**
 * Sustainable Investment Criteria (Article 9 specific)
 */
export interface SustainableInvestmentCriteria {
    sustainableInvestmentMinimum: number;
    sustainabilityIndicators: string[];
    measurementMethodology: string;
    dataSourcesAndProcessing: string;
    limitationsAndCaveats: string[];
}
/**
 * Complete SFDR Classification Request
 * This is the main input for the SFDR Navigator Agent
 */
export interface SFDRClassificationRequest {
    metadata: SFDRMetadata;
    fundProfile: SFDRFundProfile;
    esgIntegration: ESGIntegration;
    taxonomyAlignment?: TaxonomyAlignment;
    sustainableInvestment?: SustainableInvestmentCriteria;
    marketingMaterials?: {
        promotesESGCharacteristics: boolean;
        sustainabilityClaimsPresent: boolean;
        specificSustainabilityTerms: string[];
    };
    sustainabilityRiskIntegration: {
        identificationProcess: string;
        assessmentMethodology: string;
        integrationInDecisionMaking: string;
    };
}
/**
 * Validation severity levels
 */
export type ValidationSeverity = 'ERROR' | 'WARNING' | 'INFO';
/**
 * Individual validation result
 */
export interface ValidationIssue {
    code: string;
    message: string;
    severity: ValidationSeverity;
    field?: string;
    regulatoryReference: string;
    suggestedAction?: string;
}
/**
 * Complete validation result
 */
export interface ValidationResult {
    isValid: boolean;
    issues: ValidationIssue[];
    validatedAt: string;
    validatorVersion: string;
}
/**
 * SFDR Classification Result
 */
export interface SFDRClassificationResult {
    recommendedClassification: SFDRArticleClassification;
    confidence: number;
    reasoning: string[];
    regulatoryBasis: string[];
    warnings: string[];
    requiredDisclosures: string[];
    complianceStatus: {
        overallCompliance: boolean;
        articleSpecificCompliance: boolean;
        taxonomyCompliance: boolean;
        paiCompliance: boolean;
    };
    recommendedActions: {
        priority: 'HIGH' | 'MEDIUM' | 'LOW';
        action: string;
        deadline?: string;
    }[];
}
/**
 * Regulatory change impact assessment
 */
export interface RegulatoryChange {
    changeId: string;
    effectiveDate: string;
    regulatorySource: string;
    changeType: 'AMENDMENT' | 'CLARIFICATION' | 'NEW_REQUIREMENT';
    impactedArticles: string[];
    description: string;
    impactAssessment: {
        affectedFunds: string[];
        requiredActions: string[];
        implementationDeadline: string;
    };
}
/**
 * Version control for regulatory compliance
 */
export interface RegulatoryVersion {
    version: string;
    effectiveDate: string;
    changes: RegulatoryChange[];
}
/**
 * Validation Rule Interface
 */
export interface ValidationRule {
    code: string;
    description: string;
    regulatoryReference: string;
    severity: ValidationSeverity;
    validate: (request: SFDRClassificationRequest) => ValidationIssue[];
}
//# sourceMappingURL=types.d.ts.map