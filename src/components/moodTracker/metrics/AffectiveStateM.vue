<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { Chart, registerables } from 'chart.js';
import { SYMPTOM_METRIC_NAMES, SYMPTOM_METRIC_STATES } from '../../../const';
import { getAffectiveStateMetric } from '../../../api/metrics/affectiveStateApi';

Chart.register(...registerables);

const chartBarRef = ref(null);
const chartCircleRef = ref(null);
/** Порядок состояний важен */
const states = [
    SYMPTOM_METRIC_STATES.affective_state.DEPRESSIVE.label,
    SYMPTOM_METRIC_STATES.affective_state.IRRITABLE.label,
    SYMPTOM_METRIC_STATES.affective_state.NEUTRAL.label,
    SYMPTOM_METRIC_STATES.affective_state.EUPHORIC.label,
]
const barStateLabels = ref([])
const barStateData = ref([])
const circleStateData = ref([])

onMounted(async () => {
    const res = await getAffectiveStateMetric();
    circleStateData.value[0] = res.total.depressive
    circleStateData.value[1] = res.total.irritable
    circleStateData.value[2] = res.total.neutral
    circleStateData.value[3] = res.total.euphoric

    for (const i of res.metrics) {
        barStateData.value.push(i.score);
        barStateLabels.value.push(i.label);
    }

    await nextTick();

    const canvas = chartBarRef.value;
    const canvas2 = chartCircleRef.value;
    if (!canvas) {
        console.error('Canvas not found');
        return;
    }
    if (!canvas2) {
        console.error('Canvas2 not found');
        return;
    }

    const ctx = canvas.getContext('2d');
    const ctx2 = canvas2.getContext('2d');

    new Chart(ctx, {
        type: 'line',
        data: {
            //   labels: ['2025-06-24', '2025-06-25', '2025-06-26', '2025-06-27', '2025-06-28', '2025-06-30', '2025-06-31'],
            labels: barStateLabels.value,
            datasets: [{
                label: SYMPTOM_METRIC_NAMES.affective_state,
                data: barStateData.value,
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
                        stepSize: 0.5,
                    },
                    min: 0,
                    max: 3
                }
            }
        }
    });

    new Chart(ctx2, {
        type: 'doughnut',
        data: {
            labels: states,
            datasets: [
                {
                    label: 'Дней',
                    data: circleStateData.value,
                    backgroundColor: ['#6f6f6f', '#d12c2c', '#5b8ec1', '#d98ee3'],
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: SYMPTOM_METRIC_NAMES.affective_state + ` (За всё время)`,
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
        <div style="width: 600px; height: 400px;">
            <canvas ref="chartCircleRef"></canvas>
        </div>
    </div>
</template>


<style scoped></style>