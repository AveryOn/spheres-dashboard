<script setup lang="ts">
import AggregationForm from './AggregationForm.vue';
import DateRangeForm from './DateRangeForm.vue';
import GroupByForm from './GroupByForm.vue';
import IncludeTotalForm from './IncludeTotalForm.vue';
import MinMaxToggleForm from './MinMaxToggleForm.vue';

const props = defineProps<{
    type: 'category' | 'numeric'
}>()

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
    </form>
</template>



<style scoped>
.main-filter-form {
    gap: 10px;
}
</style>