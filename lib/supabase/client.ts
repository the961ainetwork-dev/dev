import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anonKey) {
    // Avoid throwing in environments where the browser env vars are not exposed
    // (e.g. local sandbox preview). Callers should fall back to API routes.
    return null
  }

  return createBrowserClient(url, anonKey)
}
