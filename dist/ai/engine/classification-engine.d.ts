/**
 * SFDR Navigator Agent - AI Classification Engine
 * Phase 2A: Main AI Classification Engine
 *
 * Primary interface for AI-powered SFDR classification with
 * confidence-driven decisions and comprehensive explainability
 */
import type { SFDRClassificationRequest, SFDRClassificationResponse, EngineConfiguration } from './types.js';
import { ClassificationMetrics } from './types.js';
/**
 * Main AI Classification Engine
 * Orchestrates the complete SFDR classification process with AI agents
 */
export declare class SFDRClassificationEngine {
    private readonly orchestrator;
    private readonly confidenceFramework;
    private readonly explainabilityEngine;
    private readonly validator;
    private readonly configuration;
    private readonly metrics;
    constructor(configuration?: Partial<EngineConfiguration>);
    /**
     * Main classification method
     * Processes SFDR classification request and returns comprehensive response
     */
    classifyFund(request: SFDRClassificationRequest): Promise<SFDRClassificationResponse>;
    /**
     * Alias for classifyFund to maintain compatibility with existing code
     */
    classify(request: SFDRClassificationRequest): Promise<SFDRClassificationResponse>;
    /**
     * Batch classification for multiple funds
     */
    classifyFunds(requests: SFDRClassificationRequest[]): Promise<SFDRClassificationResponse[]>;
    /**
     * Alias for classifyFunds to maintain compatibility with existing code
     */
    classifyBatch(requests: SFDRClassificationRequest[]): Promise<SFDRClassificationResponse[]>;
    /**
     * Get classification metrics and performance data
     */
    getMetrics(): ClassificationMetrics;
    /**
     * Update engine configuration
     */
    updateConfiguration(updates: Partial<EngineConfiguration>): void;
    /**
     * Health check for the classification engine
     */
    healthCheck(): Promise<EngineHealthStatus>;
    /**
     * Validate incoming classification request
     */
    private validateRequest;
    /**
     * Validate business rules
     */
    private validateBusinessRules;
    /**
     * Preprocess request for optimization
     */
    private preprocessRequest;
    /**
     * Normalize request data formats
     */
    private normalizeRequestData;
    /**
     * Enrich request with additional context
     */
    private enrichRequestContext;
    /**
     * Assess regulatory risk for classification
     */
    private assessRegulatoryRisk;
    /**
     * Generate comprehensive explanation
     */
    private generateExplanation;
    /**
     * Create successful classification response
     */
    private createSuccessResponse;
    /**
     * Create error response
     */
    private createErrorResponse;
    /**
     * Handle classification errors
     */
    private handleClassificationError;
    /**
     * Post-process response for optimization
     */
    private postprocessResponse;
    private generateRequestId;
    private generateBatchId;
    private chunkArray;
    private buildClassificationContext;
    private getConfidenceLevel;
    private calculateAverageStepTime;
    private updateMetrics;
    private validateClassificationResponse;
    private generatePerformanceRecommendations;
    private loadRegulatoryContext;
    private loadMarketContext;
    private checkOrchestratorHealth;
    private checkConfidenceFrameworkHealth;
    private checkExplainabilityEngineHealth;
    private checkValidatorHealth;
}
export declare class ClassificationMetrics {
    private metrics;
    recordClassification(data: any): void;
    recordError(error: any): void;
    getSnapshot(): ClassificationMetrics;
    getHealthMetrics(): any;
}
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
//# sourceMappingURL=classification-engine.d.ts.map