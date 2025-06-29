/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */
/**
 * Schema for SFDR Navigator Agent classification requests based on SFDR Regulation (EU) 2019/2088
 */
export type SFDRClassificationRequest = SFDRClassificationRequest1 & SFDRClassificationRequest2;
export type SFDRClassificationRequest1 = {
    [k: string]: unknown;
};
export interface SFDRClassificationRequest2 {
    metadata: {
        /**
         * Unique identifier for the fund/entity
         */
        entityId: string;
        /**
         * Reporting period in ISO date format (YYYY-MM-DD)
         */
        reportingPeriod: string;
        /**
         * Regulatory framework version (e.g., SFDR_v1.0)
         */
        regulatoryVersion: string;
        /**
         * Type of SFDR submission
         */
        submissionType: "INITIAL" | "AMENDMENT" | "PERIODIC";
        /**
         * Submission timestamp in ISO datetime format
         */
        submissionDate: string;
        /**
         * ID of the compliance officer preparing the submission
         */
        preparerId: string;
        /**
         * Optional ID of the reviewer
         */
        reviewerId?: string;
    };
    fundProfile: {
        /**
         * EU fund type subject to SFDR
         */
        fundType: "UCITS" | "AIF" | "ELTIF" | "EuVECA" | "EuSEF";
        /**
         * Official fund name
         */
        fundName: string;
        /**
         * International Securities Identification Number
         */
        isin?: string;
        /**
         * Legal Entity Identifier
         */
        lei?: string;
        /**
         * Detailed investment strategy description
         */
        investmentStrategy: string;
        /**
         * Target SFDR article classification
         */
        targetArticleClassification: "Article6" | "Article8" | "Article9";
        /**
         * Required for Article 9 funds - specific sustainability objective
         */
        sustainabilityObjective?: string;
        /**
         * Description of investment universe
         */
        investmentUniverse: string;
        /**
         * Geographical focus areas (ISO country codes or regions)
         */
        geographicalFocus?: string[];
        /**
         * Sector focus areas
         */
        sectorFocus?: string[];
        /**
         * Minimum investment horizon in months
         */
        minimumInvestmentHorizon?: number;
    };
    esgIntegration: {
        /**
         * Whether the fund considers Principal Adverse Impacts
         */
        considersPAI: boolean;
        /**
         * PAI indicators considered by the fund
         */
        paiIndicators: ("GHG_EMISSIONS" | "CARBON_FOOTPRINT" | "GHG_INTENSITY" | "FOSSIL_FUEL_EXPOSURE" | "NON_RENEWABLE_ENERGY" | "ENERGY_CONSUMPTION" | "WATER_EMISSIONS" | "HAZARDOUS_WASTE" | "WATER_USAGE" | "BIODIVERSITY_IMPACT" | "UNGA_GLOBAL_COMPACT" | "CONTROVERSIAL_WEAPONS" | "BOARD_GENDER_DIVERSITY" | "ANTI_CORRUPTION_POLICIES")[];
        /**
         * Statement on how PAI are considered
         */
        paiStatement?: string;
        dueDiligencePolicies: {
            /**
             * ESG integration in due diligence
             */
            esgIntegration: boolean;
            /**
             * Sustainability risk assessment
             */
            sustainabilityRisks: boolean;
            /**
             * Adverse impact consideration
             */
            adverseImpacts: boolean;
        };
        engagementPolicies: {
            /**
             * Active shareholder engagement
             */
            shareholderEngagement: boolean;
            /**
             * ESG-informed voting policy
             */
            votingPolicy: boolean;
            /**
             * Escalation procedures for engagement
             */
            escalationProcedures: boolean;
        };
    };
    taxonomyAlignment?: {
        /**
         * EU Taxonomy environmental objectives
         *
         * @minItems 1
         */
        environmentalObjectives: [
            ("CLIMATE_CHANGE_MITIGATION" | "CLIMATE_CHANGE_ADAPTATION" | "WATER_MARINE_RESOURCES" | "CIRCULAR_ECONOMY" | "POLLUTION_PREVENTION" | "BIODIVERSITY_ECOSYSTEMS"),
            ...("CLIMATE_CHANGE_MITIGATION" | "CLIMATE_CHANGE_ADAPTATION" | "WATER_MARINE_RESOURCES" | "CIRCULAR_ECONOMY" | "POLLUTION_PREVENTION" | "BIODIVERSITY_ECOSYSTEMS")[]
        ];
        /**
         * Minimum percentage of taxonomy-aligned investments
         */
        minimumAlignmentPercentage: number;
        /**
         * Method for calculating taxonomy alignment
         */
        alignmentCalculationMethod: string;
        /**
         * Whether DNSH assessment is performed
         */
        doNoSignificantHarmAssessment: boolean;
        /**
         * Compliance with minimum safeguards
         */
        minimumSafeguardsCompliance: boolean;
        /**
         * Detailed breakdown by environmental objective
         */
        alignmentBreakdown?: {
            objective: "CLIMATE_CHANGE_MITIGATION" | "CLIMATE_CHANGE_ADAPTATION" | "WATER_MARINE_RESOURCES" | "CIRCULAR_ECONOMY" | "POLLUTION_PREVENTION" | "BIODIVERSITY_ECOSYSTEMS";
            alignmentPercentage: number;
            contributionDescription: string;
        }[];
    };
    sustainableInvestment?: {
        /**
         * Minimum percentage of sustainable investments
         */
        sustainableInvestmentMinimum: number;
        /**
         * Sustainability indicators used
         *
         * @minItems 1
         */
        sustainabilityIndicators: [string, ...string[]];
        /**
         * Methodology for measuring sustainable investment
         */
        measurementMethodology: string;
        /**
         * Data sources and processing methods
         */
        dataSourcesAndProcessing: string;
        /**
         * Limitations and caveats of the approach
         *
         * @minItems 1
         */
        limitationsAndCaveats: [string, ...string[]];
    };
    marketingMaterials?: {
        /**
         * Whether marketing materials promote ESG characteristics
         */
        promotesESGCharacteristics: boolean;
        /**
         * Whether sustainability claims are present
         */
        sustainabilityClaimsPresent: boolean;
        /**
         * Specific sustainability terms used
         */
        specificSustainabilityTerms: string[];
    };
    sustainabilityRiskIntegration: {
        /**
         * Process for identifying sustainability risks
         */
        identificationProcess: string;
        /**
         * Methodology for assessing sustainability risks
         */
        assessmentMethodology: string;
        /**
         * How sustainability risks are integrated in investment decisions
         */
        integrationInDecisionMaking: string;
    };
}
//# sourceMappingURL=types.d.ts.map