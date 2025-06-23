/**
 * SFDR Navigator Agent - AI Engine Module
 * Phase 2A: Main exports for the AI Classification Engine
 *
 * Centralized exports for the AI-powered SFDR classification system
 */
export { SFDRClassificationEngine, ClassificationMetrics } from './classification-engine.js';
export type { ValidationError, ComponentHealth, EngineHealthStatus } from './classification-engine.js';
export type { SFDRClassificationRequest, SFDRClassificationResponse, EngineConfiguration, ValidationResult, ValidationWarning, ValidationSuggestion, ProcessingStage, ProcessingPipeline, ProcessingContext, ProcessingError, ProcessingWarning, AgentExecutionResult, OrchestrationResult, PerformanceMetrics, QualityMetrics, BusinessMetrics, AuditTrailEntry, ApiResponse, PaginatedResponse, QueryOptions } from './types.js';
export { AgentOrchestrator } from '../orchestration/orchestrator.js';
export { ConfidenceFramework } from '../confidence/framework.js';
export { ExplainabilityEngine, RegulatoryKnowledgeService } from '../explainability/engine.js';
export type { Agent, AgentCapability, AgentExecutionContext, AgentResponse, DocumentIntelligenceAgent, ClassificationAgent, PAIAnalysisAgent, TaxonomyAlignmentAgent, QualityAssuranceAgent, ConfidenceDrivenClassification, ExplainabilityLevel, ExplainabilityResponse, RegulatoryRiskAssessment, InterAgentCommunication, AgentOrchestrationWorkflow } from '../agents/types.js';
export type { ConfidenceScore, ConfidenceFactors, DecisionType, EscalationTrigger, ClassificationContext } from '../confidence/framework.js';
export type { RegulatoryKnowledgeGraph, RegulationNode, InterpretationNode, ComplianceCaseNode, RegulatoryChangeNode, ConflictResolutionNode, KnowledgeGraphQuery, KnowledgeGraphUpdate, GraphTraversalResult } from '../knowledge/graph.js';
import { SFDRClassificationEngine } from './classification-engine.js.js';
/**
 * Create a new SFDR Classification Engine with default configuration
 */
export declare function createSFDRClassificationEngine(config?: Partial<EngineConfiguration>): SFDRClassificationEngine;
/**
 * Create a new SFDR Classification Engine with production configuration
 */
export declare function createProductionSFDREngine(): SFDRClassificationEngine;
/**
 * Create a new SFDR Classification Engine with development configuration
 */
export declare function createDevelopmentSFDREngine(): SFDRClassificationEngine;
/**
 * Create a new SFDR Classification Engine with testing configuration
 */
export declare function createTestingSFDREngine(): SFDRClassificationEngine;
/**
 * Validate SFDR classification request
 */
export declare function validateSFDRRequest(request: SFDRClassificationRequest): Promise<ValidationResult>;
/**
 * Create a sample SFDR classification request for testing
 */
export declare function createSampleSFDRRequest(): SFDRClassificationRequest;
/**
 * Get engine version information
 */
export declare function getEngineVersion(): {
    version: string;
    buildDate: string;
    features: string[];
};
/**
 * Default confidence thresholds
 */
export declare const DEFAULT_CONFIDENCE_THRESHOLDS: {
    readonly automated: 90;
    readonly humanReview: 70;
    readonly expertConsultation: 50;
};
/**
 * Supported SFDR article types
 */
export declare const SUPPORTED_SFDR_ARTICLES: readonly ["ARTICLE_6", "ARTICLE_8", "ARTICLE_9"];
/**
 * Default PAI indicators
 */
export declare const DEFAULT_PAI_INDICATORS: readonly ["GHG_EMISSIONS", "CARBON_FOOTPRINT", "BIODIVERSITY", "WATER_USAGE", "WASTE_GENERATION", "SOCIAL_VIOLATIONS", "BOARD_DIVERSITY", "EXECUTIVE_PAY", "ANTI_CORRUPTION", "HUMAN_RIGHTS"];
/**
 * Default taxonomy activities
 */
export declare const DEFAULT_TAXONOMY_ACTIVITIES: readonly ["CLIMATE_CHANGE_MITIGATION", "CLIMATE_CHANGE_ADAPTATION", "WATER_PROTECTION", "CIRCULAR_ECONOMY", "POLLUTION_PREVENTION", "BIODIVERSITY_PROTECTION"];
/**
 * Engine status constants
 */
export declare const ENGINE_STATUS: {
    readonly HEALTHY: "HEALTHY";
    readonly DEGRADED: "DEGRADED";
    readonly UNHEALTHY: "UNHEALTHY";
};
/**
 * Processing status constants
 */
export declare const PROCESSING_STATUS: {
    readonly SUCCESS: "SUCCESS";
    readonly ERROR: "ERROR";
    readonly PARTIAL: "PARTIAL";
    readonly TIMEOUT: "TIMEOUT";
};
/**
 * Decision types
 */
export declare const DECISION_TYPES: {
    readonly AUTOMATED: "AUTOMATED";
    readonly HUMAN_REVIEW: "HUMAN_REVIEW";
    readonly EXPERT_CONSULTATION: "EXPERT_CONSULTATION";
    readonly ESCALATION: "ESCALATION";
};
//# sourceMappingURL=index.d.ts.map