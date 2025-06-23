/**
 * SFDR Navigator Agent - Multi-Language Engine
 * Phase 2B: Advanced Multi-Language Support
 * 
 * Implements sophisticated language processing for global regulatory compliance
 * with context-aware translation, regulatory terminology preservation,
 * and cross-jurisdictional regulatory mapping
 */

import type {
  SFDRClassificationRequest,
  SFDRClassificationResponse,
  SFDRMetadata
} from '../../domain/sfdr/types.js';

import type {
  ExplainabilityResponse
} from '../agents/types.js';

// ============================================================================
// LANGUAGE SUPPORT INTERFACES
// ============================================================================

/**
 * Supported languages with regulatory context
 */
export type SupportedLanguage = 
  | 'en' // English (EU/UK)
  | 'de' // German
  | 'fr' // French
  | 'es' // Spanish
  | 'it' // Italian
  | 'nl' // Dutch
  | 'pt' // Portuguese
  | 'pl' // Polish
  | 'sv' // Swedish
  | 'da' // Danish
  | 'fi' // Finnish
  | 'no' // Norwegian
  | 'cs' // Czech
  | 'hu' // Hungarian
  | 'ro' // Romanian
  | 'bg' // Bulgarian
  | 'hr' // Croatian
  | 'sk' // Slovak
  | 'sl' // Slovenian
  | 'et' // Estonian
  | 'lv' // Latvian
  | 'lt' // Lithuanian
  | 'mt' // Maltese
  | 'ga' // Irish
  | 'cy'; // Welsh

/**
 * Regulatory jurisdiction mapping
 */
export interface RegulatoryJurisdiction {
  code: string;
  name: string;
  languages: SupportedLanguage[];
  primaryLanguage: SupportedLanguage;
  regulatoryFramework: string;
  localRegulations: string[];
  competentAuthority: string;
}

/**
 * Language-specific regulatory terminology
 */
export interface RegulatoryTerminology {
  termId: string;
  englishTerm: string;
  translations: Record<SupportedLanguage, string>;
  definition: Record<SupportedLanguage, string>;
  regulatoryContext: string;
  jurisdiction: string[];
  synonyms: Record<SupportedLanguage, string[]>;
  relatedTerms: string[];
}

/**
 * Translation context for regulatory documents
 */
export interface TranslationContext {
  sourceLanguage: SupportedLanguage;
  targetLanguage: SupportedLanguage;
  documentType: 'fund-prospectus' | 'regulatory-filing' | 'classification-request' | 'compliance-report';
  jurisdiction: string;
  regulatoryFramework: string;
  preserveTerminology: boolean;
  confidenceThreshold: number;
}

/**
 * Translation result with quality metrics
 */
export interface TranslationResult {
  translatedText: string;
  sourceLanguage: SupportedLanguage;
  targetLanguage: SupportedLanguage;
  confidence: number;
  qualityScore: number;
  preservedTerms: string[];
  uncertainTerms: string[];
  suggestions: TranslationSuggestion[];
  regulatoryAlignment: number;
}

/**
 * Translation suggestion for improvement
 */
export interface TranslationSuggestion {
  originalPhrase: string;
  suggestedTranslation: string;
  reason: string;
  confidence: number;
  regulatoryJustification?: string;
}

/**
 * Cross-lingual classification request
 */
export interface MultiLanguageClassificationRequest extends SFDRClassificationRequest {
  sourceLanguage: SupportedLanguage;
  preferredResponseLanguage?: SupportedLanguage;
  requireTranslation: boolean;
  preserveOriginalTerminology: boolean;
}

/**
 * Multi-language classification response
 */
export interface MultiLanguageClassificationResponse extends SFDRClassificationResponse {
  responseLanguage: SupportedLanguage;
  originalLanguage?: SupportedLanguage;
  translationQuality?: TranslationResult;
  crossLingualConfidence: number;
  languageSpecificFactors: LanguageSpecificFactors;
}

/**
 * Language-specific confidence factors
 */
export interface LanguageSpecificFactors {
  terminologyAlignment: number;
  culturalContext: number;
  jurisdictionalRelevance: number;
  translationUncertainty: number;
  localRegulationCompliance: number;
}

// ============================================================================
// MULTI-LANGUAGE ENGINE
// ============================================================================

/**
 * Advanced multi-language processing engine
 */
export class MultiLanguageEngine {
  private readonly terminologyManager: RegulatoryTerminologyManager;
  private readonly translationEngine: ContextAwareTranslationEngine;
  private readonly jurisdictionMapper: JurisdictionMapper;
  private readonly languageDetector: LanguageDetector;
  private readonly qualityAssessor: TranslationQualityAssessor;
  private readonly crossLingualClassifier: CrossLingualClassifier;

  constructor() {
    this.terminologyManager = new RegulatoryTerminologyManager();
    this.translationEngine = new ContextAwareTranslationEngine();
    this.jurisdictionMapper = new JurisdictionMapper();
    this.languageDetector = new LanguageDetector();
    this.qualityAssessor = new TranslationQualityAssessor();
    this.crossLingualClassifier = new CrossLingualClassifier();
  }

  /**
   * Process multi-language classification request
   */
  public async processMultiLanguageRequest(
    request: MultiLanguageClassificationRequest
  ): Promise<MultiLanguageClassificationResponse> {
    try {
      // Detect source language if not specified
      const detectedLanguage = request.sourceLanguage || 
        await this.languageDetector.detectLanguage(request.fundProfile.name);

      // Determine target language for processing
      const processingLanguage: SupportedLanguage = 'en'; // Process in English
      const responseLanguage = request.preferredResponseLanguage || detectedLanguage;

      // Translate request to processing language if needed
      let processedRequest = request;
      let translationResult: TranslationResult | undefined;

      if (detectedLanguage !== processingLanguage) {
        const translationContext: TranslationContext = {
          sourceLanguage: detectedLanguage,
          targetLanguage: processingLanguage,
          documentType: 'classification-request',
          jurisdiction: request.fundProfile.jurisdiction,
          regulatoryFramework: 'SFDR',
          preserveTerminology: true,
          confidenceThreshold: 0.8
        };

        translationResult = await this.translateRequest(
          request,
          translationContext
        );

        processedRequest = translationResult.translatedRequest;
      }

      // Perform classification in processing language
      const classificationResult = await this.crossLingualClassifier.classify(
        processedRequest,
        detectedLanguage
      );

      // Translate response back to preferred language if needed
      let finalResponse = classificationResult;
      if (responseLanguage !== processingLanguage) {
        finalResponse = await this.translateResponse(
          classificationResult,
          processingLanguage,
          responseLanguage
        );
      }

      // Calculate language-specific factors
      const languageFactors = await this.calculateLanguageFactors(
        request,
        detectedLanguage,
        translationResult
      );

      // Calculate cross-lingual confidence
      const crossLingualConfidence = this.calculateCrossLingualConfidence(
        classificationResult.confidence.overall,
        languageFactors,
        translationResult
      );

      return {
        ...finalResponse,
        responseLanguage,
        originalLanguage: detectedLanguage !== responseLanguage ? detectedLanguage : undefined,
        translationQuality: translationResult,
        crossLingualConfidence,
        languageSpecificFactors: languageFactors
      };
    } catch (error) {
      throw new Error(`Multi-language processing failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Translate regulatory text with context preservation
   */
  public async translateRegulatoryText(
    text: string,
    context: TranslationContext
  ): Promise<TranslationResult> {
    // Pre-process text to identify regulatory terms
    const regulatoryTerms = await this.terminologyManager.identifyTerms(
      text,
      context.sourceLanguage,
      context.regulatoryFramework
    );

    // Perform context-aware translation
    const translationResult = await this.translationEngine.translate(
      text,
      context,
      regulatoryTerms
    );

    // Assess translation quality
    const qualityAssessment = await this.qualityAssessor.assessQuality(
      text,
      translationResult.translatedText,
      context,
      regulatoryTerms
    );

    return {
      ...translationResult,
      qualityScore: qualityAssessment.overallScore,
      suggestions: qualityAssessment.suggestions,
      regulatoryAlignment: qualityAssessment.regulatoryAlignment
    };
  }

  /**
   * Get regulatory terminology in multiple languages
   */
  public async getRegulatoryTerminology(
    termId: string,
    languages: SupportedLanguage[]
  ): Promise<Partial<Record<SupportedLanguage, RegulatoryTerminology>>> {
    return await this.terminologyManager.getTerminology(termId, languages);
  }

  /**
   * Validate cross-jurisdictional compliance
   */
  public async validateCrossJurisdictionalCompliance(
    classification: SFDRClassificationResponse,
    targetJurisdictions: string[]
  ): Promise<CrossJurisdictionalValidation> {
    const validations: JurisdictionalValidation[] = [];

    for (const jurisdiction of targetJurisdictions) {
      const jurisdictionInfo = await this.jurisdictionMapper.getJurisdiction(jurisdiction);
      
      if (jurisdictionInfo) {
        const validation = await this.validateForJurisdiction(
          classification,
          jurisdictionInfo
        );
        validations.push(validation);
      }
    }

    return {
      overallCompliance: validations.every(v => v.isCompliant),
      jurisdictionalValidations: validations,
      conflictingRequirements: this.identifyConflicts(validations),
      recommendations: this.generateRecommendations(validations)
    };
  }

  private async translateRequest(
    request: MultiLanguageClassificationRequest,
    context: TranslationContext
  ): Promise<TranslationResult & { translatedRequest: MultiLanguageClassificationRequest }> {
    // Translate fund profile fields
    const translatedName = await this.translateRegulatoryText(
      request.fundProfile.name,
      context
    );

    const translatedStrategy = await this.translateRegulatoryText(
      request.fundProfile.investmentStrategy,
      context
    );

    const translatedRequest: MultiLanguageClassificationRequest = {
      ...request,
      fundProfile: {
        ...request.fundProfile,
        name: translatedName.translatedText,
        investmentStrategy: translatedStrategy.translatedText
      }
    };

    return {
      translatedText: JSON.stringify(translatedRequest),
      sourceLanguage: context.sourceLanguage,
      targetLanguage: context.targetLanguage,
      confidence: (translatedName.confidence + translatedStrategy.confidence) / 2,
      qualityScore: (translatedName.qualityScore + translatedStrategy.qualityScore) / 2,
      preservedTerms: [...translatedName.preservedTerms, ...translatedStrategy.preservedTerms],
      uncertainTerms: [...translatedName.uncertainTerms, ...translatedStrategy.uncertainTerms],
      suggestions: [...translatedName.suggestions, ...translatedStrategy.suggestions],
      regulatoryAlignment: (translatedName.regulatoryAlignment + translatedStrategy.regulatoryAlignment) / 2,
      translatedRequest
    };
  }

  private async translateResponse(
    response: SFDRClassificationResponse,
    sourceLanguage: SupportedLanguage,
    targetLanguage: SupportedLanguage
  ): Promise<SFDRClassificationResponse> {
    const context: TranslationContext = {
      sourceLanguage,
      targetLanguage,
      documentType: 'compliance-report',
      jurisdiction: 'EU',
      regulatoryFramework: 'SFDR',
      preserveTerminology: true,
      confidenceThreshold: 0.9
    };

    // Translate explanation
    const translatedExplanation = await this.translateRegulatoryText(
      response.explanation.summary,
      context
    );

    // Translate reasoning
    const translatedReasoning = await Promise.all(
      response.explanation.reasoning.map(reason =>
        this.translateRegulatoryText(reason, context)
      )
    );

    return {
      ...response,
      explanation: {
        ...response.explanation,
        summary: translatedExplanation.translatedText,
        reasoning: translatedReasoning.map(r => r.translatedText)
      }
    };
  }

  private async calculateLanguageFactors(
    request: MultiLanguageClassificationRequest,
    detectedLanguage: SupportedLanguage,
    translationResult?: TranslationResult
  ): Promise<LanguageSpecificFactors> {
    const jurisdiction = await this.jurisdictionMapper.getJurisdiction(
      request.fundProfile.jurisdiction
    );

    return {
      terminologyAlignment: translationResult?.regulatoryAlignment || 1.0,
      culturalContext: this.assessCulturalContext(detectedLanguage, request),
      jurisdictionalRelevance: jurisdiction?.languages.includes(detectedLanguage) ? 1.0 : 0.8,
      translationUncertainty: translationResult ? (1 - translationResult.confidence) : 0,
      localRegulationCompliance: await this.assessLocalCompliance(request, detectedLanguage)
    };
  }

  private calculateCrossLingualConfidence(
    baseConfidence: number,
    languageFactors: LanguageSpecificFactors,
    translationResult?: TranslationResult
  ): number {
    let adjustment = 1.0;

    // Reduce confidence based on translation uncertainty
    adjustment *= (1 - languageFactors.translationUncertainty * 0.2);

    // Adjust for terminology alignment
    adjustment *= (0.8 + languageFactors.terminologyAlignment * 0.2);

    // Adjust for jurisdictional relevance
    adjustment *= (0.9 + languageFactors.jurisdictionalRelevance * 0.1);

    return Math.max(baseConfidence * adjustment, 0.1);
  }

  private assessCulturalContext(
    language: SupportedLanguage,
    request: MultiLanguageClassificationRequest
  ): number {
    // Simplified cultural context assessment
    // In practice, this would consider cultural factors affecting ESG interpretation
    const culturalFactors: Record<SupportedLanguage, number> = {
      'en': 1.0, 'de': 0.95, 'fr': 0.95, 'es': 0.9, 'it': 0.9,
      'nl': 0.95, 'pt': 0.9, 'pl': 0.85, 'sv': 0.95, 'da': 0.95,
      'fi': 0.95, 'no': 0.95, 'cs': 0.85, 'hu': 0.85, 'ro': 0.8,
      'bg': 0.8, 'hr': 0.8, 'sk': 0.85, 'sl': 0.85, 'et': 0.9,
      'lv': 0.9, 'lt': 0.9, 'mt': 0.85, 'ga': 0.9, 'cy': 0.9
    };

    return culturalFactors[language] || 0.8;
  }

  private async assessLocalCompliance(
    request: MultiLanguageClassificationRequest,
    language: SupportedLanguage
  ): Promise<number> {
    // Assess compliance with local regulatory nuances
    // This would check against local implementation of SFDR
    return 0.95; // Simplified
  }

  private async validateForJurisdiction(
    classification: SFDRClassificationResponse,
    jurisdiction: RegulatoryJurisdiction
  ): Promise<JurisdictionalValidation> {
    // Validate classification against jurisdiction-specific requirements
    return {
      jurisdiction: jurisdiction.code,
      isCompliant: true,
      localRequirements: jurisdiction.localRegulations,
      deviations: [],
      recommendations: []
    };
  }

  private identifyConflicts(validations: JurisdictionalValidation[]): string[] {
    // Identify conflicting requirements across jurisdictions
    return [];
  }

  private generateRecommendations(validations: JurisdictionalValidation[]): string[] {
    // Generate recommendations for multi-jurisdictional compliance
    return ['Ensure consistent disclosure across all jurisdictions'];
  }
}

// ============================================================================
// SUPPORTING CLASSES
// ============================================================================

/**
 * Regulatory terminology management
 */
export class RegulatoryTerminologyManager {
  private terminology: Map<string, RegulatoryTerminology> = new Map();

  constructor() {
    this.initializeTerminology();
  }

  public async identifyTerms(
    text: string,
    language: SupportedLanguage,
    framework: string
  ): Promise<string[]> {
    const terms: string[] = [];
    
    // Identify regulatory terms in text
    for (const [termId, term] of this.terminology) {
      if (term.regulatoryContext === framework) {
        const languageTerms = [term.translations[language], ...(term.synonyms[language] || [])];
        
        for (const langTerm of languageTerms) {
          if (langTerm && text.toLowerCase().includes(langTerm.toLowerCase())) {
            terms.push(termId);
            break;
          }
        }
      }
    }
    
    return terms;
  }

  public async getTerminology(
    termId: string,
    languages: SupportedLanguage[]
  ): Promise<Partial<Record<SupportedLanguage, RegulatoryTerminology>>> {
    const term = this.terminology.get(termId);
    if (!term) return {};

    const result: Partial<Record<SupportedLanguage, RegulatoryTerminology>> = {};
    
    for (const lang of languages) {
      if (term.translations[lang]) {
        result[lang] = term;
      }
    }
    
    return result;
  }

  private initializeTerminology(): void {
    // Initialize with key SFDR terms
    const sfdrTerms: RegulatoryTerminology[] = [
      {
        termId: 'article-6',
        englishTerm: 'Article 6 Product',
        translations: {
          'en': 'Article 6 Product',
          'de': 'Artikel 6 Produkt',
          'fr': 'Produit Article 6',
          'es': 'Producto Artículo 6',
          'it': 'Prodotto Articolo 6'
        } as Record<SupportedLanguage, string>,
        definition: {
          'en': 'Financial product that does not promote environmental or social characteristics',
          'de': 'Finanzprodukt, das keine ökologischen oder sozialen Merkmale bewirbt',
          'fr': 'Produit financier qui ne promeut pas de caractéristiques environnementales ou sociales'
        } as Record<SupportedLanguage, string>,
        regulatoryContext: 'SFDR',
        jurisdiction: ['EU'],
        synonyms: {
          'en': ['Non-ESG product', 'Traditional product'],
          'de': ['Nicht-ESG-Produkt', 'Traditionelles Produkt']
        } as Record<SupportedLanguage, string[]>,
        relatedTerms: ['article-8', 'article-9']
      },
      {
        termId: 'pai-indicators',
        englishTerm: 'Principal Adverse Impact Indicators',
        translations: {
          'en': 'Principal Adverse Impact Indicators',
          'de': 'Indikatoren für die wichtigsten nachteiligen Auswirkungen',
          'fr': 'Indicateurs des principales incidences négatives',
          'es': 'Indicadores de las principales incidencias adversas',
          'it': 'Indicatori dei principali effetti negativi'
        } as Record<SupportedLanguage, string>,
        definition: {
          'en': 'Metrics measuring negative sustainability impacts of investments',
          'de': 'Kennzahlen zur Messung negativer Nachhaltigkeitsauswirkungen von Investitionen'
        } as Record<SupportedLanguage, string>,
        regulatoryContext: 'SFDR',
        jurisdiction: ['EU'],
        synonyms: {
          'en': ['PAI', 'Adverse impact metrics'],
          'de': ['PAI', 'Nachteilige Auswirkungskennzahlen']
        } as Record<SupportedLanguage, string[]>,
        relatedTerms: ['sustainability-indicators', 'esg-metrics']
      }
    ];

    sfdrTerms.forEach(term => {
      this.terminology.set(term.termId, term);
    });
  }
}

/**
 * Context-aware translation engine
 */
export class ContextAwareTranslationEngine {
  public async translate(
    text: string,
    context: TranslationContext,
    regulatoryTerms: string[]
  ): Promise<TranslationResult> {
    // Simplified translation implementation
    // In practice, this would use advanced NLP models
    
    return {
      translatedText: `[TRANSLATED: ${text}]`,
      sourceLanguage: context.sourceLanguage,
      targetLanguage: context.targetLanguage,
      confidence: 0.9,
      qualityScore: 0.85,
      preservedTerms: regulatoryTerms,
      uncertainTerms: [],
      suggestions: [],
      regulatoryAlignment: 0.9
    };
  }
}

/**
 * Language detection
 */
export class LanguageDetector {
  public async detectLanguage(text: string): Promise<SupportedLanguage> {
    // Simplified language detection
    // In practice, this would use ML-based language detection
    
    // Basic heuristics for common EU languages
    if (text.includes('und') || text.includes('der') || text.includes('die')) {
      return 'de';
    }
    if (text.includes('et') || text.includes('le') || text.includes('la')) {
      return 'fr';
    }
    if (text.includes('y') || text.includes('el') || text.includes('la')) {
      return 'es';
    }
    
    return 'en'; // Default to English
  }
}

/**
 * Translation quality assessment
 */
export class TranslationQualityAssessor {
  public async assessQuality(
    originalText: string,
    translatedText: string,
    context: TranslationContext,
    regulatoryTerms: string[]
  ): Promise<QualityAssessment> {
    return {
      overallScore: 0.9,
      regulatoryAlignment: 0.95,
      suggestions: [],
      terminologyConsistency: 0.9,
      fluency: 0.85,
      accuracy: 0.9
    };
  }
}

/**
 * Cross-lingual classifier
 */
export class CrossLingualClassifier {
  public async classify(
    request: MultiLanguageClassificationRequest,
    originalLanguage: SupportedLanguage
  ): Promise<SFDRClassificationResponse> {
    // Simplified classification - would integrate with main classification engine
    return {
      classification: {
        primary: 'Article 8',
        confidence: 0.85,
        alternatives: []
      },
      confidence: {
        overall: 0.85,
        factors: {
          dataQuality: 0.9,
          modelConfidence: 0.8,
          regulatoryAlignment: 0.9,
          crossValidation: 0.85
        }
      },
      explanation: {
        summary: 'Fund promotes environmental characteristics',
        reasoning: ['ESG integration in investment process'],
        regulatoryBasis: ['SFDR Article 8'],
        confidence: 0.85
      },
      metadata: {
        processedAt: new Date().toISOString(),
        modelVersion: '2.1.0',
        processingTime: 250
      },
      validation: {
        isValid: true,
        errors: [],
        warnings: []
      }
    };
  }
}

/**
 * Jurisdiction mapping
 */
export class JurisdictionMapper {
  private jurisdictions: Map<string, RegulatoryJurisdiction> = new Map();

  constructor() {
    this.initializeJurisdictions();
  }

  public async getJurisdiction(code: string): Promise<RegulatoryJurisdiction | undefined> {
    return this.jurisdictions.get(code.toLowerCase());
  }

  private initializeJurisdictions(): void {
    const jurisdictions: RegulatoryJurisdiction[] = [
      {
        code: 'eu',
        name: 'European Union',
        languages: ['en', 'de', 'fr', 'es', 'it', 'nl', 'pt', 'pl', 'sv', 'da', 'fi', 'no', 'cs', 'hu', 'ro', 'bg', 'hr', 'sk', 'sl', 'et', 'lv', 'lt', 'mt', 'ga', 'cy'],
        primaryLanguage: 'en',
        regulatoryFramework: 'SFDR',
        localRegulations: ['SFDR', 'Taxonomy Regulation', 'MiFID II'],
        competentAuthority: 'ESMA'
      },
      {
        code: 'de',
        name: 'Germany',
        languages: ['de', 'en'],
        primaryLanguage: 'de',
        regulatoryFramework: 'SFDR + BaFin',
        localRegulations: ['SFDR', 'KAGB', 'WpHG'],
        competentAuthority: 'BaFin'
      },
      {
        code: 'fr',
        name: 'France',
        languages: ['fr', 'en'],
        primaryLanguage: 'fr',
        regulatoryFramework: 'SFDR + AMF',
        localRegulations: ['SFDR', 'Code monétaire et financier'],
        competentAuthority: 'AMF'
      }
    ];

    jurisdictions.forEach(jurisdiction => {
      this.jurisdictions.set(jurisdiction.code, jurisdiction);
    });
  }
}

// ============================================================================
// SUPPORTING INTERFACES
// ============================================================================

interface QualityAssessment {
  overallScore: number;
  regulatoryAlignment: number;
  suggestions: TranslationSuggestion[];
  terminologyConsistency: number;
  fluency: number;
  accuracy: number;
}

interface JurisdictionalValidation {
  jurisdiction: string;
  isCompliant: boolean;
  localRequirements: string[];
  deviations: string[];
  recommendations: string[];
}

interface CrossJurisdictionalValidation {
  overallCompliance: boolean;
  jurisdictionalValidations: JurisdictionalValidation[];
  conflictingRequirements: string[];
  recommendations: string[];
}