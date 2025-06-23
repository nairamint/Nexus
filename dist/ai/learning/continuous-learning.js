/**
 * SFDR Navigator Agent - Continuous Learning System
 * Phase 2B: Real-time Learning Infrastructure
 *
 * Implements MLOps pipeline for continuous model improvement through
 * feedback loops, incremental learning, and model versioning
 */
// ============================================================================
// CONTINUOUS LEARNING ENGINE
// ============================================================================
/**
 * Main continuous learning engine
 */
export class ContinuousLearningEngine {
    feedbackStore;
    modelVersionManager;
    driftDetector;
    incrementalLearner;
    performanceMonitor;
    regulatoryValidator;
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
    async processFeedback(feedback, originalRequest, originalResponse) {
        try {
            // Store feedback
            await this.feedbackStore.storeFeedback(feedback);
            // Analyze feedback impact
            const impactAnalysis = await this.analyzeFeedbackImpact(feedback, originalRequest, originalResponse);
            // Determine if model update is needed
            const updateDecision = await this.determineUpdateNeed(feedback, impactAnalysis);
            if (updateDecision.shouldUpdate) {
                // Trigger incremental learning
                const learningResult = await this.triggerIncrementalLearning(feedback, originalRequest, updateDecision);
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
        }
        catch (error) {
            throw new Error(`Feedback processing failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    /**
     * Monitor model performance and detect drift
     */
    async monitorModelPerformance(modelId, recentClassifications) {
        // Detect performance drift
        const driftDetection = await this.driftDetector.detectDrift(modelId, recentClassifications);
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
    async createModelVersion(modelId, changes, performanceMetrics, regulatoryImpact) {
        // Generate new version
        const newVersion = await this.modelVersionManager.createVersion(modelId, changes, performanceMetrics);
        // Get regulatory approval if needed
        if (regulatoryImpact !== 'low') {
            const approval = await this.regulatoryValidator.requestApproval(newVersion, regulatoryImpact);
            newVersion.regulatoryApproval = approval;
        }
        return newVersion;
    }
    async analyzeFeedbackImpact(feedback, originalRequest, originalResponse) {
        return {
            impactScore: this.calculateImpactScore(feedback),
            affectedFeatures: this.identifyAffectedFeatures(originalRequest, feedback),
            regulatoryImplications: this.assessRegulatoryImplications(feedback),
            confidenceImpact: this.assessConfidenceImpact(feedback, originalResponse)
        };
    }
    calculateImpactScore(feedback) {
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
    identifyAffectedFeatures(request, feedback) {
        // Analyze which features might be affected by the feedback
        const features = [];
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
    assessRegulatoryImplications(feedback) {
        const implications = [];
        // Extract regulatory references from feedback
        const regulatoryPattern = /(SFDR|Article|Regulation|Delegated)\s+[\w\s\d\/\(\)]+/gi;
        const matches = feedback.regulatoryJustification.match(regulatoryPattern);
        if (matches) {
            implications.push(...matches);
        }
        return implications;
    }
    assessConfidenceImpact(feedback, originalResponse) {
        if (feedback.feedbackType === 'correction') {
            // Correction indicates overconfidence
            return -0.2;
        }
        else if (feedback.feedbackType === 'validation' && feedback.confidenceRating >= 4) {
            // High-confidence validation
            return 0.1;
        }
        return 0;
    }
    async determineUpdateNeed(feedback, impactAnalysis) {
        const shouldUpdate = impactAnalysis.impactScore > 0.5 ||
            feedback.priority === 'critical' ||
            feedback.feedbackType === 'correction';
        let updateType = 'incremental';
        if (feedback.priority === 'critical') {
            updateType = 'parameter-adjustment';
        }
        else if (impactAnalysis.impactScore > 0.8) {
            updateType = 'full-retrain';
        }
        return {
            shouldUpdate,
            updateType,
            reason: `Impact score: ${impactAnalysis.impactScore}, Priority: ${feedback.priority}`,
            estimatedImpact: impactAnalysis.impactScore
        };
    }
    async triggerIncrementalLearning(feedback, originalRequest, updateDecision) {
        return await this.incrementalLearner.updateModel(feedback, originalRequest, updateDecision);
    }
    async logDriftDetection(drift) {
        console.log(`Model drift detected: ${drift.driftId}`, {
            modelId: drift.modelId,
            severity: drift.driftSeverity,
            metrics: drift.driftMetrics
        });
    }
    async handleDriftDetection(drift) {
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
    async triggerEmergencyRetrain(modelId) {
        // Implement emergency retraining logic
        console.log(`Emergency retrain triggered for model: ${modelId}`);
    }
    async scheduleRetrain(modelId) {
        // Schedule retraining during maintenance window
        console.log(`Retrain scheduled for model: ${modelId}`);
    }
    async increaseMonitoring(modelId) {
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
    feedback = new Map();
    async storeFeedback(feedback) {
        this.feedback.set(feedback.feedbackId, feedback);
    }
    async getFeedback(feedbackId) {
        return this.feedback.get(feedbackId);
    }
    async getFeedbackByModel(modelId) {
        return Array.from(this.feedback.values())
            .filter(f => f.classificationId.includes(modelId));
    }
}
/**
 * Model version management
 */
export class ModelVersionManager {
    versions = new Map();
    async createVersion(modelId, changes, performanceMetrics) {
        const existingVersions = this.versions.get(modelId) || [];
        const latestVersion = existingVersions[existingVersions.length - 1];
        const newVersion = {
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
    async getLatestVersion(modelId) {
        const versions = this.versions.get(modelId);
        return versions?.[versions.length - 1];
    }
    async getProductionVersion(modelId) {
        const versions = this.versions.get(modelId) || [];
        return versions.find(v => v.status === 'production');
    }
}
/**
 * Model drift detection
 */
export class ModelDriftDetector {
    async detectDrift(modelId, recentClassifications) {
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
    calculateCorrectionRate(classifications) {
        const corrections = classifications.filter(c => c.feedback?.feedbackType === 'correction').length;
        return classifications.length > 0 ? corrections / classifications.length : 0;
    }
    calculateConfidenceDrift(classifications) {
        // Calculate drift in confidence scores
        const confidenceScores = classifications.map(c => c.response.confidence.overall);
        if (confidenceScores.length < 2)
            return 0;
        const mean = confidenceScores.reduce((sum, score) => sum + score, 0) / confidenceScores.length;
        const variance = confidenceScores.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) / confidenceScores.length;
        return Math.sqrt(variance);
    }
}
/**
 * Incremental learning implementation
 */
export class IncrementalLearner {
    async updateModel(feedback, originalRequest, updateDecision) {
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
    async trackPerformance(modelId, metrics) {
        // Track performance metrics over time
        console.log(`Performance tracked for model: ${modelId}`, metrics);
    }
}
/**
 * Regulatory validation for model updates
 */
export class RegulatoryValidator {
    async requestApproval(modelVersion, impact) {
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
//# sourceMappingURL=continuous-learning.js.map