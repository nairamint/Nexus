/**
 * SFDR Navigator Agent - Continuous Learning System
 * Phase 2B: Real-time Learning Infrastructure
 *
 * Implements MLOps pipeline for continuous model improvement through
 * feedback loops, incremental learning, and model versioning
 */
import type { SFDRClassificationRequest, SFDRClassificationResponse } from '../../domain/sfdr/types.js';
import type { ModelPerformanceMetrics } from '../ml/regulatory-models.js';
/**
 * Feedback from human reviewers
 */
export interface HumanFeedback {
    feedbackId: string;
    classificationId: string;
    reviewerId: string;
    reviewerRole: 'compliance-officer' | 'regulatory-expert' | 'fund-manager';
    originalClassification: string;
    correctedClassification?: string;
    confidenceRating: number;
    feedbackType: 'correction' | 'validation' | 'enhancement';
    comments: string;
    regulatoryJustification: string;
    timestamp: string;
    priority: 'low' | 'medium' | 'high' | 'critical';
}
/**
 * Model update event
 */
export interface ModelUpdateEvent {
    eventId: string;
    modelId: string;
    updateType: 'incremental' | 'full-retrain' | 'parameter-adjustment';
    triggerReason: string;
    feedbackCount: number;
    performanceImprovement: number;
    timestamp: string;
    approvedBy: string;
}
/**
 * Model version metadata
 */
export interface ModelVersion {
    versionId: string;
    modelId: string;
    version: string;
    parentVersion?: string;
    createdAt: string;
    deployedAt?: string;
    retiredAt?: string;
    status: 'development' | 'testing' | 'production' | 'retired';
    performanceMetrics: ModelPerformanceMetrics;
    changeLog: string[];
    regulatoryApproval?: RegulatoryApproval;
}
/**
 * Regulatory approval for model changes
 */
export interface RegulatoryApproval {
    approvalId: string;
    approvedBy: string;
    approvalDate: string;
    regulatoryImpact: 'low' | 'medium' | 'high';
    complianceValidation: boolean;
    auditTrail: string[];
    conditions?: string[];
}
/**
 * Model drift detection result
 */
export interface ModelDriftDetection {
    driftId: string;
    modelId: string;
    detectionMethod: 'statistical' | 'performance-based' | 'regulatory-change';
    driftSeverity: 'low' | 'medium' | 'high' | 'critical';
    driftMetrics: {
        distributionShift: number;
        performanceDegradation: number;
        regulatoryAlignment: number;
    };
    detectedAt: string;
    recommendedAction: 'monitor' | 'retrain' | 'immediate-intervention';
}
/**
 * Main continuous learning engine
 */
export declare class ContinuousLearningEngine {
    private readonly feedbackStore;
    private readonly modelVersionManager;
    private readonly driftDetector;
    private readonly incrementalLearner;
    private readonly performanceMonitor;
    private readonly regulatoryValidator;
    constructor();
    /**
     * Process human feedback and trigger learning updates
     */
    processFeedback(feedback: HumanFeedback, originalRequest: SFDRClassificationRequest, originalResponse: SFDRClassificationResponse): Promise<LearningUpdateResult>;
    /**
     * Monitor model performance and detect drift
     */
    monitorModelPerformance(modelId: string, recentClassifications: Array<{
        request: SFDRClassificationRequest;
        response: SFDRClassificationResponse;
        feedback?: HumanFeedback;
    }>): Promise<ModelDriftDetection | null>;
    /**
     * Create new model version with regulatory approval
     */
    createModelVersion(modelId: string, changes: string[], performanceMetrics: ModelPerformanceMetrics, regulatoryImpact: 'low' | 'medium' | 'high'): Promise<ModelVersion>;
    private analyzeFeedbackImpact;
    private calculateImpactScore;
    private identifyAffectedFeatures;
    private assessRegulatoryImplications;
    private assessConfidenceImpact;
    private determineUpdateNeed;
    private triggerIncrementalLearning;
    private logDriftDetection;
    private handleDriftDetection;
    private triggerEmergencyRetrain;
    private scheduleRetrain;
    private increaseMonitoring;
}
/**
 * Feedback storage and retrieval
 */
export declare class FeedbackStore {
    private feedback;
    storeFeedback(feedback: HumanFeedback): Promise<void>;
    getFeedback(feedbackId: string): Promise<HumanFeedback | undefined>;
    getFeedbackByModel(modelId: string): Promise<HumanFeedback[]>;
}
/**
 * Model version management
 */
export declare class ModelVersionManager {
    private versions;
    createVersion(modelId: string, changes: string[], performanceMetrics: ModelPerformanceMetrics): Promise<ModelVersion>;
    getLatestVersion(modelId: string): Promise<ModelVersion | undefined>;
    getProductionVersion(modelId: string): Promise<ModelVersion | undefined>;
}
/**
 * Model drift detection
 */
export declare class ModelDriftDetector {
    detectDrift(modelId: string, recentClassifications: Array<{
        request: SFDRClassificationRequest;
        response: SFDRClassificationResponse;
        feedback?: HumanFeedback;
    }>): Promise<ModelDriftDetection | null>;
    private calculateCorrectionRate;
    private calculateConfidenceDrift;
}
/**
 * Incremental learning implementation
 */
export declare class IncrementalLearner {
    updateModel(feedback: HumanFeedback, originalRequest: SFDRClassificationRequest, updateDecision: UpdateDecision): Promise<LearningResult>;
}
/**
 * Performance monitoring
 */
export declare class PerformanceMonitor {
    trackPerformance(modelId: string, metrics: ModelPerformanceMetrics): Promise<void>;
}
/**
 * Regulatory validation for model updates
 */
export declare class RegulatoryValidator {
    requestApproval(modelVersion: ModelVersion, impact: 'low' | 'medium' | 'high'): Promise<RegulatoryApproval>;
}
interface UpdateDecision {
    shouldUpdate: boolean;
    updateType: 'incremental' | 'full-retrain' | 'parameter-adjustment';
    reason: string;
    estimatedImpact: number;
}
interface LearningResult {
    success: boolean;
    performanceImpact: number;
    newVersion: string;
    updatedParameters: string[];
    trainingMetrics: {
        samplesProcessed: number;
        convergenceTime: number;
        validationAccuracy: number;
    };
}
interface LearningUpdateResult {
    success: boolean;
    feedbackProcessed: boolean;
    modelUpdated: boolean;
    updateType: string;
    performanceImpact: number;
    newModelVersion?: string;
}
export {};
//# sourceMappingURL=continuous-learning.d.ts.map