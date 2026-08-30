// Vercel exposes the project's real production domain via this env var on every
// deployment (Production and Preview alike). We use it — instead of whatever
// domain the admin happens to be browsing /admin from — so the invitation link
// always points at the stable, public, unprotected URL, never a one-off preview
// deployment link.
export function getSiteUrl(): string | undefined {
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return undefined;
}
