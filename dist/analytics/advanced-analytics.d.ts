/**
 * SFDR Navigator Agent - Advanced Analytics Engine
 * Phase 2B: Advanced Analytics and Reporting
 *
 * Implements sophisticated analytics, predictive insights, real-time dashboards,
 * and comprehensive reporting for regulatory compliance intelligence
 */
import type { SFDRClassificationRequest, SFDRClassificationResponse } from '../domain/sfdr/types.js';
import type { HumanFeedback } from '../ai/learning/continuous-learning.js';
import type { MultiLanguageClassificationResponse } from '../ai/language/multi-language-engine.js';
/**
 * Analytics time period
 */
export type AnalyticsPeriod = 'real-time' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly' | 'custom';
/**
 * Analytics metric type
 */
export type MetricType = 'classification-accuracy' | 'processing-volume' | 'confidence-distribution' | 'regulatory-coverage' | 'user-satisfaction' | 'model-performance' | 'compliance-trends' | 'risk-indicators' | 'operational-efficiency' | 'predictive-insights';
/**
 * Analytics dashboard configuration
 */
export interface DashboardConfig {
    dashboardId: string;
    name: string;
    description: string;
    userRole: 'compliance-officer' | 'risk-manager' | 'fund-manager' | 'regulatory-expert' | 'executive';
    widgets: AnalyticsWidget[];
    refreshInterval: number;
    alertThresholds: AlertThreshold[];
    customFilters: DashboardFilter[];
}
/**
 * Analytics widget
 */
export interface AnalyticsWidget {
    widgetId: string;
    type: 'chart' | 'metric' | 'table' | 'heatmap' | 'gauge' | 'trend' | 'alert';
    title: string;
    description: string;
    dataSource: string;
    visualization: VisualizationConfig;
    position: WidgetPosition;
    size: WidgetSize;
    refreshRate: number;
}
/**
 * Visualization configuration
 */
export interface VisualizationConfig {
    chartType: 'line' | 'bar' | 'pie' | 'scatter' | 'heatmap' | 'gauge' | 'table';
    xAxis?: AxisConfig;
    yAxis?: AxisConfig;
    colorScheme: string[];
    aggregation: 'sum' | 'avg' | 'count' | 'min' | 'max' | 'median';
    timeGranularity?: AnalyticsPeriod;
}
/**
 * Widget positioning
 */
export interface WidgetPosition {
    x: number;
    y: number;
    z: number;
}
/**
 * Widget sizing
 */
export interface WidgetSize {
    width: number;
    height: number;
    minWidth?: number;
    minHeight?: number;
}
/**
 * Axis configuration
 */
export interface AxisConfig {
    label: string;
    scale: 'linear' | 'logarithmic' | 'time';
    min?: number;
    max?: number;
    format: string;
}
/**
 * Alert threshold
 */
export interface AlertThreshold {
    thresholdId: string;
    metric: MetricType;
    condition: 'greater_than' | 'less_than' | 'equals' | 'not_equals' | 'between';
    value: number | number[];
    severity: 'info' | 'warning' | 'error' | 'critical';
    notification: NotificationConfig;
}
/**
 * Notification configuration
 */
export interface NotificationConfig {
    channels: ('email' | 'slack' | 'teams' | 'webhook')[];
    recipients: string[];
    template: string;
    cooldownPeriod: number;
}
/**
 * Dashboard filter
 */
export interface DashboardFilter {
    filterId: string;
    name: string;
    type: 'date-range' | 'dropdown' | 'multi-select' | 'text' | 'numeric-range';
    field: string;
    defaultValue?: any;
    options?: FilterOption[];
}
/**
 * Filter option
 */
export interface FilterOption {
    label: string;
    value: any;
    description?: string;
}
/**
 * Analytics data point
 */
export interface AnalyticsDataPoint {
    timestamp: string;
    metric: MetricType;
    value: number;
    dimensions: Record<string, any>;
    metadata?: Record<string, any>;
}
/**
 * Analytics report
 */
export interface AnalyticsReport {
    reportId: string;
    title: string;
    description: string;
    generatedAt: string;
    period: AnalyticsPeriod;
    startDate: string;
    endDate: string;
    sections: ReportSection[];
    summary: ReportSummary;
    recommendations: string[];
    exportFormats: ('pdf' | 'excel' | 'csv' | 'json')[];
}
/**
 * Report section
 */
export interface ReportSection {
    sectionId: string;
    title: string;
    type: 'metrics' | 'charts' | 'tables' | 'insights' | 'recommendations';
    content: any;
    insights: string[];
}
/**
 * Report summary
 */
export interface ReportSummary {
    keyMetrics: Record<string, number>;
    trends: TrendAnalysis[];
    alerts: AlertSummary[];
    performanceScore: number;
    complianceScore: number;
}
/**
 * Trend analysis
 */
export interface TrendAnalysis {
    metric: MetricType;
    direction: 'increasing' | 'decreasing' | 'stable' | 'volatile';
    magnitude: number;
    significance: 'low' | 'medium' | 'high';
    description: string;
}
/**
 * Alert summary
 */
export interface AlertSummary {
    severity: 'info' | 'warning' | 'error' | 'critical';
    count: number;
    description: string;
}
/**
 * Predictive insight
 */
export interface PredictiveInsight {
    insightId: string;
    type: 'trend-forecast' | 'anomaly-prediction' | 'risk-assessment' | 'opportunity-identification';
    title: string;
    description: string;
    confidence: number;
    timeHorizon: string;
    impact: 'low' | 'medium' | 'high';
    recommendations: string[];
    dataPoints: AnalyticsDataPoint[];
}
/**
 * Real-time analytics event
 */
export interface RealTimeEvent {
    eventId: string;
    timestamp: string;
    type: 'classification' | 'feedback' | 'alert' | 'system' | 'user-action';
    source: string;
    data: any;
    severity?: 'info' | 'warning' | 'error' | 'critical';
}
/**
 * Main advanced analytics engine
 */
export declare class AdvancedAnalyticsEngine {
    private readonly dataCollector;
    private readonly metricsCalculator;
    private readonly dashboardManager;
    private readonly reportGenerator;
    private readonly predictiveAnalyzer;
    private readonly realTimeProcessor;
    private readonly alertManager;
    private readonly trendAnalyzer;
    constructor();
    /**
     * Process classification event for analytics
     */
    processClassificationEvent(request: SFDRClassificationRequest, response: SFDRClassificationResponse | MultiLanguageClassificationResponse, processingTime: number): Promise<void>;
    /**
     * Process feedback event for analytics
     */
    processFeedbackEvent(feedback: HumanFeedback, originalRequest: SFDRClassificationRequest, originalResponse: SFDRClassificationResponse): Promise<void>;
    /**
     * Generate real-time dashboard data
     */
    generateDashboardData(dashboardId: string, filters?: Record<string, any>): Promise<DashboardData>;
    /**
     * Generate comprehensive analytics report
     */
    generateReport(reportType: string, period: AnalyticsPeriod, startDate: string, endDate: string, filters?: Record<string, any>): Promise<AnalyticsReport>;
    /**
     * Generate predictive insights
     */
    generatePredictiveInsights(timeHorizon: string, metrics: MetricType[]): Promise<PredictiveInsight[]>;
    /**
     * Get real-time metrics
     */
    getRealTimeMetrics(): Promise<Record<MetricType, number>>;
    /**
     * Create custom dashboard
     */
    createDashboard(config: DashboardConfig): Promise<string>;
    /**
     * Update alert thresholds
     */
    updateAlertThresholds(thresholds: AlertThreshold[]): Promise<void>;
    private storeDataPoints;
    private generateWidgetData;
    private generateMetricData;
    private generateChartData;
    private generateTableData;
    private generateHeatmapData;
    private generateGaugeData;
    private generateTrendData;
    private generateAlertData;
    private generateDashboardSummary;
    private generateReportSummary;
    private generateRecommendations;
}
/**
 * Analytics data collection
 */
export declare class AnalyticsDataCollector {
    collectClassificationData(request: SFDRClassificationRequest, response: SFDRClassificationResponse | MultiLanguageClassificationResponse, processingTime: number): Promise<AnalyticsDataPoint[]>;
    collectFeedbackData(feedback: HumanFeedback, originalRequest: SFDRClassificationRequest, originalResponse: SFDRClassificationResponse): Promise<AnalyticsDataPoint[]>;
    private assessComplexity;
}
/**
 * Metrics calculation engine
 */
export declare class MetricsCalculator {
    calculateRealTimeMetrics(): Promise<Record<MetricType, number>>;
    calculatePeriodMetrics(period: AnalyticsPeriod, startDate: string, endDate: string, filters?: Record<string, any>): Promise<Record<string, number>>;
}
/**
 * Dashboard management
 */
export declare class DashboardManager {
    private dashboards;
    createDashboard(config: DashboardConfig): Promise<string>;
    getDashboardConfig(dashboardId: string): Promise<DashboardConfig | undefined>;
}
/**
 * Report generation
 */
export declare class ReportGenerator {
    generateSections(reportType: string, period: AnalyticsPeriod, startDate: string, endDate: string, filters?: Record<string, any>): Promise<ReportSection[]>;
}
/**
 * Predictive analysis
 */
export declare class PredictiveAnalyzer {
    generateInsight(metric: MetricType, timeHorizon: string): Promise<PredictiveInsight | null>;
}
/**
 * Real-time event processing
 */
export declare class RealTimeProcessor {
    processEvent(event: RealTimeEvent): Promise<void>;
}
/**
 * Alert management
 */
export declare class AlertManager {
    private thresholds;
    private activeAlerts;
    checkThresholds(dataPoints: AnalyticsDataPoint[]): Promise<void>;
    updateThresholds(thresholds: AlertThreshold[]): Promise<void>;
    getActiveAlerts(): Promise<any[]>;
    getAlertSummary(startDate: string, endDate: string): Promise<AlertSummary[]>;
    private evaluateThreshold;
    private triggerAlert;
    private sendNotifications;
}
/**
 * Trend analysis
 */
export declare class TrendAnalyzer {
    analyzeTrends(period: AnalyticsPeriod, startDate: string, endDate: string): Promise<TrendAnalysis[]>;
}
interface DashboardData {
    dashboardId: string;
    generatedAt: string;
    widgets: Record<string, any>;
    alerts: any[];
    summary: any;
}
export {};
//# sourceMappingURL=advanced-analytics.d.ts.map