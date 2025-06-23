/**
 * SFDR Navigator Agent - Regulatory Knowledge Graph
 * Phase 2A: Knowledge Graph MVP
 * 
 * Manual regulatory ontology for core SFDR rules with AI-assisted updates
 * Implements hybrid knowledge management for regulatory compliance
 */

import type { SFDRArticleClassification, PAIIndicator, EUFundType } from '../../domain/sfdr/types.js';
import type { RegulatoryRiskLevel, ExplainabilityLevel } from '../agents/types.js';

// ============================================================================
// REGULATORY KNOWLEDGE GRAPH TYPES
// ============================================================================

/**
 * Core Knowledge Graph Structure
 */
export interface RegulatoryKnowledgeGraph {
  regulations: RegulationNode[];
  interpretations: InterpretationEdge[];
  precedents: ComplianceCase[];
  updates: RegulatoryChange[];
  conflicts: InterpretationConflict[];
  version: string;
  lastUpdated: Date;
  validityPeriod: DateRange;
}

/**
 * Regulation Node - Core regulatory requirements
 */
export interface RegulationNode {
  nodeId: string;
  regulationType: RegulationType;
  title: string;
  reference: RegulatoryReference;
  content: RegulatoryContent;
  applicability: ApplicabilityRules;
  relationships: NodeRelationship[];
  confidence: number;
  lastVerified: Date;
  status: NodeStatus;
}

export type RegulationType = 
  | 'PRIMARY_REGULATION'    // SFDR (EU) 2019/2088
  | 'DELEGATED_REGULATION'  // Commission Delegated Regulation (EU) 2022/1288
  | 'TECHNICAL_STANDARD'    // RTS, ITS
  | 'GUIDELINE'            // ESMA Guidelines
  | 'QA_INTERPRETATION'    // Official Q&A documents
  | 'PRECEDENT';           // Regulatory precedents

/**
 * Applicability Rules for Regulatory Requirements
 */
export interface ApplicabilityRules {
  entityTypes: string[];
  thresholds: {
    type: string;
    value: number;
    unit: string;
  }[];
  exemptions: string[];
  conditions: string[];
}

export interface RegulatoryReference {
  documentId: string;
  documentTitle: string;
  section: string;
  article?: string;
  paragraph?: string;
  subparagraph?: string;
  annexNumber?: string;
  tableNumber?: string;
  url?: string;
  effectiveDate: Date;
  lastAmended?: Date;
}

export interface RegulatoryContent {
  originalText: string;
  structuredContent: StructuredRule;
  keywords: string[];
  entities: RegulatoryEntity[];
  requirements: Requirement[];
  exceptions: Exception[];
  crossReferences: string[];
}

export interface StructuredRule {
  ruleId: string;
  ruleType: RuleType;
  condition: LogicalCondition;
  action: RequiredAction;
  scope: ApplicabilityScope;
  severity: ComplianceSeverity;
  evidence: EvidenceRequirement[];
}

export type RuleType = 
  | 'CLASSIFICATION_RULE'
  | 'DISCLOSURE_RULE'
  | 'CALCULATION_RULE'
  | 'VALIDATION_RULE'
  | 'REPORTING_RULE';

export interface LogicalCondition {
  conditionId: string;
  operator: LogicalOperator;
  operands: Operand[];
  negated: boolean;
}

export type LogicalOperator = 
  | 'AND'
  | 'OR'
  | 'NOT'
  | 'IF_THEN'
  | 'IF_THEN_ELSE'
  | 'EXISTS'
  | 'FOR_ALL';

export interface Operand {
  type: OperandType;
  value: any;
  dataType: string;
  source: string;
  confidence: number;
}

export type OperandType = 
  | 'LITERAL'
  | 'VARIABLE'
  | 'FUNCTION'
  | 'REFERENCE'
  | 'CALCULATION';

export type RequiredAction = 
  | 'CLASSIFY_AS'
  | 'REQUIRE_DISCLOSURE'
  | 'CALCULATE_METRIC'
  | 'VALIDATE_DATA'
  | 'GENERATE_REPORT'
  | 'ESCALATE_REVIEW';

export interface ApplicabilityScope {
  fundTypes: EUFundType[];
  articleClassifications: SFDRArticleClassification[];
  assetClasses: string[];
  geographicScope: string[];
  temporalScope: DateRange;
  exceptions: string[];
}

export type ComplianceSeverity = 
  | 'MANDATORY'     // Must comply - regulatory violation if not met
  | 'RECOMMENDED'   // Should comply - best practice
  | 'OPTIONAL'      // May comply - additional disclosure
  | 'CONDITIONAL';  // Depends on other factors

export interface EvidenceRequirement {
  evidenceType: EvidenceType;
  description: string;
  mandatory: boolean;
  dataSource: string[];
  validationMethod: string;
  retentionPeriod: string;
}

export type EvidenceType = 
  | 'DOCUMENTATION'
  | 'DATA_POINT'
  | 'CALCULATION'
  | 'THIRD_PARTY_VERIFICATION'
  | 'INTERNAL_ASSESSMENT'
  | 'EXTERNAL_AUDIT';

// ============================================================================
// INTERPRETATION AND PRECEDENT MANAGEMENT
// ============================================================================

/**
 * Interpretation Edge - Connects regulations with their interpretations
 */
export interface InterpretationEdge {
  edgeId: string;
  sourceNodeId: string;
  targetNodeId: string;
  interpretationType: InterpretationType;
  interpretation: RegulatoryInterpretation;
  confidence: number;
  authorityLevel: AuthorityLevel;
  precedentWeight: number;
  conflicts: string[]; // IDs of conflicting interpretations
}

export type InterpretationType = 
  | 'OFFICIAL_GUIDANCE'
  | 'REGULATORY_PRECEDENT'
  | 'INDUSTRY_PRACTICE'
  | 'LEGAL_OPINION'
  | 'EXPERT_INTERPRETATION'
  | 'AI_INFERENCE';

export interface RegulatoryInterpretation {
  interpretationId: string;
  summary: string;
  detailedAnalysis: string;
  keyPrinciples: string[];
  practicalImplications: string[];
  examples: InterpretationExample[];
  limitations: string[];
  uncertainties: string[];
}

export interface InterpretationExample {
  exampleId: string;
  scenario: string;
  application: string;
  outcome: string;
  reasoning: string;
  confidence: number;
}

export type AuthorityLevel = 
  | 'REGULATORY_AUTHORITY'  // ESMA, National Competent Authorities
  | 'INDUSTRY_ASSOCIATION'  // EFAMA, PRI, etc.
  | 'LEGAL_EXPERT'         // Law firms, regulatory consultants
  | 'MARKET_PRACTICE'      // Common industry interpretation
  | 'AI_GENERATED';        // AI-derived interpretation

/**
 * Compliance Case - Real-world precedents and decisions
 */
export interface ComplianceCase {
  caseId: string;
  caseType: CaseType;
  title: string;
  description: string;
  facts: CaseFacts;
  decision: RegulatoryDecision;
  reasoning: string[];
  implications: CaseImplication[];
  relatedRegulations: string[];
  precedentValue: PrecedentValue;
  dateDecided: Date;
  jurisdiction: string;
}

export type CaseType = 
  | 'REGULATORY_DECISION'
  | 'ENFORCEMENT_ACTION'
  | 'GUIDANCE_CLARIFICATION'
  | 'INDUSTRY_CONSULTATION'
  | 'COURT_DECISION';

export interface CaseFacts {
  fundType: EUFundType;
  investmentStrategy: string;
  esgCharacteristics: string[];
  sustainabilityObjectives: string[];
  paiConsiderations: PAIIndicator[];
  taxonomyAlignment: number;
  otherRelevantFacts: string[];
}

export interface RegulatoryDecision {
  classification: SFDRArticleClassification;
  requiredDisclosures: string[];
  additionalRequirements: string[];
  exemptions: string[];
  conditions: string[];
  reviewPeriod?: string;
}

export interface CaseImplication {
  implicationType: ImplicationType;
  description: string;
  affectedParties: string[];
  implementationGuidance: string;
  riskLevel: RegulatoryRiskLevel;
}

export type ImplicationType = 
  | 'CLASSIFICATION_GUIDANCE'
  | 'DISCLOSURE_REQUIREMENT'
  | 'CALCULATION_METHOD'
  | 'VALIDATION_APPROACH'
  | 'ENFORCEMENT_RISK';

export type PrecedentValue = 
  | 'BINDING'       // Must follow
  | 'PERSUASIVE'    // Should consider
  | 'INFORMATIVE'   // May reference
  | 'SUPERSEDED';   // No longer applicable

// ============================================================================
// REGULATORY CHANGE MANAGEMENT
// ============================================================================

/**
 * Regulatory Change - Tracking updates and amendments
 */
export interface RegulatoryChange {
  changeId: string;
  changeType: ChangeType;
  affectedRegulations: string[];
  changeDescription: string;
  effectiveDate: Date;
  transitionPeriod?: DateRange;
  impact: ChangeImpact;
  implementationGuidance: string[];
  status: ChangeStatus;
  source: ChangeSource;
}

export type ChangeType = 
  | 'NEW_REGULATION'
  | 'AMENDMENT'
  | 'CLARIFICATION'
  | 'INTERPRETATION_UPDATE'
  | 'TECHNICAL_CORRECTION'
  | 'REVOCATION';

export interface ChangeImpact {
  impactLevel: ImpactLevel;
  affectedEntities: string[];
  requiredActions: string[];
  implementationCost: CostEstimate;
  riskAssessment: string;
  mitigationStrategies: string[];
}

export type ImpactLevel = 
  | 'MINIMAL'      // Minor clarifications
  | 'LOW'          // Limited scope changes
  | 'MEDIUM'       // Moderate impact on processes
  | 'HIGH'         // Significant changes required
  | 'CRITICAL';    // Major regulatory overhaul

export interface CostEstimate {
  implementationCost: CostRange;
  ongoingCost: CostRange;
  timeToImplement: string;
  resourceRequirements: string[];
}

export type CostRange = 
  | 'MINIMAL'      // <€10k
  | 'LOW'          // €10k-€50k
  | 'MEDIUM'       // €50k-€200k
  | 'HIGH'         // €200k-€1M
  | 'VERY_HIGH';   // >€1M

export type ChangeStatus = 
  | 'PROPOSED'
  | 'CONSULTATION'
  | 'APPROVED'
  | 'EFFECTIVE'
  | 'SUPERSEDED';

export interface ChangeSource {
  authority: string;
  documentReference: string;
  publicationDate: Date;
  consultationPeriod?: DateRange;
  stakeholderFeedback?: string[];
}

// ============================================================================
// CONFLICT RESOLUTION
// ============================================================================

/**
 * Interpretation Conflict - Managing conflicting regulatory interpretations
 */
export interface InterpretationConflict {
  conflictId: string;
  conflictType: ConflictType;
  conflictingInterpretations: string[];
  description: string;
  resolutionStatus: ResolutionStatus;
  resolutionStrategy: ResolutionStrategy;
  authorityConsultation?: AuthorityConsultation;
  temporaryGuidance?: string;
  riskAssessment: ConflictRiskAssessment;
}

export type ConflictType = 
  | 'INTERPRETATION_DISAGREEMENT'
  | 'REGULATORY_AMBIGUITY'
  | 'CROSS_JURISDICTIONAL'
  | 'TEMPORAL_INCONSISTENCY'
  | 'SCOPE_OVERLAP';

export type ResolutionStatus = 
  | 'IDENTIFIED'
  | 'UNDER_REVIEW'
  | 'ESCALATED'
  | 'RESOLVED'
  | 'ACCEPTED_AMBIGUITY';

export interface ResolutionStrategy {
  approach: ResolutionApproach;
  timeline: string;
  stakeholders: string[];
  decisionCriteria: string[];
  fallbackOptions: string[];
}

export type ResolutionApproach = 
  | 'AUTHORITY_CLARIFICATION'
  | 'INDUSTRY_CONSENSUS'
  | 'CONSERVATIVE_INTERPRETATION'
  | 'RISK_BASED_APPROACH'
  | 'CASE_BY_CASE_ASSESSMENT';

export interface AuthorityConsultation {
  consultationId: string;
  authority: string;
  questionSubmitted: string;
  responseReceived?: string;
  responseDate?: Date;
  bindingStatus: 'BINDING' | 'GUIDANCE' | 'OPINION';
}

export interface ConflictRiskAssessment {
  complianceRisk: RegulatoryRiskLevel;
  reputationalRisk: RegulatoryRiskLevel;
  financialRisk: RegulatoryRiskLevel;
  operationalRisk: RegulatoryRiskLevel;
  mitigationMeasures: string[];
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

export interface RegulatoryEntity {
  entityType: string;
  entityValue: string;
  confidence: number;
  source: string;
}

export interface Requirement {
  requirementId: string;
  description: string;
  mandatory: boolean;
  conditions: string[];
  evidence: string[];
}

export interface Exception {
  exceptionId: string;
  description: string;
  conditions: string[];
  scope: string[];
}

export type NodeStatus = 
  | 'ACTIVE'
  | 'DEPRECATED'
  | 'SUPERSEDED'
  | 'UNDER_REVIEW'
  | 'DRAFT';

export interface NodeRelationship {
  relationshipType: RelationshipType;
  targetNodeId: string;
  strength: number;
  description: string;
}

export type RelationshipType = 
  | 'DEPENDS_ON'
  | 'CONFLICTS_WITH'
  | 'CLARIFIES'
  | 'SUPERSEDES'
  | 'REFERENCES'
  | 'IMPLEMENTS';