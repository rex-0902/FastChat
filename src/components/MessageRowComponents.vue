<template>
  <div>
    <div class="flex w-full px-4 py-3 items-center cursor-pointer">
      <img
        class="rounded-full mr-4 w-12 h-12"
        src="https://random.imagecdn.app/100/100"
        alt=""
      />
      <div class="w-full">
        <div class="flex justify-between items-center">
          <div class="text-[15px] text-gray-600">steven</div>
          <div class="text-[12px] text-gray-600">Date</div>
        </div>
        <div class="flex items-center">
          <CheckAllIcon :size="18" class="ml-1" />
          <div
            class="justify-between text-[15px] text-gray-500 w-full flex items-center"
          >
            This is message...
          </div>
        </div>
      </div>
    </div>
    <div class="border-b w-[calc(100%-80px)] float-right"></div>
  </div>
</template>

<script setup>
import CheckAllIcon from "vue-material-design-icons/CheckAll.vue";
</script>

<style lang="scss" scoped></style>
