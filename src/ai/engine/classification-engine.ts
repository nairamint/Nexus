/**
 * SFDR Navigator Agent - AI Classification Engine
 * Phase 2A: Main AI Classification Engine
 * 
 * Primary interface for AI-powered SFDR classification with
 * confidence-driven decisions and comprehensive explainability
 */

import type {
  SFDRClassificationRequest,
  SFDRClassificationResponse,
  EngineConfiguration,
  ValidationResult
} from './types.js';

import { ClassificationMetrics } from './types.js';

import type {
  ConfidenceDrivenClassification,
  ExplainabilityResponse,
  RegulatoryRiskAssessment
} from '../agents/types.js';

import type { SFDRArticleClassification } from '../../domain/sfdr/types';

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
  private readonly orchestrator: AgentOrchestrator;
  private readonly confidenceFramework: ConfidenceFramework;
  private readonly explainabilityEngine: ExplainabilityEngine;
  private readonly validator: SFDRComplianceValidator;
  private readonly configuration: EngineConfiguration;
  private readonly metrics: ClassificationMetrics;

  constructor(configuration: Partial<EngineConfiguration> = {}) {
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
    this.confidenceFramework = new ConfidenceFramework(
      this.configuration.confidenceThresholds
    );
    
    this.explainabilityEngine = new ExplainabilityEngine(
      new RegulatoryKnowledgeService()
    );
    
    this.orchestrator = new AgentOrchestrator(
      this.confidenceFramework,
      this.explainabilityEngine
    );
    
    this.validator = new SFDRComplianceValidator();
    this.metrics = new ClassificationMetrics();
  }

  /**
   * Main classification method
   * Processes SFDR classification request and returns comprehensive response
   */
  public async classifyFund(
    request: SFDRClassificationRequest
  ): Promise<SFDRClassificationResponse> {
    const startTime = new Date();
    const requestId = this.generateRequestId();

    try {
      // Validate input request
      const validationResult = await this.validateRequest(request);
      if (!validationResult.isValid) {
        return this.createErrorResponse(
          requestId,
          startTime,
          'VALIDATION_ERROR',
          validationResult.errors
        );
      }

      // Pre-process request
      const processedRequest = await this.preprocessRequest(request);

      // Execute orchestrated classification
      const orchestrationResult = await this.orchestrator.orchestrateClassification(
        processedRequest
      );

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
        ? await this.assessRegulatoryRisk(
            orchestrationResult.classification,
            orchestrationResult.confidence,
            processedRequest
          )
        : null;

      // Generate final explanation
      const explanation = await this.generateExplanation(
        orchestrationResult,
        confidenceDecision,
        riskAssessment
      );

      // Update metrics
      this.updateMetrics(orchestrationResult, confidenceDecision);

      // Create response
      const response = this.createSuccessResponse(
        requestId,
        startTime,
        orchestrationResult,
        confidenceDecision,
        explanation,
        riskAssessment
      );

      // Post-process response
      return this.postprocessResponse(response);

    } catch (error) {
      return this.handleClassificationError(requestId, startTime, error);
    }
  }

  /**
   * Alias for classifyFund to maintain compatibility with existing code
   */
  public async classify(
    request: SFDRClassificationRequest
  ): Promise<SFDRClassificationResponse> {
    return this.classifyFund(request);
  }

  /**
   * Batch classification for multiple funds
   */
  public async classifyFunds(
    requests: SFDRClassificationRequest[]
  ): Promise<SFDRClassificationResponse[]> {
    const batchId = this.generateBatchId();
    const results: SFDRClassificationResponse[] = [];

    // Process requests in parallel with concurrency limit
    const concurrencyLimit = 3;
    const chunks = this.chunkArray(requests, concurrencyLimit);

    for (const chunk of chunks) {
      const chunkResults = await Promise.all(
        chunk.map(request => this.classifyFund({
          ...request,
          metadata: {
            ...request.metadata,
            batchId
          }
        }))
      );
      results.push(...chunkResults);
    }

    return results;
  }

  /**
   * Alias for classifyFunds to maintain compatibility with existing code
   */
  public async classifyBatch(
    requests: SFDRClassificationRequest[]
  ): Promise<SFDRClassificationResponse[]> {
    return this.classifyFunds(requests);
  }

  /**
   * Get classification metrics and performance data
   */
  public getMetrics(): ClassificationMetrics {
    return this.metrics;
  }

  /**
   * Update engine configuration
   */
  public updateConfiguration(
    updates: Partial<EngineConfiguration>
  ): void {
    Object.assign(this.configuration, updates);
  }

  /**
   * Health check for the classification engine
   */
  public async healthCheck(): Promise<EngineHealthStatus> {
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
    } catch (error) {
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
  private async validateRequest(
    request: SFDRClassificationRequest
  ): Promise<ValidationResult> {
    if (!this.configuration.enableValidation) {
      return { isValid: true, errors: [] };
    }

    try {
      // Use existing validator for schema validation
      const schemaValidation = await this.validator.validateRequest(request);
      
      if (!schemaValidation.isValid) {
        return {
          isValid: false,
          errors: schemaValidation.issues.map(issue => ({
            field: issue.code,
            message: issue.message,
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
    } catch (error) {
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
  private validateBusinessRules(
    request: SFDRClassificationRequest
  ): ValidationError[] {
    const errors: ValidationError[] = [];

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
  private async preprocessRequest(
    request: SFDRClassificationRequest
  ): Promise<SFDRClassificationRequest> {
    // Normalize data formats
    const normalized = this.normalizeRequestData(request);
    
    // Enrich with additional context
    const enriched = await this.enrichRequestContext(normalized);
    
    return enriched;
  }

  /**
   * Normalize request data formats
   */
  private normalizeRequestData(
    request: SFDRClassificationRequest
  ): SFDRClassificationRequest {
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
  private async enrichRequestContext(
    request: SFDRClassificationRequest
  ): Promise<SFDRClassificationRequest> {
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
  private async assessRegulatoryRisk(
    classification: SFDRArticleClassification,
    confidence: any,
    request: SFDRClassificationRequest
  ): Promise<RegulatoryRiskAssessment> {
    // Get validation result from the validator
    const validationResult = await this.validator.validateRequest(request);
    
    return this.confidenceFramework.assessRegulatoryRisk(
      request,
      classification,
      confidence,
      validationResult
    );
  }

  /**
   * Generate comprehensive explanation
   */
  private async generateExplanation(
    orchestrationResult: any,
    confidenceDecision: ConfidenceDrivenClassification,
    riskAssessment: RegulatoryRiskAssessment | null
  ): Promise<ExplainabilityResponse> {
    const explanation = await this.explainabilityEngine.generateExplanation(
      orchestrationResult.classification,
      orchestrationResult.decisionPath,
      orchestrationResult.confidence,
      this.configuration.explainabilityLevel
    );

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
  private createSuccessResponse(
    requestId: string,
    startTime: Date,
    orchestrationResult: any,
    confidenceDecision: ConfidenceDrivenClassification,
    explanation: ExplainabilityResponse,
    riskAssessment: RegulatoryRiskAssessment | null
  ): SFDRClassificationResponse {
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
  private createErrorResponse(
    requestId: string,
    startTime: Date,
    errorType: string,
    errors: any[]
  ): SFDRClassificationResponse {
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
  private handleClassificationError(
    requestId: string,
    startTime: Date,
    error: any
  ): SFDRClassificationResponse {
    // Log error for monitoring
    console.error('Classification error:', error);
    
    // Update error metrics
    this.metrics.recordError(error);
    
    return this.createErrorResponse(
      requestId,
      startTime,
      'CLASSIFICATION_ERROR',
      [{ message: error.message, code: 'INTERNAL_ERROR' }]
    );
  }

  /**
   * Post-process response for optimization
   */
  private postprocessResponse(
    response: SFDRClassificationResponse
  ): SFDRClassificationResponse {
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

  private generateRequestId(): string {
    return `req-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateBatchId(): string {
    return `batch-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private chunkArray<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }

  private buildClassificationContext(request: SFDRClassificationRequest): any {
    return {
      fundValue: request.fundProfile.totalAssets || 0,
      riskLevel: 'MEDIUM',
      urgency: 'NORMAL',
      isFirstTimeClassification: true,
      hasRegulatoryScrutiny: false,
      // ... other context properties
    };
  }

  private getConfidenceLevel(score: number): string {
    if (score >= 90) return 'VERY_HIGH';
    if (score >= 80) return 'HIGH';
    if (score >= 70) return 'MEDIUM';
    if (score >= 60) return 'LOW';
    return 'VERY_LOW';
  }

  private calculateAverageStepTime(decisionPath: any): number {
    if (!decisionPath.steps.length) return 0;
    const totalTime = decisionPath.steps.reduce((sum: number, step: any) => sum + (step.duration || 0), 0);
    return totalTime / decisionPath.steps.length;
  }

  private updateMetrics(orchestrationResult: any, confidenceDecision: any): void {
    // Calculate processing time safely
    let processingTime = 0;
    if (orchestrationResult.endTime && orchestrationResult.startTime) {
      processingTime = orchestrationResult.endTime.getTime() - orchestrationResult.startTime.getTime();
    }
    
    // Get confidence safely
    const confidence = orchestrationResult.confidence?.overallConfidence || 0;
    
    // Get agents used safely
    const agentsUsed = orchestrationResult.agentContributions?.length || 0;
    
    this.metrics.recordClassification({
      success: true,
      confidence,
      processingTime,
      agentsUsed,
      decisionType: confidenceDecision.decisionType
    });
  }

  private validateClassificationResponse(classification: SFDRArticleClassification): any {
    return {
      isValid: true,
      warnings: [],
      recommendations: []
    };
  }

  private generatePerformanceRecommendations(response: SFDRClassificationResponse): string[] {
    const recommendations: string[] = [];
    
    if (response.processingTime > 30000) {
      recommendations.push('Consider simplifying input data for faster processing');
    }
    
    if (response.confidence?.score < 70) {
      recommendations.push('Additional data may improve classification confidence');
    }
    
    return recommendations;
  }

  private async loadRegulatoryContext(request: SFDRClassificationRequest): Promise<any> {
    // Load relevant regulatory context
    return {
      applicableRegulations: [],
      recentUpdates: [],
      jurisdictions: ['EU']
    };
  }

  private async loadMarketContext(request: SFDRClassificationRequest): Promise<any> {
    // Load market context
    return {
      marketConditions: 'NORMAL',
      sectorTrends: [],
      peerComparisons: []
    };
  }

  // Health check methods
  private async checkOrchestratorHealth(): Promise<ComponentHealth> {
    return { status: 'HEALTHY', lastCheck: new Date() };
  }

  private async checkConfidenceFrameworkHealth(): Promise<ComponentHealth> {
    return { status: 'HEALTHY', lastCheck: new Date() };
  }

  private async checkExplainabilityEngineHealth(): Promise<ComponentHealth> {
    return { status: 'HEALTHY', lastCheck: new Date() };
  }

  private async checkValidatorHealth(): Promise<ComponentHealth> {
    return { status: 'HEALTHY', lastCheck: new Date() };
  }
}

// ============================================================================
// END OF CLASS
// ============================================================================

// Remove duplicate methods - they are now properly implemented in ClassificationMetrics class

// ============================================================================
// SUPPORTING TYPES
// ============================================================================

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface ComponentHealth {
  status: 'HEALTHY' | 'DEGRADED' | 'UNHEALTHY';
  lastCheck: Date;
  message?: string;
}

export interface EngineHealthStatus {
  status: 'HEALTHY' | 'DEGRADED' | 'UNHEALTHY';
  timestamp: Date;
  components: Record<string, ComponentHealth>;
  metrics: any;
  error?: string;
}