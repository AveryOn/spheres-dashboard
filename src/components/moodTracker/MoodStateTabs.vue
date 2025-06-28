<script setup lang="ts">
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import { SYMPTOM_METRIC_NAMES, SYMPTOM_METRIC_STATES } from '../../const';
import { ref } from 'vue';
import MainFilterForm from './UI/MainFilterForm.vue';

const value = ref(0)

const emit = defineEmits<{
  select: [value: number]
}>()

const props = withDefaults(defineProps<{
    activeFilter?: boolean
}>(), {
    activeFilter: false,
})

</script>

<template>
    <Tabs 
        :value="value" 
        class="inner" 
        scrollable 
        @update:value="(value) => emit('select', +value)"
    >
        <TabList>
            <template v-for="(_, key, idx) in SYMPTOM_METRIC_NAMES">
                <Tab :value="idx">{{ SYMPTOM_METRIC_NAMES[key] }}</Tab>
            </template>
        </TabList>
        <TabPanels>
            <template v-for="(_, key, idx) in SYMPTOM_METRIC_NAMES">
                <TabPanel :value="idx">
                    <MainFilterForm 
                        v-if="props.activeFilter"
                        :type="SYMPTOM_METRIC_STATES[key]?.type ?? 'category'"
                    />
                    <slot :name="key"/>
                </TabPanel>
            </template>
        </TabPanels>
    </Tabs>
</template>

<style>
:root {
    --p-tabs-nav-button-shadow: 0px 0px 10px 50px rgba(255, 255, 255, 0.5) !important;
    --border: 1px solid rgb(153, 153, 153);
}
.inner {
    /* margin-top: 2px; */
}
.inner .p-tab {
    padding: 6px 12px !important;
}
.inner .p-tab + .p-tab {
    border-left: var(--border) !important;
}

.p-tabpanels {
    background: white !important;
}
.p-tablist-nav-button {
    background: white !important;
    border-right: var(--border) !important;
    border-left: var(--border) !important;
}
.p-tablist {
    border: none !important;
    border-color: white !important;
}
.inner .p-tablist-tab-list {
    border: none !important;
}
.inner .p-tab-active {
    background: rgb(45, 65, 92) !important;
}
</style>