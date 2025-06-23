/**
 * SFDR Navigator Agent - Regulatory ML Models
 * Phase 2B: Advanced ML Models Implementation
 *
 * Implements regulatory-aware machine learning models with constitutional AI patterns
 * for SFDR compliance classification and risk assessment
 */
import type { SFDRClassificationRequest, SFDRArticleClassification } from '../../domain/sfdr/types.js';
import type { ConfidenceFactors } from '../agents/types.js';
/**
 * Constitutional AI constraints for regulatory compliance
 */
export interface ComplianceConstraint {
    constraintId: string;
    regulatoryArticle: string;
    constraintType: 'hard' | 'soft' | 'preference';
    description: string;
    violationPenalty: number;
}
/**
 * Regulatory-aware ML model interface
 */
export interface RegulatoryMLModel {
    modelId: string;
    modelType: 'transformer' | 'graph-neural-network' | 'ensemble' | 'constitutional-ai';
    version: string;
    regulatoryConstraints: ComplianceConstraint[];
    interpretabilityLevel: 'high' | 'medium' | 'low';
    auditTrail: ModelDecisionPath[];
    performanceMetrics: ModelPerformanceMetrics;
}
/**
 * Model decision path for explainability
 */
export interface ModelDecisionPath {
    stepId: string;
    stepType: 'input-processing' | 'feature-extraction' | 'classification' | 'confidence-scoring';
    inputData: any;
    outputData: any;
    reasoning: string;
    regulatoryReferences: string[];
    confidenceScore: number;
    timestamp: string;
}
/**
 * Model performance metrics
 */
export interface ModelPerformanceMetrics {
    accuracy: number;
    precision: number;
    recall: number;
    f1Score: number;
    regulatoryCompliance: number;
    interpretabilityScore: number;
    latencyMs: number;
    lastEvaluated: string;
}
/**
 * Graph Neural Network for SFDR regulatory classification
 * Models regulatory relationships and dependencies
 */
export declare class RegulatoryGraphNeuralNetwork implements RegulatoryMLModel {
    readonly modelId: string;
    readonly modelType = "graph-neural-network";
    readonly version: string;
    readonly regulatoryConstraints: ComplianceConstraint[];
    readonly interpretabilityLevel = "high";
    auditTrail: ModelDecisionPath[];
    performanceMetrics: ModelPerformanceMetrics;
    private readonly graphStructure;
    private readonly attentionMechanism;
    constructor(modelId: string, version: string, regulatoryConstraints: ComplianceConstraint[]);
    /**
     * Classify SFDR article using graph neural network
     */
    classify(request: SFDRClassificationRequest): Promise<{
        classification: SFDRArticleClassification;
        confidence: ConfidenceFactors;
        decisionPath: ModelDecisionPath[];
    }>;
    private convertToGraph;
    private extractNodes;
    private extractEdges;
    private extractFeatures;
    private forwardPass;
    private applyRegulatoryConstraints;
    private calculateConfidence;
    private getRelevantRegulations;
    private initializeMetrics;
    private updatePerformanceMetrics;
}
/**
 * Graph attention mechanism for regulatory relationship modeling
 */
export declare class GraphAttentionLayer {
    computeAttention(graph: any): Promise<any>;
}
/**
 * Regulatory knowledge graph structure
 */
export declare class RegulatoryGraph {
    private nodes;
    private edges;
    addNode(id: string, data: any): void;
    addEdge(from: string, to: string, data: any): void;
    getNodes(): Map<string, any>;
    getEdges(): Map<string, any>;
}
/**
 * Ensemble model for handling edge cases and ambiguous classifications
 */
export declare class RegulatoryEnsembleModel implements RegulatoryMLModel {
    readonly modelId: string;
    readonly modelType = "ensemble";
    readonly version: string;
    readonly regulatoryConstraints: ComplianceConstraint[];
    readonly interpretabilityLevel = "medium";
    auditTrail: ModelDecisionPath[];
    performanceMetrics: ModelPerformanceMetrics;
    private readonly baseModels;
    private readonly votingStrategy;
    constructor(modelId: string, version: string, baseModels: RegulatoryMLModel[], votingStrategy?: 'majority' | 'weighted' | 'expert-hierarchy');
    /**
     * Classify using ensemble of models
     */
    classify(request: SFDRClassificationRequest): Promise<{
        classification: SFDRArticleClassification;
        confidence: ConfidenceFactors;
        decisionPath: ModelDecisionPath[];
    }>;
    private combineResults;
    private majorityVoting;
    private weightedVoting;
    private expertHierarchyVoting;
    private calculateEnsembleConfidence;
    private mergeDecisionPaths;
    private mergeConstraints;
    private initializeMetrics;
}
//# sourceMappingURL=regulatory-models.d.ts.map