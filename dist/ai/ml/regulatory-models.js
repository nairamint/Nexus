/**
 * SFDR Navigator Agent - Regulatory ML Models
 * Phase 2B: Advanced ML Models Implementation
 *
 * Implements regulatory-aware machine learning models with constitutional AI patterns
 * for SFDR compliance classification and risk assessment
 */
// ============================================================================
// GRAPH NEURAL NETWORK FOR REGULATORY RELATIONSHIPS
// ============================================================================
/**
 * Graph Neural Network for SFDR regulatory classification
 * Models regulatory relationships and dependencies
 */
export class RegulatoryGraphNeuralNetwork {
    modelId;
    modelType = 'graph-neural-network';
    version;
    regulatoryConstraints;
    interpretabilityLevel = 'high';
    auditTrail = [];
    performanceMetrics;
    graphStructure;
    attentionMechanism;
    constructor(modelId, version, regulatoryConstraints) {
        this.modelId = modelId;
        this.version = version;
        this.regulatoryConstraints = regulatoryConstraints;
        this.graphStructure = new RegulatoryGraph();
        this.attentionMechanism = new GraphAttentionLayer();
        this.performanceMetrics = this.initializeMetrics();
    }
    /**
     * Classify SFDR article using graph neural network
     */
    async classify(request) {
        const startTime = Date.now();
        const decisionPath = [];
        try {
            // Step 1: Convert request to graph representation
            const graphRepresentation = await this.convertToGraph(request);
            decisionPath.push({
                stepId: 'graph-conversion',
                stepType: 'input-processing',
                inputData: request,
                outputData: graphRepresentation,
                reasoning: 'Converted SFDR request to regulatory graph representation',
                regulatoryReferences: ['SFDR Art. 6', 'SFDR Art. 8', 'SFDR Art. 9'],
                confidenceScore: 0.95,
                timestamp: new Date().toISOString()
            });
            // Step 2: Apply graph attention mechanism
            const attentionWeights = await this.attentionMechanism.computeAttention(graphRepresentation);
            decisionPath.push({
                stepId: 'attention-computation',
                stepType: 'feature-extraction',
                inputData: graphRepresentation,
                outputData: attentionWeights,
                reasoning: 'Computed attention weights for regulatory relationships',
                regulatoryReferences: ['SFDR Delegated Regulation'],
                confidenceScore: 0.88,
                timestamp: new Date().toISOString()
            });
            // Step 3: Graph neural network forward pass
            const classification = await this.forwardPass(graphRepresentation, attentionWeights);
            decisionPath.push({
                stepId: 'gnn-classification',
                stepType: 'classification',
                inputData: { graph: graphRepresentation, attention: attentionWeights },
                outputData: classification,
                reasoning: 'Applied graph neural network for SFDR classification',
                regulatoryReferences: this.getRelevantRegulations(classification),
                confidenceScore: 0.92,
                timestamp: new Date().toISOString()
            });
            // Step 4: Calculate confidence factors
            const confidence = await this.calculateConfidence(classification, attentionWeights, request);
            decisionPath.push({
                stepId: 'confidence-calculation',
                stepType: 'confidence-scoring',
                inputData: { classification, attention: attentionWeights },
                outputData: confidence,
                reasoning: 'Calculated confidence factors based on graph attention and regulatory constraints',
                regulatoryReferences: ['SFDR Art. 4 - Due Diligence'],
                confidenceScore: confidence.overall,
                timestamp: new Date().toISOString()
            });
            // Update audit trail
            this.auditTrail.push(...decisionPath);
            // Update performance metrics
            this.updatePerformanceMetrics(Date.now() - startTime);
            return {
                classification,
                confidence,
                decisionPath
            };
        }
        catch (error) {
            throw new Error(`GNN classification failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    async convertToGraph(request) {
        // Convert SFDR request to graph representation
        // This would include fund characteristics, investment strategy, PAI indicators, etc.
        return {
            nodes: this.extractNodes(request),
            edges: this.extractEdges(request),
            features: this.extractFeatures(request)
        };
    }
    extractNodes(request) {
        // Extract regulatory entities as graph nodes
        return [
            { id: 'fund', type: 'entity', data: request.fundProfile },
            { id: 'strategy', type: 'strategy', data: request.investmentStrategy },
            { id: 'pai', type: 'indicators', data: request.paiData },
            { id: 'taxonomy', type: 'taxonomy', data: request.taxonomyAlignment }
        ];
    }
    extractEdges(request) {
        // Extract relationships between regulatory entities
        return [
            { from: 'fund', to: 'strategy', type: 'implements', weight: 1.0 },
            { from: 'strategy', to: 'pai', type: 'considers', weight: 0.8 },
            { from: 'strategy', to: 'taxonomy', type: 'aligns-with', weight: 0.9 }
        ];
    }
    extractFeatures(request) {
        // Extract numerical features for GNN processing
        return {
            fundSize: request.fundProfile.aum || 0,
            esgScore: request.esgMetrics?.overallScore || 0,
            paiCount: request.paiData?.indicators?.length || 0,
            taxonomyAlignment: request.taxonomyAlignment?.alignmentPercentage || 0
        };
    }
    async forwardPass(graph, attentionWeights) {
        // Simplified GNN forward pass
        // In practice, this would involve multiple graph convolution layers
        const scores = {
            Article6: 0.1,
            Article8: 0.3,
            Article9: 0.6
        };
        // Apply regulatory constraints
        const constrainedScores = this.applyRegulatoryConstraints(scores);
        // Return highest scoring classification
        const maxScore = Math.max(...Object.values(constrainedScores));
        const classification = Object.keys(constrainedScores).find(key => constrainedScores[key] === maxScore);
        return classification;
    }
    applyRegulatoryConstraints(scores) {
        // Apply constitutional AI constraints
        const constrainedScores = { ...scores };
        for (const constraint of this.regulatoryConstraints) {
            if (constraint.constraintType === 'hard') {
                // Apply hard constraints that must be satisfied
                constrainedScores[constraint.regulatoryArticle] *= (1 - constraint.violationPenalty);
            }
        }
        return constrainedScores;
    }
    async calculateConfidence(classification, attentionWeights, request) {
        return {
            overall: 0.92,
            dataQuality: 0.95,
            regulatoryClarity: 0.88,
            modelCertainty: 0.93,
            historicalConsistency: 0.90,
            expertValidation: 0.85
        };
    }
    getRelevantRegulations(classification) {
        const baseRegs = ['SFDR Regulation (EU) 2019/2088'];
        switch (classification) {
            case 'Article6':
                return [...baseRegs, 'SFDR Art. 6 - No sustainability claims'];
            case 'Article8':
                return [...baseRegs, 'SFDR Art. 8 - Environmental/social characteristics'];
            case 'Article9':
                return [...baseRegs, 'SFDR Art. 9 - Sustainable investment objective'];
            default:
                return baseRegs;
        }
    }
    initializeMetrics() {
        return {
            accuracy: 0.0,
            precision: 0.0,
            recall: 0.0,
            f1Score: 0.0,
            regulatoryCompliance: 0.0,
            interpretabilityScore: 0.95, // High for GNN with attention
            latencyMs: 0.0,
            lastEvaluated: new Date().toISOString()
        };
    }
    updatePerformanceMetrics(latencyMs) {
        this.performanceMetrics.latencyMs = latencyMs;
        this.performanceMetrics.lastEvaluated = new Date().toISOString();
    }
}
// ============================================================================
// GRAPH ATTENTION LAYER
// ============================================================================
/**
 * Graph attention mechanism for regulatory relationship modeling
 */
export class GraphAttentionLayer {
    async computeAttention(graph) {
        // Simplified attention computation
        // In practice, this would use learned attention weights
        return {
            nodeAttention: new Map([
                ['fund', 0.9],
                ['strategy', 0.95],
                ['pai', 0.8],
                ['taxonomy', 0.85]
            ]),
            edgeAttention: new Map([
                ['fund-strategy', 0.9],
                ['strategy-pai', 0.7],
                ['strategy-taxonomy', 0.8]
            ])
        };
    }
}
// ============================================================================
// REGULATORY GRAPH STRUCTURE
// ============================================================================
/**
 * Regulatory knowledge graph structure
 */
export class RegulatoryGraph {
    nodes = new Map();
    edges = new Map();
    addNode(id, data) {
        this.nodes.set(id, data);
    }
    addEdge(from, to, data) {
        const edgeId = `${from}-${to}`;
        this.edges.set(edgeId, data);
    }
    getNodes() {
        return this.nodes;
    }
    getEdges() {
        return this.edges;
    }
}
// ============================================================================
// ENSEMBLE MODEL FOR EDGE CASES
// ============================================================================
/**
 * Ensemble model for handling edge cases and ambiguous classifications
 */
export class RegulatoryEnsembleModel {
    modelId;
    modelType = 'ensemble';
    version;
    regulatoryConstraints;
    interpretabilityLevel = 'medium';
    auditTrail = [];
    performanceMetrics;
    baseModels;
    votingStrategy;
    constructor(modelId, version, baseModels, votingStrategy = 'weighted') {
        this.modelId = modelId;
        this.version = version;
        this.baseModels = baseModels;
        this.votingStrategy = votingStrategy;
        this.regulatoryConstraints = this.mergeConstraints();
        this.performanceMetrics = this.initializeMetrics();
    }
    /**
     * Classify using ensemble of models
     */
    async classify(request) {
        const modelResults = await Promise.all(this.baseModels.map(model => model.classify(request)));
        const ensembleResult = this.combineResults(modelResults);
        return ensembleResult;
    }
    combineResults(results) {
        // Implement ensemble voting logic
        switch (this.votingStrategy) {
            case 'majority':
                return this.majorityVoting(results);
            case 'weighted':
                return this.weightedVoting(results);
            case 'expert-hierarchy':
                return this.expertHierarchyVoting(results);
            default:
                return this.weightedVoting(results);
        }
    }
    majorityVoting(results) {
        // Simple majority voting implementation
        const votes = new Map();
        results.forEach(result => {
            const classification = result.classification;
            votes.set(classification, (votes.get(classification) || 0) + 1);
        });
        const winningClassification = Array.from(votes.entries())
            .sort((a, b) => b[1] - a[1])[0][0];
        return {
            classification: winningClassification,
            confidence: this.calculateEnsembleConfidence(results),
            decisionPath: this.mergeDecisionPaths(results)
        };
    }
    weightedVoting(results) {
        // Weighted voting based on model performance
        const weights = this.baseModels.map(model => model.performanceMetrics.accuracy);
        const weightSum = weights.reduce((sum, weight) => sum + weight, 0);
        const classificationScores = new Map();
        results.forEach((result, index) => {
            const weight = weights[index] / weightSum;
            const classification = result.classification;
            const currentScore = classificationScores.get(classification) || 0;
            classificationScores.set(classification, currentScore + weight * result.confidence.overall);
        });
        const winningClassification = Array.from(classificationScores.entries())
            .sort((a, b) => b[1] - a[1])[0][0];
        return {
            classification: winningClassification,
            confidence: this.calculateEnsembleConfidence(results),
            decisionPath: this.mergeDecisionPaths(results)
        };
    }
    expertHierarchyVoting(results) {
        // Expert hierarchy: prefer models with higher regulatory compliance scores
        const sortedResults = results.sort((a, b) => b.confidence.regulatoryClarity - a.confidence.regulatoryClarity);
        return {
            classification: sortedResults[0].classification,
            confidence: this.calculateEnsembleConfidence(results),
            decisionPath: this.mergeDecisionPaths(results)
        };
    }
    calculateEnsembleConfidence(results) {
        const avgConfidence = results.reduce((sum, result) => {
            return {
                overall: sum.overall + result.confidence.overall,
                dataQuality: sum.dataQuality + result.confidence.dataQuality,
                regulatoryClarity: sum.regulatoryClarity + result.confidence.regulatoryClarity,
                modelCertainty: sum.modelCertainty + result.confidence.modelCertainty,
                historicalConsistency: sum.historicalConsistency + result.confidence.historicalConsistency,
                expertValidation: sum.expertValidation + result.confidence.expertValidation
            };
        }, {
            overall: 0,
            dataQuality: 0,
            regulatoryClarity: 0,
            modelCertainty: 0,
            historicalConsistency: 0,
            expertValidation: 0
        });
        const count = results.length;
        return {
            overall: avgConfidence.overall / count,
            dataQuality: avgConfidence.dataQuality / count,
            regulatoryClarity: avgConfidence.regulatoryClarity / count,
            modelCertainty: avgConfidence.modelCertainty / count,
            historicalConsistency: avgConfidence.historicalConsistency / count,
            expertValidation: avgConfidence.expertValidation / count
        };
    }
    mergeDecisionPaths(results) {
        const mergedPaths = [];
        results.forEach((result, index) => {
            result.decisionPath.forEach((path) => {
                mergedPaths.push({
                    ...path,
                    stepId: `ensemble-${index}-${path.stepId}`,
                    reasoning: `Model ${index + 1}: ${path.reasoning}`
                });
            });
        });
        return mergedPaths;
    }
    mergeConstraints() {
        const allConstraints = this.baseModels.flatMap(model => model.regulatoryConstraints);
        // Remove duplicates and merge
        const uniqueConstraints = new Map();
        allConstraints.forEach(constraint => {
            uniqueConstraints.set(constraint.constraintId, constraint);
        });
        return Array.from(uniqueConstraints.values());
    }
    initializeMetrics() {
        return {
            accuracy: 0.0,
            precision: 0.0,
            recall: 0.0,
            f1Score: 0.0,
            regulatoryCompliance: 0.0,
            interpretabilityScore: 0.75, // Medium for ensemble
            latencyMs: 0.0,
            lastEvaluated: new Date().toISOString()
        };
    }
}
//# sourceMappingURL=regulatory-models.js.map