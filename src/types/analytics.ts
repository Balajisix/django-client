export interface ClaimOverview {
  total_claims: number;
  claim_count: number;

  total_estimated_loss: string;
  total_approved_amount: string;
  total_settlement_amount: string;

  avg_estimated_loss: string | null;
  avg_approved_amount: string | null;
  avg_settlement_amount: string | null;

  avg_processing_days: number | null;

  ai_review_required_claims: number;

  settled_claims: number;
  closed_claims: number;

  settlement_rate: string;
}

export interface ClaimTypeAnalytics {
  claim_type_code: string;
  claim_type_name: string;

  total_claims: number;

  total_estimated_loss: string | null;
  total_approved_amount: string | null;
  total_settlement_amount: string | null;

  avg_estimated_loss: string | null;
  avg_processing_days: number | null;

  ai_review_required_claims: number;
}

export interface ClaimStatusAnalytics {
  claim_status: string;

  total_claims: number;

  total_estimated_loss: string | null;
  total_approved_amount: string | null;
  total_settlement_amount: string | null;

  avg_processing_days: number | null;
}

export interface MonthlyClaimTrend {
  incident_year: number;
  incident_month: number;
  month_start: string;

  total_claims: number;

  total_estimated_loss: string | null;
  total_approved_amount: string | null;
  total_settlement_amount: string | null;

  avg_processing_days: number | null;
}

export interface PolicyTypeAnalytics {
  policy_type: string;

  total_claims: number;

  total_estimated_loss: string | null;
  total_approved_amount: string | null;
  total_settlement_amount: string | null;

  avg_estimated_loss: string | null;
  avg_processing_days: number | null;
}

export interface ProcessingAnalytics {
  claim_type_code: string;
  claim_type_name: string;

  total_claims: number;

  avg_processing_days: number | null;
  min_processing_days: number | null;
  max_processing_days: number | null;

  claims_processed_within_3_days: number;
  claims_processed_within_7_days: number;
}

export interface SettlementAnalytics {
  claim_type_code: string;
  claim_type_name: string;

  total_claims: number;
  settled_financial_records: number;

  total_estimated_loss: string | null;
  total_approved_amount: string | null;
  total_settlement_amount: string | null;

  settlement_to_estimated_ratio: string | null;
}

export interface AIAnalytics {
  claim_type_code: string;
  claim_type_name: string;

  total_claims: number;

  human_review_required: number;
  human_review_not_required: number;

  human_review_rate: string;
}

export interface CustomerClaimsAnalytics {
  customer_number: string;

  first_name: string;
  last_name: string;

  city: string | null;
  state: string | null;

  total_claims: number;

  total_estimated_loss: string | null;
  total_approved_amount: string | null;
  total_settlement_amount: string | null;

  avg_processing_days: number | null;

  ai_review_required_claims: number;
}

export interface ClaimsDashboard {
  overview: ClaimOverview;

  claims_by_type: ClaimTypeAnalytics[];
  claims_by_status: ClaimStatusAnalytics[];
  monthly_trend: MonthlyClaimTrend[];
  claims_by_policy_type: PolicyTypeAnalytics[];

  processing: ProcessingAnalytics[];
  settlement: SettlementAnalytics[];
  ai: AIAnalytics[];

  customer_claims: CustomerClaimsAnalytics[];
}