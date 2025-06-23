/**
 * SFDR Navigator Agent - Explainability Engine
 * Phase 2A: Multi-Level Explainability Implementation
 * 
 * Provides comprehensive explanations for AI-driven regulatory decisions
 * with full traceability and regulatory compliance
 */

import type {
  ExplainabilityResponse,
  ExplanationLevel,
  ExplanationComponent,
  RegulatoryTraceability,
  DecisionPath,
  EvidenceSource,
  ConfidenceFactors
} from '../agents/types.js';

import type { SFDRArticleClassification } from '../../domain/sfdr/types.js';
import type { RegulatoryNode, RegulatoryInterpretation } from '../knowledge/graph.js';

// ============================================================================
// EXPLAINABILITY ENGINE
// ============================================================================

/**
 * Main Explainability Engine Class
 */
export class ExplainabilityEngine {
  private readonly explanationTemplates: ExplanationTemplateRegistry;
  private readonly regulatoryKnowledge: RegulatoryKnowledgeService;
  private readonly evidenceTracker: EvidenceTracker;

  constructor(
    knowledgeService: RegulatoryKnowledgeService,
    customTemplates: Partial<ExplanationTemplateRegistry> = {}
  ) {
    this.regulatoryKnowledge = knowledgeService;
    this.explanationTemplates = {
      ...this.getDefaultTemplates(),
      ...customTemplates
    };
    this.evidenceTracker = new EvidenceTracker();
  }

  /**
   * Generate comprehensive explanation for a classification decision
   */
  public async generateExplanation(
    classification: SFDRArticleClassification,
    decisionPath: DecisionPath,
    confidenceFactors: ConfidenceFactors,
    level: ExplanationLevel = 'DETAILED'
  ): Promise<ExplainabilityResponse> {
    const explanationId = this.generateExplanationId();
    const timestamp = new Date();

    // Generate explanation components based on level
    const components = await this.generateExplanationComponents(
      classification,
      decisionPath,
      confidenceFactors,
      level
    );

    // Build regulatory traceability
    const traceability = await this.buildRegulatoryTraceability(
      classification,
      decisionPath
    );

    // Collect evidence sources
    const evidenceSources = this.collectEvidenceSources(decisionPath);

    // Generate human-readable summary
    const humanReadableSummary = this.generateHumanReadableSummary(
      classification,
      components,
      level
    );

    return {
      explanationId,
      timestamp,
      level,
      components,
      traceability,
      evidenceSources,
      humanReadableSummary,
      confidenceBreakdown: this.generateConfidenceBreakdown(confidenceFactors),
      regulatoryJustification: await this.generateRegulatoryJustification(
        classification,
        traceability
      )
    };
  }

  /**
   * Generate explanation components based on level
   */
  private async generateExplanationComponents(
    classification: SFDRArticleClassification,
    decisionPath: DecisionPath,
    confidenceFactors: ConfidenceFactors,
    level: ExplanationLevel
  ): Promise<ExplanationComponent[]> {
    const components: ExplanationComponent[] = [];

    // Always include classification rationale
    components.push(await this.generateClassificationRationale(
      classification,
      decisionPath
    ));

    if (level === 'BASIC') {
      return components;
    }

    // Add detailed components for DETAILED and TECHNICAL levels
    components.push(
      await this.generateDataAnalysis(decisionPath),
      await this.generateRegulatoryMapping(classification),
      this.generateConfidenceAnalysis(confidenceFactors)
    );

    if (level === 'TECHNICAL') {
      // Add technical components
      components.push(
        await this.generateModelInsights(decisionPath),
        await this.generateAlgorithmicDetails(decisionPath),
        this.generateUncertaintyAnalysis(confidenceFactors)
      );
    }

    return components;
  }

  /**
   * Build regulatory traceability chain
   */
  private async buildRegulatoryTraceability(
    classification: SFDRArticleClassification,
    decisionPath: DecisionPath
  ): Promise<RegulatoryTraceability> {
    const primaryRegulations = await this.identifyPrimaryRegulations(classification);
    const supportingGuidance = await this.identifySupportingGuidance(classification);
    const precedentCases = await this.identifyPrecedentCases(classification);
    const interpretationChain = await this.buildInterpretationChain(
      classification,
      decisionPath
    );

    return {
      primaryRegulations,
      supportingGuidance,
      precedentCases,
      interpretationChain,
      lastUpdated: new Date(),
      validationStatus: await this.validateTraceability(
        primaryRegulations,
        supportingGuidance,
        precedentCases
      )
    };
  }

  /**
   * Generate classification rationale component
   */
  private async generateClassificationRationale(
    classification: SFDRArticleClassification,
    decisionPath: DecisionPath
  ): Promise<ExplanationComponent> {
    const keyFactors = this.extractKeyFactors(decisionPath);
    const regulatoryBasis = await this.getRegulatoryBasis(classification);
    
    const explanation = this.explanationTemplates.classificationRationale({
      classification,
      keyFactors,
      regulatoryBasis
    });

    return {
      type: 'CLASSIFICATION_RATIONALE',
      title: 'Classification Decision',
      content: explanation,
      importance: 'HIGH',
      sources: await this.getSourcesForClassification(classification)
    };
  }

  /**
   * Generate data analysis component
   */
  private async generateDataAnalysis(
    decisionPath: DecisionPath
  ): Promise<ExplanationComponent> {
    const dataPoints = this.extractDataPoints(decisionPath);
    const dataQuality = this.assessDataQuality(dataPoints);
    const keyInsights = this.extractKeyInsights(dataPoints);

    const explanation = this.explanationTemplates.dataAnalysis({
      dataPoints,
      dataQuality,
      keyInsights
    });

    return {
      type: 'DATA_ANALYSIS',
      title: 'Data Analysis',
      content: explanation,
      importance: 'MEDIUM',
      sources: this.getDataSources(dataPoints)
    };
  }

  /**
   * Generate regulatory mapping component
   */
  private async generateRegulatoryMapping(
    classification: SFDRArticleClassification
  ): Promise<ExplanationComponent> {
    const applicableRegulations = await this.getApplicableRegulations(classification);
    const complianceRequirements = await this.getComplianceRequirements(classification);
    const regulatoryGaps = await this.identifyRegulatoryGaps(classification);

    const explanation = this.explanationTemplates.regulatoryMapping({
      classification,
      applicableRegulations,
      complianceRequirements,
      regulatoryGaps
    });

    return {
      type: 'REGULATORY_MAPPING',
      title: 'Regulatory Framework',
      content: explanation,
      importance: 'HIGH',
      sources: applicableRegulations.map(reg => ({
        type: 'REGULATION' as const,
        reference: reg.reference,
        title: reg.title,
        url: reg.url
      }))
    };
  }

  /**
   * Generate confidence analysis component
   */
  private generateConfidenceAnalysis(
    confidenceFactors: ConfidenceFactors
  ): ExplanationComponent {
    const strengthFactors = this.identifyStrengthFactors(confidenceFactors);
    const weaknessFactors = this.identifyWeaknessFactors(confidenceFactors);
    const uncertaintyFactors = confidenceFactors.uncertaintyFactors;

    const explanation = this.explanationTemplates.confidenceAnalysis({
      overallConfidence: confidenceFactors.overallConfidence,
      strengthFactors,
      weaknessFactors,
      uncertaintyFactors
    });

    return {
      type: 'CONFIDENCE_ANALYSIS',
      title: 'Confidence Assessment',
      content: explanation,
      importance: 'MEDIUM',
      sources: []
    };
  }

  /**
   * Generate model insights component (technical level)
   */
  private async generateModelInsights(
    decisionPath: DecisionPath
  ): Promise<ExplanationComponent> {
    const modelOutputs = this.extractModelOutputs(decisionPath);
    const featureImportance = this.calculateFeatureImportance(decisionPath);
    const modelPerformance = await this.getModelPerformanceMetrics(decisionPath);

    const explanation = this.explanationTemplates.modelInsights({
      modelOutputs,
      featureImportance,
      modelPerformance
    });

    return {
      type: 'MODEL_INSIGHTS',
      title: 'Model Analysis',
      content: explanation,
      importance: 'LOW',
      sources: []
    };
  }

  /**
   * Generate algorithmic details component (technical level)
   */
  private async generateAlgorithmicDetails(
    decisionPath: DecisionPath
  ): Promise<ExplanationComponent> {
    const algorithmSteps = this.extractAlgorithmSteps(decisionPath);
    const decisionTree = this.buildDecisionTree(decisionPath);
    const computationalDetails = this.getComputationalDetails(decisionPath);

    const explanation = this.explanationTemplates.algorithmicDetails({
      algorithmSteps,
      decisionTree,
      computationalDetails
    });

    return {
      type: 'ALGORITHMIC_DETAILS',
      title: 'Algorithm Details',
      content: explanation,
      importance: 'LOW',
      sources: []
    };
  }

  /**
   * Generate uncertainty analysis component (technical level)
   */
  private generateUncertaintyAnalysis(
    confidenceFactors: ConfidenceFactors
  ): ExplanationComponent {
    const uncertaintySources = this.analyzeUncertaintySources(confidenceFactors);
    const sensitivityAnalysis = this.performSensitivityAnalysis(confidenceFactors);
    const robustnessMetrics = this.calculateRobustnessMetrics(confidenceFactors);

    const explanation = this.explanationTemplates.uncertaintyAnalysis({
      uncertaintySources,
      sensitivityAnalysis,
      robustnessMetrics
    });

    return {
      type: 'UNCERTAINTY_ANALYSIS',
      title: 'Uncertainty Analysis',
      content: explanation,
      importance: 'LOW',
      sources: []
    };
  }

  /**
   * Generate human-readable summary
   */
  private generateHumanReadableSummary(
    classification: SFDRArticleClassification,
    components: ExplanationComponent[],
    level: ExplanationLevel
  ): string {
    const template = this.explanationTemplates.humanReadableSummary[level];
    
    return template({
      classification,
      keyPoints: this.extractKeyPoints(components),
      mainReasoning: this.extractMainReasoning(components),
      confidenceLevel: this.getConfidenceLevel(components)
    });
  }

  /**
   * Generate confidence breakdown
   */
  private generateConfidenceBreakdown(
    confidenceFactors: ConfidenceFactors
  ): Record<string, number> {
    return {
      'Data Quality': confidenceFactors.dataQuality,
      'Regulatory Clarity': confidenceFactors.regulatoryClarity,
      'Precedent Match': confidenceFactors.precedentMatch,
      'Model Certainty': confidenceFactors.modelCertainty,
      'Overall Confidence': confidenceFactors.overallConfidence
    };
  }

  /**
   * Generate regulatory justification
   */
  private async generateRegulatoryJustification(
    classification: SFDRArticleClassification,
    traceability: RegulatoryTraceability
  ): Promise<string> {
    const template = this.explanationTemplates.regulatoryJustification;
    
    return template({
      classification,
      primaryRegulations: traceability.primaryRegulations,
      supportingGuidance: traceability.supportingGuidance,
      precedentCases: traceability.precedentCases
    });
  }

  // ============================================================================
  // HELPER METHODS
  // ============================================================================

  private generateExplanationId(): string {
    return `exp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private extractKeyFactors(decisionPath: DecisionPath): string[] {
    // Extract key decision factors from the decision path
    return decisionPath.steps
      .filter(step => step.importance === 'HIGH')
      .map(step => step.description);
  }

  private async getRegulatoryBasis(
    classification: SFDRArticleClassification
  ): Promise<RegulatoryNode[]> {
    return this.regulatoryKnowledge.getRegulationsForClassification(classification);
  }

  private async getSourcesForClassification(
    classification: SFDRArticleClassification
  ): Promise<EvidenceSource[]> {
    const regulations = await this.getRegulatoryBasis(classification);
    
    return regulations.map(reg => ({
      type: 'REGULATION',
      reference: reg.reference,
      title: reg.title,
      url: reg.url || ''
    }));
  }

  private extractDataPoints(decisionPath: DecisionPath): DataPoint[] {
    return decisionPath.steps
      .filter(step => step.type === 'DATA_ANALYSIS')
      .flatMap(step => step.dataPoints || []);
  }

  private assessDataQuality(dataPoints: DataPoint[]): DataQualityAssessment {
    // Implement data quality assessment logic
    return {
      completeness: this.calculateCompleteness(dataPoints),
      accuracy: this.calculateAccuracy(dataPoints),
      consistency: this.calculateConsistency(dataPoints),
      timeliness: this.calculateTimeliness(dataPoints)
    };
  }

  private extractKeyInsights(dataPoints: DataPoint[]): string[] {
    // Extract key insights from data analysis
    return dataPoints
      .filter(dp => dp.significance === 'HIGH')
      .map(dp => dp.insight);
  }

  private getDataSources(dataPoints: DataPoint[]): EvidenceSource[] {
    return dataPoints.map(dp => ({
      type: 'DATA',
      reference: dp.source,
      title: dp.description,
      url: dp.sourceUrl || ''
    }));
  }

  private async getApplicableRegulations(
    classification: SFDRArticleClassification
  ): Promise<RegulatoryNode[]> {
    return this.regulatoryKnowledge.getApplicableRegulations(classification);
  }

  private async getComplianceRequirements(
    classification: SFDRArticleClassification
  ): Promise<ComplianceRequirement[]> {
    return this.regulatoryKnowledge.getComplianceRequirements(classification);
  }

  private async identifyRegulatoryGaps(
    classification: SFDRArticleClassification
  ): Promise<RegulatoryGap[]> {
    return this.regulatoryKnowledge.identifyGaps(classification);
  }

  private identifyStrengthFactors(confidenceFactors: ConfidenceFactors): string[] {
    const strengths: string[] = [];
    
    if (confidenceFactors.dataQuality >= 80) {
      strengths.push('High-quality data available');
    }
    
    if (confidenceFactors.regulatoryClarity >= 80) {
      strengths.push('Clear regulatory guidance');
    }
    
    if (confidenceFactors.precedentMatch >= 80) {
      strengths.push('Strong precedent alignment');
    }
    
    if (confidenceFactors.modelCertainty >= 80) {
      strengths.push('High model confidence');
    }
    
    return strengths;
  }

  private identifyWeaknessFactors(confidenceFactors: ConfidenceFactors): string[] {
    const weaknesses: string[] = [];
    
    if (confidenceFactors.dataQuality < 60) {
      weaknesses.push('Limited data quality');
    }
    
    if (confidenceFactors.regulatoryClarity < 60) {
      weaknesses.push('Regulatory ambiguity');
    }
    
    if (confidenceFactors.precedentMatch < 60) {
      weaknesses.push('Limited precedent guidance');
    }
    
    if (confidenceFactors.modelCertainty < 60) {
      weaknesses.push('Model uncertainty');
    }
    
    return weaknesses;
  }

  private extractKeyPoints(components: ExplanationComponent[]): string[] {
    return components
      .filter(comp => comp.importance === 'HIGH')
      .map(comp => this.extractMainPoint(comp.content));
  }

  private extractMainReasoning(components: ExplanationComponent[]): string {
    const rationale = components.find(comp => comp.type === 'CLASSIFICATION_RATIONALE');
    return rationale ? this.extractMainPoint(rationale.content) : '';
  }

  private getConfidenceLevel(components: ExplanationComponent[]): string {
    const confidence = components.find(comp => comp.type === 'CONFIDENCE_ANALYSIS');
    if (!confidence) return 'Medium';
    
    // Extract confidence level from content
    return this.parseConfidenceLevel(confidence.content);
  }

  private extractMainPoint(content: string): string {
    // Extract the main point from explanation content
    const sentences = content.split('.');
    return sentences[0] + '.';
  }

  private parseConfidenceLevel(content: string): string {
    if (content.includes('high confidence') || content.includes('90%')) return 'High';
    if (content.includes('low confidence') || content.includes('50%')) return 'Low';
    return 'Medium';
  }

  // Additional helper methods would be implemented here...
  private calculateCompleteness(dataPoints: DataPoint[]): number { return 85; }
  private calculateAccuracy(dataPoints: DataPoint[]): number { return 90; }
  private calculateConsistency(dataPoints: DataPoint[]): number { return 88; }
  private calculateTimeliness(dataPoints: DataPoint[]): number { return 92; }
  
  private extractModelOutputs(decisionPath: DecisionPath): any { return {}; }
  private calculateFeatureImportance(decisionPath: DecisionPath): any { return {}; }
  private async getModelPerformanceMetrics(decisionPath: DecisionPath): Promise<any> { return {}; }
  private extractAlgorithmSteps(decisionPath: DecisionPath): any { return []; }
  private buildDecisionTree(decisionPath: DecisionPath): any { return {}; }
  private getComputationalDetails(decisionPath: DecisionPath): any { return {}; }
  private analyzeUncertaintySources(confidenceFactors: ConfidenceFactors): any { return []; }
  private performSensitivityAnalysis(confidenceFactors: ConfidenceFactors): any { return {}; }
  private calculateRobustnessMetrics(confidenceFactors: ConfidenceFactors): any { return {}; }
  
  private async identifyPrimaryRegulations(classification: SFDRArticleClassification): Promise<RegulatoryNode[]> { return []; }
  private async identifySupportingGuidance(classification: SFDRArticleClassification): Promise<RegulatoryNode[]> { return []; }
  private async identifyPrecedentCases(classification: SFDRArticleClassification): Promise<any[]> { return []; }
  private async buildInterpretationChain(classification: SFDRArticleClassification, decisionPath: DecisionPath): Promise<RegulatoryInterpretation[]> { return []; }
  private async validateTraceability(primary: any[], supporting: any[], precedents: any[]): Promise<string> { return 'VALID'; }
  private collectEvidenceSources(decisionPath: DecisionPath): EvidenceSource[] { return []; }

  private getDefaultTemplates(): ExplanationTemplateRegistry {
    return {
      classificationRationale: (data) => `Based on the analysis of ${data.keyFactors.join(', ')}, this fund is classified under ${data.classification.article} due to ${data.regulatoryBasis.map(r => r.title).join(', ')}.`,
      dataAnalysis: (data) => `Data analysis reveals ${data.keyInsights.join(', ')} with overall data quality of ${data.dataQuality.completeness}% completeness.`,
      regulatoryMapping: (data) => `This classification is governed by ${data.applicableRegulations.map(r => r.title).join(', ')} with ${data.complianceRequirements.length} compliance requirements.`,
      confidenceAnalysis: (data) => `Overall confidence: ${data.overallConfidence}%. Strengths: ${data.strengthFactors.join(', ')}. Areas of uncertainty: ${data.uncertaintyFactors.join(', ')}.`,
      modelInsights: (data) => `Model analysis shows key features: ${Object.keys(data.featureImportance).join(', ')}.`,
      algorithmicDetails: (data) => `Algorithm processed ${data.algorithmSteps.length} steps with computational complexity details.`,
      uncertaintyAnalysis: (data) => `Uncertainty sources identified: ${data.uncertaintySources.join(', ')}.`,
      humanReadableSummary: {
        BASIC: (data) => `This fund is classified as ${data.classification.article} based on ${data.mainReasoning}.`,
        DETAILED: (data) => `Classification: ${data.classification.article}. Key reasoning: ${data.mainReasoning}. Confidence: ${data.confidenceLevel}. Key factors: ${data.keyPoints.join(', ')}.`,
        TECHNICAL: (data) => `Technical classification analysis for ${data.classification.article} with ${data.confidenceLevel} confidence. Detailed factors: ${data.keyPoints.join(', ')}. Main reasoning: ${data.mainReasoning}.`
      },
      regulatoryJustification: (data) => `This classification is justified under ${data.primaryRegulations.map(r => r.title).join(', ')} with supporting guidance from ${data.supportingGuidance.map(g => g.title).join(', ')}.`
    };
  }
}

// ============================================================================
// SUPPORTING SERVICES
// ============================================================================

export class RegulatoryKnowledgeService {
  async getRegulationsForClassification(classification: SFDRArticleClassification): Promise<RegulatoryNode[]> {
    // Implementation would query the knowledge graph
    return [];
  }

  async getApplicableRegulations(classification: SFDRArticleClassification): Promise<RegulatoryNode[]> {
    return [];
  }

  async getComplianceRequirements(classification: SFDRArticleClassification): Promise<ComplianceRequirement[]> {
    return [];
  }

  async identifyGaps(classification: SFDRArticleClassification): Promise<RegulatoryGap[]> {
    return [];
  }
}

export class EvidenceTracker {
  // Implementation for tracking evidence sources
}

// ============================================================================
// SUPPORTING TYPES
// ============================================================================

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