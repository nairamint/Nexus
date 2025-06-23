/**
 * SFDR Navigator Agent - AI Classification Engine Demo
 * Phase 2A: Interactive demonstration of the AI Classification Engine
 * 
 * Showcases the capabilities of the AI-powered SFDR classification system
 */

import {
  createSFDRClassificationEngine,
  createProductionSFDREngine,
  createDevelopmentSFDREngine,
  createTestingSFDREngine,
  createSampleSFDRRequest,
  getEngineVersion
} from '../src/ai/engine/index.js';
import type {
  SFDRClassificationRequest,
  SFDRClassificationResponse
} from '../src/ai/engine/types.js';

// ============================================================================
// DEMO CONFIGURATION
// ============================================================================

const DEMO_CONFIG = {
  showDetailedOutput: true,
  runPerformanceTest: true,
  testBatchProcessing: true,
  demonstrateAllArticles: true,
  showHealthCheck: true
};

// ============================================================================
// DEMO SCENARIOS
// ============================================================================

/**
 * Create demo scenarios for different SFDR article classifications
 */
function createDemoScenarios(): Record<string, SFDRClassificationRequest> {
  const baseRequest = createSampleSFDRRequest();

  return {
    article6: {
      ...baseRequest,
      metadata: {
        ...baseRequest.metadata,
        source: 'demo-article-6'
      },
      fundProfile: {
        ...baseRequest.fundProfile,
        fundName: 'Traditional Equity Fund',
        investmentStrategy: 'Broad market exposure with minimal ESG considerations'
      },
      esgIntegration: {
        integrationLevel: 'MINIMAL',
        sustainabilityRiskIntegration: true,
        paiConsideration: false,
        paiIndicators: []
      },
      sustainabilityObjectives: undefined
    },

    article8: {
      ...baseRequest,
      metadata: {
        ...baseRequest.metadata,
        source: 'demo-article-8'
      },
      fundProfile: {
        ...baseRequest.fundProfile,
        fundName: 'ESG Integrated Growth Fund',
        investmentStrategy: 'Growth investing with environmental and social characteristics'
      },
      esgIntegration: {
        integrationLevel: 'COMPREHENSIVE',
        esgCriteria: ['Environmental', 'Social'],
        sustainabilityRiskIntegration: true,
        paiConsideration: true,
        paiIndicators: ['GHG_EMISSIONS', 'CARBON_FOOTPRINT', 'BIODIVERSITY']
      },
      sustainabilityObjectives: {
        hasEnvironmentalObjectives: true,
        hasSocialObjectives: true,
        environmentalObjectives: ['Climate change mitigation', 'Resource efficiency'],
        socialObjectives: ['Social equality'],
        sustainableInvestmentPercentage: 40
      }
    },

    article9: {
      ...baseRequest,
      metadata: {
        ...baseRequest.metadata,
        source: 'demo-article-9'
      },
      fundProfile: {
        ...baseRequest.fundProfile,
        fundName: 'Climate Solutions Impact Fund',
        investmentStrategy: 'Dedicated sustainable investment with measurable environmental impact'
      },
      esgIntegration: {
        integrationLevel: 'COMPREHENSIVE',
        esgCriteria: ['Environmental', 'Social', 'Governance'],
        sustainabilityRiskIntegration: true,
        paiConsideration: true,
        paiIndicators: [
          'GHG_EMISSIONS',
          'CARBON_FOOTPRINT',
          'BIODIVERSITY',
          'WATER_EMISSIONS',
          'HAZARDOUS_WASTE',
          'ENERGY_CONSUMPTION'
        ]
      },
      sustainabilityObjectives: {
        hasEnvironmentalObjectives: true,
        hasSocialObjectives: true,
        environmentalObjectives: [
          'Climate change mitigation',
          'Climate change adaptation',
          'Sustainable use of water',
          'Transition to circular economy',
          'Pollution prevention',
          'Biodiversity protection'
        ],
        socialObjectives: [
          'Human rights',
          'Labor standards',
          'Social equality',
          'Community relations'
        ],
        sustainableInvestmentPercentage: 95,
        taxonomyAlignmentPercentage: 80,
        taxonomyEnvironmentalObjectives: [
          'CLIMATE_CHANGE_MITIGATION',
          'CLIMATE_CHANGE_ADAPTATION',
          'WATER_PROTECTION',
          'CIRCULAR_ECONOMY',
          'POLLUTION_PREVENTION',
          'BIODIVERSITY'
        ]
      }
    },
    
    edgeCase: {
      ...baseRequest,
      metadata: {
        ...baseRequest.metadata,
        source: 'demo-edge-case'
      },
      fundProfile: {
        ...baseRequest.fundProfile,
        fundName: 'Ambiguous Strategy Fund',
        investmentStrategy: 'Mixed approach with some ESG elements but no clear sustainability focus'
      },
      esgIntegration: {
        integrationLevel: 'PARTIAL',
        esgCriteria: ['Governance'],
        sustainabilityRiskIntegration: true,
        paiConsideration: true,
        paiIndicators: ['GHG_EMISSIONS']
      },
      sustainabilityObjectives: {
        hasEnvironmentalObjectives: false,
        hasSocialObjectives: true,
        environmentalObjectives: [],
        socialObjectives: ['Social equality'],
        sustainableInvestmentPercentage: 15
      }
    }
  };
}

// ============================================================================
// DISPLAY FUNCTIONS
// ============================================================================

/**
 * Display engine information
 */
function displayEngineInfo(): void {
  console.log('\n' + '='.repeat(80));
  console.log('🚀 SFDR Navigator Agent - AI Classification Engine Demo');
  console.log('='.repeat(80));
  
  const engineInfo = getEngineVersion();
  
  console.log(`\n📋 Engine Information:`);
  console.log(`   Version: ${engineInfo.version}`);
  console.log(`   Build Date: ${engineInfo.buildDate}`);
  console.log(`\n🔧 Features:`);
  engineInfo.features.forEach(feature => {
    console.log(`   ✓ ${feature}`);
  });
}

/**
 * Display classification results
 */
function displayClassificationResults(
  scenario: string,
  request: SFDRClassificationRequest,
  response: SFDRClassificationResponse,
  showDetails: boolean = false
): void {
  console.log('\n' + '='.repeat(80));
  console.log(`📊 Classification Results: ${scenario}`);
  console.log('='.repeat(80));
  
  console.log(`\n🏷️  Fund: ${request.fundProfile.fundName}`);
  console.log(`   Strategy: ${request.fundProfile.investmentStrategy}`);
  
  // Display classification result
  const classificationColor = 
    response.classification === 'Article9' ? '\x1b[32m' : 
    response.classification === 'Article8' ? '\x1b[33m' : '\x1b[90m';
  
  console.log(`\n📝 Classification: ${classificationColor}${response.classification}\x1b[0m`);
  console.log(`   Confidence: ${(response.confidence * 100).toFixed(2)}%`);
  console.log(`   Processing Time: ${response.processingTime}ms`);
  
  // Display reasoning
  console.log(`\n🧠 Reasoning:`);
  response.reasoning.forEach((reason, index) => {
    console.log(`   ${index + 1}. ${reason}`);
  });
  
  // Display validation results
  if (response.validationResult) {
    const validationStatus = response.validationResult.isValid ? 
      '\x1b[32m✓ Valid\x1b[0m' : '\x1b[31m✗ Invalid\x1b[0m';
    
    console.log(`\n🔍 Validation: ${validationStatus}`);
    
    if (response.validationResult.issues.length > 0) {
      console.log(`   Issues:`);
      response.validationResult.issues.forEach(issue => {
        const severityColor = 
          issue.severity === 'ERROR' ? '\x1b[31m' : 
          issue.severity === 'WARNING' ? '\x1b[33m' : '\x1b[36m';
        
        console.log(`   - ${severityColor}${issue.severity}\x1b[0m: ${issue.message}`);
        if (showDetails) {
          console.log(`     Code: ${issue.code}`);
          console.log(`     Reference: ${issue.regulatoryReference}`);
          console.log(`     Action: ${issue.suggestedAction}`);
        }
      });
    }
  }
  
  // Display detailed information if requested
  if (showDetails && response.explainability) {
    console.log(`\n🔬 Detailed Explainability:`);
    
    if (response.explainability.factorsConsidered) {
      console.log(`   Factors Considered:`);
      response.explainability.factorsConsidered.forEach(factor => {
        console.log(`   - ${factor.name}: ${factor.weight}`);
        console.log(`     ${factor.description}`);
      });
    }
    
    if (response.explainability.regulatoryReferences) {
      console.log(`\n   Regulatory References:`);
      response.explainability.regulatoryReferences.forEach(ref => {
        console.log(`   - ${ref.source}: ${ref.article}`);
        console.log(`     ${ref.text}`);
      });
    }
    
    if (response.explainability.alternativeScenarios) {
      console.log(`\n   Alternative Scenarios:`);
      response.explainability.alternativeScenarios.forEach(scenario => {
        console.log(`   - ${scenario.classification} (${(scenario.probability * 100).toFixed(2)}%)`);
        console.log(`     Conditions: ${scenario.conditions}`);
      });
    }
  }
  
  // Display risk assessment if available
  if (showDetails && response.riskAssessment) {
    console.log(`\n⚠️  Risk Assessment:`);
    console.log(`   Overall Risk Level: ${response.riskAssessment.overallRiskLevel}`);
    
    if (response.riskAssessment.riskFactors) {
      console.log(`   Risk Factors:`);
      response.riskAssessment.riskFactors.forEach(factor => {
        const riskColor = 
          factor.severity === 'HIGH' ? '\x1b[31m' : 
          factor.severity === 'MEDIUM' ? '\x1b[33m' : '\x1b[32m';
        
        console.log(`   - ${riskColor}${factor.name} (${factor.severity})\x1b[0m`);
        console.log(`     ${factor.description}`);
        console.log(`     Mitigation: ${factor.mitigationStrategy}`);
      });
    }
  }
  
  console.log('\n' + '-'.repeat(80));
}

/**
 * Run health check demo
 */
async function runHealthCheckDemo(): Promise<void> {
  console.log('\n' + '='.repeat(80));
  console.log('🏥 Running Health Check Demo');
  console.log('='.repeat(80));
  
  const engine = createDevelopmentSFDREngine();
  
  try {
    console.log('\n🔄 Performing health check...');
    const healthStatus = await engine.healthCheck();
    
    console.log(`\n📊 Health Status: ${healthStatus.status}`);
    console.log(`   Timestamp: ${healthStatus.timestamp.toISOString()}`);
    
    console.log(`\n🔧 Component Status:`);
    Object.entries(healthStatus.components).forEach(([component, health]) => {
      const statusIcon = health.status === 'HEALTHY' ? '✅' : 
                        health.status === 'DEGRADED' ? '⚠️' : '❌';
      console.log(`   ${statusIcon} ${component}: ${health.status}`);
    });
    
    if (healthStatus.metrics) {
      console.log(`\n📈 Health Metrics:`);
      Object.entries(healthStatus.metrics).forEach(([metric, value]) => {
        console.log(`   ${metric}: ${value}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Health check failed:', error);
  }
}

/**
 * Display engine metrics
 */
function displayEngineMetrics(): void {
  console.log('\n' + '='.repeat(80));
  console.log('📊 Engine Metrics Summary');
  console.log('='.repeat(80));
  
  const engine = createDevelopmentSFDREngine();
  const metrics = engine.getMetrics();
  
  console.log(`\n📈 Performance Metrics:`);
  console.log(`   Total Classifications: ${metrics.totalClassifications}`);
  console.log(`   Successful Classifications: ${metrics.successfulClassifications}`);
  console.log(`   Error Count: ${metrics.errorCount}`);
  console.log(`   Average Processing Time: ${metrics.averageProcessingTime.toFixed(2)}ms`);
  
  console.log(`\n🎯 Quality Metrics:`);
  console.log(`   Average Confidence: ${(metrics.averageConfidence * 100).toFixed(2)}%`);
  console.log(`   Success Rate: ${(metrics.successRate * 100).toFixed(2)}%`);
  console.log(`   Validation Success Rate: ${(metrics.validationSuccessRate * 100).toFixed(2)}%`);
  
  console.log(`\n💼 Business Metrics:`);
  console.log(`   Article 6 Classifications: ${metrics.article6Count}`);
  console.log(`   Article 8 Classifications: ${metrics.article8Count}`);
  console.log(`   Article 9 Classifications: ${metrics.article9Count}`);
  console.log(`   Human Review Rate: ${(metrics.humanReviewRate * 100).toFixed(2)}%`);
}

// ============================================================================
// MAIN DEMO FUNCTION
// ============================================================================

/**
 * Run the demo
 */
async function runDemo(): Promise<void> {
  try {
    // Display engine information
    displayEngineInfo();
    
    // Create engine and scenarios
    const engine = createDevelopmentSFDREngine();
    const scenarios = createDemoScenarios();
    
    // Demonstrate classification for each scenario
    if (DEMO_CONFIG.demonstrateAllArticles) {
      for (const [scenarioName, request] of Object.entries(scenarios)) {
        try {
          const response = await engine.classify(request);
          displayClassificationResults(
            scenarioName, 
            request, 
            response, 
            DEMO_CONFIG.showDetailedOutput
          );
        } catch (error) {
          console.error(`❌ Error classifying ${scenarioName}:`, error);
        }
      }
    }
    
    // Demonstrate batch processing
    if (DEMO_CONFIG.testBatchProcessing) {
      console.log('\n' + '='.repeat(80));
      console.log('🔄 Batch Processing Demo');
      console.log('='.repeat(80));
      
      const requests = Object.values(scenarios);
      console.log(`\n📦 Processing batch of ${requests.length} requests...`);
      
      try {
        const startTime = Date.now();
        const batchResults = await engine.classifyBatch(requests);
        const totalTime = Date.now() - startTime;
        
        console.log(`\n✅ Batch processing completed in ${totalTime}ms`);
        console.log(`   Average time per request: ${(totalTime / requests.length).toFixed(2)}ms`);
        console.log(`   Successful classifications: ${batchResults.filter(r => !r.error).length}`);
        console.log(`   Failed classifications: ${batchResults.filter(r => !!r.error).length}`);
      } catch (error) {
        console.error('❌ Batch processing failed:', error);
      }
    }
    
    // Run performance test
    if (DEMO_CONFIG.runPerformanceTest) {
      console.log('\n' + '='.repeat(80));
      console.log('⚡ Performance Benchmark');
      console.log('='.repeat(80));
      
      const iterations = 5;
      const request = scenarios.article8;
      
      console.log(`\n🔄 Running ${iterations} classification iterations...`);
      
      const times: number[] = [];
      for (let i = 0; i < iterations; i++) {
        const startTime = Date.now();
        await engine.classify(request);
        const elapsed = Date.now() - startTime;
        times.push(elapsed);
        console.log(`   Iteration ${i + 1}: ${elapsed}ms`);
      }
      
      const avgTime = times.reduce((sum, time) => sum + time, 0) / times.length;
      const minTime = Math.min(...times);
      const maxTime = Math.max(...times);
      
      console.log(`\n📊 Performance Results:`);
      console.log(`   Average Time: ${avgTime.toFixed(2)}ms`);
      console.log(`   Minimum Time: ${minTime}ms`);
      console.log(`   Maximum Time: ${maxTime}ms`);
      console.log(`   Standard Deviation: ${calculateStdDev(times).toFixed(2)}ms`);
    }
    
    // Run health check
    if (DEMO_CONFIG.showHealthCheck) {
      await runHealthCheckDemo();
    }
    
    // Display engine metrics
    displayEngineMetrics();
    
    console.log('\n' + '='.repeat(80));
    console.log('✅ Demo completed successfully!');
    console.log('='.repeat(80));
    
  } catch (error) {
    console.error('❌ Demo failed:', error);
  }
}

/**
 * Calculate standard deviation
 */
function calculateStdDev(values: number[]): number {
  const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
  const squareDiffs = values.map(value => Math.pow(value - avg, 2));
  const avgSquareDiff = squareDiffs.reduce((sum, val) => sum + val, 0) / squareDiffs.length;
  return Math.sqrt(avgSquareDiff);
}

// ============================================================================
// RUN THE DEMO
// ============================================================================

runDemo().catch(error => {
  console.error('❌ Unhandled demo error:', error);
});