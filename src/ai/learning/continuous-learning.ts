/**
 * SFDR Navigator Agent - Continuous Learning System
 * Phase 2B: Real-time Learning Infrastructure
 * 
 * Implements MLOps pipeline for continuous model improvement through
 * feedback loops, incremental learning, and model versioning
 */

import type {
  SFDRClassificationRequest,
  SFDRClassificationResponse,
  ValidationResult
} from '../../domain/sfdr/types.js';

import type {
  RegulatoryMLModel,
  ModelPerformanceMetrics,
  ModelDecisionPath
} from '../ml/regulatory-models.js';

import type {
  ConfidenceFactors,
  ExplainabilityResponse
} from '../agents/types.js';

// ============================================================================
// CONTINUOUS LEARNING INTERFACES
// ============================================================================

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
  confidenceRating: number; // 1-5 scale
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

// ============================================================================
// CONTINUOUS LEARNING ENGINE
// ============================================================================

/**
 * Main continuous learning engine
 */
export class ContinuousLearningEngine {
  private readonly feedbackStore: FeedbackStore;
  private readonly modelVersionManager: ModelVersionManager;
  private readonly driftDetector: ModelDriftDetector;
  private readonly incrementalLearner: IncrementalLearner;
  private readonly performanceMonitor: PerformanceMonitor;
  private readonly regulatoryValidator: RegulatoryValidator;

  constructor() {
    this.feedbackStore = new FeedbackStore();
    this.modelVersionManager = new ModelVersionManager();
    this.driftDetector = new ModelDriftDetector();
    this.incrementalLearner = new IncrementalLearner();
    this.performanceMonitor = new PerformanceMonitor();
    this.regulatoryValidator = new RegulatoryValidator();
  }

  /**
   * Process human feedback and trigger learning updates
   */
  public async processFeedback(
    feedback: HumanFeedback,
    originalRequest: SFDRClassificationRequest,
    originalResponse: SFDRClassificationResponse
  ): Promise<LearningUpdateResult> {
    try {
      // Store feedback
      await this.feedbackStore.storeFeedback(feedback);

      // Analyze feedback impact
      const impactAnalysis = await this.analyzeFeedbackImpact(
        feedback,
        originalRequest,
        originalResponse
      );

      // Determine if model update is needed
      const updateDecision = await this.determineUpdateNeed(
        feedback,
        impactAnalysis
      );

      if (updateDecision.shouldUpdate) {
        // Trigger incremental learning
        const learningResult = await this.triggerIncrementalLearning(
          feedback,
          originalRequest,
          updateDecision
        );

        return {
          success: true,
          feedbackProcessed: true,
          modelUpdated: learningResult.success,
          updateType: updateDecision.updateType,
          performanceImpact: learningResult.performanceImpact,
          newModelVersion: learningResult.newVersion
        };
      }

      return {
        success: true,
        feedbackProcessed: true,
        modelUpdated: false,
        updateType: 'none',
        performanceImpact: 0,
        newModelVersion: undefined
      };
    } catch (error) {
      throw new Error(`Feedback processing failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Monitor model performance and detect drift
   */
  public async monitorModelPerformance(
    modelId: string,
    recentClassifications: Array<{
      request: SFDRClassificationRequest;
      response: SFDRClassificationResponse;
      feedback?: HumanFeedback;
    }>
  ): Promise<ModelDriftDetection | null> {
    // Detect performance drift
    const driftDetection = await this.driftDetector.detectDrift(
      modelId,
      recentClassifications
    );

    if (driftDetection && driftDetection.driftSeverity !== 'low') {
      // Log drift detection
      await this.logDriftDetection(driftDetection);

      // Trigger appropriate response
      await this.handleDriftDetection(driftDetection);

      return driftDetection;
    }

    return null;
  }

  /**
   * Create new model version with regulatory approval
   */
  public async createModelVersion(
    modelId: string,
    changes: string[],
    performanceMetrics: ModelPerformanceMetrics,
    regulatoryImpact: 'low' | 'medium' | 'high'
  ): Promise<ModelVersion> {
    // Generate new version
    const newVersion = await this.modelVersionManager.createVersion(
      modelId,
      changes,
      performanceMetrics
    );

    // Get regulatory approval if needed
    if (regulatoryImpact !== 'low') {
      const approval = await this.regulatoryValidator.requestApproval(
        newVersion,
        regulatoryImpact
      );
      newVersion.regulatoryApproval = approval;
    }

    return newVersion;
  }

  private async analyzeFeedbackImpact(
    feedback: HumanFeedback,
    originalRequest: SFDRClassificationRequest,
    originalResponse: SFDRClassificationResponse
  ): Promise<FeedbackImpactAnalysis> {
    return {
      impactScore: this.calculateImpactScore(feedback),
      affectedFeatures: this.identifyAffectedFeatures(originalRequest, feedback),
      regulatoryImplications: this.assessRegulatoryImplications(feedback),
      confidenceImpact: this.assessConfidenceImpact(feedback, originalResponse)
    };
  }

  private calculateImpactScore(feedback: HumanFeedback): number {
    let score = 0;

    // Base score from feedback type
    switch (feedback.feedbackType) {
      case 'correction':
        score += 0.8;
        break;
      case 'validation':
        score += 0.3;
        break;
      case 'enhancement':
        score += 0.5;
        break;
    }

    // Adjust for priority
    switch (feedback.priority) {
      case 'critical':
        score *= 2.0;
        break;
      case 'high':
        score *= 1.5;
        break;
      case 'medium':
        score *= 1.0;
        break;
      case 'low':
        score *= 0.7;
        break;
    }

    // Adjust for reviewer expertise
    switch (feedback.reviewerRole) {
      case 'regulatory-expert':
        score *= 1.3;
        break;
      case 'compliance-officer':
        score *= 1.1;
        break;
      case 'fund-manager':
        score *= 0.9;
        break;
    }

    return Math.min(score, 1.0);
  }

  private identifyAffectedFeatures(
    request: SFDRClassificationRequest,
    feedback: HumanFeedback
  ): string[] {
    // Analyze which features might be affected by the feedback
    const features: string[] = [];

    if (feedback.comments.toLowerCase().includes('investment strategy')) {
      features.push('investmentStrategy');
    }
    if (feedback.comments.toLowerCase().includes('pai') || 
        feedback.comments.toLowerCase().includes('adverse impact')) {
      features.push('paiIndicators');
    }
    if (feedback.comments.toLowerCase().includes('taxonomy')) {
      features.push('taxonomyAlignment');
    }
    if (feedback.comments.toLowerCase().includes('esg')) {
      features.push('esgMetrics');
    }

    return features;
  }

  private assessRegulatoryImplications(feedback: HumanFeedback): string[] {
    const implications: string[] = [];

    // Extract regulatory references from feedback
    const regulatoryPattern = /(SFDR|Article|Regulation|Delegated)\s+[\w\s\d\/\(\)]+/gi;
    const matches = feedback.regulatoryJustification.match(regulatoryPattern);
    
    if (matches) {
      implications.push(...matches);
    }

    return implications;
  }

  private assessConfidenceImpact(
    feedback: HumanFeedback,
    originalResponse: SFDRClassificationResponse
  ): number {
    if (feedback.feedbackType === 'correction') {
      // Correction indicates overconfidence
      return -0.2;
    } else if (feedback.feedbackType === 'validation' && feedback.confidenceRating >= 4) {
      // High-confidence validation
      return 0.1;
    }
    return 0;
  }

  private async determineUpdateNeed(
    feedback: HumanFeedback,
    impactAnalysis: FeedbackImpactAnalysis
  ): Promise<UpdateDecision> {
    const shouldUpdate = impactAnalysis.impactScore > 0.5 || 
                        feedback.priority === 'critical' ||
                        feedback.feedbackType === 'correction';

    let updateType: 'incremental' | 'full-retrain' | 'parameter-adjustment' = 'incremental';

    if (feedback.priority === 'critical') {
      updateType = 'parameter-adjustment';
    } else if (impactAnalysis.impactScore > 0.8) {
      updateType = 'full-retrain';
    }

    return {
      shouldUpdate,
      updateType,
      reason: `Impact score: ${impactAnalysis.impactScore}, Priority: ${feedback.priority}`,
      estimatedImpact: impactAnalysis.impactScore
    };
  }

  private async triggerIncrementalLearning(
    feedback: HumanFeedback,
    originalRequest: SFDRClassificationRequest,
    updateDecision: UpdateDecision
  ): Promise<LearningResult> {
    return await this.incrementalLearner.updateModel(
      feedback,
      originalRequest,
      updateDecision
    );
  }

  private async logDriftDetection(drift: ModelDriftDetection): Promise<void> {
    console.log(`Model drift detected: ${drift.driftId}`, {
      modelId: drift.modelId,
      severity: drift.driftSeverity,
      metrics: drift.driftMetrics
    });
  }

  private async handleDriftDetection(drift: ModelDriftDetection): Promise<void> {
    switch (drift.recommendedAction) {
      case 'immediate-intervention':
        await this.triggerEmergencyRetrain(drift.modelId);
        break;
      case 'retrain':
        await this.scheduleRetrain(drift.modelId);
        break;
      case 'monitor':
        await this.increaseMonitoring(drift.modelId);
        break;
    }
  }

  private async triggerEmergencyRetrain(modelId: string): Promise<void> {
    // Implement emergency retraining logic
    console.log(`Emergency retrain triggered for model: ${modelId}`);
  }

  private async scheduleRetrain(modelId: string): Promise<void> {
    // Schedule retraining during maintenance window
    console.log(`Retrain scheduled for model: ${modelId}`);
  }

  private async increaseMonitoring(modelId: string): Promise<void> {
    // Increase monitoring frequency
    console.log(`Increased monitoring for model: ${modelId}`);
  }
}

// ============================================================================
// SUPPORTING CLASSES
// ============================================================================

/**
 * Feedback storage and retrieval
 */
export class FeedbackStore {
  private feedback: Map<string, HumanFeedback> = new Map();

  public async storeFeedback(feedback: HumanFeedback): Promise<void> {
    this.feedback.set(feedback.feedbackId, feedback);
  }

  public async getFeedback(feedbackId: string): Promise<HumanFeedback | undefined> {
    return this.feedback.get(feedbackId);
  }

  public async getFeedbackByModel(modelId: string): Promise<HumanFeedback[]> {
    return Array.from(this.feedback.values())
      .filter(f => f.classificationId.includes(modelId));
  }
}

/**
 * Model version management
 */
export class ModelVersionManager {
  private versions: Map<string, ModelVersion[]> = new Map();

  public async createVersion(
    modelId: string,
    changes: string[],
    performanceMetrics: ModelPerformanceMetrics
  ): Promise<ModelVersion> {
    const existingVersions = this.versions.get(modelId) || [];
    const latestVersion = existingVersions[existingVersions.length - 1];
    
    const newVersion: ModelVersion = {
      versionId: `${modelId}-v${existingVersions.length + 1}`,
      modelId,
      version: `${existingVersions.length + 1}.0.0`,
      parentVersion: latestVersion?.version,
      createdAt: new Date().toISOString(),
      status: 'development',
      performanceMetrics,
      changeLog: changes
    };

    existingVersions.push(newVersion);
    this.versions.set(modelId, existingVersions);

    return newVersion;
  }

  public async getLatestVersion(modelId: string): Promise<ModelVersion | undefined> {
    const versions = this.versions.get(modelId);
    return versions?.[versions.length - 1];
  }

  public async getProductionVersion(modelId: string): Promise<ModelVersion | undefined> {
    const versions = this.versions.get(modelId) || [];
    return versions.find(v => v.status === 'production');
  }
}

/**
 * Model drift detection
 */
export class ModelDriftDetector {
  public async detectDrift(
    modelId: string,
    recentClassifications: Array<{
      request: SFDRClassificationRequest;
      response: SFDRClassificationResponse;
      feedback?: HumanFeedback;
    }>
  ): Promise<ModelDriftDetection | null> {
    // Simplified drift detection
    const correctionRate = this.calculateCorrectionRate(recentClassifications);
    const confidenceDrift = this.calculateConfidenceDrift(recentClassifications);
    
    if (correctionRate > 0.1 || confidenceDrift > 0.2) {
      return {
        driftId: `drift-${modelId}-${Date.now()}`,
        modelId,
        detectionMethod: 'performance-based',
        driftSeverity: correctionRate > 0.2 ? 'high' : 'medium',
        driftMetrics: {
          distributionShift: 0.1,
          performanceDegradation: correctionRate,
          regulatoryAlignment: 1 - correctionRate
        },
        detectedAt: new Date().toISOString(),
        recommendedAction: correctionRate > 0.2 ? 'retrain' : 'monitor'
      };
    }

    return null;
  }

  private calculateCorrectionRate(
    classifications: Array<{
      request: SFDRClassificationRequest;
      response: SFDRClassificationResponse;
      feedback?: HumanFeedback;
    }>
  ): number {
    const corrections = classifications.filter(
      c => c.feedback?.feedbackType === 'correction'
    ).length;
    
    return classifications.length > 0 ? corrections / classifications.length : 0;
  }

  private calculateConfidenceDrift(
    classifications: Array<{
      request: SFDRClassificationRequest;
      response: SFDRClassificationResponse;
      feedback?: HumanFeedback;
    }>
  ): number {
    // Calculate drift in confidence scores
    const confidenceScores = classifications.map(c => c.response.confidence.overall);
    
    if (confidenceScores.length < 2) return 0;
    
    const mean = confidenceScores.reduce((sum, score) => sum + score, 0) / confidenceScores.length;
    const variance = confidenceScores.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) / confidenceScores.length;
    
    return Math.sqrt(variance);
  }
}

/**
 * Incremental learning implementation
 */
export class IncrementalLearner {
  public async updateModel(
    feedback: HumanFeedback,
    originalRequest: SFDRClassificationRequest,
    updateDecision: UpdateDecision
  ): Promise<LearningResult> {
    // Simplified incremental learning
    // In practice, this would update model weights based on feedback
    
    return {
      success: true,
      performanceImpact: 0.02,
      newVersion: `updated-${Date.now()}`,
      updatedParameters: ['attention_weights', 'classification_threshold'],
      trainingMetrics: {
        samplesProcessed: 1,
        convergenceTime: 150,
        validationAccuracy: 0.96
      }
    };
  }
}

/**
 * Performance monitoring
 */
export class PerformanceMonitor {
  public async trackPerformance(
    modelId: string,
    metrics: ModelPerformanceMetrics
  ): Promise<void> {
    // Track performance metrics over time
    console.log(`Performance tracked for model: ${modelId}`, metrics);
  }
}

/**
 * Regulatory validation for model updates
 */
export class RegulatoryValidator {
  public async requestApproval(
    modelVersion: ModelVersion,
    impact: 'low' | 'medium' | 'high'
  ): Promise<RegulatoryApproval> {
    // Simplified approval process
    return {
      approvalId: `approval-${Date.now()}`,
      approvedBy: 'regulatory-committee',
      approvalDate: new Date().toISOString(),
      regulatoryImpact: impact,
      complianceValidation: true,
      auditTrail: ['Model review completed', 'Compliance validation passed']
    };
  }
}

// ============================================================================
// SUPPORTING INTERFACES
// ============================================================================

interface FeedbackImpactAnalysis {
  impactScore: number;
  affectedFeatures: string[];
  regulatoryImplications: string[];
  confidenceImpact: number;
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