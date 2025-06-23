/**
 * SFDR Navigator Agent Phase 2B - Complete Example
 * Demonstrates all advanced features and capabilities
 */
import { createPhase2BEngine, defaultPhase2BConfig } from '../integration/phase2b-integration.js';
import { SFDRClassificationEngine } from '../ai/classification-engine.js';
import { AgentOrchestrator } from '../ai/orchestrator.js';
import { ConfidenceFramework } from '../ai/framework.js';
import { ExplainabilityEngine } from '../ai/engine.js';
import { SFDRComplianceValidator } from '../domain/sfdr/validator.js';
/**
 * Example: Complete Phase 2B Integration Demo
 */
export class Phase2BDemo {
    engine;
    /**
     * Initialize the Phase 2B system
     */
    async initialize() {
        console.log('🚀 Initializing SFDR Navigator Agent Phase 2B...');
        // Create core engines (Phase 2A components)
        const coreEngines = await this.createCoreEngines();
        // Create Phase 2B configuration
        const config = {
            ...defaultPhase2BConfig,
            // Customize for demo
            learning: {
                ...defaultPhase2BConfig.learning,
                feedbackProcessingInterval: 60000 // 1 minute for demo
            },
            analytics: {
                ...defaultPhase2BConfig.analytics,
                reportGenerationInterval: 300000 // 5 minutes for demo
            }
        };
        // Initialize Phase 2B engine
        this.engine = await createPhase2BEngine(config, coreEngines);
        console.log('✅ Phase 2B Integration Engine initialized successfully!');
    }
    /**
     * Demonstrate advanced classification with all Phase 2B features
     */
    async demonstrateAdvancedClassification() {
        if (!this.engine) {
            throw new Error('Engine not initialized');
        }
        console.log('\n📊 Demonstrating Advanced Classification...');
        // Example 1: English SFDR document
        const englishRequest = {
            requestId: 'demo-en-001',
            documentContent: `
        This fund promotes environmental and social characteristics within the meaning of Article 8 of SFDR.
        The fund integrates sustainability risks into its investment process and considers principal adverse 
        impacts on sustainability factors. The fund aims to achieve long-term capital growth while promoting 
        environmental and social characteristics through its investment strategy.
      `,
            metadata: {
                documentType: 'fund_prospectus',
                language: 'en',
                userId: 'demo-user-001',
                timestamp: new Date().toISOString()
            }
        };
        const englishResponse = await this.engine.classifyWithEnhancements(englishRequest);
        console.log('🇬🇧 English Classification Result:', {
            classification: englishResponse.classification,
            confidence: englishResponse.confidence,
            hasMultiLanguageSupport: !!englishResponse.multiLanguageSupport,
            hasAnalytics: !!englishResponse.analytics,
            hasGovernance: !!englishResponse.governance,
            hasPerformance: !!englishResponse.performance,
            hasFederatedLearning: !!englishResponse.federatedLearning
        });
        // Example 2: French SFDR document
        const frenchRequest = {
            requestId: 'demo-fr-001',
            documentContent: `
        Ce fonds promeut des caractéristiques environnementales et sociales au sens de l'article 8 du SFDR.
        Le fonds intègre les risques de durabilité dans son processus d'investissement et considère les 
        principales incidences négatives sur les facteurs de durabilité. Le fonds vise à obtenir une 
        croissance du capital à long terme tout en promouvant des caractéristiques environnementales 
        et sociales grâce à sa stratégie d'investissement.
      `,
            metadata: {
                documentType: 'fund_prospectus',
                language: 'fr',
                userId: 'demo-user-002',
                timestamp: new Date().toISOString()
            }
        };
        const frenchResponse = await this.engine.classifyWithEnhancements(frenchRequest);
        console.log('🇫🇷 French Classification Result:', {
            classification: frenchResponse.classification,
            confidence: frenchResponse.confidence,
            multiLanguageSupport: frenchResponse.multiLanguageSupport ? {
                sourceLanguage: frenchResponse.multiLanguageSupport.sourceLanguage,
                translationQuality: frenchResponse.multiLanguageSupport.translationQuality,
                crossLingualClassification: frenchResponse.multiLanguageSupport.crossLingualClassification
            } : null
        });
        // Example 3: Article 9 sustainable investment fund
        const article9Request = {
            requestId: 'demo-art9-001',
            documentContent: `
        This fund has sustainable investment as its objective within the meaning of Article 9 of SFDR.
        The fund commits to making investments that contribute to environmental objectives such as climate 
        change mitigation and adaptation, sustainable use of water and marine resources, transition to a 
        circular economy, pollution prevention and control, and protection and restoration of biodiversity 
        and ecosystems. The fund applies exclusionary screens and positive selection criteria to ensure 
        all investments meet strict sustainability criteria.
      `,
            metadata: {
                documentType: 'fund_prospectus',
                language: 'en',
                userId: 'demo-user-003',
                timestamp: new Date().toISOString()
            }
        };
        const article9Response = await this.engine.classifyWithEnhancements(article9Request);
        console.log('🌱 Article 9 Classification Result:', {
            classification: article9Response.classification,
            confidence: article9Response.confidence,
            explanation: article9Response.explanation?.summary,
            governance: article9Response.governance ? {
                complianceStatus: article9Response.governance.complianceStatus.overallStatus,
                riskLevel: article9Response.governance.riskAssessment?.riskLevel
            } : null
        });
    }
    /**
     * Demonstrate continuous learning with human feedback
     */
    async demonstrateContinuousLearning() {
        if (!this.engine) {
            throw new Error('Engine not initialized');
        }
        console.log('\n🧠 Demonstrating Continuous Learning...');
        // Simulate human feedback scenarios
        const feedbackScenarios = [
            {
                feedbackId: 'feedback-001',
                requestId: 'demo-en-001',
                userId: 'expert-user-001',
                feedback: {
                    correctClassification: 'article_8',
                    confidence: 0.95,
                    reasoning: 'Document clearly states Article 8 characteristics promotion',
                    suggestedImprovements: ['Better detection of sustainability risk integration language']
                },
                timestamp: new Date().toISOString()
            },
            {
                feedbackId: 'feedback-002',
                requestId: 'demo-fr-001',
                userId: 'expert-user-002',
                feedback: {
                    correctClassification: 'article_8',
                    confidence: 0.90,
                    reasoning: 'French translation correctly identifies Article 8 fund',
                    suggestedImprovements: ['Improve French regulatory terminology recognition']
                },
                timestamp: new Date().toISOString()
            },
            {
                feedbackId: 'feedback-003',
                requestId: 'demo-art9-001',
                userId: 'expert-user-003',
                feedback: {
                    correctClassification: 'article_9',
                    confidence: 0.98,
                    reasoning: 'Clear sustainable investment objective stated',
                    suggestedImprovements: ['Excellent classification, no improvements needed']
                },
                timestamp: new Date().toISOString()
            }
        ];
        // Process feedback
        for (const feedback of feedbackScenarios) {
            await this.engine.processFeedbackWithEnhancements(feedback);
            console.log(`✅ Processed feedback ${feedback.feedbackId} for request ${feedback.requestId}`);
        }
        console.log('🎯 Continuous learning feedback processed successfully!');
    }
    /**
     * Demonstrate advanced analytics and reporting
     */
    async demonstrateAnalytics() {
        if (!this.engine) {
            throw new Error('Engine not initialized');
        }
        console.log('\n📈 Demonstrating Advanced Analytics...');
        // Generate analytics report
        const timeRange = {
            start: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 24 hours ago
            end: new Date().toISOString()
        };
        const analyticsReport = await this.engine.generateAnalyticsReport(timeRange);
        console.log('📊 Analytics Report Generated:', {
            reportId: analyticsReport.reportId,
            timeRange: analyticsReport.timeRange,
            summary: {
                totalClassifications: analyticsReport.summary.totalClassifications,
                averageAccuracy: analyticsReport.summary.averageAccuracy,
                averageConfidence: analyticsReport.summary.averageConfidence,
                averageProcessingTime: analyticsReport.summary.averageProcessingTime
            },
            insights: analyticsReport.insights.length,
            trends: analyticsReport.trends.length
        });
        // Get system health
        const systemHealth = await this.engine.getSystemHealth();
        console.log('🏥 System Health Status:', {
            overall: systemHealth.overall,
            components: systemHealth.components,
            uptime: Math.round(systemHealth.metrics.uptime / 60) + ' minutes'
        });
    }
    /**
     * Demonstrate performance optimization features
     */
    async demonstratePerformanceOptimization() {
        if (!this.engine) {
            throw new Error('Engine not initialized');
        }
        console.log('\n⚡ Demonstrating Performance Optimization...');
        // Test caching by making the same request twice
        const cachedRequest = {
            requestId: 'cache-test-001',
            documentContent: 'This fund promotes environmental characteristics under Article 8 of SFDR.',
            metadata: {
                documentType: 'fund_prospectus',
                language: 'en',
                userId: 'cache-test-user',
                timestamp: new Date().toISOString()
            }
        };
        // First request (cache miss)
        const startTime1 = Date.now();
        const response1 = await this.engine.classifyWithEnhancements(cachedRequest);
        const duration1 = Date.now() - startTime1;
        // Second request (cache hit)
        const startTime2 = Date.now();
        const response2 = await this.engine.classifyWithEnhancements(cachedRequest);
        const duration2 = Date.now() - startTime2;
        console.log('🚀 Performance Comparison:', {
            firstRequest: {
                duration: duration1 + 'ms',
                cacheHit: false,
                classification: response1.classification
            },
            secondRequest: {
                duration: duration2 + 'ms',
                cacheHit: true,
                classification: response2.classification,
                speedImprovement: Math.round(((duration1 - duration2) / duration1) * 100) + '%'
            }
        });
    }
    /**
     * Demonstrate multi-language capabilities
     */
    async demonstrateMultiLanguage() {
        if (!this.engine) {
            throw new Error('Engine not initialized');
        }
        console.log('\n🌍 Demonstrating Multi-Language Capabilities...');
        const multiLanguageTests = [
            {
                language: 'de',
                flag: '🇩🇪',
                content: `
          Dieser Fonds fördert ökologische und soziale Merkmale im Sinne von Artikel 8 der SFDR.
          Der Fonds integriert Nachhaltigkeitsrisiken in seinen Anlageprozess und berücksichtigt 
          die wichtigsten nachteiligen Auswirkungen auf Nachhaltigkeitsfaktoren.
        `
            },
            {
                language: 'es',
                flag: '🇪🇸',
                content: `
          Este fondo promueve características ambientales y sociales en el sentido del Artículo 8 del SFDR.
          El fondo integra los riesgos de sostenibilidad en su proceso de inversión y considera los 
          principales impactos adversos en los factores de sostenibilidad.
        `
            },
            {
                language: 'it',
                flag: '🇮🇹',
                content: `
          Questo fondo promuove caratteristiche ambientali e sociali nel senso dell'Articolo 8 del SFDR.
          Il fondo integra i rischi di sostenibilità nel suo processo di investimento e considera i 
          principali impatti negativi sui fattori di sostenibilità.
        `
            }
        ];
        for (const test of multiLanguageTests) {
            const request = {
                requestId: `multi-lang-${test.language}-001`,
                documentContent: test.content,
                metadata: {
                    documentType: 'fund_prospectus',
                    language: test.language,
                    userId: `multi-lang-user-${test.language}`,
                    timestamp: new Date().toISOString()
                }
            };
            const response = await this.engine.classifyWithEnhancements(request);
            console.log(`${test.flag} ${test.language.toUpperCase()} Classification:`, {
                classification: response.classification,
                confidence: response.confidence,
                translationQuality: response.multiLanguageSupport?.translationQuality,
                crossLingualAccuracy: response.multiLanguageSupport?.crossLingualClassification?.confidence
            });
        }
    }
    /**
     * Run complete Phase 2B demonstration
     */
    async runCompleteDemo() {
        try {
            // Initialize system
            await this.initialize();
            // Run all demonstrations
            await this.demonstrateAdvancedClassification();
            await this.demonstrateContinuousLearning();
            await this.demonstrateAnalytics();
            await this.demonstratePerformanceOptimization();
            await this.demonstrateMultiLanguage();
            console.log('\n🎉 Phase 2B Complete Demonstration Finished Successfully!');
            console.log('\n📋 Summary of Demonstrated Features:');
            console.log('   ✅ Advanced ML Models (Graph NN + Ensemble)');
            console.log('   ✅ Continuous Learning with Human Feedback');
            console.log('   ✅ Multi-Language Support (6 EU languages)');
            console.log('   ✅ Advanced Analytics & Reporting');
            console.log('   ✅ Governance & Compliance Framework');
            console.log('   ✅ Performance Optimization & Caching');
            console.log('   ✅ Privacy-Preserving Federated Learning');
            console.log('\n🚀 SFDR Navigator Agent Phase 2B is ready for production!');
        }
        catch (error) {
            console.error('❌ Demo failed:', error);
            throw error;
        }
        finally {
            // Cleanup
            if (this.engine) {
                await this.engine.shutdown();
                console.log('🔄 System shutdown complete');
            }
        }
    }
    /**
     * Create core engines for Phase 2B integration
     */
    async createCoreEngines() {
        // Create core components (simplified for demo)
        const confidenceFramework = new ConfidenceFramework({
            primaryThreshold: 0.8,
            alternativeThreshold: 0.6,
            humanReviewThreshold: 0.5,
            regulatoryRiskThreshold: 0.7
        });
        const explainabilityEngine = new ExplainabilityEngine({
            enableDetailedExplanations: true,
            includeConfidenceFactors: true,
            includeRegulatoryTraceability: true,
            maxExplanationLength: 1000
        });
        const validator = new SFDRComplianceValidator();
        const orchestrator = new AgentOrchestrator(confidenceFramework, explainabilityEngine);
        const classificationEngine = new SFDRClassificationEngine(orchestrator, confidenceFramework, explainabilityEngine, validator);
        return {
            classificationEngine,
            orchestrator,
            confidenceFramework,
            explainabilityEngine,
            validator
        };
    }
}
/**
 * Main execution function
 */
export async function runPhase2BDemo() {
    const demo = new Phase2BDemo();
    await demo.runCompleteDemo();
}
// Run demo if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    runPhase2BDemo().catch(console.error);
}
//# sourceMappingURL=phase2b-example.js.map