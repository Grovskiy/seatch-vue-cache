<template>
  <!-- <div
    class="card bg-base-100 shadow-xl cursor-pointer hover:shadow-2xl transition-shadow"
    @click="handleClick"
  >
    <div class="card-body">
      <div>
        <h2 class="card-title text-lg">{{ league.strLeague }}</h2>
        <p class="text-sm text-base-content/70">{{ league.strSport }}</p>
        <p v-if="league.strLeagueAlternate" class="text-xs text-base-content/50">
          {{ league.strLeagueAlternate }}
        </p>
      </div>

      <div v-if="seasonBadge || badgeAttempted" class="mt-4 flex justify-center">
        <div v-if="seasonBadge" class="w-16 h-16">
          <img
            :src="seasonBadge"
            :alt="`${league.strLeague} season badge`"
            class="w-full h-full object-contain"
          />
        </div>
        <div v-else class="w-16 h-16 bg-base-300 rounded-lg flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 text-base-content/30"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      </div>

      <div v-if="isLoading" class="mt-4 flex justify-center">
        <span class="loading loading-spinner loading-sm"></span>
      </div>
    </div>
  </div> -->

  <div
    class="card card-side bg-base-100 shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
    @click="handleClick"
  >
    <figure class="bg-base-200 px-4">
      <div v-if="seasonBadge" class="w-16 h-16">
        <img
          :src="seasonBadge"
          :alt="`${league.strLeague} season badge`"
          class="w-full h-full object-contain"
        />
      </div>
      <div v-else class="w-16 h-16 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8 text-base-content/30"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
    </figure>
    <div class="card-body">
      <h2 class="card-title">{{ league.strLeague }}</h2>
      <p class="text-sm text-base-content/70">{{ league.strSport }}</p>
      <p v-if="league.strLeagueAlternate" class="text-xs text-base-content/50">
        {{ league.strLeagueAlternate }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { League } from '@/types/api'
import { useLeaguesStore } from '@/stores/counter'

interface Props {
  league: League
}

const props = defineProps<Props>()
const leaguesStore = useLeaguesStore()

const isLoading = ref(false)
const badgeAttempted = ref(false)

const seasonBadge = computed(() => {
  return leaguesStore.seasonBadges[props.league.idLeague] || null
})

const handleClick = async () => {
  if (seasonBadge.value || isLoading.value || badgeAttempted.value) return

  isLoading.value = true
  try {
    await leaguesStore.getSeasonBadge(props.league.idLeague)
    badgeAttempted.value = true
  } catch (error) {
    console.error('Failed to fetch season badge:', error)
    badgeAttempted.value = true
  } finally {
    isLoading.value = false
  }
}
</script>
