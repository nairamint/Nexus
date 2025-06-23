/**
 * Phase 2B Integration Layer
 * Connects all advanced components for the SFDR Navigator Agent
 */
import { SFDRClassificationEngine } from '../ai/classification-engine.js';
import { AgentOrchestrator } from '../ai/orchestrator.js';
import { ConfidenceFramework } from '../ai/framework.js';
import { ExplainabilityEngine } from '../ai/engine.js';
import { SFDRComplianceValidator } from '../domain/sfdr/validator.js';
import { SFDRClassificationRequest, SFDRClassificationResponse, HumanFeedback, ModelPerformanceMetrics, MultiLanguageClassificationResponse, AnalyticsReport, ComplianceAssessment } from '../types.js';
/**
 * Phase 2B configuration interface
 */
export interface Phase2BConfig {
    ml: {
        enableGraphNeuralNetwork: boolean;
        enableEnsembleModel: boolean;
        modelUpdateThreshold: number;
    };
    learning: {
        enableContinuousLearning: boolean;
        feedbackProcessingInterval: number;
        modelRetrainingThreshold: number;
    };
    language: {
        enableMultiLanguage: boolean;
        supportedLanguages: string[];
        translationQualityThreshold: number;
    };
    analytics: {
        enableAdvancedAnalytics: boolean;
        reportGenerationInterval: number;
        predictiveInsightsEnabled: boolean;
    };
    governance: {
        enableComplianceFramework: boolean;
        auditTrailRetention: number;
        riskAssessmentInterval: number;
    };
    performance: {
        enableOptimization: boolean;
        cachingEnabled: boolean;
        autoScalingEnabled: boolean;
    };
    federated: {
        enableFederatedLearning: boolean;
        privacyPreservationLevel: 'basic' | 'advanced' | 'maximum';
        participantThreshold: number;
    };
}
/**
 * Phase 2B integration response
 */
export interface Phase2BResponse extends SFDRClassificationResponse {
    multiLanguageSupport?: MultiLanguageClassificationResponse;
    analytics?: {
        performanceMetrics: ModelPerformanceMetrics;
        predictiveInsights: any[];
        realTimeMetrics: any;
    };
    governance?: {
        complianceStatus: ComplianceAssessment;
        auditTrail: any[];
        riskAssessment: any;
    };
    performance?: {
        processingTime: number;
        cacheHitRate: number;
        resourceUtilization: any;
    };
    federatedLearning?: {
        participationStatus: string;
        privacyMetrics: any;
        modelVersion: string;
    };
}
/**
 * Main Phase 2B integration engine
 */
export declare class Phase2BIntegrationEngine {
    private config;
    private mlModels;
    private learningEngine?;
    private languageEngine?;
    private analyticsEngine?;
    private governanceFramework?;
    private performanceEngine?;
    private federatedCoordinator?;
    private classificationEngine;
    private orchestrator;
    private confidenceFramework;
    private explainabilityEngine;
    private validator;
    constructor(config: Phase2BConfig, coreEngines: {
        classificationEngine: SFDRClassificationEngine;
        orchestrator: AgentOrchestrator;
        confidenceFramework: ConfidenceFramework;
        explainabilityEngine: ExplainabilityEngine;
        validator: SFDRComplianceValidator;
    });
    /**
     * Initialize Phase 2B components
     */
    initialize(): Promise<void>;
    /**
     * Process SFDR classification with Phase 2B enhancements
     */
    classifyWithEnhancements(request: SFDRClassificationRequest): Promise<Phase2BResponse>;
    /**
     * Process human feedback with Phase 2B enhancements
     */
    processFeedbackWithEnhancements(feedback: HumanFeedback): Promise<void>;
    /**
     * Generate comprehensive analytics report
     */
    generateAnalyticsReport(timeRange: {
        start: string;
        end: string;
    }): Promise<AnalyticsReport>;
    /**
     * Get system health status
     */
    getSystemHealth(): Promise<any>;
    /**
     * Shutdown Phase 2B components
     */
    shutdown(): Promise<void>;
    private getPerformanceMetrics;
}
/**
 * Factory function to create Phase 2B integration engine
 */
export declare function createPhase2BEngine(config: Phase2BConfig, coreEngines: {
    classificationEngine: SFDRClassificationEngine;
    orchestrator: AgentOrchestrator;
    confidenceFramework: ConfidenceFramework;
    explainabilityEngine: ExplainabilityEngine;
    validator: SFDRComplianceValidator;
}): Promise<Phase2BIntegrationEngine>;
/**
 * Default Phase 2B configuration
 */
export declare const defaultPhase2BConfig: Phase2BConfig;
//# sourceMappingURL=phase2b-integration.d.ts.map