import type { LeaguesResponse, SeasonsResponse } from '@/types/api'
import { CacheService } from './cache'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export class ApiService {
  private static async fetchData<T>(url: string): Promise<T> {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return response.json()
  }

  static async getAllLeagues(): Promise<LeaguesResponse> {
    const cacheKey = 'all_leagues'

    // Check cache first
    const cached = CacheService.get<LeaguesResponse>(cacheKey)
    if (cached) {
      return cached
    }

    // Fetch from API and cache for 1 hour
    const data = await this.fetchData<LeaguesResponse>(`${API_BASE_URL}/all_leagues.php`)
    CacheService.set(cacheKey, data, 60)
    return data
  }

  static async getSeasonBadge(leagueId: string): Promise<SeasonsResponse> {
    const cacheKey = `season_badge_${leagueId}`

    // Check cache first (permanent cache for session)
    const cached = CacheService.get<SeasonsResponse>(cacheKey)
    if (cached) {
      return cached
    }

    // Fetch from API and cache for 24 hours
    const data = await this.fetchData<SeasonsResponse>(`${API_BASE_URL}/search_all_seasons.php?badge=1&id=${leagueId}`)
    CacheService.set(cacheKey, data, 24 * 60)
    return data
  }
}