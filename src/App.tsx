import { useState } from "react";

import {
  AlertCircle,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  FileCheck2,
  ShieldAlert,
  WalletCards,
} from "lucide-react";

import { AnalyticsHeader } from "./components/AnalyticsHeader";
import { DashboardSkeleton } from "./components/DashboardSkeleton";
import { EmptyState } from "./components/EmptyState";
import { KpiCard } from "./components/KpiCard";
import { SectionCard } from "./components/SectionCard";
import { StatusBadge } from "./components/StatusBadge";

import { ClaimsByPolicyTypeChart } from "./components/charts/ClaimsByPolicyTypeChart";
import { ClaimsByStatusChart } from "./components/charts/ClaimsByStatusChart";
import {ClaimsByTypeChart} from "./components/charts/ClaimsByTypeChart";
import { ClaimsMonthlyTrendChart } from "./components/charts/ClaimsMonthlyTrendChart";
import { HumanReviewChart } from "./components/charts/HumanReviewChart";

import { useAnalyticsDashboard } from "./hooks/useAnalyticsDashboard";

import {
  formatCurrency,
  formatDays,
  formatNumber,
  formatPercentage,
} from "./lib/formatters";

import type {
  ClaimStatusAnalytics,
  CustomerClaimsAnalytics,
  ProcessingAnalytics,
  SettlementAnalytics,
} from "./types/analytics";


function App() {
  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useAnalyticsDashboard();

  const [tokenInput, setTokenInput] =
    useState("");

  const token =
    localStorage.getItem(
      "insurance_analytics_token",
    );

  function handleSaveToken() {
    const cleanToken =
      tokenInput.trim();

    if (!cleanToken) {
      return;
    }

    localStorage.setItem(
      "insurance_analytics_token",
      cleanToken,
    );

    window.location.reload();
  }

  function handleLogout() {
    localStorage.removeItem(
      "insurance_analytics_token",
    );

    window.location.reload();
  }

  if (!token) {
    return (
      <TokenSetup
        value={tokenInput}
        onChange={setTokenInput}
        onSubmit={handleSaveToken}
      />
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <AnalyticsHeader
          isRefreshing={false}
          onRefresh={() => undefined}
          onLogout={handleLogout}
        />

        <DashboardSkeleton />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="min-h-screen bg-slate-50">
        <AnalyticsHeader
          isRefreshing={isFetching}
          onRefresh={() => {
            void refetch();
          }}
          onLogout={handleLogout}
        />

        <main className="mx-auto flex min-h-[70vh] max-w-xl items-center justify-center px-4">
          <div className="w-full rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>

            <h2 className="mt-4 text-lg font-semibold text-slate-900">
              Unable to load analytics
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Check that Django is running,
              the analytics API is reachable,
              and the current token has
              analytics access.
            </p>

            {error instanceof Error && (
              <p className="mt-3 break-all rounded-lg bg-slate-50 p-3 text-left text-xs text-slate-600">
                {error.message}
              </p>
            )}

            <div className="mt-5 flex justify-center gap-2">
              <button
                type="button"
                onClick={() => {
                  void refetch();
                }}
                className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                Try again
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Change token
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const overview =
    data.overview;

  return (
    <div className="min-h-screen bg-slate-50">
      <AnalyticsHeader
        isRefreshing={isFetching}
        onRefresh={() => {
          void refetch();
        }}
        onLogout={handleLogout}
      />

      <main className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">

        {/* =========================================================
            PRIMARY KPI CARDS
        ========================================================= */}

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <KpiCard
            title="Total Claims"
            value={formatNumber(
              overview.total_claims,
            )}
            subtitle={`${formatNumber(
              overview.closed_claims,
            )} closed`}
            icon={FileCheck2}
          />

          <KpiCard
            title="Estimated Loss"
            value={formatCurrency(
              overview.total_estimated_loss,
            )}
            subtitle={`Average ${formatCurrency(
              overview.avg_estimated_loss,
            )}`}
            icon={CircleDollarSign}
          />

          <KpiCard
            title="Approved Amount"
            value={formatCurrency(
              overview.total_approved_amount,
            )}
            subtitle={`Average ${formatCurrency(
              overview.avg_approved_amount,
            )}`}
            icon={CheckCircle2}
          />

          <KpiCard
            title="Settlement Amount"
            value={formatCurrency(
              overview.total_settlement_amount,
            )}
            subtitle={`${formatNumber(
              overview.settled_claims,
            )} settled`}
            icon={WalletCards}
          />
        </section>


        {/* =========================================================
            SECONDARY KPI CARDS
        ========================================================= */}

        <section className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <KpiCard
            title="Settlement Rate"
            value={formatPercentage(
              overview.settlement_rate,
            )}
            subtitle="Settled claims / total claims"
            icon={WalletCards}
          />

          <KpiCard
            title="Average Processing"
            value={formatDays(
              overview.avg_processing_days,
            )}
            subtitle="Claim creation to settlement"
            icon={Clock3}
          />

          <KpiCard
            title="AI Human Review"
            value={formatNumber(
              overview.ai_review_required_claims,
            )}
            subtitle="Claims flagged for review"
            icon={ShieldAlert}
          />

          <KpiCard
            title="Closed Claims"
            value={formatNumber(
              overview.closed_claims,
            )}
            subtitle="Claims in final CLOSED state"
            icon={CheckCircle2}
          />
        </section>


        {/* =========================================================
            CLAIM TREND + STATUS
        ========================================================= */}

        <section className="mt-6 grid gap-6 xl:grid-cols-2">

          <SectionCard
            title="Claims Trend"
            description="Claim volume and estimated loss by incident month"
          >
            {data.monthly_trend.length > 0 ? (
              <ClaimsMonthlyTrendChart
                data={data.monthly_trend}
              />
            ) : (
              <EmptyState
                message="No monthly trend data available."
              />
            )}
          </SectionCard>


          <SectionCard
            title="Claims by Status"
            description="Current claim lifecycle distribution"
          >
            {data.claims_by_status.length > 0 ? (
              <ClaimsByStatusChart
                data={data.claims_by_status}
              />
            ) : (
              <EmptyState
                message="No claim status data available."
              />
            )}
          </SectionCard>

        </section>


        {/* =========================================================
            STATUS DETAIL
        ========================================================= */}

        <section className="mt-6">

          <SectionCard
            title="Claim Status Details"
            description="Current number of claims in each workflow state"
          >
            <StatusTable
              data={data.claims_by_status}
            />
          </SectionCard>

        </section>


        {/* =========================================================
            CLAIM TYPE + POLICY TYPE
        ========================================================= */}

        <section className="mt-6 grid gap-6 xl:grid-cols-2">

          <SectionCard
            title="Claims by Type"
            description="Distribution of claims by claim type"
          >
            {data.claims_by_type.length > 0 ? (
              <ClaimsByTypeChart
                data={data.claims_by_type}
              />
            ) : (
              <EmptyState
                message="No claim type data available."
              />
            )}
          </SectionCard>


          <SectionCard
            title="Claims by Policy Type"
            description="Claim distribution across policy categories"
          >
            {data.claims_by_policy_type.length > 0 ? (
              <ClaimsByPolicyTypeChart
                data={
                  data.claims_by_policy_type
                }
              />
            ) : (
              <EmptyState
                message="No policy type data available."
              />
            )}
          </SectionCard>

        </section>


        {/* =========================================================
            AI + SETTLEMENT
        ========================================================= */}

        <section className="mt-6 grid gap-6 xl:grid-cols-2">

          <SectionCard
            title="AI Human Review"
            description="Claims flagged by the AI pipeline"
          >
            {data.ai.length > 0 ? (
              <HumanReviewChart
                data={data.ai}
              />
            ) : (
              <EmptyState
                message="No AI analytics available."
              />
            )}
          </SectionCard>


          <SectionCard
            title="Settlement Analytics"
            description="Settlement amounts compared with estimated loss"
          >
            <SettlementTable
              data={data.settlement}
            />
          </SectionCard>

        </section>


        {/* =========================================================
            PROCESSING
        ========================================================= */}

        <section className="mt-6">

          <SectionCard
            title="Processing Performance"
            description="Claim turnaround statistics by claim type"
          >
            <ProcessingTable
              data={data.processing}
            />
          </SectionCard>

        </section>


        {/* =========================================================
            CUSTOMERS
        ========================================================= */}

        <section className="mt-6">

          <SectionCard
            title="Customer Claims"
            description="Customer-level claim activity and financial metrics"
          >
            <CustomerTable
              data={data.customer_claims}
            />
          </SectionCard>

        </section>


        {/* =========================================================
            FOOTER
        ========================================================= */}

        <footer className="py-8 text-center text-xs text-slate-400">
          Analytics powered by Django REST API
          and Snowflake.
        </footer>

      </main>
    </div>
  );
}


/* ===============================================================
   STATUS TABLE
=============================================================== */

function StatusTable({
  data,
}: {
  data: ClaimStatusAnalytics[];
}) {
  if (data.length === 0) {
    return (
      <EmptyState
        message="No status data available."
      />
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-left text-xs uppercase tracking-wide text-slate-500">
            <th className="px-3 py-3">
              Status
            </th>

            <th className="px-3 py-3 text-right">
              Claims
            </th>

            <th className="px-3 py-3 text-right">
              Estimated Loss
            </th>

            <th className="px-3 py-3 text-right">
              Approved
            </th>

            <th className="px-3 py-3 text-right">
              Settlement
            </th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr
              key={item.claim_status}
              className="border-b border-slate-100 last:border-0"
            >
              <td className="px-3 py-3">
                <StatusBadge
                  status={item.claim_status}
                />
              </td>

              <td className="px-3 py-3 text-right font-medium text-slate-800">
                {formatNumber(
                  item.total_claims,
                )}
              </td>

              <td className="px-3 py-3 text-right text-slate-600">
                {formatCurrency(
                  item.total_estimated_loss,
                )}
              </td>

              <td className="px-3 py-3 text-right text-slate-600">
                {formatCurrency(
                  item.total_approved_amount,
                )}
              </td>

              <td className="px-3 py-3 text-right text-slate-600">
                {formatCurrency(
                  item.total_settlement_amount,
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


/* ===============================================================
   SETTLEMENT TABLE
=============================================================== */

function SettlementTable({
  data,
}: {
  data: SettlementAnalytics[];
}) {
  if (data.length === 0) {
    return (
      <EmptyState
        message="No settlement data available."
      />
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-left text-xs uppercase tracking-wide text-slate-500">
            <th className="px-3 py-3">
              Type
            </th>

            <th className="px-3 py-3 text-right">
              Claims
            </th>

            <th className="px-3 py-3 text-right">
              Settled
            </th>

            <th className="px-3 py-3 text-right">
              Settlement
            </th>

            <th className="px-3 py-3 text-right">
              Ratio
            </th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr
              key={item.claim_type_code}
              className="border-b border-slate-100 last:border-0"
            >
              <td className="px-3 py-3 font-medium text-slate-800">
                {item.claim_type_name}
              </td>

              <td className="px-3 py-3 text-right text-slate-600">
                {formatNumber(
                  item.total_claims,
                )}
              </td>

              <td className="px-3 py-3 text-right text-slate-600">
                {formatNumber(
                  item.settled_financial_records,
                )}
              </td>

              <td className="px-3 py-3 text-right font-medium text-slate-800">
                {formatCurrency(
                  item.total_settlement_amount,
                )}
              </td>

              <td className="px-3 py-3 text-right text-slate-600">
                {formatPercentage(
                  item.settlement_to_estimated_ratio,
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


/* ===============================================================
   PROCESSING TABLE
=============================================================== */

function ProcessingTable({
  data,
}: {
  data: ProcessingAnalytics[];
}) {
  if (data.length === 0) {
    return (
      <EmptyState
        message="No processing analytics available."
      />
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-left text-xs uppercase tracking-wide text-slate-500">
            <th className="px-3 py-3">
              Claim Type
            </th>

            <th className="px-3 py-3 text-right">
              Claims
            </th>

            <th className="px-3 py-3 text-right">
              Average
            </th>

            <th className="px-3 py-3 text-right">
              Min
            </th>

            <th className="px-3 py-3 text-right">
              Max
            </th>

            <th className="px-3 py-3 text-right">
              ≤ 3 Days
            </th>

            <th className="px-3 py-3 text-right">
              ≤ 7 Days
            </th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr
              key={item.claim_type_code}
              className="border-b border-slate-100 last:border-0"
            >
              <td className="px-3 py-3 font-medium text-slate-800">
                {item.claim_type_name}
              </td>

              <td className="px-3 py-3 text-right">
                {formatNumber(
                  item.total_claims,
                )}
              </td>

              <td className="px-3 py-3 text-right">
                {formatDays(
                  item.avg_processing_days,
                )}
              </td>

              <td className="px-3 py-3 text-right">
                {formatDays(
                  item.min_processing_days,
                )}
              </td>

              <td className="px-3 py-3 text-right">
                {formatDays(
                  item.max_processing_days,
                )}
              </td>

              <td className="px-3 py-3 text-right">
                {formatNumber(
                  item.claims_processed_within_3_days,
                )}
              </td>

              <td className="px-3 py-3 text-right">
                {formatNumber(
                  item.claims_processed_within_7_days,
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


/* ===============================================================
   CUSTOMER TABLE
=============================================================== */

function CustomerTable({
  data,
}: {
  data: CustomerClaimsAnalytics[];
}) {
  if (data.length === 0) {
    return (
      <EmptyState
        message="No customer claim data available."
      />
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-left text-xs uppercase tracking-wide text-slate-500">
            <th className="px-3 py-3">
              Customer
            </th>

            <th className="px-3 py-3">
              Location
            </th>

            <th className="px-3 py-3 text-right">
              Claims
            </th>

            <th className="px-3 py-3 text-right">
              Estimated Loss
            </th>

            <th className="px-3 py-3 text-right">
              Approved
            </th>

            <th className="px-3 py-3 text-right">
              Settled
            </th>

            <th className="px-3 py-3 text-right">
              AI Review
            </th>
          </tr>
        </thead>

        <tbody>
          {data.map((customer) => (
            <tr
              key={customer.customer_number}
              className="border-b border-slate-100 last:border-0"
            >
              <td className="px-3 py-3">
                <div className="font-medium text-slate-800">
                  {customer.first_name}{" "}
                  {customer.last_name}
                </div>

                <div className="text-xs text-slate-500">
                  {customer.customer_number}
                </div>
              </td>

              <td className="px-3 py-3 text-slate-600">
                {customer.city || "—"}

                {customer.state
                  ? `, ${customer.state}`
                  : ""}
              </td>

              <td className="px-3 py-3 text-right">
                {formatNumber(
                  customer.total_claims,
                )}
              </td>

              <td className="px-3 py-3 text-right">
                {formatCurrency(
                  customer.total_estimated_loss,
                )}
              </td>

              <td className="px-3 py-3 text-right">
                {formatCurrency(
                  customer.total_approved_amount,
                )}
              </td>

              <td className="px-3 py-3 text-right">
                {formatCurrency(
                  customer.total_settlement_amount,
                )}
              </td>

              <td className="px-3 py-3 text-right">
                {customer.ai_review_required_claims >
                0 ? (
                  <span className="font-medium text-amber-600">
                    {
                      customer.ai_review_required_claims
                    }
                  </span>
                ) : (
                  <span className="text-slate-400">
                    0
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


/* ===============================================================
   TOKEN SETUP
=============================================================== */

interface TokenSetupProps {
  value: string;
  onChange: (
    value: string,
  ) => void;
  onSubmit: () => void;
}

function TokenSetup({
  value,
  onChange,
  onSubmit,
}: TokenSetupProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">

      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">

        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900">
          <ShieldAlert className="h-6 w-6 text-white" />
        </div>

        <h1 className="mt-5 text-center text-xl font-bold text-slate-900">
          Analytics Authentication
        </h1>

        <p className="mt-2 text-center text-sm text-slate-500">
          Enter a Django TokenAuthentication
          token with analytics access.
        </p>

        <label
          htmlFor="api-token"
          className="mt-6 block text-sm font-medium text-slate-700"
        >
          API Token
        </label>

        <input
          id="api-token"
          type="password"
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              onSubmit();
            }
          }}
          placeholder="Paste your token"
          autoComplete="off"
          className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-100"
        />

        <button
          type="button"
          onClick={onSubmit}
          disabled={!value.trim()}
          className="mt-4 w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Open Analytics
        </button>

        <p className="mt-4 text-center text-xs text-slate-400">
          The token is stored in this browser's
          local storage.
        </p>

      </div>
    </div>
  );
}

export default App;