<script setup lang="ts">
import DatePicker from 'primevue/datepicker';
import { useMoodTrackStore } from '../../../stores/moodTrack';
import { formatDateToISO } from '../../../utils/date.utils';

const { filterPanel } = useMoodTrackStore()

function onDateSelect(date: Date, field: 'from' | 'to') {
  const dateString = formatDateToISO(date)
  console.log();
  if(field === 'from') {
    filterPanel.date.from = dateString;
  }
  else if (field === 'to') {
    filterPanel.date.to = dateString;
  }
}
</script>

<template>
    <div class="date-range-form">
        <DatePicker 
            class="w-12rem"
            :model-value="filterPanel.date.from"
            showIcon 
            placeholder="От"
            iconDisplay="input" 
            dateFormat="От: dd/mm/yy"
            @date-select="(date) => onDateSelect(date, 'from')"
        />
        <DatePicker 
            class="w-12rem"
            :model-value="filterPanel.date.to"
            showIcon 
            placeholder="До"
            iconDisplay="input" 
            dateFormat="До: dd/mm/yy"
            @date-select="(date) => onDateSelect(date, 'to')"
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