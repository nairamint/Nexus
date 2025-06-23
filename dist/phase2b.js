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
// Core Phase 2B Integration
export { Phase2BIntegrationEngine, createPhase2BEngine, defaultPhase2BConfig } from './integration/phase2b-integration.js';
// Advanced ML Models
export { RegulatoryGraphNeuralNetwork, RegulatoryEnsembleModel } from './ai/ml/regulatory-models.js';
// Continuous Learning
export { ContinuousLearningEngine, FeedbackStore, ModelVersionManager, ModelDriftDetector, IncrementalLearner, PerformanceMonitor, RegulatoryValidator } from './ai/learning/continuous-learning.js';
// Multi-Language Engine
export { MultiLanguageEngine, RegulatoryTerminologyManager, ContextAwareTranslationEngine, LanguageDetector, TranslationQualityAssessor, CrossLingualClassifier, JurisdictionMapper } from './ai/language/multi-language-engine.js';
// Advanced Analytics
export { AdvancedAnalyticsEngine, AnalyticsDataCollector, MetricsCalculator, DashboardManager, ReportGenerator, PredictiveAnalyzer, RealTimeProcessor, AlertManager, TrendAnalyzer } from './analytics/advanced-analytics.js';
// Governance & Compliance
export { GovernanceComplianceFramework } from './governance/compliance-framework.js';
// Performance Optimization
export { PerformanceOptimizationEngine, IntelligentCacheManager, AdaptiveLoadBalancer, AutoScalingManager, QueryOptimizer, PerformanceMonitor as PerfMonitor, AlertingSystem, ResourcePoolManager, DataCompressionEngine } from './performance/optimization-engine.js';
// Federated Learning
export { FederatedLearningCoordinator, FederationManager, PrivacyPreservationEngine, ModelAggregationEngine, SecureCommunicationManager, FederatedSecurityManager, FederatedGovernanceEngine, FederatedMonitoringSystem } from './ai/federated/federated-learning.js';
// Example and Demo
export { Phase2BDemo, runPhase2BDemo } from './examples/phase2b-example.js';
// Re-export Phase 2A components for convenience
export { SFDRClassificationEngine, AgentOrchestrator, ConfidenceFramework, ExplainabilityEngine } from './ai/index.js';
export { SFDRComplianceValidator } from './domain/sfdr/validator.js';
/**
 * Phase 2B Version Information
 */
export const PHASE_2B_VERSION = '2.0.0';
export const PHASE_2B_BUILD_DATE = new Date().toISOString();
export const PHASE_2B_FEATURES = [
    'Advanced ML Models',
    'Continuous Learning',
    'Multi-Language Support',
    'Advanced Analytics',
    'Governance Framework',
    'Performance Optimization',
    'Federated Learning'
];
/**
 * Phase 2B System Information
 */
export const getPhase2BInfo = () => ({
    version: PHASE_2B_VERSION,
    buildDate: PHASE_2B_BUILD_DATE,
    features: PHASE_2B_FEATURES,
    description: 'SFDR Navigator Agent Phase 2B - AI-Powered Regulatory Compliance Platform',
    capabilities: {
        mlModels: {
            graphNeuralNetworks: true,
            ensembleLearning: true,
            constitutionalAI: true
        },
        learning: {
            continuousLearning: true,
            humanFeedback: true,
            modelDriftDetection: true,
            incrementalUpdates: true
        },
        languages: {
            supported: ['en', 'fr', 'de', 'es', 'it', 'nl'],
            contextAwareTranslation: true,
            crossLingualClassification: true,
            regulatoryTerminology: true
        },
        analytics: {
            realTimeMetrics: true,
            predictiveInsights: true,
            customDashboards: true,
            advancedReporting: true
        },
        governance: {
            auditTrails: true,
            complianceAssessment: true,
            riskManagement: true,
            dataGovernance: true
        },
        performance: {
            intelligentCaching: true,
            adaptiveLoadBalancing: true,
            autoScaling: true,
            queryOptimization: true
        },
        privacy: {
            federatedLearning: true,
            differentialPrivacy: true,
            homomorphicEncryption: true,
            secureAggregation: true
        }
    }
});
/**
 * Quick Start Function for Phase 2B
 */
export async function quickStartPhase2B() {
    console.log('🚀 Quick Starting SFDR Navigator Agent Phase 2B...');
    const engine = await createPhase2BEngine();
    console.log('✅ Phase 2B Engine initialized with default configuration');
    console.log('📋 Available features:', PHASE_2B_FEATURES.join(', '));
    return engine;
}
/**
 * Health Check Function for Phase 2B
 */
export async function healthCheckPhase2B(engine) {
    try {
        const health = await engine.getSystemHealth();
        return {
            status: health.overall,
            components: health.components,
            version: PHASE_2B_VERSION,
            uptime: health.metrics.uptime
        };
    }
    catch (error) {
        return {
            status: 'unhealthy',
            components: {},
            version: PHASE_2B_VERSION,
            uptime: 0
        };
    }
}
//# sourceMappingURL=phase2b.js.map