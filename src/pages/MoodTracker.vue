<script setup lang="ts">
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import MoodStateTabs from '../components/moodTracker/MoodStateTabs.vue';
import AffectiveStateM from '../components/moodTracker/metrics/AffectiveStateM.vue';
import { onBeforeMount, ref, watch } from 'vue';
import { useMoodTrackStore } from '../stores/moodTrack';
import { deleteQuery, getQuery, setQuery } from '../utils/url.utils';
import { formatDateToISO } from '../utils/date.utils';

const { filterPanel } = useMoodTrackStore()

const selectedMetric = ref(0)


watch(() => filterPanel, (newState) => {
    if(newState.date.from) {
        setQuery('date-from', String(new Date(newState.date.from).getTime()))
    }
    if(newState.date.to) {
        setQuery('date-to', String(new Date(newState.date.to).getTime()))
    }
    if(newState.numericAggregationBy) {
        setQuery('numeric-aggregation-by', newState.numericAggregationBy)
    }
    if(newState.aggregation) {
        setQuery('aggregation', newState.aggregation)
    }
    if(newState.groupBy) {
        setQuery('group-by', newState.groupBy)
    }
    if(typeof newState.includeTotal === 'boolean') {
        setQuery('include-total', `${newState.includeTotal}`)
    }
}, { deep: true })

onBeforeMount(() => {
    const dateFrom = +getQuery('date-from')
    const dateTo = +getQuery('date-to')
    if(!dateFrom) deleteQuery('date-from') 
    else {
        filterPanel.date.from = formatDateToISO(new Date(dateFrom));
    }
    if(!dateTo) deleteQuery('date-to') 
    else {
        filterPanel.date.to = formatDateToISO(new Date(dateTo));
    }
    filterPanel.aggregation = getQuery('aggregation');
    filterPanel.groupBy = getQuery('group-by');
    filterPanel.includeTotal = (getQuery('include-total') === 'true') ? true : false;
    filterPanel.numericAggregationBy = getQuery('numeric-aggregation-by');
})
</script>

<template>
    <div class="mood-tracker-page">
        <p class="text-100 text-2xl">Ежедневный протокол симптомов. Мониторинг психоэмоционального состояния</p>

        <div class="card mt-3">
            <Tabs value="0" class="outer">
                <TabList>
                    <Tab value="0">Статистика</Tab>
                    <Tab value="1">Заполнить день</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel value="0">
                        <MoodStateTabs :active-filter="true" @select="(val) => selectedMetric = val">
                            <template #affective_state>
                                <AffectiveStateM v-if="selectedMetric === 0"/>
                            </template>
                        </MoodStateTabs>
                    </TabPanel>
                    <TabPanel value="1">
                        <MoodStateTabs>
                            <template #affective_state>
                                affective_state FORM
                            </template>
                        </MoodStateTabs>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>

    </div>
</template>



<style scoped>
.mood-tracker-page {
    background-color: white !important;
}
.p-tabpanels {
    padding: 0 !important;
    background: white !important;
}
.outer .p-tab {
    padding: 12px 16px !important;
}
.p-tablist {
    border: none !important;
    border-color: white !important;
}

</style>