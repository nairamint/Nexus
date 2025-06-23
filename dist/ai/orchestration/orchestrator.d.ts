/**
 * SFDR Navigator Agent - Agent Orchestrator
 * Phase 2A: Agent Orchestration Implementation
 *
 * Coordinates specialized agents and manages complex workflows
 * for SFDR regulatory compliance decisions
 */
import type { DecisionPath, ConfidenceFactors, ExplainabilityResponse } from '../agents/types.js';
import type { SFDRArticleClassification } from '../../domain/sfdr/types.js';
import { ConfidenceFramework } from '../confidence/framework.js';
import { ExplainabilityEngine } from '../explainability/engine.js';
/**
 * Main Agent Orchestrator Class
 * Coordinates multiple specialized agents to perform complex SFDR analysis
 */
export declare class AgentOrchestrator {
    private readonly agents;
    private readonly confidenceFramework;
    private readonly explainabilityEngine;
    private readonly workflowEngine;
    private readonly communicationBus;
    constructor(confidenceFramework: ConfidenceFramework, explainabilityEngine: ExplainabilityEngine);
    /**
     * Main orchestration method for SFDR classification
     */
    orchestrateClassification(request: SFDRClassificationRequest): Promise<OrchestrationResult>;
    /**
     * Execute a specific workflow
     */
    private executeWorkflow;
    /**
     * Execute a single workflow step
     */
    private executeWorkflowStep;
    /**
     * Select appropriate workflow based on request characteristics
     */
    private selectWorkflow;
    /**
     * Initialize orchestration context
     */
    private initializeContext;
    /**
     * Generate final classification from all agent inputs
     */
    private generateFinalClassification;
    /**
     * Generate comprehensive explanation for the orchestration result
     */
    private generateFinalExplanation;
    /**
     * Initialize all specialized agents
     */
    private initializeAgents;
    private getSimpleClassificationWorkflow;
    private getStandardClassificationWorkflow;
    private getComplexClassificationWorkflow;
    private generateOrchestrationId;
    private analyzeRequestComplexity;
    private identifyRequiredCapabilities;
    private initializeConfidence;
    private mergeConfidence;
    private calculateOverallConfidence;
    private prepareAgentInput;
    private processAgentOutput;
    private determineStepImportance;
    private updateContext;
    private aggregateAgentRecommendations;
    private buildClassificationContext;
    private handleLowConfidenceClassification;
    private getDefaultClassification;
    private calculateConsensusLevel;
    private performInitialRiskAssessment;
    private loadRegulatoryContext;
    private handleOrchestrationError;
}
export declare class WorkflowEngine {
}
export declare class AgentCommunicationBus {
    broadcastAgentResult(agentId: string, result: any, orchestrationId: string): Promise<void>;
}
export interface SpecializedAgent {
    execute(input: any): Promise<any>;
}
export interface AgentConfig {
    capabilities: string[];
    priority: number;
}
export interface SFDRClassificationRequest {
    metadata: any;
    fundProfile: any;
    esgIntegration: any;
    sustainabilityRiskIntegration: any;
    documents?: any[];
}
export interface OrchestrationResult {
    orchestrationId: string;
    startTime: Date;
    endTime: Date;
    classification: SFDRArticleClassification;
    confidence: ConfidenceFactors;
    decisionPath: DecisionPath;
    explanation: ExplainabilityResponse | null;
    agentContributions: AgentContribution[];
    status: 'COMPLETED' | 'ERROR';
    error?: string;
}
export interface OrchestrationContext {
    orchestrationId: string;
    request: SFDRClassificationRequest;
    startTime: Date;
    intermediateResults: Map<string, any>;
    sharedKnowledge: Map<string, any>;
    riskAssessment: any;
    regulatoryContext: any;
}
export interface Workflow {
    id: string;
    name: string;
    steps: WorkflowStep[];
    parallelizable: boolean;
    maxExecutionTime: number;
}
export interface WorkflowStep {
    id: string;
    agentId: string;
    input: string;
    expectedOutput: string;
    timeout: number;
}
export interface WorkflowResult {
    classification: SFDRArticleClassification;
    confidence: ConfidenceFactors;
    decisionPath: DecisionPath;
    agentContributions: AgentContribution[];
}
export interface StepResult {
    pathStep: any;
    confidence: Partial<ConfidenceFactors>;
    agentContribution: AgentContribution;
    shouldTerminate: boolean;
}
export interface AgentContribution {
    agentId: string;
    contribution: any;
    confidence: Partial<ConfidenceFactors>;
    executionTime: number;
}
export interface AgentRecommendations {
    primaryRecommendation: SFDRArticleClassification;
    alternativeRecommendations: SFDRArticleClassification[];
    consensusLevel: number;
}
//# sourceMappingURL=orchestrator.d.ts.map