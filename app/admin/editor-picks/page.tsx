"use client";

import { useEffect, useState } from "react";
import { Loader2, Edit3, Save, X, ChevronUp, ChevronDown } from "lucide-react";

type NewsStory = {
  id: string;
  headline: string;
  summary: string;
  category: string;
  region: string;
  is_editor_pick: boolean;
  featured_image_url?: string;
  featured_order?: number;
  published: boolean;
  timestamp: string;
};

export default function AdminEditorPicksPage() {
  const [items, setItems] = useState<NewsStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<NewsStory> | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/news", { cache: "no-store" });
      const j = await res.json();
      setItems(j.items || []);
    } catch (err) {
      setError("Failed to load stories");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function toggleEditorPick(story: NewsStory) {
    setSaving(true);
    setError(null);
    try {
      const nextOrder = story.is_editor_pick 
        ? null 
        : Math.max(...items.filter(i => i.is_editor_pick).map(i => i.featured_order || 0), 0) + 1;

      const res = await fetch("/api/admin/editor-picks", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          id: story.id,
          is_editor_pick: !story.is_editor_pick,
          featured_image_url: story.featured_image_url,
          featured_order: nextOrder,
        }),
      });

      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Toggle failed");
      }

      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Toggle failed");
    } finally {
      setSaving(false);
    }
  }

  async function reorderEditorPick(story: NewsStory, direction: "up" | "down") {
    setSaving(true);
    setError(null);
    try {
      const pickedStories = items.filter(i => i.is_editor_pick).sort((a, b) => (a.featured_order || 0) - (b.featured_order || 0));
      const currentIndex = pickedStories.findIndex(i => i.id === story.id);

      if (direction === "up" && currentIndex > 0) {
        const prev = pickedStories[currentIndex - 1];
        await Promise.all([
          fetch("/api/admin/editor-picks", {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              id: story.id,
              is_editor_pick: true,
              featured_image_url: story.featured_image_url,
              featured_order: currentIndex - 1,
            }),
          }),
          fetch("/api/admin/editor-picks", {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              id: prev.id,
              is_editor_pick: true,
              featured_image_url: prev.featured_image_url,
              featured_order: currentIndex,
            }),
          }),
        ]);
      } else if (direction === "down" && currentIndex < pickedStories.length - 1) {
        const next = pickedStories[currentIndex + 1];
        await Promise.all([
          fetch("/api/admin/editor-picks", {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              id: story.id,
              is_editor_pick: true,
              featured_image_url: story.featured_image_url,
              featured_order: currentIndex + 1,
            }),
          }),
          fetch("/api/admin/editor-picks", {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              id: next.id,
              is_editor_pick: true,
              featured_image_url: next.featured_image_url,
              featured_order: currentIndex,
            }),
          }),
        ]);
      }

      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Reorder failed");
    } finally {
      setSaving(false);
    }
  }

  async function updateFeaturedImage(id: string, imageUrl: string) {
    setSaving(true);
    setError(null);
    try {
      const story = items.find(i => i.id === id);
      if (!story) throw new Error("Story not found");

      const res = await fetch("/api/admin/editor-picks", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          id,
          is_editor_pick: story.is_editor_pick,
          featured_image_url: imageUrl,
          featured_order: story.featured_order,
        }),
      });

      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Update failed");
      }

      setEditing(null);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
    } finally {
      setSaving(false);
    }
  }

  const editorPicks = items.filter(i => i.is_editor_pick).sort((a, b) => (a.featured_order || 0) - (b.featured_order || 0));

  return (
    <div className="space-y-6">
      <div className="bbg-header text-xs">
        <div>ADMIN - Editor Picks</div>
        <div>MANAGE FEATURED STORIES</div>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold uppercase tracking-widest text-white">
          Editor Picks Management
        </h1>
      </div>

      {error && (
        <div className="border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Featured Stories Section */}
      {editorPicks.length > 0 && (
        <div className="border border-primary/30 bg-primary/5 p-4">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-primary">
            Currently Featured ({editorPicks.length}/6)
          </h2>
          <div className="space-y-2">
            {editorPicks.map((story, idx) => (
              <div key={story.id} className="flex items-center justify-between border border-border bg-card p-3">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-mono text-primary">[{idx + 1}]</p>
                  <p className="truncate text-sm text-foreground font-medium">{story.headline}</p>
                  {story.featured_image_url && (
                    <p className="text-xs text-muted-foreground truncate">{story.featured_image_url}</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => reorderEditorPick(story, "up")}
                    disabled={idx === 0 || saving}
                    className="p-1 border border-border hover:border-primary hover:text-primary disabled:opacity-50"
                    title="Move up"
                  >
                    <ChevronUp className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => reorderEditorPick(story, "down")}
                    disabled={idx === editorPicks.length - 1 || saving}
                    className="p-1 border border-border hover:border-primary hover:text-primary disabled:opacity-50"
                    title="Move down"
                  >
                    <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => setEditing(story)}
                    className="p-1 border border-border hover:border-primary hover:text-primary"
                    title="Edit image"
                  >
                    <Edit3 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Stories Table */}
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
                <th>Pick</th>
                <th>Featured Image</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-xs text-muted-foreground">
                    No stories yet.
                  </td>
                </tr>
              )}
              {items.map((n) => (
                <tr key={n.id}>
                  <td className="max-w-md truncate font-mono text-xs text-foreground">{n.headline}</td>
                  <td className="text-xs uppercase">{n.category}</td>
                  <td className="text-xs">
                    <button
                      onClick={() => toggleEditorPick(n)}
                      disabled={saving}
                      className={`px-3 py-1 text-xs uppercase tracking-widest border transition-colors ${
                        n.is_editor_pick
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                      }`}
                    >
                      {n.is_editor_pick ? "★ PICK" : "Add"}
                    </button>
                  </td>
                  <td className="max-w-xs truncate text-xs text-muted-foreground">
                    {n.featured_image_url ? "Set" : "None"}
                  </td>
                  <td>
                    <button
                      onClick={() => setEditing(n)}
                      className="border border-border p-1 hover:border-primary hover:text-primary"
                      title="Edit"
                    >
                      <Edit3 className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="w-full max-w-lg border border-border bg-card">
            <div className="bbg-header text-xs">
              <div>Edit Featured Image</div>
              <button onClick={() => setEditing(null)}>
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="space-y-4 p-4">
              <div>
                <p className="mb-2 truncate text-sm font-medium text-foreground">{editing.headline}</p>
              </div>

              {editing.featured_image_url && (
                <div className="relative aspect-video overflow-hidden border border-border bg-secondary">
                  <img
                    src={editing.featured_image_url}
                    alt={editing.headline}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              <div>
                <label className="block mb-1 text-[10px] uppercase tracking-widest text-muted-foreground">
                  Image URL
                </label>
                <input
                  type="text"
                  value={editing.featured_image_url || ""}
                  onChange={(e) => setEditing({ ...editing, featured_image_url: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  className="w-full border border-border bg-background px-2 py-2 text-sm"
                />
              </div>

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
                onClick={() => updateFeaturedImage(editing.id!, editing.featured_image_url!)}
                disabled={saving || !editing.featured_image_url}
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
