<script setup lang="ts">
import Checkbox from 'primevue/checkbox';
import { ref } from 'vue';

const includeTotal = ref(false);

function toggleIncludeTotal() {
    includeTotal.value = !includeTotal.value;
}
</script>

<template>
    <div class="flex gap-1 align-items-center">
        <Checkbox
            v-model="includeTotal"
            inputId="includeTotal"
            binary
            @update:model-value="console.log"
        />
        <label
            class="select-none cursor-pointer"
            @click="toggleIncludeTotal"
            for="includeTotal"
        >
            Общая статистика
        </label>
    </div>
</template>

<style scoped>
</style>
