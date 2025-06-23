/**
 * SFDR Navigator Agent - AI Engine Module
 * Phase 2A: Main exports for the AI Classification Engine
 * 
 * Centralized exports for the AI-powered SFDR classification system
 */

// ============================================================================
// MAIN ENGINE EXPORTS
// ============================================================================

export { SFDRClassificationEngine } from './classification-engine.js';
export { ClassificationMetrics } from './types.js';
export type {
  ValidationError,
  ComponentHealth,
  EngineHealthStatus
} from './classification-engine.js';

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type {
  // Core request/response types
  SFDRClassificationRequest,
  SFDRClassificationResponse,
  
  // Configuration types
  EngineConfiguration,
  
  // Validation types
  ValidationResult,
  ValidationWarning,
  ValidationSuggestion,
  
  // Processing pipeline types
  ProcessingStage,
  ProcessingPipeline,
  ProcessingContext,
  ProcessingError,
  ProcessingWarning,
  
  // Agent integration types
  AgentExecutionResult,
  OrchestrationResult,
  
  // Monitoring types
  PerformanceMetrics,
  QualityMetrics,
  BusinessMetrics,
  AuditTrailEntry,
  
  // Utility types
  ApiResponse,
  PaginatedResponse,
  QueryOptions
} from './types.js';

// ============================================================================
// SUPPORTING COMPONENT EXPORTS
// ============================================================================

// Re-export key components from other modules
export { AgentOrchestrator } from '../orchestration/orchestrator.js';
export { ConfidenceFramework } from '../confidence/framework.js';
export { ExplainabilityEngine, RegulatoryKnowledgeService } from '../explainability/engine.js';

// Re-export agent types
export type {
  Agent,
  AgentCapability,
  AgentExecutionContext,
  AgentResponse,
  DocumentIntelligenceAgent,
  ClassificationAgent,
  PAIAnalysisAgent,
  TaxonomyAlignmentAgent,
  QualityAssuranceAgent,
  ConfidenceDrivenClassification,
  ExplainabilityLevel,
  ExplainabilityResponse,
  RegulatoryRiskAssessment,
  InterAgentCommunication,
  AgentOrchestrationWorkflow
} from '../agents/types.js';

// Re-export confidence framework types
export type {
  ConfidenceScore,
  ConfidenceFactors,
  DecisionType,
  EscalationTrigger,
  ClassificationContext
} from '../confidence/framework.js';

// Re-export knowledge graph types
export type {
  RegulatoryKnowledgeGraph,
  RegulationNode,
  InterpretationNode,
  ComplianceCaseNode,
  RegulatoryChangeNode,
  ConflictResolutionNode,
  KnowledgeGraphQuery,
  KnowledgeGraphUpdate,
  GraphTraversalResult
} from '../knowledge/graph.js';

// ============================================================================
// FACTORY FUNCTIONS
// ============================================================================

// Import SFDRClassificationEngine directly to use in factory functions
import { SFDRClassificationEngine } from './classification-engine.js';

/**
 * Create a new SFDR Classification Engine with default configuration
 */
export function createSFDRClassificationEngine(
  config?: Partial<EngineConfiguration>
): SFDRClassificationEngine {
  return new SFDRClassificationEngine(config);
}

/**
 * Create a new SFDR Classification Engine with production configuration
 */
export function createProductionSFDREngine(): SFDRClassificationEngine {
  const productionConfig: Partial<EngineConfiguration> = {
    confidenceThresholds: {
      automated: 95,
      humanReview: 80,
      expertConsultation: 60
    },
    explainabilityLevel: 'COMPREHENSIVE',
    enableRiskAssessment: true,
    enableValidation: true,
    enableBatchProcessing: true,
    enableCaching: true,
    enableMetrics: true,
    maxProcessingTime: 180000, // 3 minutes
    maxConcurrentRequests: 10,
    cacheTimeout: 3600000, // 1 hour
    agentSettings: {
      documentIntelligence: {
        enabled: true,
        timeout: 30000,
        maxDocuments: 50
      },
      classification: {
        enabled: true,
        timeout: 60000,
        modelVersion: 'v2.0.0'
      },
      paiAnalysis: {
        enabled: true,
        timeout: 45000,
        indicators: [
          'GHG_EMISSIONS',
          'CARBON_FOOTPRINT',
          'BIODIVERSITY',
          'WATER_USAGE',
          'WASTE_GENERATION',
          'SOCIAL_VIOLATIONS',
          'BOARD_DIVERSITY',
          'EXECUTIVE_PAY',
          'ANTI_CORRUPTION',
          'HUMAN_RIGHTS'
        ]
      },
      taxonomyAlignment: {
        enabled: true,
        timeout: 45000,
        activities: [
          'CLIMATE_CHANGE_MITIGATION',
          'CLIMATE_CHANGE_ADAPTATION',
          'WATER_PROTECTION',
          'CIRCULAR_ECONOMY',
          'POLLUTION_PREVENTION',
          'BIODIVERSITY_PROTECTION'
        ]
      }
    }
  };
  
  return new SFDRClassificationEngine(productionConfig);
}

/**
 * Create a new SFDR Classification Engine with development configuration
 */
export function createDevelopmentSFDREngine(): SFDRClassificationEngine {
  const developmentConfig: Partial<EngineConfiguration> = {
    confidenceThresholds: {
      automated: 85,
      humanReview: 65,
      expertConsultation: 45
    },
    explainabilityLevel: 'DETAILED',
    enableRiskAssessment: true,
    enableValidation: true,
    enableBatchProcessing: false,
    enableCaching: false,
    enableMetrics: true,
    maxProcessingTime: 300000, // 5 minutes
    maxConcurrentRequests: 3,
    agentSettings: {
      documentIntelligence: {
        enabled: true,
        timeout: 60000,
        maxDocuments: 10
      },
      classification: {
        enabled: true,
        timeout: 120000,
        modelVersion: 'v2.0.0-dev'
      },
      paiAnalysis: {
        enabled: true,
        timeout: 90000,
        indicators: ['GHG_EMISSIONS', 'CARBON_FOOTPRINT', 'BIODIVERSITY']
      },
      taxonomyAlignment: {
        enabled: true,
        timeout: 90000,
        activities: ['CLIMATE_CHANGE_MITIGATION', 'CLIMATE_CHANGE_ADAPTATION']
      }
    }
  };
  
  return new SFDRClassificationEngine(developmentConfig);
}

/**
 * Create a new SFDR Classification Engine with testing configuration
 */
export function createTestingSFDREngine(): SFDRClassificationEngine {
  const testingConfig: Partial<EngineConfiguration> = {
    confidenceThresholds: {
      automated: 80,
      humanReview: 60,
      expertConsultation: 40
    },
    explainabilityLevel: 'BASIC',
    enableRiskAssessment: false,
    enableValidation: false,
    enableBatchProcessing: false,
    enableCaching: false,
    enableMetrics: false,
    maxProcessingTime: 30000, // 30 seconds
    maxConcurrentRequests: 1,
    agentSettings: {
      documentIntelligence: {
        enabled: false,
        timeout: 10000,
        maxDocuments: 1
      },
      classification: {
        enabled: true,
        timeout: 20000,
        modelVersion: 'v2.0.0-test'
      },
      paiAnalysis: {
        enabled: false,
        timeout: 10000,
        indicators: ['GHG_EMISSIONS']
      },
      taxonomyAlignment: {
        enabled: false,
        timeout: 10000,
        activities: ['CLIMATE_CHANGE_MITIGATION']
      }
    }
  };
  
  return new SFDRClassificationEngine(testingConfig);
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Validate SFDR classification request
 */
export async function validateSFDRRequest(
  request: SFDRClassificationRequest
): Promise<ValidationResult> {
  const engine = createTestingSFDREngine();
  // Use the engine's internal validation logic
  return (engine as any).validateRequest(request);
}

/**
 * Create a sample SFDR classification request for testing
 */
export function createSampleSFDRRequest(): SFDRClassificationRequest {
  return {
    metadata: {
      entityId: '550e8400-e29b-41d4-a716-446655440000',
      source: 'test',
      version: '2.0.0',
      priority: 'NORMAL'
    },
    fundProfile: {
      fundName: 'Sample ESG Fund',
      fundType: 'UCITS',
      domicile: 'LU',
      totalAssets: 1000000000,
      currency: 'EUR',
      assetClasses: ['EQUITY', 'FIXED_INCOME'],
      investmentStrategy: 'ESG integration with sustainability focus'
    },
    esgIntegration: {
      integrationLevel: 'COMPREHENSIVE',
      esgCriteria: ['Environmental', 'Social', 'Governance'],
      sustainabilityRiskIntegration: true,
      paiConsideration: true,
      paiIndicators: ['GHG_EMISSIONS', 'CARBON_FOOTPRINT'],
      dueDiligencePolicies: {
        esgIntegration: true,
        sustainabilityRisks: true,
        adverseImpacts: true
      },
      engagementPolicies: {
        shareholderEngagement: true,
        votingPolicy: true
      }
    },
    sustainabilityRiskIntegration: {
      identificationProcess: 'Systematic identification of sustainability risks through ESG data analysis and third-party research',
      assessmentMethodology: 'Quantitative and qualitative assessment using proprietary ESG scoring models and scenario analysis',
      integrationInDecisionMaking: 'Integration of sustainability risk assessment into investment committee decisions and portfolio construction'
    },
    sustainabilityObjectives: {
      hasEnvironmentalObjectives: true,
      hasSocialObjectives: true,
      environmentalObjectives: ['Climate change mitigation'],
      socialObjectives: ['Social equality'],
      sustainableInvestmentPercentage: 80
    }
  };
}

/**
 * Get engine version information
 */
export function getEngineVersion(): {
  version: string;
  buildDate: string;
  features: string[];
} {
  return {
    version: '2.0.0-alpha',
    buildDate: new Date().toISOString(),
    features: [
      'AI-Powered Classification',
      'Multi-Agent Orchestration',
      'Confidence-Driven Decisions',
      'Comprehensive Explainability',
      'Regulatory Risk Assessment',
      'Real-time Processing',
      'Batch Processing',
      'Performance Monitoring',
      'Audit Trail',
      'Knowledge Graph Integration'
    ]
  };
}

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Default confidence thresholds
 */
export const DEFAULT_CONFIDENCE_THRESHOLDS = {
  automated: 90,
  humanReview: 70,
  expertConsultation: 50
} as const;

/**
 * Supported SFDR article types
 */
export const SUPPORTED_SFDR_ARTICLES = [
  'ARTICLE_6',
  'ARTICLE_8',
  'ARTICLE_9'
] as const;

/**
 * Default PAI indicators
 */
export const DEFAULT_PAI_INDICATORS = [
  'GHG_EMISSIONS',
  'CARBON_FOOTPRINT',
  'BIODIVERSITY',
  'WATER_USAGE',
  'WASTE_GENERATION',
  'SOCIAL_VIOLATIONS',
  'BOARD_DIVERSITY',
  'EXECUTIVE_PAY',
  'ANTI_CORRUPTION',
  'HUMAN_RIGHTS'
] as const;

/**
 * Default taxonomy activities
 */
export const DEFAULT_TAXONOMY_ACTIVITIES = [
  'CLIMATE_CHANGE_MITIGATION',
  'CLIMATE_CHANGE_ADAPTATION',
  'WATER_PROTECTION',
  'CIRCULAR_ECONOMY',
  'POLLUTION_PREVENTION',
  'BIODIVERSITY_PROTECTION'
] as const;

/**
 * Engine status constants
 */
export const ENGINE_STATUS = {
  HEALTHY: 'HEALTHY',
  DEGRADED: 'DEGRADED',
  UNHEALTHY: 'UNHEALTHY'
} as const;

/**
 * Processing status constants
 */
export const PROCESSING_STATUS = {
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
  PARTIAL: 'PARTIAL',
  TIMEOUT: 'TIMEOUT'
} as const;

/**
 * Decision types
 */
export const DECISION_TYPES = {
  AUTOMATED: 'AUTOMATED',
  HUMAN_REVIEW: 'HUMAN_REVIEW',
  EXPERT_CONSULTATION: 'EXPERT_CONSULTATION',
  ESCALATION: 'ESCALATION'
} as const;