"use client";

import { useEffect, useState } from "react";
import { Loader2, Trash2 } from "lucide-react";

type Contact = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  message: string;
  service_interest: string | null;
  status: string;
  created_at: string;
};

export default function AdminContactsPage() {
  const [items, setItems] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState<Contact | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/contacts", { cache: "no-store" });
    const j = await res.json();
    setItems(j.items || []);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function remove(id: string) {
    if (!confirm("Delete this submission?")) return;
    await fetch(`/api/admin/contacts/${id}`, { method: "DELETE" });
    await load();
  }

  async function setStatus(id: string, status: string) {
    await fetch(`/api/admin/contacts/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ status }),
    });
    await load();
    if (open && open.id === id) setOpen({ ...open, status });
  }

  return (
    <div className="space-y-4">
      <div className="bbg-header text-xs">
        <div>ADMIN - Contact Submissions ({items.length})</div>
        <div>INBOX</div>
      </div>
      <h1 className="text-2xl font-bold uppercase tracking-widest text-white">Contact Submissions</h1>

      {loading ? (
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading...
        </div>
      ) : (
        <div className="overflow-x-auto border border-border bg-card">
          <table className="bbg-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Company</th>
                <th>Service</th>
                <th>Status</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && (
                <tr><td colSpan={7} className="py-6 text-center text-xs text-muted-foreground">No submissions yet.</td></tr>
              )}
              {items.map((c) => (
                <tr key={c.id} className="cursor-pointer hover:bg-secondary" onClick={() => setOpen(c)}>
                  <td className="text-xs text-foreground">{c.name}</td>
                  <td className="ticker text-xs">{c.email}</td>
                  <td className="text-xs">{c.company || "-"}</td>
                  <td className="text-xs">{c.service_interest || "-"}</td>
                  <td className={`text-xs uppercase ${c.status === "new" ? "up" : ""}`}>{c.status}</td>
                  <td className="font-mono text-[11px] text-muted-foreground">
                    {new Date(c.created_at).toISOString().slice(0, 16).replace("T", " ")}
                  </td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <button onClick={() => remove(c.id)} className="border border-border p-1 hover:border-destructive hover:text-destructive">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={() => setOpen(null)}>
          <div className="w-full max-w-xl border border-border bg-card" onClick={(e) => e.stopPropagation()}>
            <div className="bbg-header text-xs">
              <div>Submission - {open.name}</div>
              <div>DETAIL</div>
            </div>
            <div className="space-y-3 p-4 text-sm">
              <p><span className="text-[10px] uppercase tracking-widest text-muted-foreground">From: </span>{open.name} &lt;{open.email}&gt;</p>
              {open.company && <p><span className="text-[10px] uppercase tracking-widest text-muted-foreground">Company: </span>{open.company}</p>}
              {open.service_interest && <p><span className="text-[10px] uppercase tracking-widest text-muted-foreground">Service: </span>{open.service_interest}</p>}
              <div>
                <p className="mb-1 text-[10px] uppercase tracking-widest text-muted-foreground">Message</p>
                <p className="whitespace-pre-wrap border border-border bg-background p-3 text-foreground">{open.message}</p>
              </div>
              <div className="flex flex-wrap gap-2 border-t border-border pt-3">
                {["new", "in_progress", "resolved", "archived"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatus(open.id, s)}
                    className={`border px-3 py-1.5 text-[11px] uppercase tracking-widest ${open.status === s ? "border-primary bg-primary text-primary-foreground" : "border-border text-foreground hover:border-primary hover:text-primary"}`}
                  >
                    {s.replace("_", " ")}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
