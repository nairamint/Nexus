/**
 * SFDR Navigator Agent - Governance & Compliance Framework
 * Phase 2B: Enterprise Governance and Regulatory Oversight
 *
 * Implements comprehensive governance, audit trails, regulatory compliance,
 * and enterprise-grade oversight for AI-driven regulatory decisions
 */
import type { SFDRClassificationRequest, SFDRClassificationResponse } from '../domain/sfdr/types.js';
import type { HumanFeedback, ModelUpdateEvent } from '../ai/learning/continuous-learning.js';
import type { MultiLanguageClassificationResponse } from '../ai/language/multi-language-engine.js';
/**
 * Governance role definitions
 */
export type GovernanceRole = 'compliance-officer' | 'risk-manager' | 'data-protection-officer' | 'audit-manager' | 'regulatory-expert' | 'model-validator' | 'executive-oversight' | 'system-administrator';
/**
 * Compliance status
 */
export type ComplianceStatus = 'compliant' | 'non-compliant' | 'under-review' | 'pending-approval' | 'requires-attention' | 'escalated';
/**
 * Audit event type
 */
export type AuditEventType = 'classification-decision' | 'model-update' | 'human-override' | 'data-access' | 'configuration-change' | 'user-action' | 'system-event' | 'compliance-check' | 'security-event' | 'regulatory-update';
/**
 * Risk level
 */
export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';
/**
 * Regulatory framework
 */
export type RegulatoryFramework = 'SFDR' | 'GDPR' | 'MiFID-II' | 'AIFMD' | 'UCITS' | 'Solvency-II' | 'Basel-III' | 'EMIR' | 'MAR' | 'PSD2';
/**
 * Governance policy
 */
export interface GovernancePolicy {
    policyId: string;
    name: string;
    description: string;
    framework: RegulatoryFramework;
    version: string;
    effectiveDate: string;
    expiryDate?: string;
    owner: string;
    approver: string;
    status: 'draft' | 'active' | 'deprecated' | 'under-review';
    rules: PolicyRule[];
    controls: ComplianceControl[];
    metadata: PolicyMetadata;
}
/**
 * Policy rule
 */
export interface PolicyRule {
    ruleId: string;
    name: string;
    description: string;
    type: 'mandatory' | 'recommended' | 'conditional';
    condition?: string;
    action: 'allow' | 'deny' | 'require-approval' | 'log-only';
    severity: RiskLevel;
    implementation: RuleImplementation;
}
/**
 * Rule implementation
 */
export interface RuleImplementation {
    automatedCheck: boolean;
    checkFunction?: string;
    humanReviewRequired: boolean;
    escalationPath: string[];
    remediation: string[];
}
/**
 * Compliance control
 */
export interface ComplianceControl {
    controlId: string;
    name: string;
    description: string;
    type: 'preventive' | 'detective' | 'corrective';
    frequency: 'real-time' | 'daily' | 'weekly' | 'monthly' | 'quarterly';
    owner: string;
    implementation: ControlImplementation;
    testing: ControlTesting;
}
/**
 * Control implementation
 */
export interface ControlImplementation {
    automated: boolean;
    manual: boolean;
    procedures: string[];
    tools: string[];
    documentation: string[];
}
/**
 * Control testing
 */
export interface ControlTesting {
    frequency: string;
    methodology: string;
    lastTested: string;
    nextTest: string;
    results: TestResult[];
}
/**
 * Test result
 */
export interface TestResult {
    testId: string;
    date: string;
    tester: string;
    outcome: 'pass' | 'fail' | 'partial';
    findings: string[];
    recommendations: string[];
}
/**
 * Policy metadata
 */
export interface PolicyMetadata {
    tags: string[];
    category: string;
    jurisdiction: string[];
    applicability: string[];
    references: string[];
    lastReviewed: string;
    nextReview: string;
}
/**
 * Audit trail entry
 */
export interface AuditTrailEntry {
    auditId: string;
    timestamp: string;
    eventType: AuditEventType;
    userId: string;
    userRole: GovernanceRole;
    sessionId: string;
    action: string;
    resource: string;
    details: AuditDetails;
    outcome: 'success' | 'failure' | 'partial';
    riskLevel: RiskLevel;
    complianceImpact: ComplianceImpact;
    metadata: AuditMetadata;
}
/**
 * Audit details
 */
export interface AuditDetails {
    before?: any;
    after?: any;
    changes: ChangeRecord[];
    justification?: string;
    approvals: ApprovalRecord[];
    evidence: EvidenceRecord[];
}
/**
 * Change record
 */
export interface ChangeRecord {
    field: string;
    oldValue: any;
    newValue: any;
    changeType: 'create' | 'update' | 'delete';
    reason: string;
}
/**
 * Approval record
 */
export interface ApprovalRecord {
    approver: string;
    role: GovernanceRole;
    timestamp: string;
    decision: 'approved' | 'rejected' | 'conditional';
    comments?: string;
    conditions?: string[];
}
/**
 * Evidence record
 */
export interface EvidenceRecord {
    evidenceId: string;
    type: 'document' | 'screenshot' | 'log' | 'calculation' | 'external-validation';
    source: string;
    hash: string;
    timestamp: string;
    description: string;
}
/**
 * Compliance impact
 */
export interface ComplianceImpact {
    frameworks: RegulatoryFramework[];
    policies: string[];
    controls: string[];
    riskAssessment: RiskAssessment;
    mitigationRequired: boolean;
}
/**
 * Risk assessment
 */
export interface RiskAssessment {
    inherentRisk: RiskLevel;
    residualRisk: RiskLevel;
    mitigatingControls: string[];
    riskFactors: string[];
    likelihood: 'very-low' | 'low' | 'medium' | 'high' | 'very-high';
    impact: 'negligible' | 'minor' | 'moderate' | 'major' | 'severe';
}
/**
 * Audit metadata
 */
export interface AuditMetadata {
    correlationId: string;
    parentAuditId?: string;
    tags: string[];
    retention: string;
    classification: 'public' | 'internal' | 'confidential' | 'restricted';
    jurisdiction: string;
}
/**
 * Compliance assessment
 */
export interface ComplianceAssessment {
    assessmentId: string;
    timestamp: string;
    scope: AssessmentScope;
    framework: RegulatoryFramework;
    status: ComplianceStatus;
    findings: ComplianceFinding[];
    recommendations: ComplianceRecommendation[];
    riskRating: RiskLevel;
    nextAssessment: string;
    assessor: string;
}
/**
 * Assessment scope
 */
export interface AssessmentScope {
    systems: string[];
    processes: string[];
    policies: string[];
    timeframe: {
        start: string;
        end: string;
    };
    criteria: string[];
}
/**
 * Compliance finding
 */
export interface ComplianceFinding {
    findingId: string;
    type: 'gap' | 'weakness' | 'non-compliance' | 'observation';
    severity: RiskLevel;
    description: string;
    evidence: string[];
    requirement: string;
    impact: string;
    recommendation: string;
    owner: string;
    dueDate: string;
    status: 'open' | 'in-progress' | 'resolved' | 'accepted-risk';
}
/**
 * Compliance recommendation
 */
export interface ComplianceRecommendation {
    recommendationId: string;
    priority: 'low' | 'medium' | 'high' | 'critical';
    description: string;
    rationale: string;
    implementation: ImplementationPlan;
    benefits: string[];
    risks: string[];
    cost: CostEstimate;
    timeline: string;
}
/**
 * Implementation plan
 */
export interface ImplementationPlan {
    phases: ImplementationPhase[];
    dependencies: string[];
    resources: ResourceRequirement[];
    milestones: Milestone[];
    successCriteria: string[];
}
/**
 * Implementation phase
 */
export interface ImplementationPhase {
    phaseId: string;
    name: string;
    description: string;
    duration: string;
    activities: string[];
    deliverables: string[];
    owner: string;
}
/**
 * Resource requirement
 */
export interface ResourceRequirement {
    type: 'human' | 'technology' | 'financial' | 'external';
    description: string;
    quantity: number;
    duration: string;
    cost: number;
}
/**
 * Milestone
 */
export interface Milestone {
    milestoneId: string;
    name: string;
    description: string;
    targetDate: string;
    criteria: string[];
    dependencies: string[];
}
/**
 * Cost estimate
 */
export interface CostEstimate {
    initial: number;
    ongoing: number;
    currency: string;
    breakdown: CostBreakdown[];
    assumptions: string[];
}
/**
 * Cost breakdown
 */
export interface CostBreakdown {
    category: string;
    amount: number;
    description: string;
}
/**
 * Data governance record
 */
export interface DataGovernanceRecord {
    recordId: string;
    dataAsset: string;
    classification: 'public' | 'internal' | 'confidential' | 'restricted';
    owner: string;
    steward: string;
    retention: RetentionPolicy;
    access: AccessPolicy;
    quality: DataQualityMetrics;
    lineage: DataLineage;
    privacy: PrivacyMetadata;
}
/**
 * Retention policy
 */
export interface RetentionPolicy {
    period: string;
    trigger: 'time-based' | 'event-based' | 'manual';
    disposal: 'delete' | 'archive' | 'anonymize';
    exceptions: string[];
    legalHolds: string[];
}
/**
 * Access policy
 */
export interface AccessPolicy {
    roles: string[];
    permissions: Permission[];
    restrictions: AccessRestriction[];
    monitoring: boolean;
    approval: ApprovalWorkflow;
}
/**
 * Permission
 */
export interface Permission {
    action: 'read' | 'write' | 'delete' | 'export' | 'share';
    conditions: string[];
    timeframe?: string;
}
/**
 * Access restriction
 */
export interface AccessRestriction {
    type: 'geographic' | 'temporal' | 'purpose' | 'method';
    description: string;
    enforcement: 'technical' | 'procedural' | 'both';
}
/**
 * Approval workflow
 */
export interface ApprovalWorkflow {
    required: boolean;
    approvers: string[];
    escalation: string[];
    timeout: string;
    autoApproval: AutoApprovalRule[];
}
/**
 * Auto approval rule
 */
export interface AutoApprovalRule {
    condition: string;
    action: 'approve' | 'reject' | 'escalate';
    validity: string;
}
/**
 * Data quality metrics
 */
export interface DataQualityMetrics {
    completeness: number;
    accuracy: number;
    consistency: number;
    timeliness: number;
    validity: number;
    uniqueness: number;
    lastAssessed: string;
    issues: DataQualityIssue[];
}
/**
 * Data quality issue
 */
export interface DataQualityIssue {
    issueId: string;
    type: 'missing' | 'invalid' | 'duplicate' | 'inconsistent' | 'outdated';
    severity: RiskLevel;
    description: string;
    impact: string;
    resolution: string;
    status: 'open' | 'in-progress' | 'resolved';
}
/**
 * Data lineage
 */
export interface DataLineage {
    source: DataSource[];
    transformations: DataTransformation[];
    destinations: DataDestination[];
    dependencies: string[];
    lastUpdated: string;
}
/**
 * Data source
 */
export interface DataSource {
    sourceId: string;
    name: string;
    type: 'database' | 'file' | 'api' | 'stream' | 'manual';
    location: string;
    format: string;
    frequency: string;
}
/**
 * Data transformation
 */
export interface DataTransformation {
    transformationId: string;
    name: string;
    type: 'cleansing' | 'enrichment' | 'aggregation' | 'validation' | 'anonymization';
    description: string;
    rules: string[];
    impact: string;
}
/**
 * Data destination
 */
export interface DataDestination {
    destinationId: string;
    name: string;
    type: 'database' | 'file' | 'api' | 'report' | 'dashboard';
    location: string;
    purpose: string;
    audience: string[];
}
/**
 * Privacy metadata
 */
export interface PrivacyMetadata {
    personalData: boolean;
    sensitiveData: boolean;
    legalBasis: string[];
    purposes: string[];
    subjects: string[];
    processors: string[];
    transfers: DataTransfer[];
    rights: DataSubjectRights;
}
/**
 * Data transfer
 */
export interface DataTransfer {
    transferId: string;
    destination: string;
    mechanism: string;
    safeguards: string[];
    purpose: string;
    approval: string;
}
/**
 * Data subject rights
 */
export interface DataSubjectRights {
    access: boolean;
    rectification: boolean;
    erasure: boolean;
    portability: boolean;
    restriction: boolean;
    objection: boolean;
    automatedDecision: boolean;
}
/**
 * Main governance and compliance framework
 */
export declare class GovernanceComplianceFramework {
    private readonly auditManager;
    private readonly policyEngine;
    private readonly complianceMonitor;
    private readonly riskAssessor;
    private readonly dataGovernance;
    private readonly accessController;
    private readonly evidenceManager;
    private readonly reportingEngine;
    constructor();
    /**
     * Record classification decision for audit trail
     */
    recordClassificationDecision(request: SFDRClassificationRequest, response: SFDRClassificationResponse | MultiLanguageClassificationResponse, userId: string, userRole: GovernanceRole, sessionId: string): Promise<string>;
    /**
     * Record human feedback for governance
     */
    recordHumanFeedback(feedback: HumanFeedback, originalRequest: SFDRClassificationRequest, originalResponse: SFDRClassificationResponse, reviewerId: string, reviewerRole: GovernanceRole): Promise<string>;
    /**
     * Record model update for governance
     */
    recordModelUpdate(updateEvent: ModelUpdateEvent, userId: string, userRole: GovernanceRole): Promise<string>;
    /**
     * Conduct compliance assessment
     */
    conductComplianceAssessment(scope: AssessmentScope, framework: RegulatoryFramework, assessorId: string): Promise<ComplianceAssessment>;
    /**
     * Generate compliance report
     */
    generateComplianceReport(framework: RegulatoryFramework, period: string, includeRecommendations?: boolean): Promise<any>;
    /**
     * Get audit trail
     */
    getAuditTrail(filters: {
        startDate?: string;
        endDate?: string;
        eventType?: AuditEventType;
        userId?: string;
        resource?: string;
        riskLevel?: RiskLevel;
    }): Promise<AuditTrailEntry[]>;
    /**
     * Check data access authorization
     */
    checkDataAccess(userId: string, userRole: GovernanceRole, dataAsset: string, action: 'read' | 'write' | 'delete' | 'export' | 'share'): Promise<boolean>;
    private assessComplianceImpact;
    private assessRiskLevel;
    private assessFeedbackRisk;
    private assessModelUpdateRisk;
    private collectEvidence;
    private collectFeedbackEvidence;
    private collectModelUpdateEvidence;
    private calculateHash;
    private findOriginalAuditId;
    private containsPersonalData;
    private getApplicablePolicies;
    private getApplicableControls;
    private analyzeCompliance;
    private generateRecommendations;
    private calculateOverallRisk;
    private determineComplianceStatus;
    private calculateNextAssessmentDate;
    private calculateClassificationAccuracy;
    private storeComplianceAssessment;
}
/**
 * Audit management
 */
export declare class AuditManager {
    private auditTrail;
    recordAuditEntry(entry: AuditTrailEntry): Promise<string>;
    getAuditTrail(filters: any): Promise<AuditTrailEntry[]>;
    getAuditData(startDate: string, endDate: string, systems: string[]): Promise<AuditTrailEntry[]>;
}
/**
 * Policy engine
 */
export declare class PolicyEngine {
    private policies;
    checkCompliance(auditEntry: AuditTrailEntry): Promise<void>;
    addPolicy(policy: GovernancePolicy): Promise<void>;
}
/**
 * Compliance monitoring
 */
export declare class ComplianceMonitor {
    monitorEvent(auditEntry: AuditTrailEntry): Promise<void>;
    private triggerAlert;
}
/**
 * Risk assessment
 */
export declare class RiskAssessor {
    assessRisk(eventType: AuditEventType, data: any): Promise<RiskAssessment>;
}
/**
 * Data governance management
 */
export declare class DataGovernanceManager {
    private dataAssets;
    registerDataAsset(record: DataGovernanceRecord): Promise<void>;
    getDataAsset(assetId: string): Promise<DataGovernanceRecord | undefined>;
}
/**
 * Access control
 */
export declare class AccessController {
    checkAccess(userId: string, userRole: GovernanceRole, dataAsset: string, action: 'read' | 'write' | 'delete' | 'export' | 'share'): Promise<boolean>;
}
/**
 * Evidence management
 */
export declare class EvidenceManager {
    private evidence;
    storeEvidence(evidence: EvidenceRecord): Promise<void>;
    getEvidence(evidenceId: string): Promise<EvidenceRecord | undefined>;
}
/**
 * Compliance reporting
 */
export declare class ComplianceReportingEngine {
    generateReport(framework: RegulatoryFramework, period: string, includeRecommendations: boolean): Promise<any>;
}
//# sourceMappingURL=compliance-framework.d.ts.map