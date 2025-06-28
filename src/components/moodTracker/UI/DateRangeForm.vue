<script setup lang="ts">
import DatePicker from 'primevue/datepicker';
import { ref } from 'vue';

const fromDate = ref();
const toDate = ref();
</script>

<template>
    <div class="date-range-form">
        <DatePicker 
            class="w-10rem"
            v-model="fromDate" 
            showIcon 
            placeholder="От"
            iconDisplay="input" 
            dateFormat="dd/mm/yy"
        />
        <DatePicker 
            class="w-10rem"
            v-model="toDate" 
            showIcon 
            placeholder="До"
            iconDisplay="input" 
            dateFormat="dd/mm/yy"
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