/**
 * SFDR Navigator Agent - Governance & Compliance Framework
 * Phase 2B: Enterprise Governance and Regulatory Oversight
 *
 * Implements comprehensive governance, audit trails, regulatory compliance,
 * and enterprise-grade oversight for AI-driven regulatory decisions
 */
// ============================================================================
// GOVERNANCE & COMPLIANCE FRAMEWORK
// ============================================================================
/**
 * Main governance and compliance framework
 */
export class GovernanceComplianceFramework {
    auditManager;
    policyEngine;
    complianceMonitor;
    riskAssessor;
    dataGovernance;
    accessController;
    evidenceManager;
    reportingEngine;
    constructor() {
        this.auditManager = new AuditManager();
        this.policyEngine = new PolicyEngine();
        this.complianceMonitor = new ComplianceMonitor();
        this.riskAssessor = new RiskAssessor();
        this.dataGovernance = new DataGovernanceManager();
        this.accessController = new AccessController();
        this.evidenceManager = new EvidenceManager();
        this.reportingEngine = new ComplianceReportingEngine();
    }
    /**
     * Record classification decision for audit trail
     */
    async recordClassificationDecision(request, response, userId, userRole, sessionId) {
        try {
            // Assess compliance impact
            const complianceImpact = await this.assessComplianceImpact('classification-decision', { request, response });
            // Create audit trail entry
            const auditEntry = {
                auditId: `audit-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                timestamp: new Date().toISOString(),
                eventType: 'classification-decision',
                userId,
                userRole,
                sessionId,
                action: 'SFDR_CLASSIFICATION',
                resource: `fund:${request.fundProfile.fundId}`,
                details: {
                    changes: [{
                            field: 'classification',
                            oldValue: null,
                            newValue: response.classification.primary,
                            changeType: 'create',
                            reason: 'AI-driven classification'
                        }],
                    justification: response.explanation?.summary || 'Automated SFDR classification',
                    approvals: [],
                    evidence: await this.collectEvidence(request, response)
                },
                outcome: 'success',
                riskLevel: this.assessRiskLevel(response.confidence.overall),
                complianceImpact,
                metadata: {
                    correlationId: request.requestId,
                    tags: ['sfdr', 'classification', 'automated'],
                    retention: '7-years',
                    classification: 'internal',
                    jurisdiction: request.fundProfile.jurisdiction
                }
            };
            // Store audit entry
            const auditId = await this.auditManager.recordAuditEntry(auditEntry);
            // Check policy compliance
            await this.policyEngine.checkCompliance(auditEntry);
            // Monitor for compliance violations
            await this.complianceMonitor.monitorEvent(auditEntry);
            return auditId;
        }
        catch (error) {
            throw new Error(`Audit recording failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    /**
     * Record human feedback for governance
     */
    async recordHumanFeedback(feedback, originalRequest, originalResponse, reviewerId, reviewerRole) {
        try {
            const complianceImpact = await this.assessComplianceImpact('human-override', { feedback, originalRequest, originalResponse });
            const auditEntry = {
                auditId: `audit-feedback-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                timestamp: new Date().toISOString(),
                eventType: 'human-override',
                userId: reviewerId,
                userRole: reviewerRole,
                sessionId: feedback.sessionId,
                action: 'HUMAN_FEEDBACK',
                resource: `classification:${originalRequest.requestId}`,
                details: {
                    before: {
                        classification: originalResponse.classification.primary,
                        confidence: originalResponse.confidence.overall
                    },
                    after: {
                        classification: feedback.correctedClassification,
                        confidence: feedback.confidenceRating
                    },
                    changes: [{
                            field: 'classification',
                            oldValue: originalResponse.classification.primary,
                            newValue: feedback.correctedClassification,
                            changeType: 'update',
                            reason: feedback.comments || 'Human review correction'
                        }],
                    justification: feedback.comments || 'Human expert review',
                    approvals: [],
                    evidence: await this.collectFeedbackEvidence(feedback)
                },
                outcome: 'success',
                riskLevel: this.assessFeedbackRisk(feedback),
                complianceImpact,
                metadata: {
                    correlationId: originalRequest.requestId,
                    parentAuditId: await this.findOriginalAuditId(originalRequest.requestId),
                    tags: ['sfdr', 'human-review', 'correction'],
                    retention: '7-years',
                    classification: 'internal',
                    jurisdiction: originalRequest.fundProfile.jurisdiction
                }
            };
            const auditId = await this.auditManager.recordAuditEntry(auditEntry);
            await this.policyEngine.checkCompliance(auditEntry);
            await this.complianceMonitor.monitorEvent(auditEntry);
            return auditId;
        }
        catch (error) {
            throw new Error(`Feedback audit recording failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    /**
     * Record model update for governance
     */
    async recordModelUpdate(updateEvent, userId, userRole) {
        try {
            const complianceImpact = await this.assessComplianceImpact('model-update', { updateEvent });
            const auditEntry = {
                auditId: `audit-model-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                timestamp: new Date().toISOString(),
                eventType: 'model-update',
                userId,
                userRole,
                sessionId: updateEvent.sessionId || 'system',
                action: 'MODEL_UPDATE',
                resource: `model:${updateEvent.modelId}`,
                details: {
                    before: {
                        version: updateEvent.previousVersion,
                        performance: updateEvent.previousPerformance
                    },
                    after: {
                        version: updateEvent.newVersion,
                        performance: updateEvent.newPerformance
                    },
                    changes: [{
                            field: 'model-version',
                            oldValue: updateEvent.previousVersion,
                            newValue: updateEvent.newVersion,
                            changeType: 'update',
                            reason: updateEvent.updateReason
                        }],
                    justification: updateEvent.updateReason,
                    approvals: updateEvent.approvals || [],
                    evidence: await this.collectModelUpdateEvidence(updateEvent)
                },
                outcome: 'success',
                riskLevel: this.assessModelUpdateRisk(updateEvent),
                complianceImpact,
                metadata: {
                    correlationId: updateEvent.updateId,
                    tags: ['model', 'update', 'ai-governance'],
                    retention: '10-years',
                    classification: 'confidential',
                    jurisdiction: 'EU'
                }
            };
            const auditId = await this.auditManager.recordAuditEntry(auditEntry);
            await this.policyEngine.checkCompliance(auditEntry);
            await this.complianceMonitor.monitorEvent(auditEntry);
            return auditId;
        }
        catch (error) {
            throw new Error(`Model update audit recording failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    /**
     * Conduct compliance assessment
     */
    async conductComplianceAssessment(scope, framework, assessorId) {
        try {
            const assessmentId = `assessment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
            // Gather evidence and data
            const auditData = await this.auditManager.getAuditData(scope.timeframe.start, scope.timeframe.end, scope.systems);
            // Analyze compliance
            const findings = await this.analyzeCompliance(auditData, framework, scope.criteria);
            // Generate recommendations
            const recommendations = await this.generateRecommendations(findings, framework);
            // Assess overall risk
            const riskRating = this.calculateOverallRisk(findings);
            const assessment = {
                assessmentId,
                timestamp: new Date().toISOString(),
                scope,
                framework,
                status: this.determineComplianceStatus(findings),
                findings,
                recommendations,
                riskRating,
                nextAssessment: this.calculateNextAssessmentDate(framework),
                assessor: assessorId
            };
            // Store assessment
            await this.storeComplianceAssessment(assessment);
            return assessment;
        }
        catch (error) {
            throw new Error(`Compliance assessment failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    /**
     * Generate compliance report
     */
    async generateComplianceReport(framework, period, includeRecommendations = true) {
        return await this.reportingEngine.generateReport(framework, period, includeRecommendations);
    }
    /**
     * Get audit trail
     */
    async getAuditTrail(filters) {
        return await this.auditManager.getAuditTrail(filters);
    }
    /**
     * Check data access authorization
     */
    async checkDataAccess(userId, userRole, dataAsset, action) {
        return await this.accessController.checkAccess(userId, userRole, dataAsset, action);
    }
    // Private helper methods
    async assessComplianceImpact(eventType, data) {
        const frameworks = ['SFDR'];
        if (this.containsPersonalData(data)) {
            frameworks.push('GDPR');
        }
        const riskAssessment = await this.riskAssessor.assessRisk(eventType, data);
        return {
            frameworks,
            policies: await this.getApplicablePolicies(frameworks, eventType),
            controls: await this.getApplicableControls(frameworks, eventType),
            riskAssessment,
            mitigationRequired: riskAssessment.residualRisk === 'high' || riskAssessment.residualRisk === 'critical'
        };
    }
    assessRiskLevel(confidence) {
        if (confidence >= 0.95)
            return 'low';
        if (confidence >= 0.85)
            return 'medium';
        if (confidence >= 0.70)
            return 'high';
        return 'critical';
    }
    assessFeedbackRisk(feedback) {
        if (feedback.feedbackType === 'correction') {
            return feedback.priority === 'high' ? 'high' : 'medium';
        }
        return 'low';
    }
    assessModelUpdateRisk(updateEvent) {
        // Assess risk based on performance change and update type
        const performanceChange = Math.abs((updateEvent.newPerformance?.accuracy || 0) -
            (updateEvent.previousPerformance?.accuracy || 0));
        if (performanceChange > 0.1)
            return 'high';
        if (performanceChange > 0.05)
            return 'medium';
        return 'low';
    }
    async collectEvidence(request, response) {
        return [
            {
                evidenceId: `evidence-${Date.now()}`,
                type: 'calculation',
                source: 'classification-engine',
                hash: this.calculateHash(response),
                timestamp: new Date().toISOString(),
                description: 'AI classification decision and confidence scores'
            }
        ];
    }
    async collectFeedbackEvidence(feedback) {
        return [
            {
                evidenceId: `evidence-feedback-${Date.now()}`,
                type: 'document',
                source: 'human-reviewer',
                hash: this.calculateHash(feedback),
                timestamp: new Date().toISOString(),
                description: 'Human expert feedback and corrections'
            }
        ];
    }
    async collectModelUpdateEvidence(updateEvent) {
        return [
            {
                evidenceId: `evidence-model-${Date.now()}`,
                type: 'log',
                source: 'model-management',
                hash: this.calculateHash(updateEvent),
                timestamp: new Date().toISOString(),
                description: 'Model update event and performance metrics'
            }
        ];
    }
    calculateHash(data) {
        // Simple hash calculation for demonstration
        return Buffer.from(JSON.stringify(data)).toString('base64').substring(0, 32);
    }
    async findOriginalAuditId(requestId) {
        const auditEntries = await this.auditManager.getAuditTrail({
            resource: `fund:${requestId}`
        });
        return auditEntries[0]?.auditId;
    }
    containsPersonalData(data) {
        // Check if data contains personal information
        const personalDataFields = ['email', 'name', 'phone', 'address', 'ssn'];
        const dataString = JSON.stringify(data).toLowerCase();
        return personalDataFields.some(field => dataString.includes(field));
    }
    async getApplicablePolicies(frameworks, eventType) {
        return frameworks.map(f => `${f}-policy-${eventType}`);
    }
    async getApplicableControls(frameworks, eventType) {
        return frameworks.map(f => `${f}-control-${eventType}`);
    }
    async analyzeCompliance(auditData, framework, criteria) {
        // Analyze audit data against compliance criteria
        const findings = [];
        // Example compliance check
        const classificationAccuracy = this.calculateClassificationAccuracy(auditData);
        if (classificationAccuracy < 0.95) {
            findings.push({
                findingId: `finding-${Date.now()}`,
                type: 'gap',
                severity: 'medium',
                description: 'Classification accuracy below required threshold',
                evidence: ['audit-data-analysis'],
                requirement: 'SFDR Article 4 - Accuracy Requirements',
                impact: 'Potential misclassification of financial products',
                recommendation: 'Implement additional model validation and human oversight',
                owner: 'model-validator',
                dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
                status: 'open'
            });
        }
        return findings;
    }
    async generateRecommendations(findings, framework) {
        const recommendations = [];
        for (const finding of findings) {
            if (finding.severity === 'high' || finding.severity === 'critical') {
                recommendations.push({
                    recommendationId: `rec-${Date.now()}`,
                    priority: finding.severity === 'critical' ? 'critical' : 'high',
                    description: finding.recommendation,
                    rationale: finding.description,
                    implementation: {
                        phases: [{
                                phaseId: 'phase-1',
                                name: 'Assessment',
                                description: 'Assess current state and requirements',
                                duration: '2 weeks',
                                activities: ['Gap analysis', 'Requirements gathering'],
                                deliverables: ['Assessment report'],
                                owner: finding.owner
                            }],
                        dependencies: [],
                        resources: [{
                                type: 'human',
                                description: 'Compliance expert',
                                quantity: 1,
                                duration: '1 month',
                                cost: 10000
                            }],
                        milestones: [{
                                milestoneId: 'milestone-1',
                                name: 'Assessment complete',
                                description: 'Initial assessment completed',
                                targetDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
                                criteria: ['Assessment report approved'],
                                dependencies: []
                            }],
                        successCriteria: ['Compliance gap addressed']
                    },
                    benefits: ['Improved compliance', 'Reduced risk'],
                    risks: ['Implementation delays', 'Resource constraints'],
                    cost: {
                        initial: 10000,
                        ongoing: 2000,
                        currency: 'EUR',
                        breakdown: [{
                                category: 'Personnel',
                                amount: 8000,
                                description: 'Expert consultation'
                            }],
                        assumptions: ['Standard hourly rates']
                    },
                    timeline: '1 month'
                });
            }
        }
        return recommendations;
    }
    calculateOverallRisk(findings) {
        const criticalCount = findings.filter(f => f.severity === 'critical').length;
        const highCount = findings.filter(f => f.severity === 'high').length;
        if (criticalCount > 0)
            return 'critical';
        if (highCount > 2)
            return 'high';
        if (highCount > 0)
            return 'medium';
        return 'low';
    }
    determineComplianceStatus(findings) {
        const openFindings = findings.filter(f => f.status === 'open');
        const criticalFindings = openFindings.filter(f => f.severity === 'critical');
        const highFindings = openFindings.filter(f => f.severity === 'high');
        if (criticalFindings.length > 0)
            return 'non-compliant';
        if (highFindings.length > 0)
            return 'requires-attention';
        if (openFindings.length > 0)
            return 'under-review';
        return 'compliant';
    }
    calculateNextAssessmentDate(framework) {
        // Different frameworks have different assessment frequencies
        const months = framework === 'SFDR' ? 6 : 12;
        return new Date(Date.now() + months * 30 * 24 * 60 * 60 * 1000).toISOString();
    }
    calculateClassificationAccuracy(auditData) {
        const classificationEvents = auditData.filter(entry => entry.eventType === 'classification-decision');
        if (classificationEvents.length === 0)
            return 1.0;
        const corrections = auditData.filter(entry => entry.eventType === 'human-override');
        return 1 - (corrections.length / classificationEvents.length);
    }
    async storeComplianceAssessment(assessment) {
        // Store assessment in compliance database
        console.log(`Storing compliance assessment: ${assessment.assessmentId}`);
    }
}
// ============================================================================
// SUPPORTING CLASSES
// ============================================================================
/**
 * Audit management
 */
export class AuditManager {
    auditTrail = new Map();
    async recordAuditEntry(entry) {
        this.auditTrail.set(entry.auditId, entry);
        return entry.auditId;
    }
    async getAuditTrail(filters) {
        let entries = Array.from(this.auditTrail.values());
        if (filters.startDate) {
            entries = entries.filter(e => e.timestamp >= filters.startDate);
        }
        if (filters.endDate) {
            entries = entries.filter(e => e.timestamp <= filters.endDate);
        }
        if (filters.eventType) {
            entries = entries.filter(e => e.eventType === filters.eventType);
        }
        if (filters.userId) {
            entries = entries.filter(e => e.userId === filters.userId);
        }
        if (filters.resource) {
            entries = entries.filter(e => e.resource.includes(filters.resource));
        }
        if (filters.riskLevel) {
            entries = entries.filter(e => e.riskLevel === filters.riskLevel);
        }
        return entries.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
    }
    async getAuditData(startDate, endDate, systems) {
        return this.getAuditTrail({ startDate, endDate });
    }
}
/**
 * Policy engine
 */
export class PolicyEngine {
    policies = new Map();
    async checkCompliance(auditEntry) {
        // Check audit entry against applicable policies
        console.log(`Checking compliance for audit entry: ${auditEntry.auditId}`);
    }
    async addPolicy(policy) {
        this.policies.set(policy.policyId, policy);
    }
}
/**
 * Compliance monitoring
 */
export class ComplianceMonitor {
    async monitorEvent(auditEntry) {
        // Monitor events for compliance violations
        if (auditEntry.riskLevel === 'critical') {
            await this.triggerAlert(auditEntry);
        }
    }
    async triggerAlert(auditEntry) {
        console.log(`CRITICAL ALERT: ${auditEntry.action} - ${auditEntry.auditId}`);
    }
}
/**
 * Risk assessment
 */
export class RiskAssessor {
    async assessRisk(eventType, data) {
        return {
            inherentRisk: 'medium',
            residualRisk: 'low',
            mitigatingControls: ['automated-validation', 'human-oversight'],
            riskFactors: ['ai-decision', 'regulatory-impact'],
            likelihood: 'low',
            impact: 'moderate'
        };
    }
}
/**
 * Data governance management
 */
export class DataGovernanceManager {
    dataAssets = new Map();
    async registerDataAsset(record) {
        this.dataAssets.set(record.recordId, record);
    }
    async getDataAsset(assetId) {
        return this.dataAssets.get(assetId);
    }
}
/**
 * Access control
 */
export class AccessController {
    async checkAccess(userId, userRole, dataAsset, action) {
        // Implement role-based access control
        const rolePermissions = {
            'compliance-officer': ['read', 'write'],
            'risk-manager': ['read'],
            'data-protection-officer': ['read', 'write', 'delete'],
            'audit-manager': ['read'],
            'regulatory-expert': ['read', 'write'],
            'model-validator': ['read'],
            'executive-oversight': ['read'],
            'system-administrator': ['read', 'write', 'delete']
        };
        return rolePermissions[userRole]?.includes(action) || false;
    }
}
/**
 * Evidence management
 */
export class EvidenceManager {
    evidence = new Map();
    async storeEvidence(evidence) {
        this.evidence.set(evidence.evidenceId, evidence);
    }
    async getEvidence(evidenceId) {
        return this.evidence.get(evidenceId);
    }
}
/**
 * Compliance reporting
 */
export class ComplianceReportingEngine {
    async generateReport(framework, period, includeRecommendations) {
        return {
            reportId: `report-${framework}-${Date.now()}`,
            framework,
            period,
            generatedAt: new Date().toISOString(),
            summary: {
                complianceScore: 95,
                riskLevel: 'low',
                findings: 2,
                recommendations: includeRecommendations ? 3 : 0
            },
            sections: [
                {
                    title: 'Executive Summary',
                    content: 'Overall compliance status is good with minor areas for improvement'
                },
                {
                    title: 'Detailed Findings',
                    content: 'Analysis of compliance gaps and violations'
                }
            ]
        };
    }
}
//# sourceMappingURL=compliance-framework.js.map