<script setup lang="ts">
import { Button } from 'primevue';
import { useMoodTrackStore } from '../../../stores/moodTrack';
import AggregationForm from './AggregationForm.vue';
import DateRangeForm from './DateRangeForm.vue';
import GroupByForm from './GroupByForm.vue';
import IncludeTotalForm from './IncludeTotalForm.vue';
import MinMaxToggleForm from './MinMaxToggleForm.vue';

const { filterPanel } = useMoodTrackStore()

const props = defineProps<{
    type: 'category' | 'numeric'
}>()


function onConfirmFilter() {
    console.log(filterPanel)
}




</script>

<template>
    <form 
        class="main-filter-form flex align-content-center"
        @submit.prevent
    >
        <DateRangeForm />
        <GroupByForm />
        <AggregationForm v-if="props.type === 'category'"/>
        <MinMaxToggleForm v-if="props.type === 'numeric'"/>
        <IncludeTotalForm class="ml-3"/>
        <Button 
            icon="pi pi-check" 
            iconPos="right" 
            title="Применить"    
            variant="outlined"
            class="ml-auto"
            @click="onConfirmFilter"
        />
    </form>
</template>



<style scoped>
.main-filter-form {
    gap: 10px;
}
</style>