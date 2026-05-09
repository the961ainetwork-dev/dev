"use client";

import { useEffect, useState } from "react";
import { Loader2, Trash2, Edit3, Plus, X, Save } from "lucide-react";

type NewsStory = {
  id: string;
  headline: string;
  summary: string;
  content: string | null;
  category: string;
  region: string;
  priority: string;
  source: string | null;
  tags: string[];
  published: boolean;
  timestamp: string;
};

const empty: Partial<NewsStory> = {
  headline: "",
  summary: "",
  content: "",
  category: "markets",
  region: "global",
  priority: "normal",
  source: "",
  tags: [],
  published: true,
};

export default function AdminNewsPage() {
  const [items, setItems] = useState<NewsStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<NewsStory> | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/news", { cache: "no-store" });
    const j = await res.json();
    setItems(j.items || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function save() {
    if (!editing) return;
    setSaving(true);
    setError(null);
    try {
      const tagsArr = Array.isArray(editing.tags)
        ? editing.tags
        : String((editing as { tags?: string }).tags || "")
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);

      const payload = { ...editing, tags: tagsArr };
      const url = editing.id ? `/api/admin/news/${editing.id}` : "/api/admin/news";
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
    if (!confirm("Delete this story?")) return;
    await fetch(`/api/admin/news/${id}`, { method: "DELETE" });
    await load();
  }

  return (
    <div className="space-y-4">
      <div className="bbg-header text-xs">
        <div>ADMIN - News Stories ({items.length})</div>
        <div>CRUD</div>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold uppercase tracking-widest text-white">News Stories</h1>
        <button
          onClick={() => setEditing({ ...empty })}
          className="flex items-center gap-2 border border-primary bg-primary px-3 py-2 text-xs font-bold uppercase tracking-widest text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-3.5 w-3.5" /> New Story
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
                <th>Headline</th>
                <th>Category</th>
                <th>Region</th>
                <th>Priority</th>
                <th>Pub</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-6 text-center text-xs text-muted-foreground">
                    No stories yet. Click "New Story" to add one.
                  </td>
                </tr>
              )}
              {items.map((n) => (
                <tr key={n.id}>
                  <td className="max-w-md truncate font-mono text-xs text-foreground">{n.headline}</td>
                  <td className="text-xs uppercase">{n.category}</td>
                  <td className="text-xs uppercase">{n.region}</td>
                  <td className={`text-xs uppercase ${n.priority === "urgent" ? "down" : ""}`}>
                    {n.priority}
                  </td>
                  <td className={`text-xs ${n.published ? "up" : "down"}`}>
                    {n.published ? "YES" : "NO"}
                  </td>
                  <td className="font-mono text-[11px] text-muted-foreground">
                    {new Date(n.timestamp).toISOString().slice(0, 16).replace("T", " ")}
                  </td>
                  <td>
                    <div className="flex justify-end gap-1">
                      <button
                        onClick={() => setEditing({ ...n, tags: n.tags || [] })}
                        className="border border-border p-1 hover:border-primary hover:text-primary"
                        title="Edit"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => remove(n.id)}
                        className="border border-border p-1 hover:border-destructive hover:text-destructive"
                        title="Delete"
                      >
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
              <div>{editing.id ? "Edit Story" : "New Story"}</div>
              <button onClick={() => setEditing(null)}>
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="max-h-[80vh] space-y-3 overflow-y-auto p-4">
              <Field label="Headline">
                <input
                  type="text"
                  value={editing.headline || ""}
                  onChange={(e) => setEditing({ ...editing, headline: e.target.value })}
                  className="w-full border border-border bg-background px-2 py-2 text-sm"
                />
              </Field>
              <Field label="Summary">
                <textarea
                  rows={2}
                  value={editing.summary || ""}
                  onChange={(e) => setEditing({ ...editing, summary: e.target.value })}
                  className="w-full border border-border bg-background px-2 py-2 text-sm"
                />
              </Field>
              <Field label="Content (full body)">
                <textarea
                  rows={6}
                  value={editing.content || ""}
                  onChange={(e) => setEditing({ ...editing, content: e.target.value })}
                  className="w-full border border-border bg-background px-2 py-2 text-sm"
                />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Category">
                  <select
                    value={editing.category || "markets"}
                    onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                    className="w-full border border-border bg-background px-2 py-2 text-sm"
                  >
                    {["breaking","markets","banking","economy","politics","energy","technology","analysis"].map(c=>(<option key={c} value={c}>{c}</option>))}
                  </select>
                </Field>
                <Field label="Region">
                  <select
                    value={editing.region || "global"}
                    onChange={(e) => setEditing({ ...editing, region: e.target.value })}
                    className="w-full border border-border bg-background px-2 py-2 text-sm"
                  >
                    {["global","mena","gcc","lebanon","emerging"].map(c=>(<option key={c} value={c}>{c}</option>))}
                  </select>
                </Field>
                <Field label="Priority">
                  <select
                    value={editing.priority || "normal"}
                    onChange={(e) => setEditing({ ...editing, priority: e.target.value })}
                    className="w-full border border-border bg-background px-2 py-2 text-sm"
                  >
                    {["urgent","high","normal"].map(c=>(<option key={c} value={c}>{c}</option>))}
                  </select>
                </Field>
                <Field label="Source">
                  <input
                    type="text"
                    value={editing.source || ""}
                    onChange={(e) => setEditing({ ...editing, source: e.target.value })}
                    className="w-full border border-border bg-background px-2 py-2 text-sm"
                  />
                </Field>
              </div>
              <Field label="Tags (comma separated)">
                <input
                  type="text"
                  value={Array.isArray(editing.tags) ? editing.tags.join(", ") : (editing.tags as unknown as string) || ""}
                  onChange={(e) => setEditing({ ...editing, tags: e.target.value as unknown as string[] })}
                  className="w-full border border-border bg-background px-2 py-2 text-sm"
                />
              </Field>
              <Field label="Timestamp">
                <input
                  type="datetime-local"
                  value={(editing.timestamp || new Date().toISOString()).slice(0, 16)}
                  onChange={(e) => setEditing({ ...editing, timestamp: new Date(e.target.value).toISOString() })}
                  className="w-full border border-border bg-background px-2 py-2 text-sm"
                />
              </Field>
              <label className="flex items-center gap-2 text-xs uppercase tracking-widest">
                <input
                  type="checkbox"
                  checked={editing.published ?? true}
                  onChange={(e) => setEditing({ ...editing, published: e.target.checked })}
                />
                Published
              </label>

              {error && (
                <div className="border border-destructive/50 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                  {error}
                </div>
              )}
            </div>
            <div className="flex items-center justify-end gap-2 border-t border-border bg-secondary/30 p-3">
              <button
                onClick={() => setEditing(null)}
                className="border border-border px-3 py-2 text-xs uppercase tracking-widest hover:border-primary hover:text-primary"
              >
                Cancel
              </button>
              <button
                onClick={save}
                disabled={saving}
                className="flex items-center gap-2 border border-primary bg-primary px-3 py-2 text-xs font-bold uppercase tracking-widest text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
              >
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
      <span className="mb-1 block text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}
