/**
 * SFDR Navigator Agent - Performance Optimization Engine
 * Phase 2B: Advanced Performance, Caching, and Scalability
 *
 * Implements sophisticated performance optimization, intelligent caching,
 * load balancing, and horizontal scalability for enterprise-grade operations
 */
import type { SFDRClassificationRequest, SFDRClassificationResponse } from '../domain/sfdr/types.js';
import type { MultiLanguageClassificationRequest, MultiLanguageClassificationResponse } from '../ai/language/multi-language-engine.js';
/**
 * Performance metric type
 */
export type PerformanceMetricType = 'response-time' | 'throughput' | 'error-rate' | 'cpu-utilization' | 'memory-usage' | 'cache-hit-rate' | 'queue-depth' | 'concurrent-users' | 'model-inference-time' | 'data-processing-time';
/**
 * Cache strategy
 */
export type CacheStrategy = 'lru' | 'lfu' | 'ttl' | 'adaptive' | 'predictive';
/**
 * Load balancing algorithm
 */
export type LoadBalancingAlgorithm = 'round-robin' | 'weighted-round-robin' | 'least-connections' | 'least-response-time' | 'resource-based' | 'ai-optimized';
/**
 * Scaling strategy
 */
export type ScalingStrategy = 'reactive' | 'predictive' | 'scheduled' | 'hybrid';
/**
 * Performance configuration
 */
export interface PerformanceConfig {
    caching: CacheConfig;
    loadBalancing: LoadBalancingConfig;
    scaling: ScalingConfig;
    optimization: OptimizationConfig;
    monitoring: MonitoringConfig;
    alerting: AlertingConfig;
}
/**
 * Cache configuration
 */
export interface CacheConfig {
    strategy: CacheStrategy;
    maxSize: number;
    ttl: number;
    layers: CacheLayer[];
    compression: boolean;
    encryption: boolean;
    replication: ReplicationConfig;
}
/**
 * Cache layer
 */
export interface CacheLayer {
    name: string;
    type: 'memory' | 'redis' | 'distributed' | 'cdn';
    priority: number;
    maxSize: number;
    ttl: number;
    evictionPolicy: 'lru' | 'lfu' | 'fifo' | 'random';
}
/**
 * Replication configuration
 */
export interface ReplicationConfig {
    enabled: boolean;
    replicas: number;
    consistency: 'eventual' | 'strong' | 'weak';
    syncStrategy: 'async' | 'sync' | 'hybrid';
}
/**
 * Load balancing configuration
 */
export interface LoadBalancingConfig {
    algorithm: LoadBalancingAlgorithm;
    healthCheck: HealthCheckConfig;
    failover: FailoverConfig;
    sessionAffinity: boolean;
    weights: Record<string, number>;
}
/**
 * Health check configuration
 */
export interface HealthCheckConfig {
    enabled: boolean;
    interval: number;
    timeout: number;
    retries: number;
    endpoints: string[];
    criteria: HealthCriteria;
}
/**
 * Health criteria
 */
export interface HealthCriteria {
    maxResponseTime: number;
    maxErrorRate: number;
    minSuccessRate: number;
    maxCpuUsage: number;
    maxMemoryUsage: number;
}
/**
 * Failover configuration
 */
export interface FailoverConfig {
    enabled: boolean;
    strategy: 'immediate' | 'gradual' | 'circuit-breaker';
    backupNodes: string[];
    recoveryTime: number;
    maxRetries: number;
}
/**
 * Scaling configuration
 */
export interface ScalingConfig {
    strategy: ScalingStrategy;
    horizontal: HorizontalScalingConfig;
    vertical: VerticalScalingConfig;
    predictive: PredictiveScalingConfig;
}
/**
 * Horizontal scaling configuration
 */
export interface HorizontalScalingConfig {
    enabled: boolean;
    minInstances: number;
    maxInstances: number;
    targetCpuUtilization: number;
    targetMemoryUtilization: number;
    scaleUpCooldown: number;
    scaleDownCooldown: number;
    metrics: ScalingMetric[];
}
/**
 * Vertical scaling configuration
 */
export interface VerticalScalingConfig {
    enabled: boolean;
    cpuLimits: ResourceLimits;
    memoryLimits: ResourceLimits;
    autoResize: boolean;
    resizeThreshold: number;
}
/**
 * Resource limits
 */
export interface ResourceLimits {
    min: number;
    max: number;
    step: number;
    unit: string;
}
/**
 * Predictive scaling configuration
 */
export interface PredictiveScalingConfig {
    enabled: boolean;
    forecastHorizon: number;
    confidenceThreshold: number;
    models: PredictiveModel[];
    triggers: PredictiveTrigger[];
}
/**
 * Predictive model
 */
export interface PredictiveModel {
    modelId: string;
    type: 'time-series' | 'ml-regression' | 'neural-network';
    accuracy: number;
    trainingData: string;
    updateFrequency: number;
}
/**
 * Predictive trigger
 */
export interface PredictiveTrigger {
    triggerId: string;
    condition: string;
    action: 'scale-up' | 'scale-down' | 'pre-warm';
    leadTime: number;
}
/**
 * Scaling metric
 */
export interface ScalingMetric {
    name: string;
    type: PerformanceMetricType;
    threshold: number;
    operator: 'greater_than' | 'less_than' | 'equals';
    duration: number;
    weight: number;
}
/**
 * Optimization configuration
 */
export interface OptimizationConfig {
    compression: CompressionConfig;
    batching: BatchingConfig;
    prefetching: PrefetchingConfig;
    resourcePooling: ResourcePoolingConfig;
    queryOptimization: QueryOptimizationConfig;
}
/**
 * Compression configuration
 */
export interface CompressionConfig {
    enabled: boolean;
    algorithm: 'gzip' | 'brotli' | 'lz4' | 'zstd';
    level: number;
    threshold: number;
    types: string[];
}
/**
 * Batching configuration
 */
export interface BatchingConfig {
    enabled: boolean;
    maxBatchSize: number;
    maxWaitTime: number;
    dynamicSizing: boolean;
    prioritization: boolean;
}
/**
 * Prefetching configuration
 */
export interface PrefetchingConfig {
    enabled: boolean;
    strategy: 'pattern-based' | 'ml-predicted' | 'user-behavior';
    cacheSize: number;
    accuracy: number;
    updateInterval: number;
}
/**
 * Resource pooling configuration
 */
export interface ResourcePoolingConfig {
    connections: PoolConfig;
    threads: PoolConfig;
    memory: PoolConfig;
    gpu: PoolConfig;
}
/**
 * Pool configuration
 */
export interface PoolConfig {
    enabled: boolean;
    minSize: number;
    maxSize: number;
    idleTimeout: number;
    maxLifetime: number;
    validationQuery?: string;
}
/**
 * Query optimization configuration
 */
export interface QueryOptimizationConfig {
    enabled: boolean;
    indexing: IndexingConfig;
    caching: boolean;
    parallelization: boolean;
    optimization: 'cost-based' | 'rule-based' | 'adaptive';
}
/**
 * Indexing configuration
 */
export interface IndexingConfig {
    enabled: boolean;
    strategy: 'btree' | 'hash' | 'bitmap' | 'full-text';
    autoCreate: boolean;
    maintenance: boolean;
}
/**
 * Monitoring configuration
 */
export interface MonitoringConfig {
    enabled: boolean;
    interval: number;
    metrics: PerformanceMetricType[];
    retention: number;
    aggregation: AggregationConfig;
    export: ExportConfig;
}
/**
 * Aggregation configuration
 */
export interface AggregationConfig {
    enabled: boolean;
    intervals: number[];
    functions: ('avg' | 'min' | 'max' | 'sum' | 'count' | 'percentile')[];
    percentiles: number[];
}
/**
 * Export configuration
 */
export interface ExportConfig {
    enabled: boolean;
    formats: ('prometheus' | 'influxdb' | 'elasticsearch' | 'json')[];
    endpoints: string[];
    interval: number;
}
/**
 * Alerting configuration
 */
export interface AlertingConfig {
    enabled: boolean;
    rules: AlertRule[];
    channels: AlertChannel[];
    escalation: EscalationConfig;
}
/**
 * Alert rule
 */
export interface AlertRule {
    ruleId: string;
    name: string;
    metric: PerformanceMetricType;
    condition: string;
    threshold: number;
    duration: number;
    severity: 'info' | 'warning' | 'error' | 'critical';
    enabled: boolean;
}
/**
 * Alert channel
 */
export interface AlertChannel {
    channelId: string;
    type: 'email' | 'slack' | 'webhook' | 'sms';
    config: Record<string, any>;
    enabled: boolean;
}
/**
 * Escalation configuration
 */
export interface EscalationConfig {
    enabled: boolean;
    levels: EscalationLevel[];
    timeout: number;
}
/**
 * Escalation level
 */
export interface EscalationLevel {
    level: number;
    channels: string[];
    delay: number;
    condition: string;
}
/**
 * Performance metrics
 */
export interface PerformanceMetrics {
    timestamp: string;
    responseTime: number;
    throughput: number;
    errorRate: number;
    cpuUtilization: number;
    memoryUsage: number;
    cacheHitRate: number;
    queueDepth: number;
    concurrentUsers: number;
    modelInferenceTime: number;
    dataProcessingTime: number;
}
/**
 * Cache entry
 */
export interface CacheEntry<T> {
    key: string;
    value: T;
    timestamp: number;
    ttl: number;
    accessCount: number;
    lastAccessed: number;
    size: number;
    metadata: CacheMetadata;
}
/**
 * Cache metadata
 */
export interface CacheMetadata {
    tags: string[];
    priority: number;
    compressed: boolean;
    encrypted: boolean;
    source: string;
    dependencies: string[];
}
/**
 * Load balancer node
 */
export interface LoadBalancerNode {
    nodeId: string;
    endpoint: string;
    weight: number;
    status: 'healthy' | 'unhealthy' | 'draining';
    currentConnections: number;
    responseTime: number;
    errorRate: number;
    lastHealthCheck: string;
    metadata: NodeMetadata;
}
/**
 * Node metadata
 */
export interface NodeMetadata {
    region: string;
    zone: string;
    capacity: number;
    version: string;
    capabilities: string[];
}
/**
 * Performance optimization result
 */
export interface OptimizationResult {
    optimizationId: string;
    timestamp: string;
    type: 'cache' | 'load-balancing' | 'scaling' | 'query' | 'resource';
    before: PerformanceMetrics;
    after: PerformanceMetrics;
    improvement: number;
    recommendations: string[];
    nextOptimization: string;
}
/**
 * Main performance optimization engine
 */
export declare class PerformanceOptimizationEngine {
    private config;
    private readonly cacheManager;
    private readonly loadBalancer;
    private readonly scalingManager;
    private readonly optimizationEngine;
    private readonly monitoringSystem;
    private readonly alertManager;
    private readonly resourceManager;
    private readonly compressionEngine;
    constructor(config: PerformanceConfig);
    /**
     * Process SFDR classification with performance optimization
     */
    processClassificationOptimized(request: SFDRClassificationRequest): Promise<SFDRClassificationResponse>;
    /**
     * Process multi-language classification with optimization
     */
    processMultiLanguageOptimized(request: MultiLanguageClassificationRequest): Promise<MultiLanguageClassificationResponse>;
    /**
     * Optimize system performance
     */
    optimizePerformance(): Promise<OptimizationResult[]>;
    /**
     * Get performance metrics
     */
    getPerformanceMetrics(timeRange?: {
        start: string;
        end: string;
    }): Promise<PerformanceMetrics[]>;
    /**
     * Get cache statistics
     */
    getCacheStatistics(): Promise<any>;
    /**
     * Get load balancer status
     */
    getLoadBalancerStatus(): Promise<LoadBalancerNode[]>;
    /**
     * Update performance configuration
     */
    updateConfiguration(newConfig: Partial<PerformanceConfig>): Promise<void>;
    private generateCacheKey;
    private hashObject;
    private calculateCacheTTL;
    private assessComplexity;
    private processWithOptimization;
    private checkMultiLanguageCache;
    private processMultiLanguageWithPartialCache;
    private cacheMultiLanguageResults;
    private recordMetrics;
    private handleError;
    private optimizeCache;
    private optimizeLoadBalancing;
    private optimizeScaling;
    private optimizeQueries;
    private optimizeResources;
}
/**
 * Intelligent cache management
 */
export declare class IntelligentCacheManager {
    private config;
    private cache;
    private stats;
    constructor(config: CacheConfig);
    get<T>(key: string): Promise<T | null>;
    set<T>(key: string, value: T, ttl?: number): Promise<void>;
    optimize(): Promise<void>;
    getStatistics(): Promise<any>;
    updateConfig(config: CacheConfig): Promise<void>;
    private calculateSize;
    private needsEviction;
    private evict;
    private evictExpired;
    private optimizeStrategy;
    private compactCache;
}
/**
 * Adaptive load balancer
 */
export declare class AdaptiveLoadBalancer {
    private config;
    private nodes;
    private currentIndex;
    constructor(config: LoadBalancingConfig);
    selectNode(request: any): Promise<LoadBalancerNode>;
    getNodes(): Promise<LoadBalancerNode[]>;
    optimize(): Promise<void>;
    updateConfig(config: LoadBalancingConfig): Promise<void>;
    private initializeNodes;
    private roundRobin;
    private leastConnections;
    private leastResponseTime;
    private resourceBased;
    private aiOptimized;
    private updateNodeWeights;
    private calculatePerformanceScore;
    private adjustAlgorithm;
}
/**
 * Auto scaling manager
 */
export declare class AutoScalingManager {
    private config;
    constructor(config: ScalingConfig);
    optimize(): Promise<void>;
    updateConfig(config: ScalingConfig): Promise<void>;
    private optimizeHorizontalScaling;
    private optimizeVerticalScaling;
    private optimizePredictiveScaling;
}
/**
 * Query optimization engine
 */
export declare class QueryOptimizationEngine {
    private config;
    constructor(config: QueryOptimizationConfig);
    optimize(): Promise<void>;
    private optimizeIndexes;
    private optimizeQueryPlans;
    private optimizeParallelization;
}
/**
 * Performance monitoring system
 */
export declare class PerformanceMonitoringSystem {
    private config;
    private metrics;
    constructor(config: MonitoringConfig);
    recordMetrics(metrics: PerformanceMetrics): Promise<void>;
    getCurrentMetrics(): Promise<PerformanceMetrics>;
    getMetrics(timeRange?: {
        start: string;
        end: string;
    }): Promise<PerformanceMetrics[]>;
    updateConfig(config: MonitoringConfig): Promise<void>;
    private getDefaultMetrics;
}
/**
 * Performance alert manager
 */
export declare class PerformanceAlertManager {
    private config;
    constructor(config: AlertingConfig);
    triggerAlert(alert: any): Promise<void>;
    private sendToChannel;
}
/**
 * Resource pool manager
 */
export declare class ResourcePoolManager {
    private config;
    constructor(config: ResourcePoolingConfig);
    optimize(): Promise<void>;
    private optimizeConnectionPools;
    private optimizeThreadPools;
    private optimizeMemoryPools;
}
/**
 * Compression engine
 */
export declare class CompressionEngine {
    private config;
    constructor(config: CompressionConfig);
    compress(data: any): Promise<Buffer>;
    decompress(data: Buffer): Promise<any>;
}
//# sourceMappingURL=optimization-engine.d.ts.map