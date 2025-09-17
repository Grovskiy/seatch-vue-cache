import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { League, Season } from '@/types/api'
import { ApiService } from '@/services/api'

export const useLeaguesStore = defineStore('leagues', () => {
  const leagues = ref<League[]>([])
  const seasonBadges = ref<Record<string, string>>({})
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const lastFetch = ref<number>(0)

  // Cache TTL: 1 hour for leagues
  const CACHE_TTL = 60 * 60 * 1000 // 1 hour in milliseconds

  const isLeaguesCacheValid = computed(() => {
    return Date.now() - lastFetch.value < CACHE_TTL
  })

  const fetchLeagues = async (forceRefresh = false) => {
    // Use cache if valid and not forcing refresh
    if (!forceRefresh && leagues.value.length > 0 && isLeaguesCacheValid.value) {
      return leagues.value
    }

    isLoading.value = true
    error.value = null

    try {
      const response = await ApiService.getAllLeagues()
      leagues.value = response.leagues || []
      lastFetch.value = Date.now()
    } catch (err) {
      error.value = 'Failed to fetch leagues. Please try again.'
      console.error('Error fetching leagues:', err)
    } finally {
      isLoading.value = false
    }

    return leagues.value
  }

  const getSeasonBadge = async (leagueId: string): Promise<string | null> => {
    // Check if badge is already cached
    if (seasonBadges.value[leagueId]) {
      return seasonBadges.value[leagueId]
    }

    try {
      const response = await ApiService.getSeasonBadge(leagueId)
      if (response.seasons && response.seasons.length > 0) {
        // Try to find a random badge up to 10 times
        const badge = getRandomBadge(response.seasons)
        if (badge) {
          seasonBadges.value[leagueId] = badge
          return badge
        }
      }
    } catch (error) {
      console.error('Failed to fetch season badge:', error)
    }

    return null
  }

  const getRandomBadge = (seasons: Season[]) => {
    const maxAttempts = 10
    let attempts = 0

    while (attempts < maxAttempts) {
      const randomIndex = Math.floor(Math.random() * seasons.length)
      const season = seasons[randomIndex]

      if (season.strBadge) {
        return season.strBadge
      }

      attempts++
    }

    return null
  }

  const clearCache = () => {
    leagues.value = []
    seasonBadges.value = {}
    lastFetch.value = 0
  }

  const clearBadgesCache = () => {
    seasonBadges.value = {}
  }

  return {
    leagues,
    seasonBadges,
    isLoading,
    error,
    lastFetch,
    isLeaguesCacheValid,
    fetchLeagues,
    getSeasonBadge,
    clearCache,
    clearBadgesCache
  }
}, {
  persist: true
})
