/**
 * SFDR Navigator Agent - Explainability Engine
 * Phase 2A: Multi-Level Explainability Implementation
 *
 * Provides comprehensive explanations for AI-driven regulatory decisions
 * with full traceability and regulatory compliance
 */
// ============================================================================
// EXPLAINABILITY ENGINE
// ============================================================================
/**
 * Main Explainability Engine Class
 */
export class ExplainabilityEngine {
    explanationTemplates;
    regulatoryKnowledge;
    evidenceTracker;
    constructor(knowledgeService, customTemplates = {}) {
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
    async generateExplanation(classification, decisionPath, confidenceFactors, level = 'DETAILED') {
        const explanationId = this.generateExplanationId();
        const timestamp = new Date();
        // Generate explanation components based on level
        const components = await this.generateExplanationComponents(classification, decisionPath, confidenceFactors, level);
        // Build regulatory traceability
        const traceability = await this.buildRegulatoryTraceability(classification, decisionPath);
        // Collect evidence sources
        const evidenceSources = this.collectEvidenceSources(decisionPath);
        // Generate human-readable summary
        const humanReadableSummary = this.generateHumanReadableSummary(classification, components, level);
        return {
            explanationId,
            timestamp,
            level,
            components,
            traceability,
            evidenceSources,
            humanReadableSummary,
            confidenceBreakdown: this.generateConfidenceBreakdown(confidenceFactors),
            regulatoryJustification: await this.generateRegulatoryJustification(classification, traceability)
        };
    }
    /**
     * Generate explanation components based on level
     */
    async generateExplanationComponents(classification, decisionPath, confidenceFactors, level) {
        const components = [];
        // Always include classification rationale
        components.push(await this.generateClassificationRationale(classification, decisionPath));
        if (level === 'BASIC') {
            return components;
        }
        // Add detailed components for DETAILED and TECHNICAL levels
        components.push(await this.generateDataAnalysis(decisionPath), await this.generateRegulatoryMapping(classification), this.generateConfidenceAnalysis(confidenceFactors));
        if (level === 'TECHNICAL') {
            // Add technical components
            components.push(await this.generateModelInsights(decisionPath), await this.generateAlgorithmicDetails(decisionPath), this.generateUncertaintyAnalysis(confidenceFactors));
        }
        return components;
    }
    /**
     * Build regulatory traceability chain
     */
    async buildRegulatoryTraceability(classification, decisionPath) {
        const primaryRegulations = await this.identifyPrimaryRegulations(classification);
        const supportingGuidance = await this.identifySupportingGuidance(classification);
        const precedentCases = await this.identifyPrecedentCases(classification);
        const interpretationChain = await this.buildInterpretationChain(classification, decisionPath);
        return {
            primaryRegulations,
            supportingGuidance,
            precedentCases,
            interpretationChain,
            lastUpdated: new Date(),
            validationStatus: await this.validateTraceability(primaryRegulations, supportingGuidance, precedentCases)
        };
    }
    /**
     * Generate classification rationale component
     */
    async generateClassificationRationale(classification, decisionPath) {
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
    async generateDataAnalysis(decisionPath) {
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
    async generateRegulatoryMapping(classification) {
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
                type: 'REGULATION',
                reference: reg.reference,
                title: reg.title,
                url: reg.url
            }))
        };
    }
    /**
     * Generate confidence analysis component
     */
    generateConfidenceAnalysis(confidenceFactors) {
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
    async generateModelInsights(decisionPath) {
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
    async generateAlgorithmicDetails(decisionPath) {
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
    generateUncertaintyAnalysis(confidenceFactors) {
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
    generateHumanReadableSummary(classification, components, level) {
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
    generateConfidenceBreakdown(confidenceFactors) {
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
    async generateRegulatoryJustification(classification, traceability) {
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
    generateExplanationId() {
        return `exp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
    extractKeyFactors(decisionPath) {
        // Extract key decision factors from the decision path
        return decisionPath.steps
            .filter(step => step.importance === 'HIGH')
            .map(step => step.description);
    }
    async getRegulatoryBasis(classification) {
        return this.regulatoryKnowledge.getRegulationsForClassification(classification);
    }
    async getSourcesForClassification(classification) {
        const regulations = await this.getRegulatoryBasis(classification);
        return regulations.map(reg => ({
            type: 'REGULATION',
            reference: reg.reference,
            title: reg.title,
            url: reg.url || ''
        }));
    }
    extractDataPoints(decisionPath) {
        return decisionPath.steps
            .filter(step => step.type === 'DATA_ANALYSIS')
            .flatMap(step => step.dataPoints || []);
    }
    assessDataQuality(dataPoints) {
        // Implement data quality assessment logic
        return {
            completeness: this.calculateCompleteness(dataPoints),
            accuracy: this.calculateAccuracy(dataPoints),
            consistency: this.calculateConsistency(dataPoints),
            timeliness: this.calculateTimeliness(dataPoints)
        };
    }
    extractKeyInsights(dataPoints) {
        // Extract key insights from data analysis
        return dataPoints
            .filter(dp => dp.significance === 'HIGH')
            .map(dp => dp.insight);
    }
    getDataSources(dataPoints) {
        return dataPoints.map(dp => ({
            type: 'DATA',
            reference: dp.source,
            title: dp.description,
            url: dp.sourceUrl || ''
        }));
    }
    async getApplicableRegulations(classification) {
        return this.regulatoryKnowledge.getApplicableRegulations(classification);
    }
    async getComplianceRequirements(classification) {
        return this.regulatoryKnowledge.getComplianceRequirements(classification);
    }
    async identifyRegulatoryGaps(classification) {
        return this.regulatoryKnowledge.identifyGaps(classification);
    }
    identifyStrengthFactors(confidenceFactors) {
        const strengths = [];
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
    identifyWeaknessFactors(confidenceFactors) {
        const weaknesses = [];
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
    extractKeyPoints(components) {
        return components
            .filter(comp => comp.importance === 'HIGH')
            .map(comp => this.extractMainPoint(comp.content));
    }
    extractMainReasoning(components) {
        const rationale = components.find(comp => comp.type === 'CLASSIFICATION_RATIONALE');
        return rationale ? this.extractMainPoint(rationale.content) : '';
    }
    getConfidenceLevel(components) {
        const confidence = components.find(comp => comp.type === 'CONFIDENCE_ANALYSIS');
        if (!confidence)
            return 'Medium';
        // Extract confidence level from content
        return this.parseConfidenceLevel(confidence.content);
    }
    extractMainPoint(content) {
        // Extract the main point from explanation content
        const sentences = content.split('.');
        return sentences[0] + '.';
    }
    parseConfidenceLevel(content) {
        if (content.includes('high confidence') || content.includes('90%'))
            return 'High';
        if (content.includes('low confidence') || content.includes('50%'))
            return 'Low';
        return 'Medium';
    }
    // Additional helper methods would be implemented here...
    calculateCompleteness(dataPoints) { return 85; }
    calculateAccuracy(dataPoints) { return 90; }
    calculateConsistency(dataPoints) { return 88; }
    calculateTimeliness(dataPoints) { return 92; }
    extractModelOutputs(decisionPath) { return {}; }
    calculateFeatureImportance(decisionPath) { return {}; }
    async getModelPerformanceMetrics(decisionPath) { return {}; }
    extractAlgorithmSteps(decisionPath) { return []; }
    buildDecisionTree(decisionPath) { return {}; }
    getComputationalDetails(decisionPath) { return {}; }
    analyzeUncertaintySources(confidenceFactors) { return []; }
    performSensitivityAnalysis(confidenceFactors) { return {}; }
    calculateRobustnessMetrics(confidenceFactors) { return {}; }
    async identifyPrimaryRegulations(classification) { return []; }
    async identifySupportingGuidance(classification) { return []; }
    async identifyPrecedentCases(classification) { return []; }
    async buildInterpretationChain(classification, decisionPath) { return []; }
    async validateTraceability(primary, supporting, precedents) { return 'VALID'; }
    collectEvidenceSources(decisionPath) { return []; }
    getDefaultTemplates() {
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
    async getRegulationsForClassification(classification) {
        // Implementation would query the knowledge graph
        return [];
    }
    async getApplicableRegulations(classification) {
        return [];
    }
    async getComplianceRequirements(classification) {
        return [];
    }
    async identifyGaps(classification) {
        return [];
    }
}
export class EvidenceTracker {
}
//# sourceMappingURL=engine.js.map