/**
 * SFDR Navigator Agent - Regulatory Validation Tests
 * Phase 1C: Comprehensive Test Suite
 * 
 * Tests regulatory compliance validation logic against SFDR requirements
 */

import { describe, it, expect, beforeEach } from 'vitest';
import {
  SFDRComplianceValidator,
  RegulatoryComplianceUtils
} from '../../src/domain/sfdr/validator';
import type {
  SFDRClassificationRequest,
  SFDRArticleClassification,
  ValidationSeverity
} from '../../src/domain/sfdr/types';

describe('SFDR Compliance Validator', () => {
  let validator: SFDRComplianceValidator;

  beforeEach(() => {
    validator = new SFDRComplianceValidator();
  });

  describe('Article 6 Classification', () => {
    it('should validate basic Article 6 fund with minimal ESG integration', async () => {
      const request: SFDRClassificationRequest = {
        metadata: {
          entityId: '123e4567-e89b-12d3-a456-426614174000',
          reportingPeriod: '2024-12-31',
          regulatoryVersion: 'SFDR_v1.0',
          submissionType: 'INITIAL',
          submissionDate: '2024-01-15T10:00:00Z',
          preparerId: 'compliance-officer-001'
        },
        fundProfile: {
          fundType: 'UCITS',
          fundName: 'European Equity Fund',
          investmentStrategy: 'Diversified European equity investment strategy focusing on large-cap companies',
          targetArticleClassification: 'Article6',
          investmentUniverse: 'European listed equities'
        },
        esgIntegration: {
          considersPAI: false,
          paiIndicators: [],
          dueDiligencePolicies: {
            esgIntegration: false,
            sustainabilityRisks: true,
            adverseImpacts: false
          },
          engagementPolicies: {
            shareholderEngagement: false,
            votingPolicy: false,
            escalationProcedures: false
          }
        },
        sustainabilityRiskIntegration: {
          identificationProcess: 'Basic sustainability risk screening using third-party ESG ratings',
          assessmentMethodology: 'Quantitative ESG score integration in risk assessment models',
          integrationInDecisionMaking: 'ESG risks considered alongside traditional financial risks'
        }
      };

      const result = await validator.validateRequest(request);
      expect(result.isValid).toBe(true);
      expect(result.issues.filter(i => i.severity === 'ERROR')).toHaveLength(0);
    });

    it('should recommend Article 6 for funds without ESG characteristics', () => {
      const request: SFDRClassificationRequest = {
        metadata: {
          entityId: '123e4567-e89b-12d3-a456-426614174000',
          reportingPeriod: '2024-12-31',
          regulatoryVersion: 'SFDR_v1.0',
          submissionType: 'INITIAL',
          submissionDate: '2024-01-15T10:00:00Z',
          preparerId: 'compliance-officer-001'
        },
        fundProfile: {
          fundType: 'UCITS',
          fundName: 'Traditional Equity Fund',
          investmentStrategy: 'Traditional value investing approach',
          targetArticleClassification: 'Article6',
          investmentUniverse: 'Global equities'
        },
        esgIntegration: {
          considersPAI: false,
          paiIndicators: [],
          dueDiligencePolicies: {
            esgIntegration: false,
            sustainabilityRisks: true,
            adverseImpacts: false
          },
          engagementPolicies: {
            shareholderEngagement: false,
            votingPolicy: false,
            escalationProcedures: false
          }
        },
        sustainabilityRiskIntegration: {
          identificationProcess: 'Basic sustainability risk assessment',
          assessmentMethodology: 'Standard risk assessment methodology',
          integrationInDecisionMaking: 'Sustainability risks considered in investment decisions'
        }
      };

      const classification = validator.validateArticleClassification(request);
      expect(classification.recommendedClassification).toBe('Article6');
      expect(classification.isValid).toBe(true);
    });
  });

  describe('Article 8 Classification', () => {
    it('should validate Article 8 fund with proper ESG integration', async () => {
      const request: SFDRClassificationRequest = {
        metadata: {
          entityId: '123e4567-e89b-12d3-a456-426614174001',
          reportingPeriod: '2024-12-31',
          regulatoryVersion: 'SFDR_v1.0',
          submissionType: 'INITIAL',
          submissionDate: '2024-01-15T10:00:00Z',
          preparerId: 'compliance-officer-002'
        },
        fundProfile: {
          fundType: 'UCITS',
          fundName: 'ESG European Equity Fund',
          investmentStrategy: 'ESG-integrated European equity strategy promoting environmental and social characteristics',
          targetArticleClassification: 'Article8',
          investmentUniverse: 'European listed companies with strong ESG profiles'
        },
        esgIntegration: {
          considersPAI: true,
          paiIndicators: ['GHG_EMISSIONS', 'CARBON_FOOTPRINT', 'BOARD_GENDER_DIVERSITY'],
          paiStatement: 'The fund considers principal adverse impacts through systematic ESG integration and engagement',
          dueDiligencePolicies: {
            esgIntegration: true,
            sustainabilityRisks: true,
            adverseImpacts: true
          },
          engagementPolicies: {
            shareholderEngagement: true,
            votingPolicy: true,
            escalationProcedures: true
          }
        },
        taxonomyAlignment: {
          environmentalObjectives: ['CLIMATE_CHANGE_MITIGATION'],
          minimumAlignmentPercentage: 20,
          alignmentCalculationMethod: 'Revenue-based taxonomy alignment assessment using third-party data providers',
          doNoSignificantHarmAssessment: true,
          minimumSafeguardsCompliance: true
        },
        sustainabilityRiskIntegration: {
          identificationProcess: 'Comprehensive ESG risk identification using multiple data sources and proprietary analysis',
          assessmentMethodology: 'Quantitative ESG scoring integrated with fundamental analysis and portfolio construction',
          integrationInDecisionMaking: 'ESG factors systematically integrated in investment decision-making process'
        }
      };

      const result = await validator.validateRequest(request);
      expect(result.isValid).toBe(true);
      expect(result.issues.filter(i => i.severity === 'ERROR')).toHaveLength(0);

      const classification = validator.validateArticleClassification(request);
      expect(classification.recommendedClassification).toBe('Article8');
      expect(classification.isValid).toBe(true);
    });

    it('should require taxonomy alignment for Article 8 funds', async () => {
      const request: SFDRClassificationRequest = {
        metadata: {
          entityId: '123e4567-e89b-12d3-a456-426614174002',
          reportingPeriod: '2024-12-31',
          regulatoryVersion: 'SFDR_v1.0',
          submissionType: 'INITIAL',
          submissionDate: '2024-01-15T10:00:00Z',
          preparerId: 'compliance-officer-003'
        },
        fundProfile: {
          fundType: 'UCITS',
          fundName: 'ESG Fund Without Taxonomy',
          investmentStrategy: 'ESG strategy without taxonomy alignment',
          targetArticleClassification: 'Article8',
          investmentUniverse: 'Global equities'
        },
        esgIntegration: {
          considersPAI: true,
          paiIndicators: ['GHG_EMISSIONS'],
          paiStatement: 'PAI considered in investment process',
          dueDiligencePolicies: {
            esgIntegration: true,
            sustainabilityRisks: true,
            adverseImpacts: true
          },
          engagementPolicies: {
            shareholderEngagement: true,
            votingPolicy: true,
            escalationProcedures: true
          }
        },
        sustainabilityRiskIntegration: {
          identificationProcess: 'ESG risk identification process',
          assessmentMethodology: 'ESG risk assessment methodology',
          integrationInDecisionMaking: 'ESG integration in decision making'
        }
        // Note: taxonomyAlignment is missing
      };

      const result = await validator.validateRequest(request);
      expect(result.isValid).toBe(false);
      expect(result.issues.some(i => i.code.includes('TAXONOMY'))).toBe(true);
    });
  });

  describe('Article 9 Classification', () => {
    it('should validate Article 9 fund with comprehensive sustainability framework', async () => {
      const request: SFDRClassificationRequest = {
        metadata: {
          entityId: '123e4567-e89b-12d3-a456-426614174003',
          reportingPeriod: '2024-12-31',
          regulatoryVersion: 'SFDR_v1.0',
          submissionType: 'INITIAL',
          submissionDate: '2024-01-15T10:00:00Z',
          preparerId: 'compliance-officer-004'
        },
        fundProfile: {
          fundType: 'UCITS',
          fundName: 'Climate Solutions Fund',
          investmentStrategy: 'Sustainable investment strategy targeting climate solutions and clean technology companies',
          targetArticleClassification: 'Article9',
          sustainabilityObjective: 'Contribute to climate change mitigation through investments in clean technology and renewable energy solutions',
          investmentUniverse: 'Global companies contributing to climate solutions'
        },
        esgIntegration: {
          considersPAI: true,
          paiIndicators: [
            'GHG_EMISSIONS',
            'CARBON_FOOTPRINT',
            'GHG_INTENSITY',
            'FOSSIL_FUEL_EXPOSURE',
            'BIODIVERSITY_IMPACT'
          ],
          paiStatement: 'Comprehensive PAI consideration with detailed monitoring and reporting of climate-related impacts',
          dueDiligencePolicies: {
            esgIntegration: true,
            sustainabilityRisks: true,
            adverseImpacts: true
          },
          engagementPolicies: {
            shareholderEngagement: true,
            votingPolicy: true,
            escalationProcedures: true
          }
        },
        taxonomyAlignment: {
          environmentalObjectives: ['CLIMATE_CHANGE_MITIGATION', 'POLLUTION_PREVENTION'],
          minimumAlignmentPercentage: 60,
          alignmentCalculationMethod: 'Detailed revenue and CapEx-based taxonomy alignment assessment with third-party verification',
          doNoSignificantHarmAssessment: true,
          minimumSafeguardsCompliance: true,
          alignmentBreakdown: [
            {
              objective: 'CLIMATE_CHANGE_MITIGATION',
              alignmentPercentage: 50,
              contributionDescription: 'Renewable energy and energy efficiency investments'
            },
            {
              objective: 'POLLUTION_PREVENTION',
              alignmentPercentage: 10,
              contributionDescription: 'Waste management and circular economy solutions'
            }
          ]
        },
        sustainableInvestment: {
          sustainableInvestmentMinimum: 85,
          sustainabilityIndicators: [
            'Carbon intensity reduction',
            'Renewable energy capacity',
            'Green revenue percentage'
          ],
          measurementMethodology: 'Comprehensive sustainability assessment using proprietary methodology combining quantitative metrics and qualitative analysis',
          dataSourcesAndProcessing: 'Multiple ESG data providers, company disclosures, and third-party verification',
          limitationsAndCaveats: [
            'Data availability constraints for smaller companies',
            'Estimation methodologies for forward-looking metrics'
          ]
        },
        sustainabilityRiskIntegration: {
          identificationProcess: 'Comprehensive sustainability risk identification covering climate, social, and governance factors',
          assessmentMethodology: 'Advanced ESG risk modeling integrated with financial analysis and scenario planning',
          integrationInDecisionMaking: 'Sustainability factors are primary drivers in investment decision-making process'
        }
      };

      const result = await validator.validateRequest(request);
      expect(result.isValid).toBe(true);
      expect(result.issues.filter(i => i.severity === 'ERROR')).toHaveLength(0);

      const classification = validator.validateArticleClassification(request);
      expect(classification.recommendedClassification).toBe('Article9');
      expect(classification.isValid).toBe(true);
    });

    it('should require sustainability objective for Article 9 funds', async () => {
      const request: SFDRClassificationRequest = {
        metadata: {
          entityId: '123e4567-e89b-12d3-a456-426614174004',
          reportingPeriod: '2024-12-31',
          regulatoryVersion: 'SFDR_v1.0',
          submissionType: 'INITIAL',
          submissionDate: '2024-01-15T10:00:00Z',
          preparerId: 'compliance-officer-005'
        },
        fundProfile: {
          fundType: 'UCITS',
          fundName: 'Article 9 Fund Without Objective',
          investmentStrategy: 'Sustainable investment strategy',
          targetArticleClassification: 'Article9',
          investmentUniverse: 'Global sustainable investments'
          // Note: sustainabilityObjective is missing
        },
        esgIntegration: {
          considersPAI: true,
          paiIndicators: ['GHG_EMISSIONS'],
          paiStatement: 'PAI considered',
          dueDiligencePolicies: {
            esgIntegration: true,
            sustainabilityRisks: true,
            adverseImpacts: true
          },
          engagementPolicies: {
            shareholderEngagement: true,
            votingPolicy: true,
            escalationProcedures: true
          }
        },
        sustainabilityRiskIntegration: {
          identificationProcess: 'Risk identification process',
          assessmentMethodology: 'Risk assessment methodology',
          integrationInDecisionMaking: 'Risk integration in decisions'
        }
      };

      const result = await validator.validateRequest(request);
      expect(result.isValid).toBe(false);
      expect(result.issues.some(i => i.code === 'ARTICLE9_SUSTAINABILITY_OBJECTIVE_REQUIRED')).toBe(true);
    });

    it('should require minimum 80% sustainable investment allocation for Article 9', async () => {
      const request: SFDRClassificationRequest = {
        metadata: {
          entityId: '123e4567-e89b-12d3-a456-426614174005',
          reportingPeriod: '2024-12-31',
          regulatoryVersion: 'SFDR_v1.0',
          submissionType: 'INITIAL',
          submissionDate: '2024-01-15T10:00:00Z',
          preparerId: 'compliance-officer-006'
        },
        fundProfile: {
          fundType: 'UCITS',
          fundName: 'Low Allocation Sustainable Fund',
          investmentStrategy: 'Sustainable investment strategy',
          targetArticleClassification: 'Article9',
          sustainabilityObjective: 'Environmental sustainability objective',
          investmentUniverse: 'Global sustainable investments'
        },
        esgIntegration: {
          considersPAI: true,
          paiIndicators: ['GHG_EMISSIONS'],
          paiStatement: 'PAI considered',
          dueDiligencePolicies: {
            esgIntegration: true,
            sustainabilityRisks: true,
            adverseImpacts: true
          },
          engagementPolicies: {
            shareholderEngagement: true,
            votingPolicy: true,
            escalationProcedures: true
          }
        },
        sustainableInvestment: {
          sustainableInvestmentMinimum: 60, // Below required 80%
          sustainabilityIndicators: ['ESG score'],
          measurementMethodology: 'Basic ESG assessment',
          dataSourcesAndProcessing: 'ESG data provider',
          limitationsAndCaveats: ['Data limitations']
        },
        sustainabilityRiskIntegration: {
          identificationProcess: 'Risk identification process',
          assessmentMethodology: 'Risk assessment methodology',
          integrationInDecisionMaking: 'Risk integration in decisions'
        }
      };

      const result = await validator.validateRequest(request);
      expect(result.isValid).toBe(false);
      expect(result.issues.some(i => i.code === 'ARTICLE9_SUSTAINABLE_INVESTMENT_MINIMUM')).toBe(true);
    });
  });

  describe('PAI Validation', () => {
    it('should validate PAI consistency when considersPAI is true', async () => {
      const request: SFDRClassificationRequest = {
        metadata: {
          entityId: '123e4567-e89b-12d3-a456-426614174006',
          reportingPeriod: '2024-12-31',
          regulatoryVersion: 'SFDR_v1.0',
          submissionType: 'INITIAL',
          submissionDate: '2024-01-15T10:00:00Z',
          preparerId: 'compliance-officer-007'
        },
        fundProfile: {
          fundType: 'UCITS',
          fundName: 'PAI Inconsistent Fund',
          investmentStrategy: 'Investment strategy',
          targetArticleClassification: 'Article6',
          investmentUniverse: 'Global equities'
        },
        esgIntegration: {
          considersPAI: true,
          paiIndicators: [], // Empty array despite considersPAI = true
          dueDiligencePolicies: {
            esgIntegration: false,
            sustainabilityRisks: true,
            adverseImpacts: false
          },
          engagementPolicies: {
            shareholderEngagement: false,
            votingPolicy: false,
            escalationProcedures: false
          }
        },
        sustainabilityRiskIntegration: {
          identificationProcess: 'Risk identification process',
          assessmentMethodology: 'Risk assessment methodology',
          integrationInDecisionMaking: 'Risk integration in decisions'
        }
      };

      const result = await validator.validateRequest(request);
      expect(result.issues.some(i => i.code === 'PAI_INDICATORS_CONSISTENCY')).toBe(true);
      expect(result.issues.find(i => i.code === 'PAI_INDICATORS_CONSISTENCY')?.severity).toBe('WARNING');
    });
  });

  describe('Data Validation', () => {
    it('should validate entity ID format', async () => {
      const request: SFDRClassificationRequest = {
        metadata: {
          entityId: 'invalid-uuid-format',
          reportingPeriod: '2024-12-31',
          regulatoryVersion: 'SFDR_v1.0',
          submissionType: 'INITIAL',
          submissionDate: '2024-01-15T10:00:00Z',
          preparerId: 'compliance-officer-008'
        },
        fundProfile: {
          fundType: 'UCITS',
          fundName: 'Test Fund',
          investmentStrategy: 'Test strategy',
          targetArticleClassification: 'Article6',
          investmentUniverse: 'Global equities'
        },
        esgIntegration: {
          considersPAI: false,
          paiIndicators: [],
          dueDiligencePolicies: {
            esgIntegration: false,
            sustainabilityRisks: true,
            adverseImpacts: false
          },
          engagementPolicies: {
            shareholderEngagement: false,
            votingPolicy: false,
            escalationProcedures: false
          }
        },
        sustainabilityRiskIntegration: {
          identificationProcess: 'Risk identification process',
          assessmentMethodology: 'Risk assessment methodology',
          integrationInDecisionMaking: 'Risk integration in decisions'
        }
      };

      const result = await validator.validateRequest(request);
      expect(result.isValid).toBe(false);
      expect(result.issues.some(i => i.code === 'METADATA_ENTITY_ID_REQUIRED')).toBe(true);
    });

    it('should validate fund name length', async () => {
      const request: SFDRClassificationRequest = {
        metadata: {
          entityId: '123e4567-e89b-12d3-a456-426614174007',
          reportingPeriod: '2024-12-31',
          regulatoryVersion: 'SFDR_v1.0',
          submissionType: 'INITIAL',
          submissionDate: '2024-01-15T10:00:00Z',
          preparerId: 'compliance-officer-009'
        },
        fundProfile: {
          fundType: 'UCITS',
          fundName: '', // Empty fund name
          investmentStrategy: 'Test strategy',
          targetArticleClassification: 'Article6',
          investmentUniverse: 'Global equities'
        },
        esgIntegration: {
          considersPAI: false,
          paiIndicators: [],
          dueDiligencePolicies: {
            esgIntegration: false,
            sustainabilityRisks: true,
            adverseImpacts: false
          },
          engagementPolicies: {
            shareholderEngagement: false,
            votingPolicy: false,
            escalationProcedures: false
          }
        },
        sustainabilityRiskIntegration: {
          identificationProcess: 'Risk identification process',
          assessmentMethodology: 'Risk assessment methodology',
          integrationInDecisionMaking: 'Risk integration in decisions'
        }
      };

      const result = await validator.validateRequest(request);
      expect(result.isValid).toBe(false);
      expect(result.issues.some(i => i.code === 'FUND_NAME_LENGTH_VALIDATION')).toBe(true);
    });
  });

  describe('Regulatory Compliance Utils', () => {
    it('should validate ISIN format correctly', () => {
      expect(RegulatoryComplianceUtils.validateISIN('US0378331005')).toBe(true);
      expect(RegulatoryComplianceUtils.validateISIN('GB0002634946')).toBe(true);
      expect(RegulatoryComplianceUtils.validateISIN('INVALID')).toBe(false);
      expect(RegulatoryComplianceUtils.validateISIN('US037833100')).toBe(false); // Too short
    });

    it('should validate LEI format correctly', () => {
      expect(RegulatoryComplianceUtils.validateLEI('5493000IBP32UQZ0KL24')).toBe(true);
      expect(RegulatoryComplianceUtils.validateLEI('INVALID')).toBe(false);
      expect(RegulatoryComplianceUtils.validateLEI('5493000IBP32UQZ0KL2')).toBe(false); // Too short
    });

    it('should determine PAI requirements correctly', () => {
      expect(RegulatoryComplianceUtils.isPAIMandatory('UCITS', 600000000)).toBe(true);
      expect(RegulatoryComplianceUtils.isPAIMandatory('UCITS', 400000000)).toBe(false);
      expect(RegulatoryComplianceUtils.isPAIMandatory('AIF', 600000000)).toBe(true);
    });

    it('should provide required PAI indicators by classification', () => {
      const article9PAI = RegulatoryComplianceUtils.getRequiredPAIIndicators('Article9');
      expect(article9PAI).toContain('GHG_EMISSIONS');
      expect(article9PAI).toContain('FOSSIL_FUEL_EXPOSURE');
      expect(article9PAI.length).toBeGreaterThan(3);

      const article8PAI = RegulatoryComplianceUtils.getRequiredPAIIndicators('Article8');
      expect(article8PAI).toContain('GHG_EMISSIONS');
      expect(article8PAI.length).toBe(3);

      const article6PAI = RegulatoryComplianceUtils.getRequiredPAIIndicators('Article6');
      expect(article6PAI).toHaveLength(0);
    });

    it('should validate taxonomy objectives', () => {
      expect(RegulatoryComplianceUtils.validateTaxonomyObjectives(['CLIMATE_CHANGE_MITIGATION'])).toBe(true);
      expect(RegulatoryComplianceUtils.validateTaxonomyObjectives([])).toBe(false);
      expect(RegulatoryComplianceUtils.validateTaxonomyObjectives([
        'POLLUTION_PREVENTION',
        'CLIMATE_CHANGE_MITIGATION'
      ])).toBe(true);
    });
  });

  describe('Validator Metadata', () => {
    it('should provide validator version', () => {
      expect(validator.getVersion()).toBe('1.0.0');
    });

    it('should provide validation rules', () => {
      const rules = validator.getAllValidationRules();
      expect(rules.length).toBeGreaterThan(0);
      expect(rules.every(rule => rule.code && rule.description && rule.regulatoryReference)).toBe(true);
    });

    it('should retrieve specific validation rule', () => {
      const rule = validator.getValidationRule('METADATA_ENTITY_ID_REQUIRED');
      expect(rule).toBeDefined();
      expect(rule?.code).toBe('METADATA_ENTITY_ID_REQUIRED');
    });
  });
});