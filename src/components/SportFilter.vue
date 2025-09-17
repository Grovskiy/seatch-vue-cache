<template>
  <div class="form-control w-full max-w-xs">
    <label class="label">
      <span class="label-text">Filter by sport</span>
    </label>
    <select
      class="select select-bordered"
      :value="modelValue"
      @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    >
      <option value="">All sports</option>
      <option v-for="sport in sports" :key="sport" :value="sport">
        {{ sport }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string
  sports: string[]
}

interface Emits {
  (e: 'update:modelValue', value: string): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>