"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  FileText,
  Calendar,
  Filter,
  Lock,
  ExternalLink,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

type Report = {
  id: string;
  title: string;
  executive_summary: string;
  report_type: string;
  report_date: string;
  html_file_url: string | null;
};

const REPORT_TYPES = [
  { value: "all", label: "All Reports", code: "ALL" },
  { value: "lebanon-monitor", label: "Lebanon Monitor", code: "LBN" },
  { value: "market-insights", label: "Market Insights", code: "MKT" },
  { value: "arab-banking", label: "Arab Banking", code: "ARB" },
  { value: "new-economy", label: "New Economy", code: "NEW" },
];

export default function IntelligenceReportsPage() {
  const router = useRouter();
  const [user, setUser] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedType, setSelectedType] = useState("all");
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        if (!res.ok) {
          router.push("/auth/login?redirect=/intelligence-reports");
          return;
        }
        const data = await res.json();
        if (!data.user) {
          router.push("/auth/login?redirect=/intelligence-reports");
          return;
        }
        setUser(data.user);
        setLoading(false);
      } catch (err) {
        console.error("[v0] auth check failed:", err);
        router.push("/auth/login?redirect=/intelligence-reports");
      }
    };
    checkAuth();
  }, [router]);

  useEffect(() => {
    if (!user) return;
    fetchReports();
  }, [user, selectedType]);

  const fetchReports = async () => {
    try {
      const res = await fetch(`/api/reports?type=${selectedType}`);
      if (!res.ok) {
        if (res.status === 401) {
          router.push("/auth/login?redirect=/intelligence-reports");
          return;
        }
        throw new Error("Failed to fetch reports");
      }
      const data = await res.json();
      setReports(data);
      setError(null);
    } catch (err) {
      setError("Failed to load reports. Please try again.");
      console.error(err);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getTypeLabel = (type: string) => {
    const found = REPORT_TYPES.find((t) => t.value === type);
    return found ? found.label : type;
  };

  const getTypeCode = (type: string) => {
    const found = REPORT_TYPES.find((t) => t.value === type);
    return found ? found.code : "RPT";
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <RefreshCw className="mx-auto h-8 w-8 animate-spin text-primary" />
          <p className="mt-4 text-sm text-muted-foreground">
            Verifying access credentials...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-primary">[INTEL]</span>
                <h1 className="text-xl font-bold text-foreground">
                  Intelligence Reports
                </h1>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Exclusive market analysis and regional intelligence briefings
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Lock className="h-3 w-3" />
              <span>Authenticated Access</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Filters */}
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Filter className="h-3 w-3" />
            <span>Filter:</span>
          </div>
          {REPORT_TYPES.map((type) => (
            <button
              key={type.value}
              onClick={() => setSelectedType(type.value)}
              className={`border px-3 py-1.5 text-xs font-medium uppercase tracking-wide transition-colors ${
                selectedType === type.value
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:border-primary hover:text-primary"
              }`}
            >
              [{type.code}] {type.label}
            </button>
          ))}
        </div>

        {error && (
          <div className="mb-6 flex items-center gap-2 border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
            <AlertCircle className="h-4 w-4" />
            {error}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
          {/* Reports List */}
          <div className="space-y-4">
            {reports.length === 0 ? (
              <div className="border border-border bg-card p-8 text-center">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <p className="mt-4 text-sm text-muted-foreground">
                  No reports available for this category.
                </p>
              </div>
            ) : (
              reports.map((report) => (
                <button
                  key={report.id}
                  onClick={() => setSelectedReport(report)}
                  className={`w-full border p-4 text-left transition-colors ${
                    selectedReport?.id === report.id
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-semibold text-primary">
                          [{getTypeCode(report.report_type)}]
                        </span>
                        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                          {getTypeLabel(report.report_type)}
                        </span>
                      </div>
                      <h3 className="mt-1 text-sm font-semibold text-foreground leading-relaxed">
                        {report.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                        {report.executive_summary}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1 text-right">
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {formatDate(report.report_date)}
                      </div>
                      {report.html_file_url && (
                        <span className="text-[10px] text-primary">
                          Full Report Available
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>

          {/* Report Preview Panel */}
          <div className="sticky top-20 h-fit border border-border bg-card">
            <div className="border-b border-border bg-secondary/50 px-4 py-3">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Report Preview
                </span>
              </div>
            </div>
            {selectedReport ? (
              <div className="p-4">
                <div className="flex items-center gap-2 text-[10px]">
                  <span className="font-semibold text-primary">
                    [{getTypeCode(selectedReport.report_type)}]
                  </span>
                  <span className="uppercase tracking-widest text-muted-foreground">
                    {getTypeLabel(selectedReport.report_type)}
                  </span>
                </div>
                <h2 className="mt-2 text-lg font-bold leading-snug text-foreground">
                  {selectedReport.title}
                </h2>
                <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {formatDate(selectedReport.report_date)}
                </div>
                <div className="mt-4 border-t border-border pt-4">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                    Executive Summary
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground">
                    {selectedReport.executive_summary}
                  </p>
                </div>
                {selectedReport.html_file_url && (
                  <div className="mt-6">
                    <Link
                      href={selectedReport.html_file_url}
                      target="_blank"
                      className="flex w-full items-center justify-center gap-2 border border-primary bg-primary/10 px-4 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      <ExternalLink className="h-4 w-4" />
                      View Full Report
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <FileText className="h-12 w-12 text-muted-foreground/30" />
                <p className="mt-4 text-sm text-muted-foreground">
                  Select a report to view details
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
