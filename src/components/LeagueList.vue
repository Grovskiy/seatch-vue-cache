<template>
  <div>
    <!-- Filters -->
    <div class="flex flex-col md:flex-row gap-4 mb-6">
      <SearchBar v-model="searchQuery" />
      <SportFilter v-model="selectedSport" :sports="availableSports" />
      <button
        class="btn btn-outline self-start md:self-end"
        @click="clearFilters"
        :disabled="!searchQuery && !selectedSport"
      >
        Clear Filters
      </button>
    </div>

    <!-- Loading state -->
    <div v-if="leaguesStore.isLoading" class="flex justify-center py-8">
      <span class="loading loading-spinner loading-lg"></span>
    </div>

    <!-- Error state -->
    <div v-else-if="leaguesStore.error" class="alert alert-error">
      <span>{{ leaguesStore.error }}</span>
    </div>

    <!-- League grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <LeagueCard v-for="league in filteredLeagues" :key="league.idLeague" :league="league" />
    </div>

    <!-- No results -->
    <div v-if="!leaguesStore.isLoading && !leaguesStore.error && filteredLeagues.length === 0" class="text-center py-8">
      <p class="text-lg text-base-content/70">No leagues found matching your criteria.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useLeaguesStore } from '@/stores/counter'
import LeagueCard from './LeagueCard.vue'
import SearchBar from './SearchBar.vue'
import SportFilter from './SportFilter.vue'

const leaguesStore = useLeaguesStore()

const searchQuery = ref('')
const selectedSport = ref('')

const availableSports = computed(() => {
  const sports = new Set(leaguesStore.leagues.map((league) => league.strSport))
  return Array.from(sports).sort()
})

const filteredLeagues = computed(() => {
  return leaguesStore.leagues.filter((league) => {
    const matchesSearch = league.strLeague.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesSport = selectedSport.value === '' || league.strSport === selectedSport.value

    return matchesSearch && matchesSport
  })
})

const clearFilters = () => {
  searchQuery.value = ''
  selectedSport.value = ''
}

onMounted(() => {
  leaguesStore.fetchLeagues()
})
</script>
