<script setup lang="ts">
import Select from 'primevue/select';
import { ref } from 'vue';

const selectOption = ref();
const options = ref([
    { name: 'По частоте', code: 'mode' },
    { name: 'Распределение (%)', code: 'percentage' },
    { name: 'Кол-во дней', code: 'count' },

]);
</script>

<template>
    <div class="aggregation-form">
        <Select 
            class="w-10rem"
            v-model="selectOption" 
            :options="options" 
            optionLabel="name" 
            placeholder="Агрегация" 
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