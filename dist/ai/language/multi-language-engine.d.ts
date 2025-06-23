/**
 * SFDR Navigator Agent - Multi-Language Engine
 * Phase 2B: Advanced Multi-Language Support
 *
 * Implements sophisticated language processing for global regulatory compliance
 * with context-aware translation, regulatory terminology preservation,
 * and cross-jurisdictional regulatory mapping
 */
import type { SFDRClassificationRequest, SFDRClassificationResponse } from '../../domain/sfdr/types.js';
/**
 * Supported languages with regulatory context
 */
export type SupportedLanguage = 'en' | 'de' | 'fr' | 'es' | 'it' | 'nl' | 'pt' | 'pl' | 'sv' | 'da' | 'fi' | 'no' | 'cs' | 'hu' | 'ro' | 'bg' | 'hr' | 'sk' | 'sl' | 'et' | 'lv' | 'lt' | 'mt' | 'ga' | 'cy';
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
/**
 * Advanced multi-language processing engine
 */
export declare class MultiLanguageEngine {
    private readonly terminologyManager;
    private readonly translationEngine;
    private readonly jurisdictionMapper;
    private readonly languageDetector;
    private readonly qualityAssessor;
    private readonly crossLingualClassifier;
    constructor();
    /**
     * Process multi-language classification request
     */
    processMultiLanguageRequest(request: MultiLanguageClassificationRequest): Promise<MultiLanguageClassificationResponse>;
    /**
     * Translate regulatory text with context preservation
     */
    translateRegulatoryText(text: string, context: TranslationContext): Promise<TranslationResult>;
    /**
     * Get regulatory terminology in multiple languages
     */
    getRegulatoryTerminology(termId: string, languages: SupportedLanguage[]): Promise<Partial<Record<SupportedLanguage, RegulatoryTerminology>>>;
    /**
     * Validate cross-jurisdictional compliance
     */
    validateCrossJurisdictionalCompliance(classification: SFDRClassificationResponse, targetJurisdictions: string[]): Promise<CrossJurisdictionalValidation>;
    private translateRequest;
    private translateResponse;
    private calculateLanguageFactors;
    private calculateCrossLingualConfidence;
    private assessCulturalContext;
    private assessLocalCompliance;
    private validateForJurisdiction;
    private identifyConflicts;
    private generateRecommendations;
}
/**
 * Regulatory terminology management
 */
export declare class RegulatoryTerminologyManager {
    private terminology;
    constructor();
    identifyTerms(text: string, language: SupportedLanguage, framework: string): Promise<string[]>;
    getTerminology(termId: string, languages: SupportedLanguage[]): Promise<Partial<Record<SupportedLanguage, RegulatoryTerminology>>>;
    private initializeTerminology;
}
/**
 * Context-aware translation engine
 */
export declare class ContextAwareTranslationEngine {
    translate(text: string, context: TranslationContext, regulatoryTerms: string[]): Promise<TranslationResult>;
}
/**
 * Language detection
 */
export declare class LanguageDetector {
    detectLanguage(text: string): Promise<SupportedLanguage>;
}
/**
 * Translation quality assessment
 */
export declare class TranslationQualityAssessor {
    assessQuality(originalText: string, translatedText: string, context: TranslationContext, regulatoryTerms: string[]): Promise<QualityAssessment>;
}
/**
 * Cross-lingual classifier
 */
export declare class CrossLingualClassifier {
    classify(request: MultiLanguageClassificationRequest, originalLanguage: SupportedLanguage): Promise<SFDRClassificationResponse>;
}
/**
 * Jurisdiction mapping
 */
export declare class JurisdictionMapper {
    private jurisdictions;
    constructor();
    getJurisdiction(code: string): Promise<RegulatoryJurisdiction | undefined>;
    private initializeJurisdictions;
}
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
export {};
//# sourceMappingURL=multi-language-engine.d.ts.map