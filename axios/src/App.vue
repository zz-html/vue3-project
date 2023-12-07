<script setup>
import { getCurrentInstance,ref } from 'vue';
const { proxy } = getCurrentInstance();

const count = ref(-1);

function handleClick() {
  //console.log("handleClick",proxy);
  proxy.$api.get('/remote-server/socketManage/getSocketIOServerInfo')
    .then(response => {
      console.log("response.data",response.data);
      count.value = response.data.clientsCount;
    })
    .catch(error => {
      console.error(error);
    });  
}
</script>

<template>
  <div>
    <button @click="handleClick">click</button>
    {{ count }}
  </div>

</template>

<style scoped>

</style>
