/**
 * SFDR Navigator Agent - Domain Types
 * Phase 1A: Regulatory Domain Modeling
 * 
 * Core SFDR regulatory domain types based on:
 * - SFDR Regulation (EU) 2019/2088
 * - Commission Delegated Regulation (EU) 2022/1288
 * - ESMA Guidelines and Q&A
 */

// ============================================================================
// CORE SFDR REGULATORY TYPES
// ============================================================================

/**
 * SFDR Article Classification
 * Based on SFDR Articles 6, 8, and 9
 */
export type SFDRArticleClassification = 
  | 'Article6'  // No sustainability claims
  | 'Article8'  // Environmental or social characteristics promotion
  | 'Article9'; // Sustainable investment objective

/**
 * EU Fund Types subject to SFDR
 * Based on regulatory scope definitions
 */
export type EUFundType = 
  | 'UCITS'    // Undertakings for Collective Investment in Transferable Securities
  | 'AIF'      // Alternative Investment Fund
  | 'ELTIF'    // European Long-term Investment Fund
  | 'EuVECA'   // European Venture Capital Fund
  | 'EuSEF';   // European Social Entrepreneurship Fund

/**
 * Principal Adverse Impact (PAI) Indicators
 * Based on Annex I of Delegated Regulation (EU) 2022/1288
 */
export type PAIIndicator = 
  | 'GHG_EMISSIONS'           // Table 1, Indicator 1
  | 'CARBON_FOOTPRINT'        // Table 1, Indicator 2
  | 'GHG_INTENSITY'           // Table 1, Indicator 3
  | 'FOSSIL_FUEL_EXPOSURE'    // Table 1, Indicator 4
  | 'NON_RENEWABLE_ENERGY'    // Table 1, Indicator 5
  | 'ENERGY_CONSUMPTION'      // Table 1, Indicator 6
  | 'WATER_EMISSIONS'         // Table 1, Indicator 7
  | 'HAZARDOUS_WASTE'         // Table 1, Indicator 8
  | 'WATER_USAGE'             // Table 1, Indicator 9
  | 'BIODIVERSITY_IMPACT'     // Table 1, Indicator 10
  | 'UNGA_GLOBAL_COMPACT'     // Table 1, Indicator 11
  | 'CONTROVERSIAL_WEAPONS'   // Table 1, Indicator 14
  | 'BOARD_GENDER_DIVERSITY'  // Table 1, Indicator 13
  | 'ANTI_CORRUPTION_POLICIES'; // Table 1, Indicator 15

/**
 * EU Taxonomy Environmental Objectives
 * Based on Taxonomy Regulation (EU) 2020/852
 */
export type TaxonomyEnvironmentalObjective = 
  | 'CLIMATE_CHANGE_MITIGATION'        // Article 9(a)
  | 'CLIMATE_CHANGE_ADAPTATION'        // Article 9(b)
  | 'WATER_MARINE_RESOURCES'           // Article 9(c)
  | 'CIRCULAR_ECONOMY'                 // Article 9(d)
  | 'POLLUTION_PREVENTION'             // Article 9(e)
  | 'BIODIVERSITY_ECOSYSTEMS';         // Article 9(f)

/**
 * Submission Types for SFDR Reporting
 */
export type SFDRSubmissionType = 
  | 'INITIAL'    // First-time submission
  | 'AMENDMENT'  // Correction to previous submission
  | 'PERIODIC';  // Regular periodic update

// ============================================================================
// DOMAIN ENTITIES
// ============================================================================

/**
 * Core metadata for SFDR submissions
 */
export interface SFDRMetadata {
  entityId: string;                    // UUID of the fund/entity
  reportingPeriod: string;             // ISO date format
  regulatoryVersion: string;           // e.g., "SFDR_v1.0", "SFDR_v1.1"
  submissionType: SFDRSubmissionType;
  submissionDate: string;              // ISO datetime
  preparerId: string;                  // Compliance officer ID
  reviewerId?: string;                 // Optional reviewer ID
}

/**
 * Fund profile with SFDR-specific characteristics
 */
export interface SFDRFundProfile {
  fundType: EUFundType;
  fundName: string;
  isin?: string;                       // International Securities Identification Number
  lei?: string;                        // Legal Entity Identifier
  investmentStrategy: string;
  targetArticleClassification: SFDRArticleClassification;
  sustainabilityObjective?: string;    // Required for Article 9
  investmentUniverse: string;
  geographicalFocus?: string[];
  sectorFocus?: string[];
  minimumInvestmentHorizon?: number;   // In months
}

/**
 * ESG Integration and Sustainability Approach
 */
export interface ESGIntegration {
  considersPAI: boolean;
  paiIndicators: PAIIndicator[];
  paiStatement?: string;               // How PAI are considered
  
  // Due diligence policies
  dueDiligencePolicies: {
    esgIntegration: boolean;
    sustainabilityRisks: boolean;
    adverseImpacts: boolean;
  };
  
  // Engagement policies
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
  minimumAlignmentPercentage: number;  // 0-100
  alignmentCalculationMethod: string;
  doNoSignificantHarmAssessment: boolean;
  minimumSafeguardsCompliance: boolean;
  
  // Detailed alignment breakdown
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
  sustainableInvestmentMinimum: number; // Percentage (0-100)
  sustainabilityIndicators: string[];
  measurementMethodology: string;
  dataSourcesAndProcessing: string;
  limitationsAndCaveats: string[];
}

// ============================================================================
// MAIN SFDR CLASSIFICATION REQUEST
// ============================================================================

/**
 * Complete SFDR Classification Request
 * This is the main input for the SFDR Navigator Agent
 */
export interface SFDRClassificationRequest {
  metadata: SFDRMetadata;
  fundProfile: SFDRFundProfile;
  esgIntegration: ESGIntegration;
  taxonomyAlignment?: TaxonomyAlignment;     // Optional, but recommended for Article 8/9
  sustainableInvestment?: SustainableInvestmentCriteria; // Required for Article 9
  
  // Additional context
  marketingMaterials?: {
    promotesESGCharacteristics: boolean;
    sustainabilityClaimsPresent: boolean;
    specificSustainabilityTerms: string[];
  };
  
  // Risk management
  sustainabilityRiskIntegration: {
    identificationProcess: string;
    assessmentMethodology: string;
    integrationInDecisionMaking: string;
  };
}

// ============================================================================
// VALIDATION AND COMPLIANCE TYPES
// ============================================================================

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
  regulatoryReference: string;         // Reference to specific SFDR article/regulation
  suggestedAction?: string;
}

/**
 * Complete validation result
 */
export interface ValidationResult {
  isValid: boolean;
  issues: ValidationIssue[];
  validatedAt: string;                 // ISO datetime
  validatorVersion: string;
}

/**
 * SFDR Classification Result
 */
export interface SFDRClassificationResult {
  recommendedClassification: SFDRArticleClassification;
  confidence: number;                  // 0-1 scale
  reasoning: string[];
  regulatoryBasis: string[];
  warnings: string[];
  requiredDisclosures: string[];
  
  // Compliance assessment
  complianceStatus: {
    overallCompliance: boolean;
    articleSpecificCompliance: boolean;
    taxonomyCompliance: boolean;
    paiCompliance: boolean;
  };
  
  // Next steps
  recommendedActions: {
    priority: 'HIGH' | 'MEDIUM' | 'LOW';
    action: string;
    deadline?: string;
  }[];
}

// ============================================================================
// REGULATORY CHANGE TRACKING
// ============================================================================

/**
 * Regulatory change impact assessment
 */
export interface RegulatoryChange {
  changeId: string;
  effectiveDate: string;
  regulatorySource: string;            // e.g., "ESMA", "European Commission"
  changeType: 'AMENDMENT' | 'CLARIFICATION' | 'NEW_REQUIREMENT';
  impactedArticles: string[];
  description: string;
  impactAssessment: {
    affectedFunds: string[];           // Fund types or specific criteria
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
