import type { ReactNode } from "react";
import Link from "next/link";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { AdminLogoutButton } from "@/components/admin/logout-button";
import { AdminNav } from "@/components/admin/admin-nav";
import { PublishButton } from "@/components/admin/publish-button";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const authed = await isAdminAuthenticated();

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      {authed ? (
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr]">
          <aside className="border-r border-border bg-card md:min-h-[calc(100vh-4rem)]">
            <div className="bbg-header text-[11px]">
              <div>ADMIN</div>
              <div>v1.0</div>
            </div>
            <div className="p-3">
              <p className="mb-3 text-[10px] uppercase tracking-widest text-muted-foreground">
                Console
              </p>
              <AdminNav />
              <div className="mt-6 border-t border-border pt-4">
                <p className="mb-2 text-[10px] uppercase tracking-widest text-muted-foreground">
                  Deployment
                </p>
                <PublishButton />
              </div>
              <div className="mt-6 border-t border-border pt-4">
                <AdminLogoutButton />
                <Link
                  href="/"
                  className="mt-2 block px-3 py-2 text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
                >
                  Back to Site
                </Link>
              </div>
            </div>
          </aside>
          <main className="min-w-0 p-4 md:p-6">{children}</main>
        </div>
      ) : (
        <main>{children}</main>
      )}
    </div>
  );
}
