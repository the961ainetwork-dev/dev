"use client";

import { useEffect, useState } from "react";
import { Loader2, Trash2, Download } from "lucide-react";

type Subscriber = {
  id: string;
  email: string;
  status: string;
  subscribed_at: string;
};

export default function AdminSubscribersPage() {
  const [items, setItems] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/subscribers", { cache: "no-store" });
    const j = await res.json();
    setItems(j.items || []);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function remove(id: string) {
    if (!confirm("Delete subscriber?")) return;
    await fetch(`/api/admin/subscribers/${id}`, { method: "DELETE" });
    await load();
  }

  async function toggleStatus(s: Subscriber) {
    const next = s.status === "active" ? "unsubscribed" : "active";
    await fetch(`/api/admin/subscribers/${s.id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    await load();
  }

  function exportCsv() {
    const rows = [["email", "status", "subscribed_at"], ...filtered.map((s) => [s.email, s.status, s.subscribed_at])];
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `subscribers-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const filtered = items.filter((s) => s.email.toLowerCase().includes(filter.toLowerCase()));
  const activeCount = items.filter((s) => s.status === "active").length;

  return (
    <div className="space-y-4">
      <div className="bbg-header text-xs">
        <div>ADMIN - Newsletter Subscribers ({items.length} total / {activeCount} active)</div>
        <div>READ</div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold uppercase tracking-widest text-white">Subscribers</h1>
        <div className="flex gap-2">
          <input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter by email..."
            className="border border-border bg-background px-2 py-2 text-xs"
          />
          <button onClick={exportCsv} className="flex items-center gap-2 border border-border px-3 py-2 text-xs uppercase tracking-widest hover:border-primary hover:text-primary">
            <Download className="h-3.5 w-3.5" /> Export CSV
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading...
        </div>
      ) : (
        <div className="overflow-x-auto border border-border bg-card">
          <table className="bbg-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Status</th>
                <th>Subscribed</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-xs text-muted-foreground">No subscribers.</td>
                </tr>
              )}
              {filtered.map((s) => (
                <tr key={s.id}>
                  <td className="font-mono text-xs text-foreground">{s.email}</td>
                  <td>
                    <button onClick={() => toggleStatus(s)} className={`text-xs uppercase ${s.status === "active" ? "up" : "down"}`}>
                      {s.status}
                    </button>
                  </td>
                  <td className="font-mono text-[11px] text-muted-foreground">
                    {new Date(s.subscribed_at).toISOString().slice(0, 16).replace("T", " ")}
                  </td>
                  <td>
                    <button onClick={() => remove(s.id)} className="border border-border p-1 hover:border-destructive hover:text-destructive">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
