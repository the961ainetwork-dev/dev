"use client";

import { useEffect, useState } from "react";
import { Loader2, Trash2, Edit3, Plus, X, Save } from "lucide-react";

type Service = {
  id: string;
  slug: string;
  title: string;
  short_description: string;
  long_description: string;
  icon: string | null;
  color: string | null;
  features: string[];
  benefits: string[];
  use_cases: string[];
  is_featured: boolean;
};

const empty: Partial<Service> = {
  slug: "",
  title: "",
  short_description: "",
  long_description: "",
  icon: "",
  color: "#ffffff",
  features: [],
  benefits: [],
  use_cases: [],
  is_featured: false,
};

export default function AdminServicesPage() {
  const [items, setItems] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Service> | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/services", { cache: "no-store" });
    const j = await res.json();
    setItems(j.items || []);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  function asLines(arr: unknown): string {
    return Array.isArray(arr) ? arr.join("\n") : String(arr || "");
  }
  function fromLines(s: string): string[] {
    return s.split("\n").map((x) => x.trim()).filter(Boolean);
  }

  async function save() {
    if (!editing) return;
    setSaving(true);
    setError(null);
    try {
      const payload = {
        ...editing,
        features: Array.isArray(editing.features) ? editing.features : fromLines(String(editing.features || "")),
        benefits: Array.isArray(editing.benefits) ? editing.benefits : fromLines(String(editing.benefits || "")),
        use_cases: Array.isArray(editing.use_cases) ? editing.use_cases : fromLines(String(editing.use_cases || "")),
      };
      const url = editing.id ? `/api/admin/services/${editing.id}` : "/api/admin/services";
      const method = editing.id ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Save failed");
      }
      setEditing(null);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this service?")) return;
    await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
    await load();
  }

  return (
    <div className="space-y-4">
      <div className="bbg-header text-xs">
        <div>ADMIN - Services ({items.length})</div>
        <div>CRUD</div>
      </div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold uppercase tracking-widest text-white">Services</h1>
        <button onClick={() => setEditing({ ...empty })} className="flex items-center gap-2 border border-primary bg-primary px-3 py-2 text-xs font-bold uppercase tracking-widest text-primary-foreground hover:bg-primary/90">
          <Plus className="h-3.5 w-3.5" /> New Service
        </button>
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
                <th>Slug</th>
                <th>Title</th>
                <th>Featured</th>
                <th>Color</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-xs text-muted-foreground">No services.</td>
                </tr>
              )}
              {items.map((s) => (
                <tr key={s.id}>
                  <td className="font-mono text-xs">{s.slug}</td>
                  <td className="text-xs text-foreground">{s.title}</td>
                  <td className={`text-xs ${s.is_featured ? "up" : "down"}`}>{s.is_featured ? "YES" : "NO"}</td>
                  <td>
                    <span className="inline-block h-3 w-6 border border-border" style={{ background: s.color || "#000" }} />
                    <span className="ml-2 font-mono text-[10px]">{s.color}</span>
                  </td>
                  <td>
                    <div className="flex justify-end gap-1">
                      <button onClick={() => setEditing(s)} className="border border-border p-1 hover:border-primary hover:text-primary"><Edit3 className="h-3.5 w-3.5" /></button>
                      <button onClick={() => remove(s.id)} className="border border-border p-1 hover:border-destructive hover:text-destructive"><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="w-full max-w-2xl border border-border bg-card">
            <div className="bbg-header text-xs">
              <div>{editing.id ? "Edit Service" : "New Service"}</div>
              <button onClick={() => setEditing(null)}><X className="h-3.5 w-3.5" /></button>
            </div>
            <div className="max-h-[80vh] space-y-3 overflow-y-auto p-4">
              <div className="grid grid-cols-2 gap-3">
                <Field label="Slug">
                  <input value={editing.slug || ""} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} className="w-full border border-border bg-background px-2 py-2 text-sm" />
                </Field>
                <Field label="Icon (lucide name)">
                  <input value={editing.icon || ""} onChange={(e) => setEditing({ ...editing, icon: e.target.value })} className="w-full border border-border bg-background px-2 py-2 text-sm" />
                </Field>
              </div>
              <Field label="Title">
                <input value={editing.title || ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="w-full border border-border bg-background px-2 py-2 text-sm" />
              </Field>
              <Field label="Short Description">
                <input value={editing.short_description || ""} onChange={(e) => setEditing({ ...editing, short_description: e.target.value })} className="w-full border border-border bg-background px-2 py-2 text-sm" />
              </Field>
              <Field label="Long Description">
                <textarea rows={5} value={editing.long_description || ""} onChange={(e) => setEditing({ ...editing, long_description: e.target.value })} className="w-full border border-border bg-background px-2 py-2 text-sm" />
              </Field>
              <Field label="Features (one per line)">
                <textarea rows={4} value={asLines(editing.features)} onChange={(e) => setEditing({ ...editing, features: e.target.value as unknown as string[] })} className="w-full border border-border bg-background px-2 py-2 text-sm" />
              </Field>
              <Field label="Benefits (one per line)">
                <textarea rows={4} value={asLines(editing.benefits)} onChange={(e) => setEditing({ ...editing, benefits: e.target.value as unknown as string[] })} className="w-full border border-border bg-background px-2 py-2 text-sm" />
              </Field>
              <Field label="Use Cases (one per line)">
                <textarea rows={4} value={asLines(editing.use_cases)} onChange={(e) => setEditing({ ...editing, use_cases: e.target.value as unknown as string[] })} className="w-full border border-border bg-background px-2 py-2 text-sm" />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Color (hex)">
                  <input value={editing.color || ""} onChange={(e) => setEditing({ ...editing, color: e.target.value })} className="w-full border border-border bg-background px-2 py-2 text-sm" />
                </Field>
                <label className="flex items-center gap-2 self-end text-xs uppercase tracking-widest">
                  <input type="checkbox" checked={editing.is_featured ?? false} onChange={(e) => setEditing({ ...editing, is_featured: e.target.checked })} />
                  Featured
                </label>
              </div>
              {error && <div className="border border-destructive/50 bg-destructive/10 px-3 py-2 text-xs text-destructive">{error}</div>}
            </div>
            <div className="flex items-center justify-end gap-2 border-t border-border bg-secondary/30 p-3">
              <button onClick={() => setEditing(null)} className="border border-border px-3 py-2 text-xs uppercase tracking-widest hover:border-primary hover:text-primary">Cancel</button>
              <button onClick={save} disabled={saving} className="flex items-center gap-2 border border-primary bg-primary px-3 py-2 text-xs font-bold uppercase tracking-widest text-primary-foreground hover:bg-primary/90 disabled:opacity-60">
                {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[10px] uppercase tracking-widest text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
