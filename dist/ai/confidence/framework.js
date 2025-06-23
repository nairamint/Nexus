/**
 * SFDR Navigator Agent - Confidence Framework
 * Phase 1B: Confidence-Driven Classification
 *
 * Implements a confidence-driven classification framework for SFDR regulatory compliance
 * with explainability, risk assessment, and human review triggers.
 */
// ============================================================================
// CONFIDENCE FRAMEWORK
// ============================================================================
/**
 * Confidence-Driven Classification Framework
 * Implements a comprehensive confidence assessment for SFDR classifications
 */
export class ConfidenceFramework {
    version = '1.0.0';
    /**
     * Generate a confidence-driven classification with explainability
     */
    generateClassification(request, validationResult) {
        // Determine primary classification
        const primaryClassification = this.determinePrimaryClassification(request);
        // Calculate confidence factors
        const confidenceFactors = this.calculateConfidenceFactors(request, validationResult);
        // Generate alternative classifications if confidence is not high
        const alternativeClassifications = this.generateAlternativeClassifications(request, primaryClassification, confidenceFactors);
        // Generate explainability response
        const explainability = this.generateExplainabilityResponse(request, primaryClassification, confidenceFactors);
        // Assess regulatory risk
        const riskAssessment = this.assessRegulatoryRisk(request, primaryClassification, confidenceFactors, validationResult);
        // Determine if human review is needed
        const reviewTriggers = this.determineReviewTriggers(confidenceFactors, riskAssessment, validationResult);
        // Construct the complete confidence-driven classification
        return {
            primaryClassification,
            confidenceFactors,
            alternativeClassifications,
            explainability,
            riskAssessment,
            reviewTriggers,
            generatedAt: new Date().toISOString(),
            frameworkVersion: this.version
        };
    }
    // ============================================================================
    // PRIVATE METHODS
    // ============================================================================
    /**
     * Determine the primary SFDR classification based on request data
     */
    determinePrimaryClassification(request) {
        // Start with the target classification from the request
        const targetClassification = request.fundProfile.targetArticleClassification;
        // Implement classification logic based on SFDR criteria
        if (this.meetsArticle9Criteria(request)) {
            return 'Article9';
        }
        else if (this.meetsArticle8Criteria(request)) {
            return 'Article8';
        }
        else {
            return 'Article6';
        }
    }
    /**
     * Check if request meets Article 9 criteria
     */
    meetsArticle9Criteria(request) {
        // Must have sustainable investment objective
        if (!request.fundProfile.sustainabilityObjective ||
            request.fundProfile.sustainabilityObjective.length < 10) {
            return false;
        }
        // Must have sustainable investment criteria with minimum allocation
        if (!request.sustainableInvestment ||
            request.sustainableInvestment.sustainableInvestmentMinimum < 80) {
            return false;
        }
        // Must have measurement methodology
        if (!request.sustainableInvestment.measurementMethodology ||
            request.sustainableInvestment.measurementMethodology.length < 10) {
            return false;
        }
        // Must consider PAI
        if (!request.esgIntegration.considersPAI) {
            return false;
        }
        return true;
    }
    /**
     * Check if request meets Article 8 criteria
     */
    meetsArticle8Criteria(request) {
        // Must promote E/S characteristics
        if (!request.marketingMaterials?.promotesESGCharacteristics) {
            return false;
        }
        // Must have ESG integration
        if (!request.esgIntegration.dueDiligencePolicies.esgIntegration) {
            return false;
        }
        // Must have sustainability risk integration
        const { identificationProcess, assessmentMethodology } = request.sustainabilityRiskIntegration;
        if (!identificationProcess || identificationProcess.length < 10 ||
            !assessmentMethodology || assessmentMethodology.length < 10) {
            return false;
        }
        return true;
    }
    /**
     * Calculate confidence factors for the classification
     */
    calculateConfidenceFactors(request, validationResult) {
        // Initialize confidence scores
        let dataCompleteness = 1.0;
        let regulatoryAlignment = 1.0;
        let consistencyScore = 1.0;
        let borderlineFactors = [];
        // Adjust data completeness based on missing fields
        const missingFields = this.countMissingFields(request);
        if (missingFields > 0) {
            dataCompleteness -= missingFields * 0.05; // Reduce by 5% per missing field
        }
        // Adjust regulatory alignment based on validation issues
        const errorCount = validationResult.issues.filter(i => i.severity === 'ERROR').length;
        const warningCount = validationResult.issues.filter(i => i.severity === 'WARNING').length;
        if (errorCount > 0) {
            regulatoryAlignment -= errorCount * 0.1; // Reduce by 10% per error
        }
        if (warningCount > 0) {
            regulatoryAlignment -= warningCount * 0.03; // Reduce by 3% per warning
        }
        // Check for consistency between target and actual classification
        const targetClassification = request.fundProfile.targetArticleClassification;
        const actualClassification = this.determinePrimaryClassification(request);
        if (targetClassification !== actualClassification) {
            consistencyScore = 0.5; // Major inconsistency
            borderlineFactors.push(`Target classification (${targetClassification}) differs from determined classification (${actualClassification})`);
        }
        // Check for borderline cases
        if (request.sustainableInvestment?.sustainableInvestmentMinimum >= 75 &&
            request.sustainableInvestment?.sustainableInvestmentMinimum < 80) {
            borderlineFactors.push('Sustainable investment allocation (75-80%) is near the Article 9 threshold');
        }
        // Ensure scores are within 0-1 range
        dataCompleteness = Math.max(0, Math.min(1, dataCompleteness));
        regulatoryAlignment = Math.max(0, Math.min(1, regulatoryAlignment));
        consistencyScore = Math.max(0, Math.min(1, consistencyScore));
        // Calculate overall confidence score (weighted average)
        const overallConfidence = (dataCompleteness * 0.3 +
            regulatoryAlignment * 0.5 +
            consistencyScore * 0.2);
        return {
            overallConfidence,
            dataCompleteness,
            regulatoryAlignment,
            consistencyScore,
            borderlineFactors
        };
    }
    /**
     * Count missing or incomplete fields in the request
     */
    countMissingFields(request) {
        let count = 0;
        // Check metadata fields
        if (!request.metadata.entityId)
            count++;
        if (!request.metadata.submissionDate)
            count++;
        // Check fund profile fields
        if (!request.fundProfile.fundName)
            count++;
        if (!request.fundProfile.fundType)
            count++;
        if (!request.fundProfile.aum)
            count++;
        // Check ESG integration fields
        if (!request.esgIntegration.dueDiligencePolicies)
            count++;
        if (request.esgIntegration.considersPAI &&
            (!request.esgIntegration.paiIndicators ||
                request.esgIntegration.paiIndicators.length === 0)) {
            count++;
        }
        // Check sustainability risk integration
        if (!request.sustainabilityRiskIntegration.identificationProcess)
            count++;
        if (!request.sustainabilityRiskIntegration.assessmentMethodology)
            count++;
        if (!request.sustainabilityRiskIntegration.integrationInDecisionMaking)
            count++;
        // Check Article 9 specific fields if applicable
        if (request.fundProfile.targetArticleClassification === 'Article9') {
            if (!request.fundProfile.sustainabilityObjective)
                count++;
            if (!request.sustainableInvestment)
                count++;
            if (request.sustainableInvestment &&
                !request.sustainableInvestment.measurementMethodology)
                count++;
        }
        // Check Article 8 specific fields if applicable
        if (request.fundProfile.targetArticleClassification === 'Article8') {
            if (!request.marketingMaterials?.promotesESGCharacteristics)
                count++;
        }
        return count;
    }
    /**
     * Generate alternative classifications when confidence is not high
     */
    generateAlternativeClassifications(request, primaryClassification, confidenceFactors) {
        const alternatives = [];
        // Only generate alternatives if confidence is below threshold
        if (confidenceFactors.overallConfidence >= 0.8) {
            return [];
        }
        // Generate alternative based on primary classification
        switch (primaryClassification) {
            case 'Article9':
                // If Article 9 but confidence is low, suggest Article 8
                alternatives.push({
                    classification: 'Article8',
                    confidence: 1 - confidenceFactors.overallConfidence,
                    reasoning: [
                        'Sustainable investment allocation may not meet Article 9 threshold',
                        'Measurement methodology may not be sufficiently robust',
                        'Consider Article 8 classification with sustainable investments'
                    ]
                });
                break;
            case 'Article8':
                // If borderline to Article 9
                if (request.sustainableInvestment?.sustainableInvestmentMinimum >= 75) {
                    alternatives.push({
                        classification: 'Article9',
                        confidence: 0.6,
                        reasoning: [
                            'Close to meeting Article 9 sustainable investment threshold',
                            'With minor adjustments, could qualify for Article 9',
                            'Consider increasing sustainable investment allocation'
                        ]
                    });
                }
                else {
                    // If not close to Article 9, suggest Article 6 as fallback
                    alternatives.push({
                        classification: 'Article6',
                        confidence: 0.4,
                        reasoning: [
                            'If ESG characteristics promotion is not sufficiently robust',
                            'Consider Article 6 classification to avoid greenwashing risks',
                            'Ensure marketing materials align with actual ESG integration'
                        ]
                    });
                }
                break;
            case 'Article6':
                // If Article 6 but close to Article 8
                if (request.esgIntegration.dueDiligencePolicies.esgIntegration) {
                    alternatives.push({
                        classification: 'Article8',
                        confidence: 0.5,
                        reasoning: [
                            'ESG integration policies are in place',
                            'With proper ESG characteristics promotion, could qualify for Article 8',
                            'Consider enhancing marketing materials to highlight ESG aspects'
                        ]
                    });
                }
                break;
        }
        return alternatives;
    }
    /**
     * Generate explainability response for the classification
     */
    generateExplainabilityResponse(request, classification, confidenceFactors) {
        // Determine explainability level based on confidence
        let level = 'STANDARD';
        if (confidenceFactors.overallConfidence < 0.6) {
            level = 'DETAILED';
        }
        else if (confidenceFactors.overallConfidence > 0.9) {
            level = 'SUMMARY';
        }
        // Generate reasoning steps based on classification
        const reasoningSteps = [];
        switch (classification) {
            case 'Article9':
                reasoningSteps.push({
                    step: 1,
                    description: 'Sustainable Investment Objective Analysis',
                    reasoning: `The fund has defined a clear sustainable investment objective: "${request.fundProfile.sustainabilityObjective}", which meets Article 9 requirements.`,
                    regulatoryReference: {
                        article: 'SFDR Article 9(1)',
                        text: 'Products with sustainable investment as their objective'
                    }
                });
                reasoningSteps.push({
                    step: 2,
                    description: 'Sustainable Investment Allocation Assessment',
                    reasoning: `The fund allocates ${request.sustainableInvestment?.sustainableInvestmentMinimum}% to sustainable investments, exceeding the 80% threshold for Article 9 funds.`,
                    regulatoryReference: {
                        article: 'SFDR Article 9(3)',
                        text: 'Information on how the designated index is aligned with the objective'
                    }
                });
                reasoningSteps.push({
                    step: 3,
                    description: 'Measurement Methodology Evaluation',
                    reasoning: 'The fund has established a robust methodology for measuring the attainment of its sustainable investment objective.',
                    regulatoryReference: {
                        article: 'SFDR RTS Article 19',
                        text: 'Information for financial products with sustainable investment as their objective'
                    }
                });
                break;
            case 'Article8':
                reasoningSteps.push({
                    step: 1,
                    description: 'ESG Characteristics Promotion Analysis',
                    reasoning: 'The fund promotes environmental and/or social characteristics in its marketing materials and investment strategy.',
                    regulatoryReference: {
                        article: 'SFDR Article 8(1)',
                        text: 'Products promoting environmental or social characteristics'
                    }
                });
                reasoningSteps.push({
                    step: 2,
                    description: 'ESG Integration Assessment',
                    reasoning: 'The fund has implemented ESG integration policies in its investment process.',
                    regulatoryReference: {
                        article: 'SFDR Article 8(2)',
                        text: 'Information to be disclosed for products promoting environmental or social characteristics'
                    }
                });
                reasoningSteps.push({
                    step: 3,
                    description: 'Sustainability Risk Integration Evaluation',
                    reasoning: 'The fund has a defined process for identifying, assessing, and integrating sustainability risks.',
                    regulatoryReference: {
                        article: 'SFDR Article 6',
                        text: 'Transparency of the integration of sustainability risks'
                    }
                });
                break;
            case 'Article6':
                reasoningSteps.push({
                    step: 1,
                    description: 'Sustainability Claims Analysis',
                    reasoning: 'The fund does not make specific environmental or social characteristic claims in its marketing materials.',
                    regulatoryReference: {
                        article: 'SFDR Article 6',
                        text: 'Transparency of the integration of sustainability risks'
                    }
                });
                reasoningSteps.push({
                    step: 2,
                    description: 'ESG Integration Assessment',
                    reasoning: 'The fund does not have sufficient ESG integration policies to qualify for Article 8.',
                    regulatoryReference: {
                        article: 'SFDR Article 8(1)',
                        text: 'Products promoting environmental or social characteristics'
                    }
                });
                break;
        }
        return {
            level,
            summary: this.generateExplainabilitySummary(classification, confidenceFactors),
            reasoningSteps,
            confidenceStatement: this.generateConfidenceStatement(confidenceFactors)
        };
    }
    /**
     * Generate summary explanation based on classification
     */
    generateExplainabilitySummary(classification, confidenceFactors) {
        switch (classification) {
            case 'Article9':
                return `This fund qualifies as an Article 9 product under SFDR with ${Math.round(confidenceFactors.overallConfidence * 100)}% confidence. It has a clear sustainable investment objective, allocates more than 80% to sustainable investments, and has established a robust measurement methodology.`;
            case 'Article8':
                return `This fund qualifies as an Article 8 product under SFDR with ${Math.round(confidenceFactors.overallConfidence * 100)}% confidence. It promotes environmental and/or social characteristics, has implemented ESG integration policies, and considers sustainability risks in its investment process.`;
            case 'Article6':
                return `This fund qualifies as an Article 6 product under SFDR with ${Math.round(confidenceFactors.overallConfidence * 100)}% confidence. It does not promote specific environmental or social characteristics and does not have sustainable investment as its objective.`;
            default:
                return `Classification determination completed with ${Math.round(confidenceFactors.overallConfidence * 100)}% confidence.`;
        }
    }
    /**
     * Generate confidence statement based on confidence factors
     */
    generateConfidenceStatement(confidenceFactors) {
        const { overallConfidence, dataCompleteness, regulatoryAlignment, borderlineFactors } = confidenceFactors;
        let statement = `Classification confidence: ${Math.round(overallConfidence * 100)}%. `;
        if (overallConfidence > 0.9) {
            statement += 'High confidence in this classification based on comprehensive data and strong regulatory alignment.';
        }
        else if (overallConfidence > 0.7) {
            statement += 'Moderate confidence in this classification. Some aspects could be strengthened for higher certainty.';
        }
        else {
            statement += 'Low confidence in this classification. Consider addressing the identified issues to improve certainty.';
        }
        if (dataCompleteness < 0.8) {
            statement += ' Data completeness issues affect confidence.';
        }
        if (regulatoryAlignment < 0.8) {
            statement += ' Regulatory alignment issues affect confidence.';
        }
        if (borderlineFactors.length > 0) {
            statement += ` Borderline factors: ${borderlineFactors.join('; ')}.`;
        }
        return statement;
    }
    /**
     * Assess regulatory risk based on classification and confidence
     */
    assessRegulatoryRisk(request, classification, confidenceFactors, validationResult) {
        // Initialize risk assessment
        let riskLevel = 'LOW';
        const riskFactors = [];
        const mitigationSteps = [];
        // Determine risk level based on confidence and validation issues
        if (confidenceFactors.overallConfidence < 0.6) {
            riskLevel = 'HIGH';
        }
        else if (confidenceFactors.overallConfidence < 0.8) {
            riskLevel = 'MEDIUM';
        }
        // Increase risk level if validation has errors
        const errorCount = validationResult.issues.filter(i => i.severity === 'ERROR').length;
        if (errorCount > 0) {
            riskLevel = riskLevel === 'HIGH' ? 'HIGH' : 'MEDIUM';
            riskFactors.push(`${errorCount} validation errors detected`);
        }
        // Check for classification-specific risks
        switch (classification) {
            case 'Article9':
                // Check sustainable investment allocation
                if (request.sustainableInvestment?.sustainableInvestmentMinimum < 80) {
                    riskLevel = 'HIGH';
                    riskFactors.push('Sustainable investment allocation below 80% threshold for Article 9');
                    mitigationSteps.push('Increase sustainable investment allocation to at least 80%');
                }
                // Check measurement methodology
                if (!request.sustainableInvestment?.measurementMethodology ||
                    request.sustainableInvestment.measurementMethodology.length < 20) {
                    riskLevel = riskLevel === 'LOW' ? 'MEDIUM' : riskLevel;
                    riskFactors.push('Insufficient detail in sustainable investment measurement methodology');
                    mitigationSteps.push('Enhance measurement methodology documentation');
                }
                break;
            case 'Article8':
                // Check ESG characteristics promotion
                if (!request.marketingMaterials?.promotesESGCharacteristics) {
                    riskLevel = 'HIGH';
                    riskFactors.push('No explicit promotion of ESG characteristics in marketing materials');
                    mitigationSteps.push('Update marketing materials to clearly promote ESG characteristics');
                }
                // Check for potential greenwashing risk
                if (!request.esgIntegration.dueDiligencePolicies.esgIntegration) {
                    riskLevel = 'HIGH';
                    riskFactors.push('ESG integration policies not implemented despite Article 8 classification');
                    mitigationSteps.push('Implement comprehensive ESG integration policies');
                }
                break;
            case 'Article6':
                // Check for potential missed Article 8 opportunity
                if (request.esgIntegration.dueDiligencePolicies.esgIntegration &&
                    request.esgIntegration.considersPAI) {
                    riskLevel = 'LOW'; // Not a compliance risk, but a potential opportunity
                    riskFactors.push('Fund may qualify for Article 8 but is classified as Article 6');
                    mitigationSteps.push('Consider Article 8 classification if ESG characteristics are promoted');
                }
                break;
        }
        // Check for inconsistency between target and determined classification
        if (request.fundProfile.targetArticleClassification !== classification) {
            riskLevel = riskLevel === 'LOW' ? 'MEDIUM' : riskLevel;
            riskFactors.push(`Target classification (${request.fundProfile.targetArticleClassification}) differs from determined classification (${classification})`);
            mitigationSteps.push('Align fund characteristics with target classification or adjust target');
        }
        return {
            riskLevel,
            riskFactors,
            mitigationSteps,
            assessmentRationale: this.generateRiskRationale(riskLevel, riskFactors)
        };
    }
    /**
     * Generate risk assessment rationale
     */
    generateRiskRationale(riskLevel, riskFactors) {
        switch (riskLevel) {
            case 'HIGH':
                return `High regulatory risk identified due to: ${riskFactors.join('; ')}. Immediate action recommended to address these issues and ensure SFDR compliance.`;
            case 'MEDIUM':
                return `Medium regulatory risk identified due to: ${riskFactors.join('; ')}. Recommended to address these issues to strengthen SFDR compliance position.`;
            case 'LOW':
                return riskFactors.length > 0
                    ? `Low regulatory risk with minor considerations: ${riskFactors.join('; ')}.`
                    : 'Low regulatory risk. The fund appears to be well-aligned with its SFDR classification requirements.';
            default:
                return 'Risk assessment completed.';
        }
    }
    /**
     * Determine if human review is needed based on confidence and risk
     */
    determineReviewTriggers(confidenceFactors, riskAssessment, validationResult) {
        const triggers = [];
        // Trigger review for low confidence
        if (confidenceFactors.overallConfidence < 0.7) {
            triggers.push({
                triggerType: 'LOW_CONFIDENCE',
                description: `Classification confidence below threshold: ${Math.round(confidenceFactors.overallConfidence * 100)}%`,
                severity: 'HIGH'
            });
        }
        // Trigger review for high regulatory risk
        if (riskAssessment.riskLevel === 'HIGH') {
            triggers.push({
                triggerType: 'HIGH_REGULATORY_RISK',
                description: `High regulatory risk identified: ${riskAssessment.riskFactors.join('; ')}`,
                severity: 'HIGH'
            });
        }
        // Trigger review for validation errors
        const errorCount = validationResult.issues.filter(i => i.severity === 'ERROR').length;
        if (errorCount > 0) {
            triggers.push({
                triggerType: 'VALIDATION_ERRORS',
                description: `${errorCount} validation errors detected`,
                severity: errorCount > 3 ? 'HIGH' : 'MEDIUM'
            });
        }
        // Trigger review for borderline cases
        if (confidenceFactors.borderlineFactors.length > 0) {
            triggers.push({
                triggerType: 'BORDERLINE_CLASSIFICATION',
                description: `Borderline classification factors: ${confidenceFactors.borderlineFactors.join('; ')}`,
                severity: 'MEDIUM'
            });
        }
        return triggers;
    }
    /**
     * Get framework version
     */
    getVersion() {
        return this.version;
    }
}
// ============================================================================
// SINGLETON INSTANCE
// ============================================================================
/**
 * Singleton instance of the Confidence Framework
 */
export const confidenceFramework = new ConfidenceFramework();
//# sourceMappingURL=framework.js.map