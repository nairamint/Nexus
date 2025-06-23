/**
 * SFDR Navigator Agent - AI Engine Types
 * Phase 2A: Type definitions for the AI Classification Engine
 *
 * Comprehensive type system for AI-powered SFDR classification
 */
import type { SFDRArticleClassification } from '../../domain/sfdr/types.js';
import type { ConfidenceDrivenClassification, ExplainabilityResponse, RegulatoryRiskAssessment } from '../agents/types.js';
/**
 * Main classification request interface
 */
export interface SFDRClassificationRequest {
    /** Request metadata */
    metadata: {
        requestId?: string;
        timestamp?: string;
        source: string;
        version: string;
        batchId?: string;
        priority?: 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';
        regulatoryContext?: any;
        marketContext?: any;
        processingTimestamp?: string;
    };
    /** Fund profile information */
    fundProfile: {
        fundName: string;
        fundType: 'UCITS' | 'AIF' | 'PENSION_FUND' | 'INSURANCE_FUND' | 'OTHER';
        isin?: string;
        lei?: string;
        domicile: string;
        launchDate?: string;
        totalAssets?: number;
        currency?: string;
        assetClasses?: string[];
        investmentStrategy?: string;
        benchmarkIndex?: string;
        managementCompany?: string;
        fundManager?: string;
    };
    /** ESG integration details */
    esgIntegration: {
        integrationLevel: 'NONE' | 'MINIMAL' | 'PARTIAL' | 'COMPREHENSIVE';
        esgCriteria?: string[];
        exclusionPolicies?: string[];
        positiveScreening?: boolean;
        esgRiskAssessment?: boolean;
        sustainabilityRiskIntegration: boolean;
        paiConsideration: boolean;
        paiIndicators?: string[];
        esgDataProviders?: string[];
        esgScoring?: {
            provider: string;
            score: number;
            methodology: string;
        }[];
    };
    /** Sustainability objectives (for Article 8/9) */
    sustainabilityObjectives?: {
        hasEnvironmentalObjectives: boolean;
        hasSocialObjectives: boolean;
        environmentalObjectives?: string[];
        socialObjectives?: string[];
        sustainableInvestmentPercentage?: number;
        taxonomyAlignment?: {
            percentage: number;
            activities: string[];
            verification: boolean;
        };
        doNoSignificantHarm?: {
            assessment: boolean;
            indicators: string[];
            methodology: string;
        };
    };
    /** Investment process details */
    investmentProcess?: {
        esgIntegrationStage: 'PRE_INVESTMENT' | 'INVESTMENT' | 'POST_INVESTMENT' | 'ALL_STAGES';
        esgAnalysisDepth: 'BASIC' | 'DETAILED' | 'COMPREHENSIVE';
        sustainabilityResearch: boolean;
        engagementPolicy: boolean;
        votingPolicy: boolean;
        controversyMonitoring: boolean;
        impactMeasurement: boolean;
    };
    /** Regulatory compliance */
    regulatoryCompliance?: {
        sfdrDisclosures: boolean;
        taxonomyReporting: boolean;
        paiReporting: boolean;
        sustainabilityRiskDisclosure: boolean;
        remuneration: {
            esgLinked: boolean;
            sustainabilityRiskConsidered: boolean;
        };
    };
    /** Additional context */
    additionalContext?: {
        marketingMaterials?: string[];
        prospectusExtracts?: string[];
        factsheets?: string[];
        sustainabilityReports?: string[];
        thirdPartyRatings?: {
            provider: string;
            rating: string;
            methodology: string;
        }[];
        peerComparisons?: string[];
        regulatoryGuidance?: string[];
    };
}
/**
 * Comprehensive classification response
 */
export interface SFDRClassificationResponse {
    /** Response metadata */
    requestId: string;
    timestamp: Date;
    processingTime: number;
    status: 'SUCCESS' | 'ERROR' | 'PARTIAL' | 'TIMEOUT';
    /** Classification result */
    classification?: SFDRArticleClassification;
    /** Confidence assessment */
    confidence?: {
        score: number;
        level: 'VERY_LOW' | 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH';
        factors: any;
        decision: ConfidenceDrivenClassification;
    };
    /** Reasoning for the classification (for demo compatibility) */
    reasoning?: string[];
    /** Comprehensive explanation */
    explanation?: ExplainabilityResponse;
    /** Regulatory risk assessment */
    riskAssessment?: RegulatoryRiskAssessment;
    /** Validation results */
    validation?: {
        isValid: boolean;
        warnings: string[];
        recommendations: string[];
    };
    /** Error information (if applicable) */
    error?: {
        type: string;
        message: string;
        details: any[];
        code?: string;
        retryable?: boolean;
    };
    /** Response metadata */
    metadata?: {
        engineVersion: string;
        orchestrationId?: string;
        agentsUsed?: string[];
        processingMetrics?: {
            totalSteps: number;
            averageStepTime: number;
            peakMemoryUsage: number;
        };
        recommendations?: string[];
        debugInfo?: any;
    };
}
/**
 * Engine configuration
 */
export interface EngineConfiguration {
    /** Confidence thresholds for decision making */
    confidenceThresholds: {
        automated: number;
        humanReview: number;
        expertConsultation: number;
    };
    /** Explainability settings */
    explainabilityLevel: 'BASIC' | 'DETAILED' | 'COMPREHENSIVE';
    /** Feature flags */
    enableRiskAssessment: boolean;
    enableValidation: boolean;
    enableBatchProcessing?: boolean;
    enableCaching?: boolean;
    enableMetrics?: boolean;
    /** Performance settings */
    maxProcessingTime: number;
    maxConcurrentRequests?: number;
    cacheTimeout?: number;
    /** Agent configuration */
    agentSettings?: {
        documentIntelligence?: {
            enabled: boolean;
            timeout: number;
            maxDocuments: number;
        };
        classification?: {
            enabled: boolean;
            timeout: number;
            modelVersion: string;
        };
        paiAnalysis?: {
            enabled: boolean;
            timeout: number;
            indicators: string[];
        };
        taxonomyAlignment?: {
            enabled: boolean;
            timeout: number;
            activities: string[];
        };
    };
    /** Integration settings */
    integrations?: {
        knowledgeGraph?: {
            endpoint: string;
            timeout: number;
        };
        regulatoryDatabase?: {
            endpoint: string;
            apiKey: string;
        };
        esgDataProviders?: {
            providers: string[];
            timeout: number;
        };
    };
}
/**
 * Classification metrics interface
 */
export interface IClassificationMetrics {
    /** Performance metrics */
    totalClassifications: number;
    successfulClassifications: number;
    averageProcessingTime: number;
    averageConfidence: number;
    errorCount: number;
    /** Quality metrics */
    accuracyRate?: number;
    precisionRate?: number;
    recallRate?: number;
    f1Score?: number;
    /** Operational metrics */
    throughput?: number;
    latency?: {
        p50: number;
        p95: number;
        p99: number;
    };
    resourceUtilization?: {
        cpu: number;
        memory: number;
        network: number;
    };
    /** Business metrics */
    automationRate?: number;
    humanReviewRate?: number;
    expertConsultationRate?: number;
    escalationRate?: number;
    /** Time-based metrics */
    hourlyVolume?: number[];
    dailyVolume?: number[];
    weeklyTrends?: any;
    monthlyTrends?: any;
}
/**
 * Classification metrics class implementation
 */
export declare class ClassificationMetrics implements IClassificationMetrics {
    /** Performance metrics */
    totalClassifications: number;
    successfulClassifications: number;
    averageProcessingTime: number;
    averageConfidence: number;
    errorCount: number;
    /** Quality metrics */
    accuracyRate?: number;
    precisionRate?: number;
    recallRate?: number;
    f1Score?: number;
    /** Operational metrics */
    throughput?: number;
    latency?: {
        p50: number;
        p95: number;
        p99: number;
    };
    resourceUtilization?: {
        cpu: number;
        memory: number;
        network: number;
    };
    /** Business metrics */
    automationRate?: number;
    humanReviewRate?: number;
    expertConsultationRate?: number;
    escalationRate?: number;
    /** Time-based metrics */
    hourlyVolume?: number[];
    dailyVolume?: number[];
    weeklyTrends?: any;
    monthlyTrends?: any;
    article6Count: number;
    article8Count: number;
    article9Count: number;
    successRate: number;
    validationSuccessRate: number;
}
/**
 * Validation result
 */
export interface ValidationResult {
    isValid: boolean;
    errors: ValidationError[];
    warnings?: ValidationWarning[];
    suggestions?: ValidationSuggestion[];
}
export interface ValidationError {
    field: string;
    message: string;
    code: string;
    severity?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}
export interface ValidationWarning {
    field: string;
    message: string;
    code: string;
    impact?: string;
}
export interface ValidationSuggestion {
    field: string;
    message: string;
    improvement: string;
    priority?: 'LOW' | 'MEDIUM' | 'HIGH';
}
/**
 * Processing stage definition
 */
export interface ProcessingStage {
    id: string;
    name: string;
    description: string;
    required: boolean;
    timeout: number;
    retryPolicy?: {
        maxRetries: number;
        backoffStrategy: 'LINEAR' | 'EXPONENTIAL';
        baseDelay: number;
    };
    dependencies?: string[];
    outputs: string[];
}
/**
 * Processing pipeline configuration
 */
export interface ProcessingPipeline {
    id: string;
    name: string;
    version: string;
    stages: ProcessingStage[];
    parallelStages?: string[][];
    errorHandling: {
        strategy: 'FAIL_FAST' | 'CONTINUE_ON_ERROR' | 'RETRY_FAILED';
        maxErrors: number;
    };
    monitoring: {
        enableMetrics: boolean;
        enableTracing: boolean;
        enableLogging: boolean;
    };
}
/**
 * Processing context
 */
export interface ProcessingContext {
    requestId: string;
    pipelineId: string;
    startTime: Date;
    currentStage?: string;
    completedStages: string[];
    failedStages: string[];
    stageResults: Record<string, any>;
    metadata: Record<string, any>;
    errors: ProcessingError[];
    warnings: ProcessingWarning[];
}
export interface ProcessingError {
    stage: string;
    timestamp: Date;
    error: Error;
    retryCount: number;
    recoverable: boolean;
}
export interface ProcessingWarning {
    stage: string;
    timestamp: Date;
    message: string;
    severity: 'LOW' | 'MEDIUM' | 'HIGH';
}
/**
 * Agent execution result
 */
export interface AgentExecutionResult {
    agentId: string;
    agentType: string;
    executionId: string;
    startTime: Date;
    endTime: Date;
    status: 'SUCCESS' | 'FAILURE' | 'TIMEOUT' | 'CANCELLED';
    result?: any;
    confidence?: number;
    explanation?: string;
    error?: Error;
    metadata?: Record<string, any>;
}
/**
 * Multi-agent orchestration result
 */
export interface OrchestrationResult {
    orchestrationId: string;
    startTime: Date;
    endTime: Date;
    status: 'SUCCESS' | 'PARTIAL' | 'FAILURE';
    classification: SFDRArticleClassification;
    confidence: any;
    decisionPath: any;
    agentContributions: AgentExecutionResult[];
    consensusMetrics?: {
        agreement: number;
        conflictResolution: string;
        finalDecisionBasis: string;
    };
}
/**
 * Performance metrics
 */
export interface PerformanceMetrics {
    timestamp: Date;
    requestId: string;
    processingTime: number;
    memoryUsage: number;
    cpuUsage: number;
    networkLatency?: number;
    cacheHitRate?: number;
    errorRate: number;
    throughput: number;
}
/**
 * Quality metrics
 */
export interface QualityMetrics {
    timestamp: Date;
    accuracy: number;
    precision: number;
    recall: number;
    f1Score: number;
    confidenceDistribution: number[];
    humanAgreementRate?: number;
    expertValidationRate?: number;
}
/**
 * Business metrics
 */
export interface BusinessMetrics {
    timestamp: Date;
    totalRequests: number;
    automatedDecisions: number;
    humanReviews: number;
    expertConsultations: number;
    escalations: number;
    costPerClassification?: number;
    timeToDecision: number;
    customerSatisfaction?: number;
}
/**
 * Audit trail entry
 */
export interface AuditTrailEntry {
    id: string;
    timestamp: Date;
    requestId: string;
    action: string;
    actor: {
        type: 'SYSTEM' | 'USER' | 'AGENT';
        id: string;
        name?: string;
    };
    details: Record<string, any>;
    outcome: 'SUCCESS' | 'FAILURE' | 'PARTIAL';
    impact: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    compliance: {
        gdprCompliant: boolean;
        dataRetention: string;
        accessLevel: string;
    };
}
export type { SFDRClassificationRequest, SFDRClassificationResponse, EngineConfiguration, IClassificationMetrics, ValidationResult, ProcessingPipeline, ProcessingContext, AgentExecutionResult, OrchestrationResult, PerformanceMetrics, QualityMetrics, BusinessMetrics, AuditTrailEntry };
/**
 * Generic API response wrapper
 */
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: {
        code: string;
        message: string;
        details?: any;
    };
    metadata?: {
        timestamp: Date;
        requestId: string;
        version: string;
    };
}
/**
 * Pagination support
 */
export interface PaginatedResponse<T> {
    items: T[];
    pagination: {
        page: number;
        pageSize: number;
        totalItems: number;
        totalPages: number;
        hasNext: boolean;
        hasPrevious: boolean;
    };
}
/**
 * Filter and sort options
 */
export interface QueryOptions {
    filters?: Record<string, any>;
    sort?: {
        field: string;
        direction: 'ASC' | 'DESC';
    }[];
    pagination?: {
        page: number;
        pageSize: number;
    };
    include?: string[];
    exclude?: string[];
}
//# sourceMappingURL=types.d.ts.map