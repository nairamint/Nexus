/**
 * SFDR Navigator Agent Phase 2B - Main Entry Point
 *
 * This module exports all Phase 2B components and provides a unified interface
 * for the enhanced SFDR Navigator Agent with advanced AI capabilities.
 *
 * Phase 2B Features:
 * - Advanced ML Models (Graph Neural Networks, Ensemble Learning)
 * - Continuous Learning with Human Feedback
 * - Multi-Language Support (6 EU languages)
 * - Advanced Analytics & Reporting
 * - Governance & Compliance Framework
 * - Performance Optimization & Caching
 * - Privacy-Preserving Federated Learning
 */
export { Phase2BIntegrationEngine, createPhase2BEngine, defaultPhase2BConfig, type Phase2BConfig, type Phase2BResponse } from './integration/phase2b-integration.js';
export { RegulatoryMLModel, RegulatoryGraphNeuralNetwork, RegulatoryEnsembleModel, type ComplianceConstraint, type ModelPerformanceMetrics, type GraphStructure, type AttentionMechanism, type EnsembleVotingStrategy } from './ai/ml/regulatory-models.js';
export { ContinuousLearningEngine, FeedbackStore, ModelVersionManager, ModelDriftDetector, IncrementalLearner, PerformanceMonitor, RegulatoryValidator, type HumanFeedback, type ModelUpdateEvent, type ModelVersion, type RegulatoryApproval, type ModelDriftDetection } from './ai/learning/continuous-learning.js';
export { MultiLanguageEngine, RegulatoryTerminologyManager, ContextAwareTranslationEngine, LanguageDetector, TranslationQualityAssessor, CrossLingualClassifier, JurisdictionMapper, type SupportedLanguage, type RegulatoryJurisdiction, type RegulatoryTerminology, type TranslationContext, type TranslationResult, type MultiLanguageClassificationRequest, type MultiLanguageClassificationResponse } from './ai/language/multi-language-engine.js';
export { AdvancedAnalyticsEngine, AnalyticsDataCollector, MetricsCalculator, DashboardManager, ReportGenerator, PredictiveAnalyzer, RealTimeProcessor, AlertManager, TrendAnalyzer, type AnalyticsPeriod, type MetricType, type DashboardConfig, type AnalyticsWidget, type AlertThreshold, type DashboardFilter, type AnalyticsDataPoint, type AnalyticsReport, type PredictiveInsight, type RealTimeEvent } from './analytics/advanced-analytics.js';
export { GovernanceComplianceFramework, type GovernanceRole, type ComplianceStatus, type AuditEventType, type RiskLevel, type RegulatoryFramework, type GovernancePolicy, type AuditTrailEntry, type ComplianceAssessment, type DataGovernanceRecord } from './governance/compliance-framework.js';
export { PerformanceOptimizationEngine, IntelligentCacheManager, AdaptiveLoadBalancer, AutoScalingManager, QueryOptimizer, PerformanceMonitor as PerfMonitor, AlertingSystem, ResourcePoolManager, DataCompressionEngine, type CacheStrategy, type LoadBalancingStrategy, type ScalingMetric, type QueryOptimizationRule, type PerformanceMetric, type AlertRule, type ResourcePool, type CompressionAlgorithm } from './performance/optimization-engine.js';
export { FederatedLearningCoordinator, FederationManager, PrivacyPreservationEngine, ModelAggregationEngine, SecureCommunicationManager, FederatedSecurityManager, FederatedGovernanceEngine, FederatedMonitoringSystem, type ParticipantType, type PrivacyTechnique, type AggregationStrategy, type CommunicationProtocol, type FederationConfig, type PrivacyConfig, type CommunicationConfig, type AggregationConfig, type SecurityConfig, type GovernanceConfig, type MonitoringConfig, type FederatedRound, type LocalUpdate, type ModelDelta, type AggregationResult } from './ai/federated/federated-learning.js';
export { Phase2BDemo, runPhase2BDemo } from './examples/phase2b-example.js';
export { SFDRClassificationEngine, AgentOrchestrator, ConfidenceFramework, ExplainabilityEngine } from './ai/index.js';
export { SFDRComplianceValidator } from './domain/sfdr/validator.js';
export { type SFDRClassificationRequest, type SFDRClassificationResponse, type SFDRArticleClassification, type EUFundType, type PAIIndicator, type TaxonomyEnvironmentalObjective, type SFDRSubmissionType, type SFDRMetadata, type SFDRFundProfile } from './types.js';
/**
 * Phase 2B Version Information
 */
export declare const PHASE_2B_VERSION = "2.0.0";
export declare const PHASE_2B_BUILD_DATE: string;
export declare const PHASE_2B_FEATURES: readonly ["Advanced ML Models", "Continuous Learning", "Multi-Language Support", "Advanced Analytics", "Governance Framework", "Performance Optimization", "Federated Learning"];
/**
 * Phase 2B System Information
 */
export declare const getPhase2BInfo: () => {
    version: string;
    buildDate: string;
    features: readonly ["Advanced ML Models", "Continuous Learning", "Multi-Language Support", "Advanced Analytics", "Governance Framework", "Performance Optimization", "Federated Learning"];
    description: string;
    capabilities: {
        mlModels: {
            graphNeuralNetworks: boolean;
            ensembleLearning: boolean;
            constitutionalAI: boolean;
        };
        learning: {
            continuousLearning: boolean;
            humanFeedback: boolean;
            modelDriftDetection: boolean;
            incrementalUpdates: boolean;
        };
        languages: {
            supported: string[];
            contextAwareTranslation: boolean;
            crossLingualClassification: boolean;
            regulatoryTerminology: boolean;
        };
        analytics: {
            realTimeMetrics: boolean;
            predictiveInsights: boolean;
            customDashboards: boolean;
            advancedReporting: boolean;
        };
        governance: {
            auditTrails: boolean;
            complianceAssessment: boolean;
            riskManagement: boolean;
            dataGovernance: boolean;
        };
        performance: {
            intelligentCaching: boolean;
            adaptiveLoadBalancing: boolean;
            autoScaling: boolean;
            queryOptimization: boolean;
        };
        privacy: {
            federatedLearning: boolean;
            differentialPrivacy: boolean;
            homomorphicEncryption: boolean;
            secureAggregation: boolean;
        };
    };
};
/**
 * Quick Start Function for Phase 2B
 */
export declare function quickStartPhase2B(): Promise<Phase2BIntegrationEngine>;
/**
 * Health Check Function for Phase 2B
 */
export declare function healthCheckPhase2B(engine: Phase2BIntegrationEngine): Promise<{
    status: 'healthy' | 'degraded' | 'unhealthy';
    components: Record<string, boolean>;
    version: string;
    uptime: number;
}>;
//# sourceMappingURL=phase2b.d.ts.map