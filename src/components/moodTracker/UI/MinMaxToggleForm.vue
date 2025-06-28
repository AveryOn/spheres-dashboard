<script setup lang="ts">
import RadioButton from 'primevue/radiobutton';
import { ref } from 'vue';

const choose = ref('');
</script>

<template>
    <div class="flex flex-wrap gap-1 align-content-center">
        <div class="flex items-center gap-2">
            <RadioButton v-model="choose" inputId="choose1" name="minmax" value="min" />
            <label for="choose1">Мин.</label>
        </div>
        <div class="flex items-center gap-2">
            <RadioButton v-model="choose" inputId="choose2" name="minmax" value="max" />
            <label for="choose2">Макс.</label>
        </div>
        <div class="flex items-center gap-2">
            <RadioButton v-model="choose" inputId="choose3" name="minmax" value="average" />
            <label for="choose3">Среднее</label>
        </div>
    </div>
</template>
