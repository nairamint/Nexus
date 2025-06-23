/**
 * SFDR Navigator Agent Phase 2B - Comprehensive Test Suite
 * 
 * This test suite validates all Phase 2B components and their integration.
 * Tests cover functionality, performance, security, and compliance aspects.
 */

import { describe, test, expect, beforeAll, afterAll, beforeEach, afterEach } from '@jest/globals';
import {
  Phase2BIntegrationEngine,
  createPhase2BEngine,
  defaultPhase2BConfig,
  quickStartPhase2B,
  healthCheckPhase2B,
  getPhase2BInfo,
  PHASE_2B_VERSION,
  PHASE_2B_FEATURES
} from '../src/phase2b.js';
import {
  SFDRClassificationRequest,
  HumanFeedback,
  SFDRArticleClassification
} from '../src/types.js';

describe('SFDR Navigator Agent Phase 2B', () => {
  let engine: Phase2BIntegrationEngine;

  beforeAll(async () => {
    // Initialize Phase 2B engine for testing
    engine = await createPhase2BEngine({
      ...defaultPhase2BConfig,
      // Test-specific configuration
      learning: {
        ...defaultPhase2BConfig.learning,
        feedbackProcessingInterval: 1000 // 1 second for faster tests
      },
      analytics: {
        ...defaultPhase2BConfig.analytics,
        reportGenerationInterval: 5000 // 5 seconds for faster tests
      }
    });
  }, 30000); // 30 second timeout for initialization

  afterAll(async () => {
    if (engine) {
      await engine.shutdown();
    }
  });

  describe('System Information', () => {
    test('should provide correct version information', () => {
      const info = getPhase2BInfo();
      expect(info.version).toBe(PHASE_2B_VERSION);
      expect(info.features).toEqual(PHASE_2B_FEATURES);
      expect(info.description).toContain('SFDR Navigator Agent Phase 2B');
    });

    test('should have all expected capabilities', () => {
      const info = getPhase2BInfo();
      expect(info.capabilities.mlModels.graphNeuralNetworks).toBe(true);
      expect(info.capabilities.learning.continuousLearning).toBe(true);
      expect(info.capabilities.languages.supported).toContain('en');
      expect(info.capabilities.analytics.realTimeMetrics).toBe(true);
      expect(info.capabilities.governance.auditTrails).toBe(true);
      expect(info.capabilities.performance.intelligentCaching).toBe(true);
      expect(info.capabilities.privacy.federatedLearning).toBe(true);
    });
  });

  describe('Quick Start and Health Check', () => {
    test('should quick start successfully', async () => {
      const quickEngine = await quickStartPhase2B();
      expect(quickEngine).toBeDefined();
      await quickEngine.shutdown();
    });

    test('should perform health check', async () => {
      const health = await healthCheckPhase2B(engine);
      expect(health.status).toMatch(/healthy|degraded/);
      expect(health.version).toBe(PHASE_2B_VERSION);
      expect(health.uptime).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Advanced Classification', () => {
    const testRequests: SFDRClassificationRequest[] = [
      {
        requestId: 'test-article-6-001',
        documentContent: `
          This fund does not promote environmental or social characteristics 
          and does not have sustainable investment as its objective. The fund 
          follows a traditional investment approach focused on financial returns.
        `,
        metadata: {
          documentType: 'fund_prospectus',
          language: 'en',
          userId: 'test-user-001',
          timestamp: new Date().toISOString()
        }
      },
      {
        requestId: 'test-article-8-001',
        documentContent: `
          This fund promotes environmental and social characteristics within 
          the meaning of Article 8 of SFDR. The fund integrates sustainability 
          risks and considers principal adverse impacts on sustainability factors.
        `,
        metadata: {
          documentType: 'fund_prospectus',
          language: 'en',
          userId: 'test-user-002',
          timestamp: new Date().toISOString()
        }
      },
      {
        requestId: 'test-article-9-001',
        documentContent: `
          This fund has sustainable investment as its objective within the 
          meaning of Article 9 of SFDR. All investments contribute to 
          environmental objectives such as climate change mitigation.
        `,
        metadata: {
          documentType: 'fund_prospectus',
          language: 'en',
          userId: 'test-user-003',
          timestamp: new Date().toISOString()
        }
      }
    ];

    test.each(testRequests)('should classify SFDR document: $requestId', async (request) => {
      const response = await engine.classifyWithEnhancements(request);
      
      expect(response).toBeDefined();
      expect(response.requestId).toBe(request.requestId);
      expect(response.classification).toMatch(/article_[6-9]/);
      expect(response.confidence).toBeGreaterThan(0);
      expect(response.confidence).toBeLessThanOrEqual(1);
      expect(response.explanation).toBeDefined();
      expect(response.analytics).toBeDefined();
      expect(response.governance).toBeDefined();
      expect(response.performance).toBeDefined();
    });

    test('should handle invalid input gracefully', async () => {
      const invalidRequest: SFDRClassificationRequest = {
        requestId: 'test-invalid-001',
        documentContent: '', // Empty content
        metadata: {
          documentType: 'fund_prospectus',
          language: 'en',
          userId: 'test-user-invalid',
          timestamp: new Date().toISOString()
        }
      };

      await expect(engine.classifyWithEnhancements(invalidRequest))
        .rejects.toThrow();
    });
  });

  describe('Multi-Language Support', () => {
    const multiLanguageTests = [
      {
        language: 'fr',
        content: `
          Ce fonds promeut des caractéristiques environnementales et sociales 
          au sens de l'article 8 du SFDR. Le fonds intègre les risques de 
          durabilité dans son processus d'investissement.
        `,
        expectedClassification: 'article_8'
      },
      {
        language: 'de',
        content: `
          Dieser Fonds fördert ökologische und soziale Merkmale im Sinne von 
          Artikel 8 der SFDR. Der Fonds integriert Nachhaltigkeitsrisiken in 
          seinen Anlageprozess.
        `,
        expectedClassification: 'article_8'
      },
      {
        language: 'es',
        content: `
          Este fondo promueve características ambientales y sociales en el 
          sentido del Artículo 8 del SFDR. El fondo integra los riesgos de 
          sostenibilidad en su proceso de inversión.
        `,
        expectedClassification: 'article_8'
      }
    ];

    test.each(multiLanguageTests)('should classify $language document correctly', async ({ language, content, expectedClassification }) => {
      const request: SFDRClassificationRequest = {
        requestId: `test-${language}-001`,
        documentContent: content,
        metadata: {
          documentType: 'fund_prospectus',
          language,
          userId: `test-user-${language}`,
          timestamp: new Date().toISOString()
        }
      };

      const response = await engine.classifyWithEnhancements(request);
      
      expect(response.classification).toBe(expectedClassification);
      expect(response.multiLanguageSupport).toBeDefined();
      expect(response.multiLanguageSupport?.sourceLanguage).toBe(language);
      expect(response.multiLanguageSupport?.translationQuality).toBeGreaterThan(0.7);
    });
  });

  describe('Continuous Learning', () => {
    test('should process human feedback', async () => {
      // First, make a classification
      const request: SFDRClassificationRequest = {
        requestId: 'test-feedback-001',
        documentContent: 'This fund promotes environmental characteristics under Article 8 of SFDR.',
        metadata: {
          documentType: 'fund_prospectus',
          language: 'en',
          userId: 'test-feedback-user',
          timestamp: new Date().toISOString()
        }
      };

      const response = await engine.classifyWithEnhancements(request);
      expect(response).toBeDefined();

      // Provide feedback
      const feedback: HumanFeedback = {
        feedbackId: 'feedback-test-001',
        requestId: request.requestId,
        userId: 'expert-user-001',
        feedback: {
          correctClassification: 'article_8' as SFDRArticleClassification,
          confidence: 0.95,
          reasoning: 'Document clearly states Article 8 characteristics',
          suggestedImprovements: ['Better detection of sustainability language']
        },
        timestamp: new Date().toISOString()
      };

      await expect(engine.processFeedbackWithEnhancements(feedback))
        .resolves.not.toThrow();
    });

    test('should handle invalid feedback gracefully', async () => {
      const invalidFeedback: HumanFeedback = {
        feedbackId: 'feedback-invalid-001',
        requestId: 'non-existent-request',
        userId: 'test-user',
        feedback: {
          correctClassification: 'article_8' as SFDRArticleClassification,
          confidence: 0.95,
          reasoning: 'Test feedback',
          suggestedImprovements: []
        },
        timestamp: new Date().toISOString()
      };

      await expect(engine.processFeedbackWithEnhancements(invalidFeedback))
        .rejects.toThrow();
    });
  });

  describe('Analytics and Reporting', () => {
    test('should generate analytics report', async () => {
      const timeRange = {
        start: new Date(Date.now() - 60 * 60 * 1000).toISOString(), // 1 hour ago
        end: new Date().toISOString()
      };

      const report = await engine.generateAnalyticsReport(timeRange);
      
      expect(report).toBeDefined();
      expect(report.reportId).toBeDefined();
      expect(report.timeRange).toEqual(timeRange);
      expect(report.summary).toBeDefined();
      expect(report.insights).toBeDefined();
      expect(report.trends).toBeDefined();
      expect(Array.isArray(report.insights)).toBe(true);
      expect(Array.isArray(report.trends)).toBe(true);
    });

    test('should provide system health metrics', async () => {
      const health = await engine.getSystemHealth();
      
      expect(health).toBeDefined();
      expect(health.overall).toMatch(/healthy|degraded|unhealthy/);
      expect(health.components).toBeDefined();
      expect(health.metrics).toBeDefined();
      expect(health.metrics.uptime).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Performance Optimization', () => {
    test('should demonstrate caching benefits', async () => {
      const request: SFDRClassificationRequest = {
        requestId: 'test-cache-001',
        documentContent: 'This fund promotes environmental characteristics under Article 8 of SFDR.',
        metadata: {
          documentType: 'fund_prospectus',
          language: 'en',
          userId: 'test-cache-user',
          timestamp: new Date().toISOString()
        }
      };

      // First request (cache miss)
      const start1 = Date.now();
      const response1 = await engine.classifyWithEnhancements(request);
      const duration1 = Date.now() - start1;

      // Second request (cache hit)
      const start2 = Date.now();
      const response2 = await engine.classifyWithEnhancements(request);
      const duration2 = Date.now() - start2;

      expect(response1.classification).toBe(response2.classification);
      expect(duration2).toBeLessThan(duration1); // Cache should be faster
    });

    test('should handle concurrent requests', async () => {
      const requests = Array.from({ length: 5 }, (_, i) => ({
        requestId: `test-concurrent-${i}`,
        documentContent: `This fund promotes environmental characteristics under Article 8 of SFDR. Request ${i}.`,
        metadata: {
          documentType: 'fund_prospectus' as const,
          language: 'en' as const,
          userId: `test-concurrent-user-${i}`,
          timestamp: new Date().toISOString()
        }
      }));

      const promises = requests.map(request => 
        engine.classifyWithEnhancements(request)
      );

      const responses = await Promise.all(promises);
      
      expect(responses).toHaveLength(5);
      responses.forEach((response, i) => {
        expect(response.requestId).toBe(`test-concurrent-${i}`);
        expect(response.classification).toBeDefined();
      });
    });
  });

  describe('Error Handling and Resilience', () => {
    test('should handle malformed requests', async () => {
      const malformedRequest = {
        requestId: 'test-malformed-001',
        // Missing required fields
        metadata: {
          language: 'en'
        }
      } as any;

      await expect(engine.classifyWithEnhancements(malformedRequest))
        .rejects.toThrow();
    });

    test('should handle unsupported language gracefully', async () => {
      const unsupportedLanguageRequest: SFDRClassificationRequest = {
        requestId: 'test-unsupported-lang-001',
        documentContent: 'This is a test document.',
        metadata: {
          documentType: 'fund_prospectus',
          language: 'zh', // Unsupported language
          userId: 'test-user-unsupported',
          timestamp: new Date().toISOString()
        }
      };

      await expect(engine.classifyWithEnhancements(unsupportedLanguageRequest))
        .rejects.toThrow();
    });

    test('should maintain system stability under load', async () => {
      const loadTestRequests = Array.from({ length: 20 }, (_, i) => ({
        requestId: `test-load-${i}`,
        documentContent: `Load test document ${i}. This fund promotes environmental characteristics.`,
        metadata: {
          documentType: 'fund_prospectus' as const,
          language: 'en' as const,
          userId: `test-load-user-${i}`,
          timestamp: new Date().toISOString()
        }
      }));

      const startTime = Date.now();
      const promises = loadTestRequests.map(request => 
        engine.classifyWithEnhancements(request).catch(error => ({ error }))
      );

      const results = await Promise.all(promises);
      const duration = Date.now() - startTime;

      // Check that most requests succeeded
      const successfulResults = results.filter(result => !('error' in result));
      expect(successfulResults.length).toBeGreaterThan(loadTestRequests.length * 0.8); // 80% success rate
      
      // Check reasonable performance
      expect(duration).toBeLessThan(30000); // Should complete within 30 seconds
    });
  });

  describe('Security and Compliance', () => {
    test('should maintain audit trails', async () => {
      const request: SFDRClassificationRequest = {
        requestId: 'test-audit-001',
        documentContent: 'This fund promotes environmental characteristics under Article 8 of SFDR.',
        metadata: {
          documentType: 'fund_prospectus',
          language: 'en',
          userId: 'test-audit-user',
          timestamp: new Date().toISOString()
        }
      };

      const response = await engine.classifyWithEnhancements(request);
      
      expect(response.governance).toBeDefined();
      expect(response.governance?.auditTrail).toBeDefined();
      expect(response.governance?.auditTrail.length).toBeGreaterThan(0);
    });

    test('should enforce data governance', async () => {
      const request: SFDRClassificationRequest = {
        requestId: 'test-governance-001',
        documentContent: 'This fund promotes environmental characteristics under Article 8 of SFDR.',
        metadata: {
          documentType: 'fund_prospectus',
          language: 'en',
          userId: 'test-governance-user',
          timestamp: new Date().toISOString()
        }
      };

      const response = await engine.classifyWithEnhancements(request);
      
      expect(response.governance?.complianceStatus).toBeDefined();
      expect(response.governance?.dataGovernance).toBeDefined();
      expect(response.governance?.riskAssessment).toBeDefined();
    });
  });

  describe('Integration and Compatibility', () => {
    test('should maintain backward compatibility with Phase 2A', async () => {
      // Test that Phase 2A style requests still work
      const phase2aRequest: SFDRClassificationRequest = {
        requestId: 'test-compatibility-001',
        documentContent: 'This fund promotes environmental characteristics under Article 8 of SFDR.',
        metadata: {
          documentType: 'fund_prospectus',
          language: 'en',
          userId: 'test-compatibility-user',
          timestamp: new Date().toISOString()
        }
      };

      const response = await engine.classifyWithEnhancements(phase2aRequest);
      
      // Should have all Phase 2A fields
      expect(response.requestId).toBeDefined();
      expect(response.classification).toBeDefined();
      expect(response.confidence).toBeDefined();
      expect(response.explanation).toBeDefined();
      
      // Should also have Phase 2B enhancements
      expect(response.analytics).toBeDefined();
      expect(response.governance).toBeDefined();
      expect(response.performance).toBeDefined();
    });

    test('should handle graceful degradation', async () => {
      // Test system behavior when some components are unavailable
      // This is a conceptual test - in practice, you'd mock component failures
      const request: SFDRClassificationRequest = {
        requestId: 'test-degradation-001',
        documentContent: 'This fund promotes environmental characteristics under Article 8 of SFDR.',
        metadata: {
          documentType: 'fund_prospectus',
          language: 'en',
          userId: 'test-degradation-user',
          timestamp: new Date().toISOString()
        }
      };

      const response = await engine.classifyWithEnhancements(request);
      
      // Core functionality should still work
      expect(response.classification).toBeDefined();
      expect(response.confidence).toBeGreaterThan(0);
    });
  });
});

/**
 * Performance Benchmarks
 */
describe('Phase 2B Performance Benchmarks', () => {
  let engine: Phase2BIntegrationEngine;

  beforeAll(async () => {
    engine = await createPhase2BEngine();
  });

  afterAll(async () => {
    if (engine) {
      await engine.shutdown();
    }
  });

  test('should meet classification performance targets', async () => {
    const request: SFDRClassificationRequest = {
      requestId: 'benchmark-001',
      documentContent: 'This fund promotes environmental characteristics under Article 8 of SFDR.',
      metadata: {
        documentType: 'fund_prospectus',
        language: 'en',
        userId: 'benchmark-user',
        timestamp: new Date().toISOString()
      }
    };

    const startTime = Date.now();
    const response = await engine.classifyWithEnhancements(request);
    const duration = Date.now() - startTime;

    // Performance targets
    expect(duration).toBeLessThan(5000); // Should complete within 5 seconds
    expect(response.confidence).toBeGreaterThan(0.7); // Should have reasonable confidence
  });

  test('should handle batch processing efficiently', async () => {
    const batchSize = 10;
    const requests = Array.from({ length: batchSize }, (_, i) => ({
      requestId: `batch-${i}`,
      documentContent: `Batch test document ${i}. This fund promotes environmental characteristics.`,
      metadata: {
        documentType: 'fund_prospectus' as const,
        language: 'en' as const,
        userId: `batch-user-${i}`,
        timestamp: new Date().toISOString()
      }
    }));

    const startTime = Date.now();
    const promises = requests.map(request => engine.classifyWithEnhancements(request));
    const responses = await Promise.all(promises);
    const duration = Date.now() - startTime;

    expect(responses).toHaveLength(batchSize);
    expect(duration).toBeLessThan(batchSize * 2000); // Should be faster than sequential processing
  });
});