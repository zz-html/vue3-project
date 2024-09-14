<script setup>
import { ref, getCurrentInstance } from 'vue'
import { trace } from '@opentelemetry/api';

const { proxy } = getCurrentInstance();
const tracer = trace.getTracer('vue-frontend');

defineProps({
  msg: String,
})

const count = ref(0)

const fetchData = () => {
  console.log("fetchData");
  proxy.$axios.get('/demo/test')
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
};

const fetchData2 = async () => {
  try {
    const response = await proxy.$axios.get('/demo/test2');
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

const manuData = () => {
  console.log("manuData");
  const span = tracer.startSpan('fetch-data');
  span.addEvent('do something1 successfully');
  span.addEvent('do something2 successfully');
  // span.recordException(error);
  span.end();
};

</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button id="countBtn" type="button" @click="count++">count is {{ count }}</button>
    <button id="axiosBtn" type="button" @click="fetchData">axios</button>
    <button id="axiosBtn2" type="button" @click="fetchData2">axios2</button>
    <button id="manuBtn" type="button" @click="manuData">手动埋点</button>
  </div>
</template>

<style scoped>

</style>
