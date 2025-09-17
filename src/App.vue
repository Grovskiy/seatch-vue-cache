<script setup lang="ts">
import LeagueList from '@/components/LeagueList.vue'
</script>

<template>
  <div class="min-h-screen bg-base-200">
    <!-- Header -->
    <div class="navbar bg-base-100 shadow-lg">
      <div class="container mx-auto">
        <div class="flex-1">
          <h1 class="text-xl font-bold">Sports Leagues</h1>
        </div>
      </div>
    </div>

    <!-- Main content -->
    <main class="container mx-auto px-4 py-8">
      <LeagueList />
    </main>
  </div>
</template>

<style scoped></style>
