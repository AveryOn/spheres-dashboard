<script setup lang="ts">
import Select from 'primevue/select';
import { ref } from 'vue';
import { useMoodTrackStore } from '../../../stores/moodTrack';

const { filterPanel } = useMoodTrackStore()

const options = ref([
    { name: 'По частоте', code: 'mode' },
    { name: 'Распределение (%)', code: 'percentage' },
    { name: 'Кол-во дней', code: 'count' },
]);

function onUpdate(code: 'mode' | 'count' | 'percentage' ) {
    filterPanel.aggregation = code;
}

</script>

<template>
    <div class="aggregation-form">
        <Select 
            class="w-12rem"
            :model-value="filterPanel.aggregation"
            :options="options" 
            optionLabel="name"
            option-value="code"
            placeholder="Агрегация" 
            @change="(val) => onUpdate(val?.value)"
        />
    </div>
</template>



<style scoped>
.aggregation-form {
    width: max-content;
    display: flex;
    gap: 10px;
}
</style>