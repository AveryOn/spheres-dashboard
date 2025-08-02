<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { Chart, registerables } from 'chart.js';
import { SYMPTOM_METRIC_NAMES, SYMPTOM_METRIC_STATES } from '../../../const';
import { getEnergyLevelMetric } from '../../../api/metrics/';
import { sleep } from '../../../utils/async';

Chart.register(...registerables);

const chartBarRef = ref(null);
const chartCircleRef = ref(null);
/** Порядок состояний важен */
const states = [0,1,2,3,4,5,6,7,8,9]
const lineStateLabels = ref([])
const lineStateData = ref([])

onMounted(async () => {
    const res = await getEnergyLevelMetric();

    for (const i of res.metrics) {
        lineStateData.value.push(i.score);
        lineStateLabels.value.push(i.label);
    }

    await sleep(0.2)

    const canvas = chartBarRef.value;
    if (!canvas) {
        console.error('Canvas not found');
        return;
    }

    const ctx = canvas.getContext('2d');

    const data = {
        labels: lineStateLabels.value,
        datasets: [
            {
                label: SYMPTOM_METRIC_NAMES.energy_level,
                // data: barStateData.value,
                data: lineStateData.value,
                borderColor: '#28b8f8',
                backgroundColor: '#00000010',
                stepped: false,
                fill: true,
            },
        ]
    }

    new Chart(ctx, {
        data,
        type: 'line',
        data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: false,
                }
            },
            scales: {
                y: {
                    ticks: {
                        callback: (value) => {
                            return states[value] || value;
                        },
                        stepSize: 1,
                    },
                    min: 1,
                    max: 10
                }
            }
        },
    });
});
</script>

<template>
    <div class="flex align-items-center gap-6">
        <div style="width: 600px; height: 400px;">
            <canvas ref="chartBarRef"></canvas>
        </div>
    </div>
</template>


<style scoped></style>