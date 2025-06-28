<script setup lang="ts">
import Select from 'primevue/select';
import { ref } from 'vue';

const selectOption = ref();
const options = ref([
    { name: 'День', code: 'day' },
    { name: 'Неделя', code: 'week' },
    { name: 'Месяц', code: 'month' },

]);
</script>

<template>
    <div class="group-by-form">
        <Select 
            class="w-10rem"
            v-model="selectOption" 
            :options="options" 
            optionLabel="name" 
            placeholder="Группа" 
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