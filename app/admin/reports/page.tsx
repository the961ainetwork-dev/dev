"use client";

import { useState, useEffect } from "react";
import {
  FileText,
  Plus,
  Pencil,
  Trash2,
  X,
  Save,
  Calendar,
  AlertCircle,
} from "lucide-react";

type Report = {
  id: string;
  title: string;
  executive_summary: string;
  report_type: string;
  report_date: string;
  html_file_url: string | null;
  created_at: string;
};

const REPORT_TYPES = [
  { value: "lebanon-monitor", label: "Lebanon Monitor" },
  { value: "market-insights", label: "Market Insights" },
  { value: "arab-banking", label: "Arab Banking" },
  { value: "new-economy", label: "New Economy" },
];

const emptyReport = {
  title: "",
  executive_summary: "",
  report_type: "lebanon-monitor",
  report_date: new Date().toISOString().split("T")[0],
  html_file_url: "",
};

export default function AdminReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(emptyReport);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await fetch("/api/admin/reports");
      if (!res.ok) throw new Error("Failed to fetch reports");
      const data = await res.json();
      setReports(data);
      setError(null);
    } catch (err) {
      setError("Failed to load reports");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    try {
      const res = await fetch("/api/admin/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to create report");
      setCreating(false);
      setForm(emptyReport);
      fetchReports();
    } catch (err) {
      setError("Failed to create report");
      console.error(err);
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/reports/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to update report");
      setEditing(null);
      setForm(emptyReport);
      fetchReports();
    } catch (err) {
      setError("Failed to update report");
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this report?")) return;
    try {
      const res = await fetch(`/api/admin/reports/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete report");
      fetchReports();
    } catch (err) {
      setError("Failed to delete report");
      console.error(err);
    }
  };

  const startEdit = (report: Report) => {
    setEditing(report.id);
    setCreating(false);
    setForm({
      title: report.title,
      executive_summary: report.executive_summary,
      report_type: report.report_type,
      report_date: report.report_date,
      html_file_url: report.html_file_url || "",
    });
  };

  const startCreate = () => {
    setCreating(true);
    setEditing(null);
    setForm(emptyReport);
  };

  const cancelEdit = () => {
    setEditing(null);
    setCreating(false);
    setForm(emptyReport);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-muted-foreground">Loading reports...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-primary">[RPTS]</span>
            <h1 className="text-lg font-bold text-foreground">
              Intelligence Reports
            </h1>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Manage newsletter reports and intelligence briefings
          </p>
        </div>
        <button
          onClick={startCreate}
          className="flex items-center gap-2 border border-primary bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          <Plus className="h-4 w-4" />
          New Report
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-2 border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
          <AlertCircle className="h-4 w-4" />
          {error}
          <button onClick={() => setError(null)} className="ml-auto">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Create/Edit Form */}
      {(creating || editing) && (
        <div className="border border-primary/50 bg-card p-4">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              {creating ? "New Report" : "Edit Report"}
            </span>
            <button onClick={cancelEdit} className="text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-1 block text-[10px] uppercase tracking-widest text-muted-foreground">
                Title
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
                placeholder="Report title..."
              />
            </div>
            <div>
              <label className="mb-1 block text-[10px] uppercase tracking-widest text-muted-foreground">
                Report Type
              </label>
              <select
                value={form.report_type}
                onChange={(e) => setForm({ ...form, report_type: e.target.value })}
                className="w-full border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
              >
                {REPORT_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-[10px] uppercase tracking-widest text-muted-foreground">
                Report Date
              </label>
              <input
                type="date"
                value={form.report_date}
                onChange={(e) => setForm({ ...form, report_date: e.target.value })}
                className="w-full border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="mb-1 block text-[10px] uppercase tracking-widest text-muted-foreground">
                Executive Summary
              </label>
              <textarea
                value={form.executive_summary}
                onChange={(e) => setForm({ ...form, executive_summary: e.target.value })}
                rows={4}
                className="w-full border border-border bg-background px-3 py-2 text-sm leading-relaxed text-foreground focus:border-primary focus:outline-none"
                placeholder="Brief summary of the report..."
              />
            </div>
            <div className="md:col-span-2">
              <label className="mb-1 block text-[10px] uppercase tracking-widest text-muted-foreground">
                HTML File URL (optional)
              </label>
              <input
                type="url"
                value={form.html_file_url}
                onChange={(e) => setForm({ ...form, html_file_url: e.target.value })}
                className="w-full border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
                placeholder="https://..."
              />
              <p className="mt-1 text-[10px] text-muted-foreground">
                Upload the HTML report to Vercel Blob or another hosting service and paste the URL here
              </p>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => (editing ? handleUpdate(editing) : handleCreate())}
              className="flex items-center gap-2 border border-primary bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-widest text-primary-foreground hover:bg-primary/90"
            >
              <Save className="h-4 w-4" />
              {editing ? "Update" : "Create"}
            </button>
            <button
              onClick={cancelEdit}
              className="border border-border px-4 py-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground hover:border-primary hover:text-primary"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Reports Table */}
      <div className="border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50 text-[10px] uppercase tracking-widest text-muted-foreground">
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Has File</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                    <FileText className="mx-auto h-8 w-8 text-muted-foreground/30" />
                    <p className="mt-2">No reports yet. Create your first one.</p>
                  </td>
                </tr>
              ) : (
                reports.map((report) => (
                  <tr key={report.id} className="border-b border-border last:border-0 hover:bg-secondary/30">
                    <td className="px-4 py-3">
                      <p className="font-medium text-foreground line-clamp-1">{report.title}</p>
                      <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                        {report.executive_summary}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-primary">
                        {REPORT_TYPES.find((t) => t.value === report.report_type)?.label || report.report_type}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {formatDate(report.report_date)}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {report.html_file_url ? (
                        <span className="text-xs text-green-500">Yes</span>
                      ) : (
                        <span className="text-xs text-muted-foreground">No</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => startEdit(report)}
                          className="p-1 text-muted-foreground hover:text-primary"
                          title="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(report.id)}
                          className="p-1 text-muted-foreground hover:text-destructive"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
