"use client";

import { useEffect, useState } from "react";
import { Loader2, Trash2, Edit3, Plus, X, Save } from "lucide-react";

type Section = {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  body: string | null;
  page: string;
  position: number;
  visible: boolean;
};

const empty: Partial<Section> = {
  slug: "",
  title: "",
  subtitle: "",
  body: "",
  page: "home",
  position: 0,
  visible: true,
};

export default function AdminSectionsPage() {
  const [items, setItems] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Section> | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/sections", { cache: "no-store" });
    const j = await res.json();
    setItems(j.items || []);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function save() {
    if (!editing) return;
    setSaving(true);
    setError(null);
    try {
      const url = editing.id ? `/api/admin/sections/${editing.id}` : "/api/admin/sections";
      const method = editing.id ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "content-type": "application/json" },
        body: JSON.stringify(editing),
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
    if (!confirm("Delete this section?")) return;
    await fetch(`/api/admin/sections/${id}`, { method: "DELETE" });
    await load();
  }

  return (
    <div className="space-y-4">
      <div className="bbg-header text-xs">
        <div>ADMIN - Sections ({items.length})</div>
        <div>CRUD</div>
      </div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold uppercase tracking-widest text-white">Sections</h1>
        <button
          onClick={() => setEditing({ ...empty })}
          className="flex items-center gap-2 border border-primary bg-primary px-3 py-2 text-xs font-bold uppercase tracking-widest text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-3.5 w-3.5" /> New Section
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
                <th>Page</th>
                <th>Pos</th>
                <th>Slug</th>
                <th>Title</th>
                <th>Visible</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-xs text-muted-foreground">
                    No sections yet.
                  </td>
                </tr>
              )}
              {items.map((s) => (
                <tr key={s.id}>
                  <td className="text-xs uppercase">{s.page}</td>
                  <td className="font-mono text-xs">{s.position}</td>
                  <td className="font-mono text-xs">{s.slug}</td>
                  <td className="max-w-md truncate text-xs text-foreground">{s.title}</td>
                  <td className={`text-xs ${s.visible ? "up" : "down"}`}>{s.visible ? "YES" : "NO"}</td>
                  <td>
                    <div className="flex justify-end gap-1">
                      <button onClick={() => setEditing(s)} className="border border-border p-1 hover:border-primary hover:text-primary">
                        <Edit3 className="h-3.5 w-3.5" />
                      </button>
                      <button onClick={() => remove(s.id)} className="border border-border p-1 hover:border-destructive hover:text-destructive">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
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
              <div>{editing.id ? "Edit Section" : "New Section"}</div>
              <button onClick={() => setEditing(null)}>
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="max-h-[80vh] space-y-3 overflow-y-auto p-4">
              <div className="grid grid-cols-2 gap-3">
                <Field label="Slug">
                  <input
                    value={editing.slug || ""}
                    onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
                    className="w-full border border-border bg-background px-2 py-2 text-sm"
                  />
                </Field>
                <Field label="Page">
                  <input
                    value={editing.page || "home"}
                    onChange={(e) => setEditing({ ...editing, page: e.target.value })}
                    className="w-full border border-border bg-background px-2 py-2 text-sm"
                  />
                </Field>
              </div>
              <Field label="Title">
                <input
                  value={editing.title || ""}
                  onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                  className="w-full border border-border bg-background px-2 py-2 text-sm"
                />
              </Field>
              <Field label="Subtitle">
                <input
                  value={editing.subtitle || ""}
                  onChange={(e) => setEditing({ ...editing, subtitle: e.target.value })}
                  className="w-full border border-border bg-background px-2 py-2 text-sm"
                />
              </Field>
              <Field label="Body">
                <textarea
                  rows={6}
                  value={editing.body || ""}
                  onChange={(e) => setEditing({ ...editing, body: e.target.value })}
                  className="w-full border border-border bg-background px-2 py-2 text-sm"
                />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Position">
                  <input
                    type="number"
                    value={editing.position ?? 0}
                    onChange={(e) => setEditing({ ...editing, position: Number(e.target.value) })}
                    className="w-full border border-border bg-background px-2 py-2 text-sm"
                  />
                </Field>
                <label className="flex items-center gap-2 self-end text-xs uppercase tracking-widest">
                  <input
                    type="checkbox"
                    checked={editing.visible ?? true}
                    onChange={(e) => setEditing({ ...editing, visible: e.target.checked })}
                  />
                  Visible
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
