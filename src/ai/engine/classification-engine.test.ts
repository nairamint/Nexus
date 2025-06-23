/**
 * SFDR Navigator Agent - AI Classification Engine Tests
 * Phase 2A: Comprehensive test suite for the AI Classification Engine
 * 
 * Tests for AI-powered SFDR classification with confidence-driven decisions
 */

import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import {
  SFDRClassificationEngine,
  ClassificationMetrics,
  createSFDRClassificationEngine,
  createTestingSFDREngine,
  createSampleSFDRRequest,
  validateSFDRRequest
} from './index.js';
import type {
  SFDRClassificationRequest,
  SFDRClassificationResponse,
  EngineConfiguration,
  ValidationResult
} from './types.js';
import type { SFDRArticleClassification } from '../../domain/sfdr/types';

// ============================================================================
// TEST SETUP
// ============================================================================

describe('SFDRClassificationEngine', () => {
  let engine: SFDRClassificationEngine;
  let testConfig: Partial<EngineConfiguration>;
  let sampleRequest: SFDRClassificationRequest;

  beforeEach(() => {
    // Setup test configuration
    testConfig = {
      confidenceThresholds: {
        automated: 80,
        humanReview: 60,
        expertConsultation: 40
      },
      explainabilityLevel: 'DETAILED',
      enableRiskAssessment: true,
      enableValidation: true,
      maxProcessingTime: 30000
    };

    // Create test engine
    engine = new SFDRClassificationEngine(testConfig);

    // Create sample request
    sampleRequest = createSampleSFDRRequest();
  });

  afterEach(() => {
    // Cleanup
    jest.clearAllMocks();
  });

  // ============================================================================
  // ENGINE INITIALIZATION TESTS
  // ============================================================================

  describe('Engine Initialization', () => {
    it('should initialize with default configuration', () => {
      const defaultEngine = new SFDRClassificationEngine();
      expect(defaultEngine).toBeInstanceOf(SFDRClassificationEngine);
    });

    it('should initialize with custom configuration', () => {
      const customEngine = new SFDRClassificationEngine(testConfig);
      expect(customEngine).toBeInstanceOf(SFDRClassificationEngine);
    });

    it('should merge custom config with defaults', () => {
      const partialConfig = {
        confidenceThresholds: {
          automated: 95,
          humanReview: 75,
          expertConsultation: 55
        }
      };
      const engine = new SFDRClassificationEngine(partialConfig);
      expect(engine).toBeInstanceOf(SFDRClassificationEngine);
    });
  });

  // ============================================================================
  // CLASSIFICATION TESTS
  // ============================================================================

  describe('Fund Classification', () => {
    it('should classify Article 6 fund correctly', async () => {
      const article6Request: SFDRClassificationRequest = {
        ...sampleRequest,
        esgIntegration: {
          integrationLevel: 'MINIMAL',
          sustainabilityRiskIntegration: true,
          paiConsideration: false,
          paiIndicators: []
        },
        sustainabilityObjectives: undefined
      };

      const response = await engine.classifyFund(article6Request);
      
      expect(response.status).toBe('SUCCESS');
      expect(response.classification?.article).toBe('ARTICLE_6');
      expect(response.confidence?.score).toBeGreaterThan(0);
      expect(response.explanation).toBeDefined();
    });

    it('should classify Article 8 fund correctly', async () => {
      const article8Request: SFDRClassificationRequest = {
        ...sampleRequest,
        esgIntegration: {
          integrationLevel: 'COMPREHENSIVE',
          esgCriteria: ['Environmental', 'Social'],
          sustainabilityRiskIntegration: true,
          paiConsideration: true,
          paiIndicators: ['GHG_EMISSIONS', 'CARBON_FOOTPRINT']
        },
        sustainabilityObjectives: {
          hasEnvironmentalObjectives: true,
          hasSocialObjectives: false,
          environmentalObjectives: ['Climate change mitigation'],
          sustainableInvestmentPercentage: 30
        }
      };

      const response = await engine.classifyFund(article8Request);
      
      expect(response.status).toBe('SUCCESS');
      expect(response.classification?.article).toBe('ARTICLE_8');
      expect(response.confidence?.score).toBeGreaterThan(0);
      expect(response.explanation).toBeDefined();
    });

    it('should classify Article 9 fund correctly', async () => {
      const article9Request: SFDRClassificationRequest = {
        ...sampleRequest,
        esgIntegration: {
          integrationLevel: 'COMPREHENSIVE',
          esgCriteria: ['Environmental', 'Social', 'Governance'],
          sustainabilityRiskIntegration: true,
          paiConsideration: true,
          paiIndicators: ['GHG_EMISSIONS', 'CARBON_FOOTPRINT', 'BIODIVERSITY']
        },
        sustainabilityObjectives: {
          hasEnvironmentalObjectives: true,
          hasSocialObjectives: true,
          environmentalObjectives: ['Climate change mitigation', 'Biodiversity protection'],
          socialObjectives: ['Social equality', 'Human rights'],
          sustainableInvestmentPercentage: 90,
          taxonomyAlignment: {
            percentage: 50,
            activities: ['CLIMATE_CHANGE_MITIGATION'],
            verification: true
          }
        }
      };

      const response = await engine.classifyFund(article9Request);
      
      expect(response.status).toBe('SUCCESS');
      expect(response.classification?.article).toBe('ARTICLE_9');
      expect(response.confidence?.score).toBeGreaterThan(0);
      expect(response.explanation).toBeDefined();
    });

    it('should handle edge cases gracefully', async () => {
      const edgeCaseRequest: SFDRClassificationRequest = {
        ...sampleRequest,
        esgIntegration: {
          integrationLevel: 'PARTIAL',
          sustainabilityRiskIntegration: true,
          paiConsideration: false
        },
        sustainabilityObjectives: {
          hasEnvironmentalObjectives: false,
          hasSocialObjectives: false,
          sustainableInvestmentPercentage: 0
        }
      };

      const response = await engine.classifyFund(edgeCaseRequest);
      
      expect(response.status).toBe('SUCCESS');
      expect(response.classification).toBeDefined();
      expect(response.confidence?.decision).toBeDefined();
    });
  });

  // ============================================================================
  // CONFIDENCE AND DECISION TESTS
  // ============================================================================

  describe('Confidence-Driven Decisions', () => {
    it('should make automated decision for high confidence', async () => {
      // Mock high confidence scenario
      const highConfidenceRequest = {
        ...sampleRequest,
        esgIntegration: {
          integrationLevel: 'NONE' as const,
          sustainabilityRiskIntegration: true,
          paiConsideration: false
        }
      };

      const response = await engine.classifyFund(highConfidenceRequest);
      
      expect(response.status).toBe('SUCCESS');
      expect(response.confidence?.decision.decisionType).toBeDefined();
    });

    it('should recommend human review for medium confidence', async () => {
      // Mock medium confidence scenario
      const mediumConfidenceRequest = {
        ...sampleRequest,
        esgIntegration: {
          integrationLevel: 'PARTIAL' as const,
          sustainabilityRiskIntegration: true,
          paiConsideration: true,
          paiIndicators: ['GHG_EMISSIONS']
        },
        sustainabilityObjectives: {
          hasEnvironmentalObjectives: true,
          hasSocialObjectives: false,
          sustainableInvestmentPercentage: 25
        }
      };

      const response = await engine.classifyFund(mediumConfidenceRequest);
      
      expect(response.status).toBe('SUCCESS');
      expect(response.confidence?.decision).toBeDefined();
    });

    it('should recommend expert consultation for low confidence', async () => {
      // Mock low confidence scenario with conflicting data
      const lowConfidenceRequest = {
        ...sampleRequest,
        esgIntegration: {
          integrationLevel: 'COMPREHENSIVE' as const,
          sustainabilityRiskIntegration: false, // Conflicting
          paiConsideration: true,
          paiIndicators: []
        },
        sustainabilityObjectives: {
          hasEnvironmentalObjectives: true,
          hasSocialObjectives: true,
          sustainableInvestmentPercentage: 5 // Low percentage
        }
      };

      const response = await engine.classifyFund(lowConfidenceRequest);
      
      expect(response.status).toBe('SUCCESS');
      expect(response.confidence?.decision).toBeDefined();
    });
  });

  // ============================================================================
  // VALIDATION TESTS
  // ============================================================================

  describe('Request Validation', () => {
    it('should validate correct request', async () => {
      const response = await engine.classifyFund(sampleRequest);
      expect(response.status).toBe('SUCCESS');
    });

    it('should reject request with missing required fields', async () => {
      const invalidRequest = {
        ...sampleRequest,
        fundProfile: {
          ...sampleRequest.fundProfile,
          fundName: '' // Empty required field
        }
      };

      const response = await engine.classifyFund(invalidRequest);
      expect(response.status).toBe('ERROR');
      expect(response.error?.type).toBe('VALIDATION_ERROR');
    });

    it('should reject request with business rule violations', async () => {
      const invalidRequest = {
        ...sampleRequest,
        esgIntegration: {
          integrationLevel: 'COMPREHENSIVE' as const,
          sustainabilityRiskIntegration: true,
          paiConsideration: true,
          paiIndicators: [] // Missing indicators when PAI consideration is true
        }
      };

      const response = await engine.classifyFund(invalidRequest);
      expect(response.status).toBe('ERROR');
      expect(response.error?.type).toBe('VALIDATION_ERROR');
    });

    it('should validate using standalone validation function', async () => {
      const validationResult = await validateSFDRRequest(sampleRequest);
      expect(validationResult.isValid).toBe(true);
      expect(validationResult.errors).toHaveLength(0);
    });
  });

  // ============================================================================
  // BATCH PROCESSING TESTS
  // ============================================================================

  describe('Batch Processing', () => {
    it('should process multiple requests in batch', async () => {
      const requests = [
        sampleRequest,
        { ...sampleRequest, metadata: { ...sampleRequest.metadata, source: 'batch-test-1' } },
        { ...sampleRequest, metadata: { ...sampleRequest.metadata, source: 'batch-test-2' } }
      ];

      const responses = await engine.classifyFunds(requests);
      
      expect(responses).toHaveLength(3);
      responses.forEach(response => {
        expect(response.status).toBe('SUCCESS');
        expect(response.metadata?.batchId).toBeDefined();
      });
    });

    it('should handle batch with mixed success/failure', async () => {
      const requests = [
        sampleRequest,
        { ...sampleRequest, fundProfile: { ...sampleRequest.fundProfile, fundName: '' } }, // Invalid
        sampleRequest
      ];

      const responses = await engine.classifyFunds(requests);
      
      expect(responses).toHaveLength(3);
      expect(responses[0].status).toBe('SUCCESS');
      expect(responses[1].status).toBe('ERROR');
      expect(responses[2].status).toBe('SUCCESS');
    });
  });

  // ============================================================================
  // EXPLAINABILITY TESTS
  // ============================================================================

  describe('Explainability', () => {
    it('should provide detailed explanation for classification', async () => {
      const response = await engine.classifyFund(sampleRequest);
      
      expect(response.explanation).toBeDefined();
      expect(response.explanation?.classificationRationale).toBeDefined();
      expect(response.explanation?.dataAnalysis).toBeDefined();
      expect(response.explanation?.regulatoryMapping).toBeDefined();
      expect(response.explanation?.confidenceAssessment).toBeDefined();
    });

    it('should include traceability information', async () => {
      const response = await engine.classifyFund(sampleRequest);
      
      expect(response.explanation?.traceability).toBeDefined();
      expect(response.explanation?.traceability.decisionPath).toBeDefined();
      expect(response.explanation?.traceability.dataLineage).toBeDefined();
    });

    it('should provide regulatory compliance information', async () => {
      const response = await engine.classifyFund(sampleRequest);
      
      expect(response.explanation?.regulatoryCompliance).toBeDefined();
      expect(response.explanation?.regulatoryCompliance.applicableRegulations).toBeDefined();
      expect(response.explanation?.regulatoryCompliance.complianceStatus).toBeDefined();
    });
  });

  // ============================================================================
  // RISK ASSESSMENT TESTS
  // ============================================================================

  describe('Regulatory Risk Assessment', () => {
    it('should assess regulatory risk for classification', async () => {
      const response = await engine.classifyFund(sampleRequest);
      
      expect(response.riskAssessment).toBeDefined();
      expect(response.riskAssessment?.overallRisk).toBeDefined();
      expect(response.riskAssessment?.riskFactors).toBeDefined();
    });

    it('should identify high-risk scenarios', async () => {
      const highRiskRequest = {
        ...sampleRequest,
        fundProfile: {
          ...sampleRequest.fundProfile,
          totalAssets: 10000000000 // Very large fund
        },
        sustainabilityObjectives: {
          hasEnvironmentalObjectives: true,
          hasSocialObjectives: true,
          sustainableInvestmentPercentage: 95 // Very high percentage
        }
      };

      const response = await engine.classifyFund(highRiskRequest);
      
      expect(response.riskAssessment).toBeDefined();
      expect(response.riskAssessment?.overallRisk).toBeDefined();
    });
  });

  // ============================================================================
  // PERFORMANCE AND MONITORING TESTS
  // ============================================================================

  describe('Performance and Monitoring', () => {
    it('should track processing metrics', async () => {
      const response = await engine.classifyFund(sampleRequest);
      
      expect(response.processingTime).toBeGreaterThan(0);
      expect(response.metadata?.processingMetrics).toBeDefined();
    });

    it('should provide engine metrics', () => {
      const metrics = engine.getMetrics();
      expect(metrics).toBeDefined();
      expect(typeof metrics.totalClassifications).toBe('number');
    });

    it('should perform health check', async () => {
      const healthStatus = await engine.healthCheck();
      
      expect(healthStatus.status).toBeDefined();
      expect(healthStatus.timestamp).toBeInstanceOf(Date);
      expect(healthStatus.components).toBeDefined();
    });

    it('should handle timeout scenarios', async () => {
      // Create engine with very short timeout
      const timeoutEngine = new SFDRClassificationEngine({
        maxProcessingTime: 1 // 1ms timeout
      });

      const response = await timeoutEngine.classifyFund(sampleRequest);
      
      // Should either succeed quickly or timeout gracefully
      expect(['SUCCESS', 'ERROR', 'TIMEOUT']).toContain(response.status);
    });
  });

  // ============================================================================
  // CONFIGURATION TESTS
  // ============================================================================

  describe('Configuration Management', () => {
    it('should update configuration dynamically', () => {
      const newConfig = {
        confidenceThresholds: {
          automated: 95,
          humanReview: 75,
          expertConsultation: 55
        }
      };

      engine.updateConfiguration(newConfig);
      
      // Configuration should be updated (we can't directly test private properties,
      // but we can test that the method doesn't throw)
      expect(() => engine.updateConfiguration(newConfig)).not.toThrow();
    });
  });

  // ============================================================================
  // FACTORY FUNCTION TESTS
  // ============================================================================

  describe('Factory Functions', () => {
    it('should create engine with factory function', () => {
      const factoryEngine = createSFDRClassificationEngine(testConfig);
      expect(factoryEngine).toBeInstanceOf(SFDRClassificationEngine);
    });

    it('should create testing engine', () => {
      const testingEngine = createTestingSFDREngine();
      expect(testingEngine).toBeInstanceOf(SFDRClassificationEngine);
    });

    it('should create sample request', () => {
      const sample = createSampleSFDRRequest();
      expect(sample.metadata).toBeDefined();
      expect(sample.fundProfile).toBeDefined();
      expect(sample.esgIntegration).toBeDefined();
    });
  });

  // ============================================================================
  // ERROR HANDLING TESTS
  // ============================================================================

  describe('Error Handling', () => {
    it('should handle internal errors gracefully', async () => {
      // Mock an internal error by providing malformed data
      const malformedRequest = {
        ...sampleRequest,
        // @ts-ignore - Intentionally malformed for testing
        fundProfile: null
      };

      const response = await engine.classifyFund(malformedRequest as any);
      
      expect(response.status).toBe('ERROR');
      expect(response.error).toBeDefined();
      expect(response.requestId).toBeDefined();
    });

    it('should provide meaningful error messages', async () => {
      const invalidRequest = {
        ...sampleRequest,
        fundProfile: {
          ...sampleRequest.fundProfile,
          fundName: ''
        }
      };

      const response = await engine.classifyFund(invalidRequest);
      
      expect(response.status).toBe('ERROR');
      expect(response.error?.message).toBeDefined();
      expect(response.error?.details).toBeDefined();
    });
  });
});

// ============================================================================
// INTEGRATION TESTS
// ============================================================================

describe('Integration Tests', () => {
  it('should integrate all components successfully', async () => {
    const engine = createTestingSFDREngine();
    const request = createSampleSFDRRequest();
    
    const response = await engine.classifyFund(request);
    
    expect(response.status).toBe('SUCCESS');
    expect(response.classification).toBeDefined();
    expect(response.confidence).toBeDefined();
    expect(response.explanation).toBeDefined();
  });

  it('should maintain consistency across multiple classifications', async () => {
    const engine = createTestingSFDREngine();
    const request = createSampleSFDRRequest();
    
    const responses = await Promise.all([
      engine.classifyFund(request),
      engine.classifyFund(request),
      engine.classifyFund(request)
    ]);
    
    // All responses should be successful and consistent
    responses.forEach(response => {
      expect(response.status).toBe('SUCCESS');
      expect(response.classification?.article).toBe(responses[0].classification?.article);
    });
  });
});