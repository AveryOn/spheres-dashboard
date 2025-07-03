<script setup lang="ts">
import RadioButton from 'primevue/radiobutton';
import { useMoodTrackStore } from '../../../stores/moodTrack';

const { filterPanel } = useMoodTrackStore()
</script>

<template>
    <div class="flex flex-wrap gap-1 align-content-center">
        <div class="flex items-center gap-2">
            <RadioButton v-model="filterPanel.numericAggregationBy" inputId="minmax_choose1" name="minmax" value="min" />
            <label for="minmax_choose1">Мин.</label>
        </div>
        <div class="flex items-center gap-2">
            <RadioButton v-model="filterPanel.numericAggregationBy" inputId="minmax_choose2" name="minmax" value="max" />
            <label for="minmax_choose2">Макс.</label>
        </div>
        <div class="flex items-center gap-2">
            <RadioButton v-model="filterPanel.numericAggregationBy" inputId="minmax_choose3" name="minmax" value="average" />
            <label for="minmax_choose3">Среднее</label>
        </div>
    </div>
</template>
