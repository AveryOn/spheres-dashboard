<script setup lang="ts">
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import MoodStateTabs from '../components/moodTracker/MoodStateTabs.vue';
import AffectiveStateM from '../components/moodTracker/metrics/AffectiveStateM.vue';
</script>

<template>
    <div>
        <p class="text-100 text-2xl">Ежедневный протокол симптомов. Мониторинг психоэмоционального состояния</p>

        <div class="card mt-3">
            <Tabs value="0" class="outer">
                <TabList>
                    <Tab value="0">Статистика</Tab>
                    <Tab value="1">Заполнить день</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel value="0">
                        <MoodStateTabs>
                            <template #affective_state>
                                <AffectiveStateM />
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