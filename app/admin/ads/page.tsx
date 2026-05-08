"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Pencil, Check, X, Eye, EyeOff } from "lucide-react";

type Ad = {
  id: string;
  title: string;
  sponsor_name: string;
  description: string | null;
  ad_type: string;
  tier: string;
  image_url: string | null;
  logo_url: string | null;
  link_url: string | null;
  cta_text: string | null;
  placement_screens: string[];
  status: string;
  start_date: string | null;
  end_date: string | null;
  priority: number;
  impressions: number;
  clicks: number;
};

const AD_TYPES = [
  { value: "leader_card", label: "Leader Card" },
  { value: "banner", label: "Display Banner" },
  { value: "sponsored_content", label: "Sponsored Content" },
  { value: "newsletter_sponsor", label: "Newsletter Sponsor" },
  { value: "terminal_takeover", label: "Terminal Takeover" },
  { value: "sidebar_widget", label: "Sidebar Widget" },
  { value: "custom", label: "Custom" },
];
const TIERS = ["standard", "premium", "platinum", "enterprise"];
const STATUSES = ["draft", "active", "paused", "expired", "archived"];
const SCREENS = [
  "home",
  "news-terminal",
  "intelligence-reports",
  "market-indicators",
  "capabilities",
  "advertise",
  "what-is-simulator",
  "all",
];

const blankAd = {
  title: "",
  sponsor_name: "",
  description: "",
  ad_type: "leader_card",
  tier: "standard",
  image_url: "",
  logo_url: "",
  link_url: "",
  cta_text: "",
  placement_screens: [] as string[],
  status: "draft",
  start_date: "",
  end_date: "",
  priority: 0,
};

type AdForm = typeof blankAd;

export default function AdminAdsPage() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<AdForm>({ ...blankAd });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/ads", { cache: "no-store" });
      const json = await res.json();
      setAds(json.ads ?? []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const startCreate = () => {
    setForm({ ...blankAd });
    setEditId(null);
    setCreating(true);
    setError(null);
  };

  const startEdit = (ad: Ad) => {
    setForm({
      title: ad.title,
      sponsor_name: ad.sponsor_name,
      description: ad.description ?? "",
      ad_type: ad.ad_type,
      tier: ad.tier,
      image_url: ad.image_url ?? "",
      logo_url: ad.logo_url ?? "",
      link_url: ad.link_url ?? "",
      cta_text: ad.cta_text ?? "",
      placement_screens: ad.placement_screens ?? [],
      status: ad.status,
      start_date: ad.start_date ?? "",
      end_date: ad.end_date ?? "",
      priority: ad.priority,
    });
    setEditId(ad.id);
    setCreating(true);
    setError(null);
  };

  const cancelForm = () => {
    setCreating(false);
    setEditId(null);
    setError(null);
  };

  const submit = async () => {
    setBusy(true);
    setError(null);
    try {
      const payload = {
        ...form,
        description: form.description || null,
        image_url: form.image_url || null,
        logo_url: form.logo_url || null,
        link_url: form.link_url || null,
        cta_text: form.cta_text || null,
        start_date: form.start_date || null,
        end_date: form.end_date || null,
      };
      const res = await fetch(editId ? `/api/admin/ads/${editId}` : "/api/admin/ads", {
        method: editId ? "PATCH" : "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error ?? `Request failed (${res.status})`);
      }
      await load();
      cancelForm();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save");
    } finally {
      setBusy(false);
    }
  };

  const toggleStatus = async (ad: Ad) => {
    setBusy(true);
    try {
      const next = ad.status === "active" ? "paused" : "active";
      await fetch(`/api/admin/ads/${ad.id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      await load();
    } finally {
      setBusy(false);
    }
  };

  const remove = async (ad: Ad) => {
    if (!confirm(`Delete ${ad.sponsor_name} — ${ad.title}?`)) return;
    setBusy(true);
    try {
      await fetch(`/api/admin/ads/${ad.id}`, { method: "DELETE" });
      await load();
    } finally {
      setBusy(false);
    }
  };

  const toggleScreen = (screen: string) => {
    setForm((f) => ({
      ...f,
      placement_screens: f.placement_screens.includes(screen)
        ? f.placement_screens.filter((s) => s !== screen)
        : [...f.placement_screens, screen],
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between border-b border-border pb-4">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-primary">ADS // ADV.001</p>
          <h1 className="mt-1 font-serif text-2xl text-foreground">Advertisements</h1>
          <p className="mt-1 text-xs text-muted-foreground">
            Manage sponsorships, leader cards, banners, and campaigns shown across the platform.
          </p>
        </div>
        <button
          type="button"
          onClick={startCreate}
          className="inline-flex items-center gap-2 border border-primary bg-primary px-3 py-2 text-xs uppercase tracking-widest text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-3.5 w-3.5" />
          New ad
        </button>
      </div>

      {creating && (
        <div className="border border-primary/40 bg-card p-5">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <p className="text-[10px] uppercase tracking-widest text-primary">
              {editId ? "Editing" : "New advertisement"}
            </p>
            <button type="button" onClick={cancelForm} className="text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <Field label="Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} required />
            <Field label="Sponsor name" value={form.sponsor_name} onChange={(v) => setForm({ ...form, sponsor_name: v })} required />
            <Field label="Image URL" value={form.image_url} onChange={(v) => setForm({ ...form, image_url: v })} />
            <Field label="Logo URL" value={form.logo_url} onChange={(v) => setForm({ ...form, logo_url: v })} />
            <Field label="Link URL" value={form.link_url} onChange={(v) => setForm({ ...form, link_url: v })} />
            <Field label="CTA text" value={form.cta_text} onChange={(v) => setForm({ ...form, cta_text: v })} />
            <Select label="Type" value={form.ad_type} options={AD_TYPES.map((t) => ({ value: t.value, label: t.label }))} onChange={(v) => setForm({ ...form, ad_type: v })} />
            <Select label="Tier" value={form.tier} options={TIERS.map((t) => ({ value: t, label: t }))} onChange={(v) => setForm({ ...form, tier: v })} />
            <Select label="Status" value={form.status} options={STATUSES.map((s) => ({ value: s, label: s }))} onChange={(v) => setForm({ ...form, status: v })} />
            <Field label="Priority" value={String(form.priority)} onChange={(v) => setForm({ ...form, priority: Number(v) || 0 })} />
            <Field label="Start date" type="date" value={form.start_date} onChange={(v) => setForm({ ...form, start_date: v })} />
            <Field label="End date" type="date" value={form.end_date} onChange={(v) => setForm({ ...form, end_date: v })} />
          </div>

          <div className="mt-3">
            <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="mt-1 w-full border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
            />
          </div>

          <div className="mt-3">
            <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Placement screens</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {SCREENS.map((s) => {
                const on = form.placement_screens.includes(s);
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggleScreen(s)}
                    className={`border px-2 py-1 text-[10px] uppercase tracking-widest ${on ? "border-primary bg-primary text-primary-foreground" : "border-border text-foreground hover:border-primary hover:text-primary"}`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
            <p className="mt-1 text-[10px] text-muted-foreground">Empty = show on all screens.</p>
          </div>

          {error && <p className="mt-3 text-xs text-red-400">{error}</p>}

          <div className="mt-4 flex gap-2 border-t border-border pt-4">
            <button
              type="button"
              onClick={submit}
              disabled={busy || !form.title || !form.sponsor_name}
              className="inline-flex items-center gap-2 border border-primary bg-primary px-4 py-2 text-xs uppercase tracking-widest text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              <Check className="h-3.5 w-3.5" />
              {busy ? "Saving..." : editId ? "Save changes" : "Create ad"}
            </button>
            <button
              type="button"
              onClick={cancelForm}
              className="border border-border bg-background px-4 py-2 text-xs uppercase tracking-widest text-foreground hover:border-primary hover:text-primary"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading...</p>
      ) : ads.length === 0 ? (
        <div className="border border-dashed border-border bg-card p-10 text-center text-sm text-muted-foreground">
          No advertisements yet. Click <span className="text-primary">+ New ad</span> to add one.
        </div>
      ) : (
        <div className="overflow-x-auto border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="bg-background text-[10px] uppercase tracking-widest text-muted-foreground">
              <tr>
                <th className="border-b border-border px-3 py-2 text-left">Sponsor</th>
                <th className="border-b border-border px-3 py-2 text-left">Title</th>
                <th className="border-b border-border px-3 py-2 text-left">Type</th>
                <th className="border-b border-border px-3 py-2 text-left">Tier</th>
                <th className="border-b border-border px-3 py-2 text-left">Status</th>
                <th className="border-b border-border px-3 py-2 text-left">Priority</th>
                <th className="border-b border-border px-3 py-2 text-left">Screens</th>
                <th className="border-b border-border px-3 py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {ads.map((ad) => (
                <tr key={ad.id} className="border-b border-border last:border-b-0">
                  <td className="px-3 py-2 text-foreground">{ad.sponsor_name}</td>
                  <td className="px-3 py-2 text-foreground">{ad.title}</td>
                  <td className="px-3 py-2 text-xs uppercase tracking-widest text-muted-foreground">{ad.ad_type.replace(/_/g, " ")}</td>
                  <td className="px-3 py-2 text-xs uppercase tracking-widest text-primary">{ad.tier}</td>
                  <td className="px-3 py-2 text-xs uppercase tracking-widest">
                    <span className={ad.status === "active" ? "text-primary" : "text-muted-foreground"}>{ad.status}</span>
                  </td>
                  <td className="px-3 py-2 font-mono text-xs text-foreground">{ad.priority}</td>
                  <td className="px-3 py-2 text-xs text-muted-foreground">
                    {ad.placement_screens?.length ? ad.placement_screens.join(", ") : "all"}
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex justify-end gap-2">
                      <button type="button" onClick={() => toggleStatus(ad)} disabled={busy} title={ad.status === "active" ? "Pause" : "Activate"} className="border border-border p-1.5 text-muted-foreground hover:border-primary hover:text-primary">
                        {ad.status === "active" ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                      </button>
                      <button type="button" onClick={() => startEdit(ad)} className="border border-border p-1.5 text-muted-foreground hover:border-primary hover:text-primary">
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button type="button" onClick={() => remove(ad)} disabled={busy} className="border border-border p-1.5 text-muted-foreground hover:border-red-400 hover:text-red-400">
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
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
        {required && <span className="text-primary"> *</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
      />
    </div>
  );
}

function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}
