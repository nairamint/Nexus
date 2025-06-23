/**
 * SFDR Navigator Agent - AI Engine Types
 * Phase 2A: Type definitions for the AI Classification Engine
 *
 * Comprehensive type system for AI-powered SFDR classification
 */
/**
 * Classification metrics class implementation
 */
export class ClassificationMetrics {
    /** Performance metrics */
    totalClassifications = 0;
    successfulClassifications = 0;
    averageProcessingTime = 0;
    averageConfidence = 0;
    errorCount = 0;
    /** Quality metrics */
    accuracyRate;
    precisionRate;
    recallRate;
    f1Score;
    /** Operational metrics */
    throughput;
    latency;
    resourceUtilization;
    /** Business metrics */
    automationRate;
    humanReviewRate = 0;
    expertConsultationRate;
    escalationRate;
    /** Time-based metrics */
    hourlyVolume;
    dailyVolume;
    weeklyTrends;
    monthlyTrends;
    // Additional metrics for SFDR classification
    article6Count = 0;
    article8Count = 0;
    article9Count = 0;
    successRate = 0;
    validationSuccessRate = 0;
}
//# sourceMappingURL=types.js.map