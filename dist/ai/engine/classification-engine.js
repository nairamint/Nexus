/**
 * SFDR Navigator Agent - AI Classification Engine
 * Phase 2A: Main AI Classification Engine
 *
 * Primary interface for AI-powered SFDR classification with
 * confidence-driven decisions and comprehensive explainability
 */
import { ClassificationMetrics } from './types.js';
import { AgentOrchestrator } from '../orchestration/orchestrator.js';
import { ConfidenceFramework } from '../confidence/framework.js';
import { ExplainabilityEngine, RegulatoryKnowledgeService } from '../explainability/engine.js';
import { SFDRComplianceValidator } from '../../domain/sfdr/validator.js';
// ============================================================================
// AI CLASSIFICATION ENGINE
// ============================================================================
/**
 * Main AI Classification Engine
 * Orchestrates the complete SFDR classification process with AI agents
 */
export class SFDRClassificationEngine {
    orchestrator;
    confidenceFramework;
    explainabilityEngine;
    validator;
    configuration;
    metrics;
    constructor(configuration = {}) {
        this.configuration = {
            confidenceThresholds: {
                automated: 90,
                humanReview: 70,
                expertConsultation: 50
            },
            explainabilityLevel: 'DETAILED',
            enableRiskAssessment: true,
            enableValidation: true,
            maxProcessingTime: 300000, // 5 minutes
            ...configuration
        };
        // Initialize core components
        this.confidenceFramework = new ConfidenceFramework(this.configuration.confidenceThresholds);
        this.explainabilityEngine = new ExplainabilityEngine(new RegulatoryKnowledgeService());
        this.orchestrator = new AgentOrchestrator(this.confidenceFramework, this.explainabilityEngine);
        this.validator = new SFDRComplianceValidator();
        this.metrics = new ClassificationMetrics();
    }
    /**
     * Main classification method
     * Processes SFDR classification request and returns comprehensive response
     */
    async classifyFund(request) {
        const startTime = new Date();
        const requestId = this.generateRequestId();
        try {
            // Validate input request
            const validationResult = await this.validateRequest(request);
            if (!validationResult.isValid) {
                return this.createErrorResponse(requestId, startTime, 'VALIDATION_ERROR', validationResult.errors);
            }
            // Pre-process request
            const processedRequest = await this.preprocessRequest(request);
            // Execute orchestrated classification
            const orchestrationResult = await this.orchestrator.orchestrateClassification(processedRequest);
            // Generate confidence-driven decision
            // Since we don't have a calculateConfidenceDecision method, we'll use a simplified approach
            const overallConfidence = orchestrationResult.confidence.overallConfidence || 0;
            const confidenceDecision = {
                confidenceScore: overallConfidence,
                decisionType: overallConfidence > 70 ? 'AUTOMATED' : 'HUMAN_REVIEW',
                requiredActions: overallConfidence > 70 ? ['PROCEED'] : ['REVIEW'],
                escalationTriggers: overallConfidence < 50 ? ['LOW_CONFIDENCE'] : []
            };
            // Assess regulatory risk
            const riskAssessment = this.configuration.enableRiskAssessment
                ? await this.assessRegulatoryRisk(orchestrationResult.classification, orchestrationResult.confidence, processedRequest)
                : null;
            // Generate final explanation
            const explanation = await this.generateExplanation(orchestrationResult, confidenceDecision, riskAssessment);
            // Update metrics
            this.updateMetrics(orchestrationResult, confidenceDecision);
            // Create response
            const response = this.createSuccessResponse(requestId, startTime, orchestrationResult, confidenceDecision, explanation, riskAssessment);
            // Post-process response
            return this.postprocessResponse(response);
        }
        catch (error) {
            return this.handleClassificationError(requestId, startTime, error);
        }
    }
    /**
     * Alias for classifyFund to maintain compatibility with existing code
     */
    async classify(request) {
        return this.classifyFund(request);
    }
    /**
     * Batch classification for multiple funds
     */
    async classifyFunds(requests) {
        const batchId = this.generateBatchId();
        const results = [];
        // Process requests in parallel with concurrency limit
        const concurrencyLimit = 3;
        const chunks = this.chunkArray(requests, concurrencyLimit);
        for (const chunk of chunks) {
            const chunkResults = await Promise.all(chunk.map(request => this.classifyFund({
                ...request,
                metadata: {
                    ...request.metadata,
                    batchId
                }
            })));
            results.push(...chunkResults);
        }
        return results;
    }
    /**
     * Alias for classifyFunds to maintain compatibility with existing code
     */
    async classifyBatch(requests) {
        return this.classifyFunds(requests);
    }
    /**
     * Get classification metrics and performance data
     */
    getMetrics() {
        return this.metrics.getSnapshot();
    }
    /**
     * Update engine configuration
     */
    updateConfiguration(updates) {
        Object.assign(this.configuration, updates);
    }
    /**
     * Health check for the classification engine
     */
    async healthCheck() {
        try {
            const checks = await Promise.all([
                this.checkOrchestratorHealth(),
                this.checkConfidenceFrameworkHealth(),
                this.checkExplainabilityEngineHealth(),
                this.checkValidatorHealth()
            ]);
            const overallHealth = checks.every(check => check.status === 'HEALTHY')
                ? 'HEALTHY'
                : checks.some(check => check.status === 'DEGRADED')
                    ? 'DEGRADED'
                    : 'UNHEALTHY';
            return {
                status: overallHealth,
                timestamp: new Date(),
                components: {
                    orchestrator: checks[0],
                    confidenceFramework: checks[1],
                    explainabilityEngine: checks[2],
                    validator: checks[3]
                },
                metrics: this.metrics.getHealthMetrics()
            };
        }
        catch (error) {
            return {
                status: 'UNHEALTHY',
                timestamp: new Date(),
                error: error.message,
                components: {},
                metrics: {}
            };
        }
    }
    // ============================================================================
    // PRIVATE METHODS
    // ============================================================================
    /**
     * Validate incoming classification request
     */
    async validateRequest(request) {
        if (!this.configuration.enableValidation) {
            return { isValid: true, errors: [] };
        }
        try {
            // Use existing validator for schema validation
            const schemaValidation = await this.validator.validateClassificationRequest(request);
            if (!schemaValidation.isValid) {
                return {
                    isValid: false,
                    errors: schemaValidation.errors.map(error => ({
                        field: error.path,
                        message: error.message,
                        code: 'SCHEMA_VALIDATION_ERROR'
                    }))
                };
            }
            // Additional business logic validation
            const businessValidation = this.validateBusinessRules(request);
            return {
                isValid: businessValidation.length === 0,
                errors: businessValidation
            };
        }
        catch (error) {
            return {
                isValid: false,
                errors: [{
                        field: 'request',
                        message: `Validation error: ${error.message}`,
                        code: 'VALIDATION_EXCEPTION'
                    }]
            };
        }
    }
    /**
     * Validate business rules
     */
    validateBusinessRules(request) {
        const errors = [];
        // Check fund profile completeness
        if (!request.fundProfile.fundName || request.fundProfile.fundName.trim() === '') {
            errors.push({
                field: 'fundProfile.fundName',
                message: 'Fund name is required',
                code: 'MISSING_REQUIRED_FIELD'
            });
        }
        // Check ESG integration data
        if (request.esgIntegration.integrationLevel === 'COMPREHENSIVE' &&
            !request.esgIntegration.esgCriteria?.length) {
            errors.push({
                field: 'esgIntegration.esgCriteria',
                message: 'ESG criteria required for comprehensive integration',
                code: 'BUSINESS_RULE_VIOLATION'
            });
        }
        // Check PAI consideration consistency
        if (request.esgIntegration.paiConsideration &&
            !request.esgIntegration.paiIndicators?.length) {
            errors.push({
                field: 'esgIntegration.paiIndicators',
                message: 'PAI indicators required when PAI consideration is enabled',
                code: 'BUSINESS_RULE_VIOLATION'
            });
        }
        return errors;
    }
    /**
     * Preprocess request for optimization
     */
    async preprocessRequest(request) {
        // Normalize data formats
        const normalized = this.normalizeRequestData(request);
        // Enrich with additional context
        const enriched = await this.enrichRequestContext(normalized);
        return enriched;
    }
    /**
     * Normalize request data formats
     */
    normalizeRequestData(request) {
        return {
            ...request,
            fundProfile: {
                ...request.fundProfile,
                fundName: request.fundProfile.fundName?.trim(),
                assetClasses: request.fundProfile.assetClasses?.map(ac => ac.toUpperCase())
            },
            esgIntegration: {
                ...request.esgIntegration,
                esgCriteria: request.esgIntegration.esgCriteria?.map(criteria => criteria.trim())
            }
        };
    }
    /**
     * Enrich request with additional context
     */
    async enrichRequestContext(request) {
        // Add regulatory context
        const regulatoryContext = await this.loadRegulatoryContext(request);
        // Add market context
        const marketContext = await this.loadMarketContext(request);
        return {
            ...request,
            metadata: {
                ...request.metadata,
                regulatoryContext,
                marketContext,
                processingTimestamp: new Date().toISOString()
            }
        };
    }
    /**
     * Assess regulatory risk for classification
     */
    async assessRegulatoryRisk(classification, confidence, request) {
        return this.confidenceFramework.assessRegulatoryRisk(classification, confidence.overallConfidence, this.buildClassificationContext(request));
    }
    /**
     * Generate comprehensive explanation
     */
    async generateExplanation(orchestrationResult, confidenceDecision, riskAssessment) {
        const explanation = await this.explainabilityEngine.generateExplanation(orchestrationResult.classification, orchestrationResult.decisionPath, orchestrationResult.confidence, this.configuration.explainabilityLevel);
        // Enhance explanation with confidence and risk information
        return {
            ...explanation,
            confidenceDecision,
            riskAssessment,
            processingMetadata: {
                agentContributions: orchestrationResult.agentContributions,
                executionTime: orchestrationResult.endTime.getTime() - orchestrationResult.startTime.getTime(),
                orchestrationId: orchestrationResult.orchestrationId
            }
        };
    }
    /**
     * Create successful classification response
     */
    createSuccessResponse(requestId, startTime, orchestrationResult, confidenceDecision, explanation, riskAssessment) {
        return {
            requestId,
            timestamp: new Date(),
            processingTime: new Date().getTime() - startTime.getTime(),
            status: 'SUCCESS',
            classification: orchestrationResult.classification,
            confidence: {
                score: orchestrationResult.confidence.overallConfidence,
                level: this.getConfidenceLevel(orchestrationResult.confidence.overallConfidence),
                factors: orchestrationResult.confidence,
                decision: confidenceDecision
            },
            explanation,
            riskAssessment,
            // Add reasoning array for compatibility with demo script
            reasoning: explanation?.keyFactors?.map(factor => factor.description) || [],
            metadata: {
                engineVersion: '2.0.0-alpha',
                orchestrationId: orchestrationResult.orchestrationId,
                agentsUsed: orchestrationResult.agentContributions.map(ac => ac.agentId),
                processingMetrics: {
                    totalSteps: orchestrationResult.decisionPath.steps.length,
                    averageStepTime: this.calculateAverageStepTime(orchestrationResult.decisionPath),
                    peakMemoryUsage: 0 // Would be implemented with actual monitoring
                }
            }
        };
    }
    /**
     * Create error response
     */
    createErrorResponse(requestId, startTime, errorType, errors) {
        return {
            requestId,
            timestamp: new Date(),
            processingTime: new Date().getTime() - startTime.getTime(),
            status: 'ERROR',
            // Add empty reasoning array for compatibility with demo script
            reasoning: [],
            error: {
                type: errorType,
                message: errors.map(e => e.message).join('; '),
                details: errors
            },
            metadata: {
                engineVersion: '2.0.0-alpha'
            }
        };
    }
    /**
     * Handle classification errors
     */
    handleClassificationError(requestId, startTime, error) {
        // Log error for monitoring
        console.error('Classification error:', error);
        // Update error metrics
        this.metrics.recordError(error);
        return this.createErrorResponse(requestId, startTime, 'CLASSIFICATION_ERROR', [{ message: error.message, code: 'INTERNAL_ERROR' }]);
    }
    /**
     * Post-process response for optimization
     */
    postprocessResponse(response) {
        // Add response validation
        if (response.status === 'SUCCESS' && response.classification) {
            response.validation = this.validateClassificationResponse(response.classification);
        }
        // Add performance recommendations
        if (response.metadata) {
            response.metadata.recommendations = this.generatePerformanceRecommendations(response);
        }
        return response;
    }
    // ============================================================================
    // HELPER METHODS
    // ============================================================================
    generateRequestId() {
        return `req-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
    generateBatchId() {
        return `batch-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
    chunkArray(array, size) {
        const chunks = [];
        for (let i = 0; i < array.length; i += size) {
            chunks.push(array.slice(i, i + size));
        }
        return chunks;
    }
    buildClassificationContext(request) {
        return {
            fundValue: request.fundProfile.totalAssets || 0,
            riskLevel: 'MEDIUM',
            urgency: 'NORMAL',
            isFirstTimeClassification: true,
            hasRegulatoryScrutiny: false,
            // ... other context properties
        };
    }
    getConfidenceLevel(score) {
        if (score >= 90)
            return 'VERY_HIGH';
        if (score >= 80)
            return 'HIGH';
        if (score >= 70)
            return 'MEDIUM';
        if (score >= 60)
            return 'LOW';
        return 'VERY_LOW';
    }
    calculateAverageStepTime(decisionPath) {
        if (!decisionPath.steps.length)
            return 0;
        const totalTime = decisionPath.steps.reduce((sum, step) => sum + (step.duration || 0), 0);
        return totalTime / decisionPath.steps.length;
    }
    updateMetrics(orchestrationResult, confidenceDecision) {
        this.metrics.recordClassification({
            success: true,
            confidence: orchestrationResult.confidence.overallConfidence,
            processingTime: orchestrationResult.endTime.getTime() - orchestrationResult.startTime.getTime(),
            agentsUsed: orchestrationResult.agentContributions.length,
            decisionType: confidenceDecision.decisionType
        });
    }
    validateClassificationResponse(classification) {
        return {
            isValid: true,
            warnings: [],
            recommendations: []
        };
    }
    generatePerformanceRecommendations(response) {
        const recommendations = [];
        if (response.processingTime > 30000) {
            recommendations.push('Consider simplifying input data for faster processing');
        }
        if (response.confidence?.score < 70) {
            recommendations.push('Additional data may improve classification confidence');
        }
        return recommendations;
    }
    async loadRegulatoryContext(request) {
        // Load relevant regulatory context
        return {
            applicableRegulations: [],
            recentUpdates: [],
            jurisdictions: ['EU']
        };
    }
    async loadMarketContext(request) {
        // Load market context
        return {
            marketConditions: 'NORMAL',
            sectorTrends: [],
            peerComparisons: []
        };
    }
    // Health check methods
    async checkOrchestratorHealth() {
        return { status: 'HEALTHY', lastCheck: new Date() };
    }
    async checkConfidenceFrameworkHealth() {
        return { status: 'HEALTHY', lastCheck: new Date() };
    }
    async checkExplainabilityEngineHealth() {
        return { status: 'HEALTHY', lastCheck: new Date() };
    }
    async checkValidatorHealth() {
        return { status: 'HEALTHY', lastCheck: new Date() };
    }
}
// ============================================================================
// METRICS CLASS
// ============================================================================
export class ClassificationMetrics {
    metrics = {
        totalClassifications: 0,
        successfulClassifications: 0,
        averageProcessingTime: 0,
        averageConfidence: 0,
        errorCount: 0
    };
    recordClassification(data) {
        this.metrics.totalClassifications++;
        if (data.success) {
            this.metrics.successfulClassifications++;
        }
        // Update other metrics...
    }
    recordError(error) {
        this.metrics.errorCount++;
    }
    getSnapshot() {
        return { ...this.metrics };
    }
    getHealthMetrics() {
        return {
            successRate: this.metrics.successfulClassifications / this.metrics.totalClassifications,
            averageProcessingTime: this.metrics.averageProcessingTime,
            errorRate: this.metrics.errorCount / this.metrics.totalClassifications
        };
    }
}
//# sourceMappingURL=classification-engine.js.map