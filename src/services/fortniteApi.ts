const PROXY_URL = "/api/fortnite";

export interface SeasonInfo {
  seasonDateBegin: string;
  seasonDateEnd: string;
  seasonNumber: number;
}

/**
 * Fetches current season info via local proxy
 */
export async function fetchSeasonInfo(): Promise<SeasonInfo> {
  const response = await fetch(`${PROXY_URL}/season`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Failed to fetch: ${response.status}`);
  }

  return response.json();
}
