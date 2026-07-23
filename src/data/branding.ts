export const NEMEAN_LOGO_URL = '/nemean-logo-icon.png';

const LEGACY_LOGO_URLS = new Set(['/nemean_logo.svg']);

export function resolveNemeanLogoUrl(logoUrl?: string | null) {
  if (!logoUrl || LEGACY_LOGO_URLS.has(logoUrl)) {
    return NEMEAN_LOGO_URL;
  }

  return logoUrl;
}
