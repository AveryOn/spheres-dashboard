<script setup lang="ts">
import Select from 'primevue/select';
import { ref } from 'vue';
import { useMoodTrackStore } from '../../../stores/moodTrack';

const { filterPanel } = useMoodTrackStore()

const options = ref([
    { name: 'День', code: 'day' },
    { name: 'Неделя', code: 'week' },
    { name: 'Месяц', code: 'month' },

]);

function onUpdate(code: 'day' | 'week' | 'month') {
    filterPanel.groupBy = code;
}
</script>

<template>
    <div class="group-by-form">
        <Select 
            class="w-10rem"
            :model-value="filterPanel.groupBy"
            :options="options" 
            option-label="name" 
            option-value="code"
            placeholder="Группа" 
            @change="(val) => onUpdate(val.value)"
        />
    </div>
</template>



<style scoped>
.date-range-form {
    width: max-content;
    display: flex;
    gap: 10px;
}
</style>