<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { Chart, registerables } from 'chart.js';
import { SYMPTOM_METRIC_NAMES, SYMPTOM_METRIC_STATES } from '../../../const';

Chart.register(...registerables);

const chartRef = ref(null);
/** Порядок состояний важен */
const states = [
    SYMPTOM_METRIC_STATES.affective_state.DEPRESSIVE.label,
    SYMPTOM_METRIC_STATES.affective_state.IRRITABLE.label,
    SYMPTOM_METRIC_STATES.affective_state.NEUTRAL.label,
    SYMPTOM_METRIC_STATES.affective_state.EUPHORIC.label,
]

onMounted(async () => {
  await nextTick();

  const canvas = chartRef.value;
  if (!canvas) {
    console.error('Canvas not found');
    return;
  }

  const ctx = canvas.getContext('2d');

  new Chart(ctx, {
    type: 'line',
    data: {
    //   labels: ['2025-06-24', '2025-06-25', '2025-06-26', '2025-06-27', '2025-06-28', '2025-06-30', '2025-06-31'],
      labels: [],
      datasets: [{
        label: SYMPTOM_METRIC_NAMES.affective_state,
        data: [],
        borderColor: 'gray',
        stepped: true,
        borderRadius: 6,
        fill: true,
      }]
    },
    options: {
      scales: {
        y: {
          ticks: {
            callback: (value) => {
              return states[value] || value;
            },
            stepSize: 1,
          },
          min: 0,
          max: 3
        }
      }
    }
  });
});
</script>

<template>
    <div style="max-width: 600px; max-height: 400px;">
        <canvas ref="chartRef"></canvas>
    </div>
</template>


<style scoped>
    
</style>