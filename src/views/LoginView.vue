<template>
  <div class="w-full h-full overflow-hidden">
    <div class="bg-teal-600 z-[-1] w-full h-[225px] fixed top-0"></div>
    <div
      class="bg-[#191919] z-[-1] w-full h-[calc(100vh-225px)] fixed bottom-0"
    ></div>

    <div class="max-w-xl mx-auto">
      <div class="mt-10 flex items-center w-full  m-6">
        <img width="40" src="../assets/fastChat.png" alt="" />
        <div class="font-semibold text-gray-100 ml-6">fast chat</div>
      </div>

      <div class="bg-white z-10 p-24 m-6 mt-10">
        <div class="text-center text-4xl text-gray-700 font-light pb-10">
          Fast Chat
        </div>
        <div
          class="w-full flex flex-col gap-4 justify-center bg-[#fff] p-3 rounded-md items-center"
        >
          <GoogleLogin :callback="callback" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref , watch } from "vue";
import { useUserStore } from "../store/user-store";
import { useRouter } from "vue-router";
const router = useRouter();
const userStore = useUserStore();

const callback = async (response) => {

  await userStore.getUserDetailsFromGoogle(response,router)
};


</script>

<style lang="scss" scoped></style>
