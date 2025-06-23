/**
 * SFDR Navigator Agent - AI Engine Module
 * Phase 2A: Main exports for the AI Classification Engine
 *
 * Centralized exports for the AI-powered SFDR classification system
 */
// ============================================================================
// MAIN ENGINE EXPORTS
// ============================================================================
export { SFDRClassificationEngine, ClassificationMetrics } from './classification-engine.js';
// ============================================================================
// SUPPORTING COMPONENT EXPORTS
// ============================================================================
// Re-export key components from other modules
export { AgentOrchestrator } from '../orchestration/orchestrator.js';
export { ConfidenceFramework } from '../confidence/framework.js';
export { ExplainabilityEngine, RegulatoryKnowledgeService } from '../explainability/engine.js';
// ============================================================================
// FACTORY FUNCTIONS
// ============================================================================
// Import SFDRClassificationEngine directly to use in factory functions
import { SFDRClassificationEngine } from './classification-engine.js.js';
/**
 * Create a new SFDR Classification Engine with default configuration
 */
export function createSFDRClassificationEngine(config) {
    return new SFDRClassificationEngine(config);
}
/**
 * Create a new SFDR Classification Engine with production configuration
 */
export function createProductionSFDREngine() {
    const productionConfig = {
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
export function createDevelopmentSFDREngine() {
    const developmentConfig = {
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
export function createTestingSFDREngine() {
    const testingConfig = {
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
export async function validateSFDRRequest(request) {
    const engine = createTestingSFDREngine();
    // Use the engine's internal validation logic
    return engine.validateRequest(request);
}
/**
 * Create a sample SFDR classification request for testing
 */
export function createSampleSFDRRequest() {
    return {
        metadata: {
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
            paiIndicators: ['GHG_EMISSIONS', 'CARBON_FOOTPRINT']
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
export function getEngineVersion() {
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
};
/**
 * Supported SFDR article types
 */
export const SUPPORTED_SFDR_ARTICLES = [
    'ARTICLE_6',
    'ARTICLE_8',
    'ARTICLE_9'
];
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
];
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
];
/**
 * Engine status constants
 */
export const ENGINE_STATUS = {
    HEALTHY: 'HEALTHY',
    DEGRADED: 'DEGRADED',
    UNHEALTHY: 'UNHEALTHY'
};
/**
 * Processing status constants
 */
export const PROCESSING_STATUS = {
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
    PARTIAL: 'PARTIAL',
    TIMEOUT: 'TIMEOUT'
};
/**
 * Decision types
 */
export const DECISION_TYPES = {
    AUTOMATED: 'AUTOMATED',
    HUMAN_REVIEW: 'HUMAN_REVIEW',
    EXPERT_CONSULTATION: 'EXPERT_CONSULTATION',
    ESCALATION: 'ESCALATION'
};
//# sourceMappingURL=index.js.map