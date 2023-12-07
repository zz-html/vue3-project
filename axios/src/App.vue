<script setup>
import { getCurrentInstance } from 'vue';
const { proxy } = getCurrentInstance();
//let res = $ref(null);
function handleClick() {
  console.log("handleClick",proxy);
  proxy.$api.get('/remote-server/socketManage/getSocketIOServerInfo')
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });  
}
</script>

<template>
  <div>
    <button @click="handleClick">click</button>
  </div>

</template>

<style scoped>

</style>
