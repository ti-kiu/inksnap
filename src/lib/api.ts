const API_BASE = 'https://inkpreview-api.fuyuanzeng520.workers.dev';

interface ApiOptions {
  method?: string;
  body?: unknown;
  token?: string;
}

async function apiFetch<T>(path: string, opts: ApiOptions = {}): Promise<T> {
  const headers: Record<string, string> = {};
  if (opts.body) headers['Content-Type'] = 'application/json';
  if (opts.token) headers['Authorization'] = `Bearer ${opts.token}`;

  const res = await fetch(`${API_BASE}${path}`, {
    method: opts.method || 'GET',
    headers,
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || `API error ${res.status}`);
  return data as T;
}

// === Token management ===
export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('inkpreview_token');
}

export function setToken(token: string): void {
  localStorage.setItem('inkpreview_token', token);
}

export function clearToken(): void {
  localStorage.removeItem('inkpreview_token');
}

// === API calls ===
export async function guestAuth(): Promise<{ token: string; userId: string; tier: string }> {
  const data = await apiFetch<{ token: string; userId: string; tier: string }>('/api/auth/guest', { method: 'POST' });
  setToken(data.token);
  return data;
}

export async function ensureAuth(): Promise<string> {
  const token = getToken();
  if (token) return token;
  const data = await guestAuth();
  return data.token;
}

export async function getUsage(token: string): Promise<{
  tier: string;
  limit: number;
  used: number;
  remaining: number;
  resetType: string;
  date?: string;
}> {
  return apiFetch('/api/usage', { token });
}

export async function generate(
  token: string,
  params: { prompt: string; style?: string; type?: string }
): Promise<{
  id: string;
  status: string;
  imageUrl: string;
  resolution: number;
  hasWatermark: boolean;
  remaining: number;
}> {
  return apiFetch('/api/generate', { method: 'POST', body: params, token });
}

export async function getGallery(limit = 20, offset = 0): Promise<{
  items: Array<{ id: string; type: string; style: string; created_at: string; imageUrl?: string }>;
}> {
  return apiFetch(`/api/gallery?limit=${limit}&offset=${offset}`);
}
