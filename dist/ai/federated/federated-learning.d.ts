/**
 * SFDR Navigator Agent - Federated Learning System
 * Phase 2B: Privacy-Preserving Distributed Learning
 *
 * Implements federated learning for regulatory compliance models,
 * enabling collaborative training while preserving data privacy
 * and meeting strict regulatory requirements
 */
import type { RegulatoryMLModel, ModelPerformanceMetrics } from '../ml/regulatory-models.js';
import type { HumanFeedback } from '../learning/continuous-learning.js';
/**
 * Federated learning participant type
 */
export type ParticipantType = 'financial-institution' | 'asset-manager' | 'regulatory-authority' | 'compliance-consultant' | 'technology-provider';
/**
 * Privacy preservation technique
 */
export type PrivacyTechnique = 'differential-privacy' | 'homomorphic-encryption' | 'secure-multiparty-computation' | 'federated-averaging' | 'gradient-compression' | 'noise-injection';
/**
 * Aggregation strategy
 */
export type AggregationStrategy = 'federated-averaging' | 'weighted-averaging' | 'byzantine-robust' | 'adaptive-aggregation' | 'hierarchical-aggregation';
/**
 * Communication protocol
 */
export type CommunicationProtocol = 'synchronous' | 'asynchronous' | 'semi-synchronous' | 'event-driven';
/**
 * Federated learning configuration
 */
export interface FederatedLearningConfig {
    federation: FederationConfig;
    privacy: PrivacyConfig;
    communication: CommunicationConfig;
    aggregation: AggregationConfig;
    security: SecurityConfig;
    governance: GovernanceConfig;
    monitoring: MonitoringConfig;
}
/**
 * Federation configuration
 */
export interface FederationConfig {
    federationId: string;
    name: string;
    description: string;
    coordinator: ParticipantInfo;
    participants: ParticipantInfo[];
    minParticipants: number;
    maxParticipants: number;
    participantRequirements: ParticipantRequirements;
}
/**
 * Participant information
 */
export interface ParticipantInfo {
    participantId: string;
    name: string;
    type: ParticipantType;
    jurisdiction: string;
    certifications: string[];
    capabilities: ParticipantCapabilities;
    status: ParticipantStatus;
    joinedAt: string;
    lastActive: string;
}
/**
 * Participant capabilities
 */
export interface ParticipantCapabilities {
    dataTypes: string[];
    modelTypes: string[];
    computeResources: ComputeResources;
    privacyTechniques: PrivacyTechnique[];
    regulatoryCompliance: string[];
}
/**
 * Compute resources
 */
export interface ComputeResources {
    cpu: ResourceSpec;
    memory: ResourceSpec;
    gpu?: ResourceSpec;
    storage: ResourceSpec;
    bandwidth: ResourceSpec;
}
/**
 * Resource specification
 */
export interface ResourceSpec {
    available: number;
    allocated: number;
    unit: string;
    performance: number;
}
/**
 * Participant status
 */
export interface ParticipantStatus {
    state: 'active' | 'inactive' | 'suspended' | 'pending';
    health: 'healthy' | 'degraded' | 'unhealthy';
    compliance: 'compliant' | 'non-compliant' | 'under-review';
    lastUpdate: string;
    issues: string[];
}
/**
 * Participant requirements
 */
export interface ParticipantRequirements {
    minDataSize: number;
    requiredCertifications: string[];
    complianceStandards: string[];
    technicalRequirements: TechnicalRequirements;
    legalRequirements: LegalRequirements;
}
/**
 * Technical requirements
 */
export interface TechnicalRequirements {
    minComputeCapacity: ComputeResources;
    requiredPrivacyTechniques: PrivacyTechnique[];
    securityStandards: string[];
    apiCompatibility: string[];
}
/**
 * Legal requirements
 */
export interface LegalRequirements {
    dataProcessingAgreement: boolean;
    gdprCompliance: boolean;
    localDataResidency: boolean;
    auditRights: boolean;
    liabilityFramework: string;
}
/**
 * Privacy configuration
 */
export interface PrivacyConfig {
    techniques: PrivacyTechnique[];
    differentialPrivacy: DifferentialPrivacyConfig;
    homomorphicEncryption: HomomorphicEncryptionConfig;
    secureComputation: SecureComputationConfig;
    dataMinimization: DataMinimizationConfig;
    anonymization: AnonymizationConfig;
}
/**
 * Differential privacy configuration
 */
export interface DifferentialPrivacyConfig {
    enabled: boolean;
    epsilon: number;
    delta: number;
    mechanism: 'laplace' | 'gaussian' | 'exponential';
    clipping: ClippingConfig;
    composition: CompositionConfig;
}
/**
 * Clipping configuration
 */
export interface ClippingConfig {
    enabled: boolean;
    norm: 'l1' | 'l2' | 'linf';
    threshold: number;
    adaptive: boolean;
}
/**
 * Composition configuration
 */
export interface CompositionConfig {
    method: 'basic' | 'advanced' | 'rdp' | 'gdp';
    trackingEnabled: boolean;
    budgetAllocation: BudgetAllocation[];
}
/**
 * Budget allocation
 */
export interface BudgetAllocation {
    operation: string;
    epsilon: number;
    delta: number;
    frequency: number;
}
/**
 * Homomorphic encryption configuration
 */
export interface HomomorphicEncryptionConfig {
    enabled: boolean;
    scheme: 'paillier' | 'ckks' | 'bfv' | 'bgv';
    keySize: number;
    securityLevel: number;
    operations: ('addition' | 'multiplication' | 'comparison')[];
}
/**
 * Secure computation configuration
 */
export interface SecureComputationConfig {
    enabled: boolean;
    protocol: 'shamir' | 'bgw' | 'gmw' | 'aby';
    threshold: number;
    parties: number;
    security: 'semi-honest' | 'malicious';
}
/**
 * Data minimization configuration
 */
export interface DataMinimizationConfig {
    enabled: boolean;
    techniques: ('sampling' | 'feature-selection' | 'dimensionality-reduction')[];
    samplingRate: number;
    featureThreshold: number;
    retentionPeriod: number;
}
/**
 * Anonymization configuration
 */
export interface AnonymizationConfig {
    enabled: boolean;
    techniques: ('k-anonymity' | 'l-diversity' | 't-closeness' | 'synthetic-data')[];
    kValue: number;
    lValue: number;
    tThreshold: number;
    syntheticDataRatio: number;
}
/**
 * Communication configuration
 */
export interface CommunicationConfig {
    protocol: CommunicationProtocol;
    encryption: EncryptionConfig;
    compression: CompressionConfig;
    reliability: ReliabilityConfig;
    bandwidth: BandwidthConfig;
}
/**
 * Encryption configuration
 */
export interface EncryptionConfig {
    enabled: boolean;
    algorithm: 'aes-256' | 'chacha20' | 'rsa-4096';
    keyRotation: KeyRotationConfig;
    certificateValidation: boolean;
}
/**
 * Key rotation configuration
 */
export interface KeyRotationConfig {
    enabled: boolean;
    interval: number;
    algorithm: 'automatic' | 'manual';
    backupKeys: number;
}
/**
 * Compression configuration
 */
export interface CompressionConfig {
    enabled: boolean;
    algorithm: 'gzip' | 'lz4' | 'zstd';
    level: number;
    threshold: number;
}
/**
 * Reliability configuration
 */
export interface ReliabilityConfig {
    retries: number;
    timeout: number;
    backoff: 'linear' | 'exponential' | 'fixed';
    circuitBreaker: CircuitBreakerConfig;
}
/**
 * Circuit breaker configuration
 */
export interface CircuitBreakerConfig {
    enabled: boolean;
    failureThreshold: number;
    recoveryTimeout: number;
    halfOpenRequests: number;
}
/**
 * Bandwidth configuration
 */
export interface BandwidthConfig {
    maxUpload: number;
    maxDownload: number;
    prioritization: boolean;
    throttling: ThrottlingConfig;
}
/**
 * Throttling configuration
 */
export interface ThrottlingConfig {
    enabled: boolean;
    algorithm: 'token-bucket' | 'leaky-bucket' | 'sliding-window';
    rate: number;
    burst: number;
}
/**
 * Aggregation configuration
 */
export interface AggregationConfig {
    strategy: AggregationStrategy;
    frequency: AggregationFrequency;
    validation: ValidationConfig;
    consensus: ConsensusConfig;
    quality: QualityConfig;
}
/**
 * Aggregation frequency
 */
export interface AggregationFrequency {
    type: 'time-based' | 'round-based' | 'event-based';
    interval: number;
    minParticipants: number;
    maxWaitTime: number;
}
/**
 * Validation configuration
 */
export interface ValidationConfig {
    enabled: boolean;
    techniques: ('statistical' | 'cryptographic' | 'behavioral')[];
    thresholds: ValidationThresholds;
    actions: ValidationAction[];
}
/**
 * Validation thresholds
 */
export interface ValidationThresholds {
    maxDeviation: number;
    minAccuracy: number;
    maxLoss: number;
    consistencyThreshold: number;
}
/**
 * Validation action
 */
export interface ValidationAction {
    trigger: string;
    action: 'reject' | 'quarantine' | 'investigate' | 'accept-with-warning';
    severity: 'low' | 'medium' | 'high' | 'critical';
}
/**
 * Consensus configuration
 */
export interface ConsensusConfig {
    enabled: boolean;
    algorithm: 'majority' | 'weighted-majority' | 'byzantine-fault-tolerant';
    threshold: number;
    timeout: number;
}
/**
 * Quality configuration
 */
export interface QualityConfig {
    enabled: boolean;
    metrics: QualityMetric[];
    weights: Record<string, number>;
    thresholds: QualityThresholds;
}
/**
 * Quality metric
 */
export interface QualityMetric {
    name: string;
    type: 'accuracy' | 'precision' | 'recall' | 'f1' | 'auc' | 'loss';
    weight: number;
    target: number;
}
/**
 * Quality thresholds
 */
export interface QualityThresholds {
    minOverallScore: number;
    maxDegradation: number;
    improvementTarget: number;
}
/**
 * Security configuration
 */
export interface SecurityConfig {
    authentication: AuthenticationConfig;
    authorization: AuthorizationConfig;
    audit: AuditConfig;
    threatDetection: ThreatDetectionConfig;
    incidentResponse: IncidentResponseConfig;
}
/**
 * Authentication configuration
 */
export interface AuthenticationConfig {
    method: 'certificate' | 'token' | 'multi-factor';
    certificateValidation: boolean;
    tokenExpiration: number;
    mfaRequired: boolean;
}
/**
 * Authorization configuration
 */
export interface AuthorizationConfig {
    model: 'rbac' | 'abac' | 'custom';
    roles: Role[];
    permissions: Permission[];
    policies: Policy[];
}
/**
 * Role definition
 */
export interface Role {
    roleId: string;
    name: string;
    description: string;
    permissions: string[];
    constraints: RoleConstraint[];
}
/**
 * Permission definition
 */
export interface Permission {
    permissionId: string;
    name: string;
    resource: string;
    actions: string[];
    conditions: string[];
}
/**
 * Policy definition
 */
export interface Policy {
    policyId: string;
    name: string;
    rules: PolicyRule[];
    effect: 'allow' | 'deny';
    priority: number;
}
/**
 * Policy rule
 */
export interface PolicyRule {
    condition: string;
    action: string;
    resource: string;
    effect: 'allow' | 'deny';
}
/**
 * Role constraint
 */
export interface RoleConstraint {
    type: 'time' | 'location' | 'resource' | 'custom';
    condition: string;
    enforcement: 'strict' | 'advisory';
}
/**
 * Audit configuration
 */
export interface AuditConfig {
    enabled: boolean;
    events: AuditEvent[];
    retention: number;
    encryption: boolean;
    immutability: boolean;
}
/**
 * Audit event
 */
export interface AuditEvent {
    eventType: string;
    severity: 'info' | 'warning' | 'error' | 'critical';
    fields: string[];
    retention: number;
}
/**
 * Threat detection configuration
 */
export interface ThreatDetectionConfig {
    enabled: boolean;
    techniques: ('anomaly-detection' | 'signature-based' | 'behavioral-analysis')[];
    sensitivity: 'low' | 'medium' | 'high';
    response: 'log' | 'alert' | 'block' | 'quarantine';
}
/**
 * Incident response configuration
 */
export interface IncidentResponseConfig {
    enabled: boolean;
    escalation: EscalationLevel[];
    notification: NotificationConfig[];
    automation: AutomationConfig;
}
/**
 * Escalation level
 */
export interface EscalationLevel {
    level: number;
    severity: string[];
    contacts: string[];
    timeout: number;
}
/**
 * Notification configuration
 */
export interface NotificationConfig {
    channel: 'email' | 'sms' | 'webhook' | 'dashboard';
    recipients: string[];
    template: string;
    conditions: string[];
}
/**
 * Automation configuration
 */
export interface AutomationConfig {
    enabled: boolean;
    rules: AutomationRule[];
    safeguards: string[];
}
/**
 * Automation rule
 */
export interface AutomationRule {
    trigger: string;
    condition: string;
    action: string;
    approval: 'automatic' | 'manual' | 'conditional';
}
/**
 * Governance configuration
 */
export interface GovernanceConfig {
    framework: GovernanceFramework;
    compliance: ComplianceConfig;
    dataGovernance: DataGovernanceConfig;
    modelGovernance: ModelGovernanceConfig;
}
/**
 * Governance framework
 */
export interface GovernanceFramework {
    standard: 'iso27001' | 'nist' | 'gdpr' | 'custom';
    policies: GovernancePolicy[];
    procedures: GoveranceProcedure[];
    controls: GovernanceControl[];
}
/**
 * Governance policy
 */
export interface GovernancePolicy {
    policyId: string;
    name: string;
    version: string;
    description: string;
    requirements: string[];
    enforcement: 'mandatory' | 'recommended' | 'optional';
}
/**
 * Governance procedure
 */
export interface GoveranceProcedure {
    procedureId: string;
    name: string;
    steps: ProcedureStep[];
    roles: string[];
    frequency: string;
}
/**
 * Procedure step
 */
export interface ProcedureStep {
    stepId: string;
    name: string;
    description: string;
    responsible: string;
    inputs: string[];
    outputs: string[];
    controls: string[];
}
/**
 * Governance control
 */
export interface GovernanceControl {
    controlId: string;
    name: string;
    type: 'preventive' | 'detective' | 'corrective';
    automation: 'manual' | 'semi-automated' | 'automated';
    frequency: string;
    evidence: string[];
}
/**
 * Compliance configuration
 */
export interface ComplianceConfig {
    frameworks: string[];
    requirements: ComplianceRequirement[];
    assessments: ComplianceAssessment[];
    reporting: ComplianceReporting;
}
/**
 * Compliance requirement
 */
export interface ComplianceRequirement {
    requirementId: string;
    framework: string;
    category: string;
    description: string;
    controls: string[];
    evidence: string[];
    status: 'compliant' | 'non-compliant' | 'partial' | 'not-applicable';
}
/**
 * Compliance assessment
 */
export interface ComplianceAssessment {
    assessmentId: string;
    framework: string;
    scope: string;
    assessor: string;
    schedule: AssessmentSchedule;
    methodology: string;
}
/**
 * Assessment schedule
 */
export interface AssessmentSchedule {
    frequency: 'annual' | 'semi-annual' | 'quarterly' | 'monthly';
    nextAssessment: string;
    duration: number;
    preparation: number;
}
/**
 * Compliance reporting
 */
export interface ComplianceReporting {
    frequency: 'real-time' | 'daily' | 'weekly' | 'monthly' | 'quarterly';
    recipients: string[];
    format: 'dashboard' | 'report' | 'api' | 'export';
    automation: boolean;
}
/**
 * Data governance configuration
 */
export interface DataGovernanceConfig {
    classification: DataClassificationConfig;
    lifecycle: DataLifecycleConfig;
    quality: DataQualityConfig;
    lineage: DataLineageConfig;
}
/**
 * Data classification configuration
 */
export interface DataClassificationConfig {
    enabled: boolean;
    levels: DataClassificationLevel[];
    automation: boolean;
    validation: boolean;
}
/**
 * Data classification level
 */
export interface DataClassificationLevel {
    level: string;
    description: string;
    criteria: string[];
    handling: DataHandlingRequirement[];
    retention: number;
}
/**
 * Data handling requirement
 */
export interface DataHandlingRequirement {
    requirement: string;
    mandatory: boolean;
    controls: string[];
    monitoring: boolean;
}
/**
 * Data lifecycle configuration
 */
export interface DataLifecycleConfig {
    stages: DataLifecycleStage[];
    automation: boolean;
    monitoring: boolean;
}
/**
 * Data lifecycle stage
 */
export interface DataLifecycleStage {
    stage: 'creation' | 'processing' | 'storage' | 'sharing' | 'archival' | 'deletion';
    duration: number;
    requirements: string[];
    controls: string[];
    approval: boolean;
}
/**
 * Data quality configuration
 */
export interface DataQualityConfig {
    enabled: boolean;
    dimensions: DataQualityDimension[];
    monitoring: boolean;
    remediation: boolean;
}
/**
 * Data quality dimension
 */
export interface DataQualityDimension {
    dimension: 'accuracy' | 'completeness' | 'consistency' | 'timeliness' | 'validity';
    threshold: number;
    measurement: string;
    frequency: string;
}
/**
 * Data lineage configuration
 */
export interface DataLineageConfig {
    enabled: boolean;
    granularity: 'field' | 'table' | 'dataset';
    automation: boolean;
    visualization: boolean;
}
/**
 * Model governance configuration
 */
export interface ModelGovernanceConfig {
    lifecycle: ModelLifecycleConfig;
    validation: ModelValidationConfig;
    monitoring: ModelMonitoringConfig;
    explainability: ModelExplainabilityConfig;
}
/**
 * Model lifecycle configuration
 */
export interface ModelLifecycleConfig {
    stages: ModelLifecycleStage[];
    approvals: ModelApproval[];
    versioning: ModelVersioningConfig;
}
/**
 * Model lifecycle stage
 */
export interface ModelLifecycleStage {
    stage: 'development' | 'validation' | 'approval' | 'deployment' | 'monitoring' | 'retirement';
    requirements: string[];
    artifacts: string[];
    approvers: string[];
    duration: number;
}
/**
 * Model approval
 */
export interface ModelApproval {
    approvalType: 'technical' | 'business' | 'regulatory' | 'risk';
    approver: string;
    criteria: string[];
    documentation: string[];
    timeline: number;
}
/**
 * Model versioning configuration
 */
export interface ModelVersioningConfig {
    strategy: 'semantic' | 'timestamp' | 'sequential';
    retention: number;
    rollback: boolean;
    comparison: boolean;
}
/**
 * Model validation configuration
 */
export interface ModelValidationConfig {
    techniques: ('cross-validation' | 'holdout' | 'bootstrap' | 'time-series')[];
    metrics: string[];
    thresholds: Record<string, number>;
    frequency: string;
}
/**
 * Model monitoring configuration
 */
export interface ModelMonitoringConfig {
    enabled: boolean;
    metrics: ModelMonitoringMetric[];
    alerts: ModelAlert[];
    dashboards: boolean;
}
/**
 * Model monitoring metric
 */
export interface ModelMonitoringMetric {
    metric: 'accuracy' | 'drift' | 'bias' | 'performance' | 'usage';
    threshold: number;
    frequency: string;
    action: string;
}
/**
 * Model alert
 */
export interface ModelAlert {
    alertType: string;
    condition: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    recipients: string[];
    escalation: boolean;
}
/**
 * Model explainability configuration
 */
export interface ModelExplainabilityConfig {
    enabled: boolean;
    techniques: ('lime' | 'shap' | 'permutation' | 'attention')[];
    granularity: 'global' | 'local' | 'both';
    audience: ('technical' | 'business' | 'regulatory')[];
}
/**
 * Monitoring configuration
 */
export interface MonitoringConfig {
    federation: FederationMonitoring;
    participants: ParticipantMonitoring;
    models: ModelMonitoring;
    privacy: PrivacyMonitoring;
    security: SecurityMonitoring;
}
/**
 * Federation monitoring
 */
export interface FederationMonitoring {
    enabled: boolean;
    metrics: FederationMetric[];
    dashboards: boolean;
    alerts: boolean;
    reporting: boolean;
}
/**
 * Federation metric
 */
export interface FederationMetric {
    metric: 'participation-rate' | 'model-quality' | 'convergence-time' | 'communication-overhead';
    frequency: string;
    threshold: number;
    action: string;
}
/**
 * Participant monitoring
 */
export interface ParticipantMonitoring {
    enabled: boolean;
    healthChecks: boolean;
    performance: boolean;
    compliance: boolean;
    behavior: boolean;
}
/**
 * Model monitoring
 */
export interface ModelMonitoring {
    enabled: boolean;
    accuracy: boolean;
    drift: boolean;
    bias: boolean;
    fairness: boolean;
    explainability: boolean;
}
/**
 * Privacy monitoring
 */
export interface PrivacyMonitoring {
    enabled: boolean;
    budgetTracking: boolean;
    leakageDetection: boolean;
    complianceChecks: boolean;
    auditTrail: boolean;
}
/**
 * Security monitoring
 */
export interface SecurityMonitoring {
    enabled: boolean;
    threatDetection: boolean;
    accessControl: boolean;
    dataIntegrity: boolean;
    incidentTracking: boolean;
}
/**
 * Federated learning round
 */
export interface FederatedRound {
    roundId: string;
    federationId: string;
    roundNumber: number;
    startTime: string;
    endTime?: string;
    status: 'pending' | 'active' | 'completed' | 'failed' | 'cancelled';
    participants: RoundParticipant[];
    globalModel: GlobalModelInfo;
    aggregationResult: AggregationResult;
    metrics: RoundMetrics;
}
/**
 * Round participant
 */
export interface RoundParticipant {
    participantId: string;
    status: 'invited' | 'accepted' | 'training' | 'completed' | 'failed' | 'dropped';
    localUpdate: LocalUpdate;
    contribution: ParticipantContribution;
    performance: ParticipantPerformance;
}
/**
 * Local update
 */
export interface LocalUpdate {
    updateId: string;
    modelDelta: ModelDelta;
    metrics: LocalMetrics;
    privacy: PrivacyMetrics;
    validation: ValidationResult;
    timestamp: string;
}
/**
 * Model delta
 */
export interface ModelDelta {
    parameters: Record<string, number[]>;
    gradients?: Record<string, number[]>;
    weights?: Record<string, number>;
    compression: CompressionInfo;
    encryption: EncryptionInfo;
}
/**
 * Compression info
 */
export interface CompressionInfo {
    algorithm: string;
    ratio: number;
    originalSize: number;
    compressedSize: number;
}
/**
 * Encryption info
 */
export interface EncryptionInfo {
    algorithm: string;
    keyId: string;
    integrity: string;
    timestamp: string;
}
/**
 * Local metrics
 */
export interface LocalMetrics {
    accuracy: number;
    loss: number;
    trainingTime: number;
    dataSize: number;
    epochs: number;
    convergence: boolean;
}
/**
 * Privacy metrics
 */
export interface PrivacyMetrics {
    epsilonUsed: number;
    deltaUsed: number;
    noiseLevel: number;
    privacyBudgetRemaining: number;
    leakageRisk: number;
}
/**
 * Validation result
 */
export interface ValidationResult {
    status: 'valid' | 'invalid' | 'suspicious';
    checks: ValidationCheck[];
    score: number;
    issues: ValidationIssue[];
}
/**
 * Validation check
 */
export interface ValidationCheck {
    checkType: string;
    result: 'pass' | 'fail' | 'warning';
    details: string;
    impact: 'low' | 'medium' | 'high';
}
/**
 * Validation issue
 */
export interface ValidationIssue {
    issueType: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    description: string;
    recommendation: string;
}
/**
 * Participant contribution
 */
export interface ParticipantContribution {
    dataContribution: number;
    computeContribution: number;
    qualityContribution: number;
    overallContribution: number;
    weight: number;
}
/**
 * Participant performance
 */
export interface ParticipantPerformance {
    responseTime: number;
    reliability: number;
    accuracy: number;
    efficiency: number;
    overallScore: number;
}
/**
 * Global model info
 */
export interface GlobalModelInfo {
    modelId: string;
    version: string;
    architecture: string;
    parameters: Record<string, any>;
    performance: ModelPerformanceMetrics;
    metadata: GlobalModelMetadata;
}
/**
 * Global model metadata
 */
export interface GlobalModelMetadata {
    createdAt: string;
    updatedAt: string;
    roundNumber: number;
    participantCount: number;
    dataSize: number;
    trainingTime: number;
    convergenceStatus: string;
}
/**
 * Aggregation result
 */
export interface AggregationResult {
    aggregationId: string;
    strategy: AggregationStrategy;
    participantCount: number;
    aggregatedModel: ModelDelta;
    quality: AggregationQuality;
    consensus: ConsensusResult;
    timestamp: string;
}
/**
 * Aggregation quality
 */
export interface AggregationQuality {
    score: number;
    consistency: number;
    improvement: number;
    stability: number;
    robustness: number;
}
/**
 * Consensus result
 */
export interface ConsensusResult {
    achieved: boolean;
    agreement: number;
    dissenting: string[];
    resolution: string;
}
/**
 * Round metrics
 */
export interface RoundMetrics {
    duration: number;
    participationRate: number;
    successRate: number;
    averageAccuracy: number;
    communicationOverhead: number;
    privacyBudgetUsed: number;
}
/**
 * Main federated learning coordinator
 */
export declare class FederatedLearningCoordinator {
    private config;
    private readonly federationManager;
    private readonly privacyEngine;
    private readonly aggregationEngine;
    private readonly communicationManager;
    private readonly securityManager;
    private readonly governanceEngine;
    private readonly monitoringSystem;
    constructor(config: FederatedLearningConfig);
    /**
     * Initialize federated learning federation
     */
    initializeFederation(): Promise<string>;
    /**
     * Add participant to federation
     */
    addParticipant(federationId: string, participantInfo: ParticipantInfo): Promise<void>;
    /**
     * Start federated learning round
     */
    startLearningRound(federationId: string, globalModel: RegulatoryMLModel): Promise<FederatedRound>;
    /**
     * Process human feedback in federated setting
     */
    processFederatedFeedback(federationId: string, feedback: HumanFeedback[]): Promise<void>;
    /**
     * Get federation status
     */
    getFederationStatus(federationId: string): Promise<any>;
    /**
     * Get privacy metrics
     */
    getPrivacyMetrics(federationId: string): Promise<PrivacyMetrics>;
    /**
     * Generate compliance report
     */
    generateComplianceReport(federationId: string, timeRange: {
        start: string;
        end: string;
    }): Promise<any>;
    private validateParticipant;
    private validateTechnicalCapabilities;
    private validateComplianceStatus;
    private validateSecurityRequirements;
    private distributeGlobalModel;
    private coordinateLocalTraining;
    private collectLocalUpdates;
    private validateLocalUpdate;
    private validateStatistics;
    private validatePrivacy;
    private validateSecurity;
    private aggregateUpdates;
    private updateGlobalModel;
    private validateGlobalModel;
    private completeRound;
    private handleRoundError;
    private distributeFeedback;
    private isRelevantToParticipant;
    private aggregateFeedbackInsights;
    private identifyCommonIssues;
    private identifyImprovementAreas;
    private analyzeQualityTrends;
    private identifyRegulatoryGaps;
    private updateGlobalKnowledge;
}
/**
 * Federation management
 */
export declare class FederationManager {
    private config;
    private federations;
    private rounds;
    constructor(config: FederationConfig);
    createFederation(): Promise<string>;
    addParticipant(federationId: string, participantInfo: ParticipantInfo): Promise<void>;
    createRound(federationId: string, globalModel: RegulatoryMLModel): Promise<FederatedRound>;
    getFederation(federationId: string): Promise<any>;
    getParticipants(federationId: string): Promise<ParticipantInfo[]>;
    getRecentRounds(federationId: string, limit: number): Promise<FederatedRound[]>;
    storeRound(round: FederatedRound): Promise<void>;
    storeInsights(federationId: string, insights: any): Promise<void>;
}
/**
 * Privacy preservation engine
 */
export declare class PrivacyPreservationEngine {
    private config;
    private budgetTracker;
    private encryptionKeys;
    constructor(config: PrivacyConfig);
    initialize(federationId: string): Promise<void>;
    configureParticipant(participantId: string): Promise<void>;
    encryptModel(model: RegulatoryMLModel, participantId: string): Promise<any>;
    anonymizeFeedback(feedback: HumanFeedback[]): Promise<HumanFeedback[]>;
    getPrivacyMetrics(federationId: string): Promise<PrivacyMetrics>;
    private setupHomomorphicEncryption;
    private addNoise;
    private sampleLaplace;
}
/**
 * Model aggregation engine
 */
export declare class ModelAggregationEngine {
    private config;
    constructor(config: AggregationConfig);
    aggregate(round: FederatedRound, updates: LocalUpdate[]): Promise<AggregationResult>;
    private calculateWeights;
    private aggregateParameters;
    private assessQuality;
    private calculateConsistency;
    private checkConsensus;
}
/**
 * Secure communication manager
 */
export declare class SecureCommunicationManager {
    private config;
    private channels;
    constructor(config: CommunicationConfig);
    establishChannels(federationId: string): Promise<void>;
    addParticipant(federationId: string, participantId: string): Promise<void>;
    sendModel(participantId: string, encryptedModel: any): Promise<void>;
    checkTrainingStatus(participantId: string): Promise<string>;
    receiveUpdate(participantId: string): Promise<LocalUpdate>;
    notifyRoundFailure(roundId: string, message: string): Promise<void>;
    sendFeedback(participantId: string, feedback: HumanFeedback[]): Promise<void>;
}
/**
 * Federated security manager
 */
export declare class FederatedSecurityManager {
    private config;
    constructor(config: SecurityConfig);
    validateAccess(participantId: string, resource: string): Promise<boolean>;
    auditAction(action: string, participantId: string, details: any): Promise<void>;
}
/**
 * Federated governance engine
 */
export declare class FederatedGovernanceEngine {
    private config;
    constructor(config: GovernanceConfig);
    initialize(federationId: string): Promise<void>;
    onboardParticipant(participantInfo: ParticipantInfo): Promise<void>;
    generateComplianceReport(federationId: string, timeRange: {
        start: string;
        end: string;
    }): Promise<any>;
}
/**
 * Federated monitoring system
 */
export declare class FederatedMonitoringSystem {
    private config;
    private metrics;
    constructor(config: MonitoringConfig);
    startMonitoring(federationId: string): Promise<void>;
    getFederationMetrics(federationId: string): Promise<any>;
    recordRound(round: FederatedRound): Promise<void>;
    recordError(roundId: string, error: any): Promise<void>;
}
//# sourceMappingURL=federated-learning.d.ts.map