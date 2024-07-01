<template>
   設定頁-
   <img :src="picture" alt="">
   {{lastName}}{{firstName}}
   <input type="text" v-model="userkey">
</template>


<script setup>
import {ref} from "vue";
import { useUserStore } from "../store/user-store";
import { storeToRefs } from "pinia";
const userStore = useUserStore();
const { picture,lastName,firstName} = storeToRefs(userStore);
let userkey = ref('');

</script>

<style lang="scss" scoped>

</style>