/**
 * SFDR Navigator Agent - AI Agent Architecture Types
 * Phase 2A: Agent Architecture Design
 *
 * Defines the specialized agent ecosystem for SFDR regulatory intelligence
 * Based on enterprise AI patterns and regulatory compliance requirements
 */
/**
 * Specialized Agent Types in the SFDR Regulatory Intelligence Ecosystem
 */
export type AgentType = 'DocumentIntelligenceAgent' | 'ClassificationAgent' | 'PAIAnalysisAgent' | 'TaxonomyAlignmentAgent' | 'ValidationOrchestrator' | 'RegulatoryUpdateAgent';
/**
 * Document Intelligence Agent Interface
 */
export interface DocumentIntelligenceAgent {
    type: 'DocumentIntelligenceAgent';
    extractText(document: any): Promise<string>;
    identifyRegulatorySections(text: string): Promise<any[]>;
}
/**
 * Classification Agent Interface
 */
export interface ClassificationAgent {
    type: 'ClassificationAgent';
    classifyArticle(data: any): Promise<any>;
    calculateConfidence(classification: any): ConfidenceFactors;
}
/**
 * PAI Analysis Agent Interface
 */
export interface PAIAnalysisAgent {
    type: 'PAIAnalysisAgent';
    analyzePAIIndicators(data: any): Promise<any[]>;
    assessPAICompliance(indicators: any[]): Promise<any>;
}
/**
 * Taxonomy Alignment Agent Interface
 */
export interface TaxonomyAlignmentAgent {
    type: 'TaxonomyAlignmentAgent';
    assessTaxonomyAlignment(data: any): Promise<any>;
    mapEnvironmentalObjectives(data: any): Promise<any[]>;
}
/**
 * Agent Communication Interface
 */
export interface AgentCommunication {
    sendMessage(from: AgentType, to: AgentType, message: any): Promise<void>;
    receiveMessage(to: AgentType): Promise<any>;
    broadcastMessage(from: AgentType, message: any): Promise<void>;
}
/**
 * Agent Orchestration Interface
 */
export interface AgentOrchestration {
    registerAgent(agent: any, capabilities: AgentCapability): void;
    unregisterAgent(agentType: AgentType): void;
    getAgent(agentType: AgentType): any;
    orchestrateWorkflow(workflow: string, input: any): Promise<any>;
}
/**
 * Agent Capability Matrix
 */
export interface AgentCapability {
    agentType: AgentType;
    primaryFunction: string;
    inputTypes: string[];
    outputTypes: string[];
    confidenceScoring: boolean;
    explainabilityLevel: ExplainabilityLevel;
    humanInLoopRequired: boolean;
    regulatoryRiskLevel: RegulatoryRiskLevel;
}
/**
 * Multi-Level Explainability Framework
 */
export type ExplainabilityLevel = 'BASIC' | 'DETAILED' | 'EXPERT' | 'AUDIT';
/**
 * Regulatory Risk Assessment Levels
 */
export type RegulatoryRiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
/**
 * Confidence-Driven Decision Framework
 */
export interface ConfidenceDrivenClassification {
    confidenceScore: number;
    decisionType: DecisionType;
    requiredActions: RequiredAction[];
    escalationTriggers: EscalationTrigger[];
    reviewDeadline?: Date;
}
/**
 * Confidence Factors for Classification
 */
export interface ConfidenceFactors {
    dataQuality: number;
    regulatoryClarity: number;
    precedentMatch: number;
    modelCertainty: number;
    overallConfidence: number;
    uncertaintyFactors: string[];
}
export type DecisionType = 'AUTOMATED' | 'HUMAN_REVIEW' | 'EXPERT_CONSULTATION' | 'ESCALATION';
export type RequiredAction = 'PROCEED' | 'REVIEW' | 'CONSULT' | 'ESCALATE' | 'REJECT';
export type EscalationTrigger = 'LOW_CONFIDENCE' | 'CONFLICTING_SIGNALS' | 'REGULATORY_AMBIGUITY' | 'PRECEDENT_MISMATCH' | 'HUMAN_OVERRIDE';
/**
 * Inter-Agent Communication Protocol
 */
export interface AgentMessage {
    messageId: string;
    fromAgent: AgentType;
    toAgent: AgentType;
    messageType: MessageType;
    payload: AgentPayload;
    timestamp: Date;
    correlationId: string;
    priority: MessagePriority;
}
export type MessageType = 'REQUEST' | 'RESPONSE' | 'NOTIFICATION' | 'ERROR' | 'ESCALATION';
export type MessagePriority = 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';
export interface AgentPayload {
    data: any;
    metadata: PayloadMetadata;
    confidenceScore?: number;
    explainability?: ExplainabilityResponse;
}
export interface PayloadMetadata {
    dataType: string;
    version: string;
    source: string;
    processingTime?: number;
    validationStatus: ValidationStatus;
}
export type ValidationStatus = 'VALID' | 'INVALID' | 'PENDING' | 'REQUIRES_REVIEW';
/**
 * Multi-Level Explainability Response Structure
 */
export interface DecisionPath {
    steps: any[];
    branchingPoints: any[];
    finalDecision: any;
}
export interface ExplainabilityResponse {
    level: ExplainabilityLevel;
    decisionPath: RegulatoryReasoningStep[];
    sourceEvidence: RegulatoryReference[];
    confidenceBreakdown: ConfidenceFactors;
    alternativeInterpretations: AlternativeClassification[];
    humanReviewTriggers: ReviewTrigger[];
    auditTrail: ComplianceAuditEntry[];
}
export interface RegulatoryReasoningStep {
    stepId: string;
    description: string;
    regulatoryBasis: string;
    inputData: any;
    outputData: any;
    confidence: number;
    reasoning: string;
    alternatives: string[];
}
export interface RegulatoryReference {
    documentId: string;
    documentTitle: string;
    section: string;
    paragraph?: string;
    relevanceScore: number;
    extractedText: string;
    interpretation: string;
}
export interface ConfidenceFactors {
    dataQuality: number;
    regulatoryClarity: number;
    precedentMatch: number;
    modelCertainty: number;
    overallConfidence: number;
    uncertaintyFactors: string[];
}
export interface AlternativeClassification {
    classification: string;
    confidence: number;
    reasoning: string;
    regulatoryBasis: string;
    riskAssessment: string;
}
export interface ReviewTrigger {
    triggerId: string;
    triggerType: EscalationTrigger;
    severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    description: string;
    recommendedAction: RequiredAction;
    deadline?: Date;
}
export interface ComplianceAuditEntry {
    entryId: string;
    timestamp: Date;
    agentId: string;
    action: string;
    inputData: any;
    outputData: any;
    confidence: number;
    humanReviewer?: string;
    approvalStatus: 'PENDING' | 'APPROVED' | 'REJECTED';
    notes?: string;
}
/**
 * Explanation Component Interface
 */
export interface ExplanationComponent {
    componentType: string;
    title: string;
    content: string;
    importance: number;
    regulatoryReferences: RegulatoryReference[];
}
/**
 * Regulatory Traceability Interface
 */
export interface RegulatoryTraceability {
    decisionPath: DecisionPath;
    evidenceSources: EvidenceSource[];
    regulatoryBasis: RegulatoryReference[];
    auditTrail: ComplianceAuditEntry[];
}
/**
 * Evidence Source Interface
 */
export interface EvidenceSource {
    sourceId: string;
    sourceType: string;
    reference: string;
    confidence: number;
    extractedData: any;
}
/**
 * Regulatory Risk Assessment Framework
 */
export interface RegulatoryRiskAssessment {
    assessmentId: string;
    timestamp: Date;
    classificationRisk: RiskLevel;
    interpretationRisk: RiskLevel;
    precedentRisk: RiskLevel;
    updateRisk: RiskLevel;
    overallRisk: RiskLevel;
    mitigationActions: RiskMitigation[];
    reviewRequired: boolean;
    escalationRequired: boolean;
}
export type RiskLevel = 'MINIMAL' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export interface RiskMitigation {
    riskType: string;
    mitigationStrategy: string;
    implementationPriority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
    estimatedEffectiveness: number;
    implementationCost: 'LOW' | 'MEDIUM' | 'HIGH';
    timeline: string;
}
/**
 * Workflow Orchestration Types
 */
export interface AgentWorkflow {
    workflowId: string;
    workflowType: WorkflowType;
    stages: WorkflowStage[];
    currentStage: number;
    status: WorkflowStatus;
    startTime: Date;
    estimatedCompletion?: Date;
    priority: MessagePriority;
}
export type WorkflowType = 'SFDR_CLASSIFICATION' | 'PAI_ANALYSIS' | 'TAXONOMY_ALIGNMENT' | 'REGULATORY_UPDATE' | 'COMPLIANCE_VALIDATION';
export interface WorkflowStage {
    stageId: string;
    stageName: string;
    assignedAgent: AgentType;
    status: StageStatus;
    inputRequirements: string[];
    outputDeliverables: string[];
    estimatedDuration: number;
    dependencies: string[];
}
export type StageStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED' | 'REQUIRES_REVIEW' | 'ESCALATED';
export type WorkflowStatus = 'INITIATED' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED' | 'CANCELLED' | 'REQUIRES_INTERVENTION';
//# sourceMappingURL=types.d.ts.map