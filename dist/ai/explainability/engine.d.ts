/**
 * SFDR Navigator Agent - Explainability Engine
 * Phase 2A: Multi-Level Explainability Implementation
 *
 * Provides comprehensive explanations for AI-driven regulatory decisions
 * with full traceability and regulatory compliance
 */
import type { ExplainabilityResponse, ExplanationLevel, DecisionPath, ConfidenceFactors } from '../agents/types.js';
import type { SFDRArticleClassification } from '../../domain/sfdr/types.js';
import type { RegulatoryNode } from '../knowledge/graph.js';
/**
 * Main Explainability Engine Class
 */
export declare class ExplainabilityEngine {
    private readonly explanationTemplates;
    private readonly regulatoryKnowledge;
    private readonly evidenceTracker;
    constructor(knowledgeService: RegulatoryKnowledgeService, customTemplates?: Partial<ExplanationTemplateRegistry>);
    /**
     * Generate comprehensive explanation for a classification decision
     */
    generateExplanation(classification: SFDRArticleClassification, decisionPath: DecisionPath, confidenceFactors: ConfidenceFactors, level?: ExplanationLevel): Promise<ExplainabilityResponse>;
    /**
     * Generate explanation components based on level
     */
    private generateExplanationComponents;
    /**
     * Build regulatory traceability chain
     */
    private buildRegulatoryTraceability;
    /**
     * Generate classification rationale component
     */
    private generateClassificationRationale;
    /**
     * Generate data analysis component
     */
    private generateDataAnalysis;
    /**
     * Generate regulatory mapping component
     */
    private generateRegulatoryMapping;
    /**
     * Generate confidence analysis component
     */
    private generateConfidenceAnalysis;
    /**
     * Generate model insights component (technical level)
     */
    private generateModelInsights;
    /**
     * Generate algorithmic details component (technical level)
     */
    private generateAlgorithmicDetails;
    /**
     * Generate uncertainty analysis component (technical level)
     */
    private generateUncertaintyAnalysis;
    /**
     * Generate human-readable summary
     */
    private generateHumanReadableSummary;
    /**
     * Generate confidence breakdown
     */
    private generateConfidenceBreakdown;
    /**
     * Generate regulatory justification
     */
    private generateRegulatoryJustification;
    private generateExplanationId;
    private extractKeyFactors;
    private getRegulatoryBasis;
    private getSourcesForClassification;
    private extractDataPoints;
    private assessDataQuality;
    private extractKeyInsights;
    private getDataSources;
    private getApplicableRegulations;
    private getComplianceRequirements;
    private identifyRegulatoryGaps;
    private identifyStrengthFactors;
    private identifyWeaknessFactors;
    private extractKeyPoints;
    private extractMainReasoning;
    private getConfidenceLevel;
    private extractMainPoint;
    private parseConfidenceLevel;
    private calculateCompleteness;
    private calculateAccuracy;
    private calculateConsistency;
    private calculateTimeliness;
    private extractModelOutputs;
    private calculateFeatureImportance;
    private getModelPerformanceMetrics;
    private extractAlgorithmSteps;
    private buildDecisionTree;
    private getComputationalDetails;
    private analyzeUncertaintySources;
    private performSensitivityAnalysis;
    private calculateRobustnessMetrics;
    private identifyPrimaryRegulations;
    private identifySupportingGuidance;
    private identifyPrecedentCases;
    private buildInterpretationChain;
    private validateTraceability;
    private collectEvidenceSources;
    private getDefaultTemplates;
}
export declare class RegulatoryKnowledgeService {
    getRegulationsForClassification(classification: SFDRArticleClassification): Promise<RegulatoryNode[]>;
    getApplicableRegulations(classification: SFDRArticleClassification): Promise<RegulatoryNode[]>;
    getComplianceRequirements(classification: SFDRArticleClassification): Promise<ComplianceRequirement[]>;
    identifyGaps(classification: SFDRArticleClassification): Promise<RegulatoryGap[]>;
}
export declare class EvidenceTracker {
}
export interface ExplanationTemplateRegistry {
    classificationRationale: (data: any) => string;
    dataAnalysis: (data: any) => string;
    regulatoryMapping: (data: any) => string;
    confidenceAnalysis: (data: any) => string;
    modelInsights: (data: any) => string;
    algorithmicDetails: (data: any) => string;
    uncertaintyAnalysis: (data: any) => string;
    humanReadableSummary: {
        BASIC: (data: any) => string;
        DETAILED: (data: any) => string;
        TECHNICAL: (data: any) => string;
    };
    regulatoryJustification: (data: any) => string;
}
export interface DataPoint {
    source: string;
    description: string;
    value: any;
    significance: 'LOW' | 'MEDIUM' | 'HIGH';
    insight: string;
    sourceUrl?: string;
}
export interface DataQualityAssessment {
    completeness: number;
    accuracy: number;
    consistency: number;
    timeliness: number;
}
export interface ComplianceRequirement {
    id: string;
    description: string;
    mandatory: boolean;
    source: string;
}
export interface RegulatoryGap {
    id: string;
    description: string;
    impact: 'LOW' | 'MEDIUM' | 'HIGH';
    recommendation: string;
}
//# sourceMappingURL=engine.d.ts.map