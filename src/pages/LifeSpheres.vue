<script setup lang="ts">
import { spheresList, type SphereKey, type SpheresItem } from '../types';
import Knob from 'primevue/knob';
import Button from 'primevue/button';
import Popover from 'primevue/popover';
import { computed, onBeforeMount, reactive, ref } from 'vue'
import { createDay, getDayByDate, getScores, initDb, putScores, type ScoreEntry } from '../api/crud';
import moment from 'moment';

const spheres = reactive<Record<SphereKey, SpheresItem>>({
  personal: {
    score: 0,
    initScore: 0,
    isSetMode: false,
    isChanged: false,
    description: '(отношения, чувства). Чувствовал ли я близость, был ли с кем-то эмоционально рядом?',
  },
  health: {
    initScore: 0,
    score: 0,
    isSetMode: false,
    isChanged: false,
    description: '(здоровье, сон, еда). Ел ли я нормально? спал? тело как себя чувствует?',
  },
  work: {
    initScore: 0,
    score: 0,
    isSetMode: false,
    isChanged: false,
    description: '(деньги, задачи). Делал ли я что-то по делу? двигался ли в сторону цели?',
  },
  mind: {
    initScore: 0,
    score: 0,
    isSetMode: false,
    isChanged: false,
    description: '(рост, знания). Узнал ли я что-то новое? напряг ли я мозг чем-то интересным?',
  },
  rest: {
    initScore: 0,
    score: 0,
    isSetMode: false,
    isChanged: false,
    description: '(кайф, восстановление). Отдыхал ли я? радовался чему-то? позволил ли себе паузу?',
  },
  home: {
    initScore: 0,
    score: 0,
    isSetMode: false,
    isChanged: false,
    description: '(жилище, порядок). Было ли в пространстве вокруг меня ощущение уюта или контроля?',
  },
  meaning: {
    initScore: 0,
    score: 0,
    isSetMode: false,
    isChanged: false,
    description: '(ощущение зачем). чувствовал ли я сегодня, что всё не зря? хоть на минуту?',
  },
})
const popover = ref();
const sphereOver = ref<SphereKey | null>(null);
const isCompleteToday = ref(false);

const isDisableForm = computed(() => {
  return !Object.values(spheres).every((item) => {
    return item.isChanged === true;
  })
});

const isDisableResetFormBtn = computed(() => {
  return !Object.values(spheres).some((item) => {
    return item.isChanged === true;
  })
});

const colorRangeSphere = computed(() => {
  return (score: number) => {
    if(score <= 10) {
      return '#8b2020'
    }
    if(score <= 20) {
      return '#d24242';
    }
    if(score <= 30) {
      return '#d26542';
    }
    if(score <= 40) {
      return '#de8035';
    }
    if(score <= 50) {
      return '#dea235';
    }
    if(score <= 60) {
      return '#decc35';
    }
    if(score <= 70) {
      return '#cade35';
    }
    if(score <= 80) {
      return '#b6de35';
    }
    if(score <= 90) {
      return '#9ede35';
    }
    if(score <= 100) {
      return '#68c53f';
    }
  }
})

function onHandlerSetSphere(key: SphereKey) {
  spheres[key].isSetMode = true;
  if(spheres[key].isChanged === false) {
    spheres[key].score = 0;
  }
}

function onResetSet(key: SphereKey) {
  spheres[key].isSetMode = false;
  spheres[key].isChanged = false;
  spheres[key].score = spheres[key].initScore;
}

function onConfirmSet(key: SphereKey) {
  spheres[key].isSetMode = false;
  spheres[key].isChanged = true;
}

function plusSphereScore(key: SphereKey) {
  if(spheres[key].score <= 100) {
    let temp = spheres[key].score + 10;
    spheres[key].score = temp;
  }
}

function minusSphereScore(key: SphereKey) {
  if(spheres[key].score >= 0) {
    let temp = spheres[key].score - 10;
    spheres[key].score = temp;
  }
}

function resetForm() {
  Object.keys(spheres).map((key) => {
    const item = spheres[key as SphereKey]
    item.score = item.initScore;
    item.isSetMode = false;
    item.isChanged = false;
  })
}

async function saveDay() {
  const values = Object.keys(spheres).reduce((acc, key) => {
    acc[key as SphereKey] = spheres[key as SphereKey].score;
    return acc
  }, {} as Record<SphereKey, number>);
  const day = moment().format('YYYY-MM-DD');
  const existsRow = await getDayByDate(day);
  if(existsRow) {
    throw 'duplicate row error';
  }
  await createDay(values, null);
  let scoresResult = await getScores();
  let scores: ScoreEntry | undefined = scoresResult?.scores ?? {
    health: 0,
    home: 0,
    meaning: 0,
    mind: 0,
    personal: 0,
    rest: 0,
    work: 0,
  }; 
  let count: number | undefined = scoresResult?.count ?? 0;

  const result = Object.entries(scores).reduce((acc, [key, value]) => {
    const newRaw = ((value * count) + values[key as SphereKey]) / (count + 1);
    const newStored = Math.round(newRaw);
    acc[key as SphereKey] = newStored;
    return acc
  }, {} as ScoreEntry);
  await putScores(result, count);

  window.location.reload();
}

const toggle = (event: Event, key: SphereKey, state: boolean) => {
  sphereOver.value = (state === true) ? key : null;
  popover.value?.toggle?.(event);
}

onBeforeMount( async() => {
  await initDb()
  const day = moment().format('YYYY-MM-DD');
  const existsRowToday = await getDayByDate(day);
  if(existsRowToday) {
    isCompleteToday.value = true;
  }
  const scoresResult = await getScores();

  if(scoresResult && scoresResult.scores) {
    Object.entries(scoresResult.scores).forEach(([key, value]) => {
      spheres[key as SphereKey].score = value;
      spheres[key as SphereKey].initScore = value;
    })
  }

  
})
</script>


<template>
  <div>
    LALALASSASSF
    <div class="flex flex-row flex-wrap gap-3 select-none">
      <Popover ref="popover">
          <div class="popover flex flex-column gap-4 max-w-19rem p-3 shadow-2">
            <h2 class="underline">{{ sphereOver }}</h2>
            <p>
              {{ sphereOver && spheres[sphereOver].description }}
            </p>
          </div>
      </Popover>
      <div 
      class="flex flex-column align-items-center"
      v-for="key in spheresList" 
      :key="key"
      >
        <div class="flex align-items-center justify-content-center gap-2">
          <p 
            class="text-xl"
            :class="(spheres[key].isChanged)? 'changed' : ''"
          >
            {{ key }}
          </p>
          <i 
            class="pi pi-info-circle" 
            style="font-size: 0.9rem"
            @mouseenter="(e) => toggle(e, key, true)"
            @mouseleave="(e) => toggle(e, key, false)"
          ></i>
 
        </div>
        <Knob 
          :modelValue="spheres[key].score" 
          :min="0"
          :max="100"
          :size="200"
          :step="1"
          :valueTemplate="`${(spheres[key].score / 10).toPrecision(2)}`"
          :valueColor="colorRangeSphere(spheres[key].score)" 
          rangeColor="#bebebe"
          readonly
        />
        <Button
          v-if="spheres[key].isSetMode === false"
          @click="() => onHandlerSetSphere(key)"
          :disabled="isCompleteToday"
          v-tooltip.bottom="isCompleteToday ?  'На сегодня счетчики уже проставлены' : ''"
          variant="outlined"
          >
          {{ (spheres[key].isChanged) ? 'Edit' : 'Set' }}
        </Button>
        
        <div 
          v-else 
          class="flex flex-column gap-2"
          >
          <div class="flex justify-content-center gap-2">
            <Button icon="pi pi-plus" variant="outlined"  @click="plusSphereScore(key)" :disabled="spheres[key].score >= 100" />
            <Button icon="pi pi-minus" variant="outlined" @click="minusSphereScore(key)" :disabled="spheres[key].score <= 0" />
          </div>
          <div class="flex gap-1">
            <Button
              @click="() => onConfirmSet(key)"
              variant="outlined"
              >
                Confirm
            </Button>
            <Button
              @click="() => onResetSet(key)"
              variant="outlined"
              >
                Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
    <div class="actions-form flex align-content-center justify-content-center gap-2">
      <Button 
        class="save-btn shadow-1" 
        variant="outlined"
        :disabled="isDisableForm"
        v-tooltip.top="isCompleteToday ?  'На сегодня счетчики уже проставлены' : ''"
        @click="saveDay"
        >
        Save Day
      </Button>
      <Button 
        class="reset-btn shadow-1" 
        variant="outlined"
        severity="danger"
        :disabled="isDisableResetFormBtn"
        @click="resetForm"
        >
          Reset
      </Button>
    </div>
  </div>
</template>


<style scoped>
.app {
  position: relative;
}
.popover {
  border: 1px solid rgba(77, 77, 77, 0.473) !important;
  border-radius: 4px;
}

.changed {
  color: rgb(148, 192, 83);
  font-weight: bolder;
}

.actions-form {
  position: absolute;
  right: 2rem;
  left: 2rem;
  bottom: 2rem;
  height: 40px;
}
.save-btn {
  width: 90%;
}

.reset-btn {
  width: 10%;
}
</style>
