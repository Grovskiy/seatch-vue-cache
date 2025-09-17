<template>
  <div class="form-control w-full max-w-md">
    <label class="label">
      <span class="label-text">Search leagues</span>
    </label>
    <input
      type="text"
      placeholder="Type league name..."
      class="input input-bordered w-full"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    >
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string
}

interface Emits {
  (e: 'update:modelValue', value: string): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>