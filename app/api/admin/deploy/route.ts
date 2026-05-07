import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";

export async function POST() {
  const authed = await requireAdmin();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const hookUrl = process.env.VERCEL_DEPLOY_HOOK_URL;
  if (!hookUrl) {
    return NextResponse.json(
      {
        error: "Deploy hook not configured",
        message:
          "Set the VERCEL_DEPLOY_HOOK_URL environment variable. Create a deploy hook in your Vercel project: Settings → Git → Deploy Hooks.",
      },
      { status: 503 }
    );
  }

  try {
    const res = await fetch(hookUrl, { method: "POST" });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return NextResponse.json(
        { error: "Deploy hook returned an error", details: text },
        { status: 502 }
      );
    }
    const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
    return NextResponse.json({
      ok: true,
      message: "Production deployment triggered",
      job: data,
      triggeredAt: new Date().toISOString(),
    });
  } catch (err) {
    return NextResponse.json(
      {
        error: "Failed to call deploy hook",
        details: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  const authed = await requireAdmin();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({
    configured: Boolean(process.env.VERCEL_DEPLOY_HOOK_URL),
  });
}
