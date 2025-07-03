<script setup lang="ts">
import Checkbox from 'primevue/checkbox';
import { useMoodTrackStore } from '../../../stores/moodTrack';

const { filterPanel } = useMoodTrackStore()
</script>

<template>
    <div class="flex gap-1 align-items-center">
        <Checkbox
            v-model="filterPanel.includeTotal"
            inputId="includeTotal"
            binary
        />
        <label
            class="select-none cursor-pointer"
            for="includeTotal"
        >
            Общая статистика
        </label>
    </div>
</template>

<style scoped>
</style>
