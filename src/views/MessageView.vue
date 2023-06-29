<template>
  <div class="ml-[420px] w-full">
    <div class="w-full">
      <div id="BG"></div>
      <div class="border-l border-green-500 w-full">
        <div
          class="bg-[#F0F0F0] fixed z-10 min-w-[calc(100vw-420px)] flex justify-between items-center px-2 py-2"
        >
          <div class="flex items-center justify-center">
            <img
              class="rounded-full mx-1 w-10 h-10"
              src="https://random.imagecdn.app/100/100"
              alt=""
            />
            <div class="text-gray-900 ml-1 font-semibold">steven</div>
          </div>
          <DotsVerticalIcon fillColor="#515151" />
        </div>
      </div>

      <div class="MessagesSection">
        <div
          class="pt-20 pb-8 z-[-1] h-[calc(100vh-65px)] w-[calc(100vw-420px)] overflow-auto fixed touch-auto"
        >
          <div class="px-20 text-sm">
            <div class="flex w-[calc(100%-50px)]">
              <div class="inline-block bg-white p-2 rounded-md my-1">
                Lorem ipsum dolor adfhgsdfh artehdtryfj sretfhdfgh .dsf sdfr
                ewrtfewrtthdf. rtshrdsth . drfgddfga. redgsrdthswrt. Lorem ipsum
                dolor adfhgsdfh artehdtryfj sretfhdfgh .dsf sdfr ewrtfewrtthdf.
                rtshrdsth . drfgddfga. redgsrdthswrt. Lorem ipsum dolor
                adfhgsdfh artehdtryfj sretfhdfgh .dsf sdfr ewrtfewrtthdf.
                rtshrdsth . drfgddfga. redgsrdthswrt.
              </div>
            </div>
            <div
              class="flex justtify-end space-x-1 w-[calc(100%-50px)] float-right"
            >
              <div class="inline-block bg-green-200 p-2 rounded-md my-1">
                Lorem ipsum dolor adfhgsdfh artehdtryfj sretfhdfgh .dsf sdfr
                ewrtfewrtthdf. rtshrdsth . drfgddfga. redgsrdthswrt. Lorem ipsum
                dolor adfhgsdfh artehdtryfj sretfhdfgh .dsf sdfr ewrtfewrtthdf.
                rtshrdsth . drfgddfga. redgsrdthswrt. Lorem ipsum dolor
                adfhgsdfh artehdtryfj sretfhdfgh .dsf sdfr ewrtfewrtthdf.
                rtshrdsth . drfgddfga. redgsrdthswrt.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-[calc(100vw-420px)] p-2.5 z-10 bg-[#F0F0F0] fixed bottom-0">
        <div class="flex items-center justify-center">
          <EmoticonExcitedOutlineIcon
            :size="27"
            fillColor="#515151"
            class="mx-1.5"
          />
          <PaperclipIcon :size="27" fillColor="#515151" class="mx-1.5 mr-3" />
          <input
            type="text"
            class="mr-1 shadow rounded-lg appearance-none w-full py-3 px-4 text-gray-700 leading-tught focus:outline-none focus:shadow-outline"
            autocomplete="off"
            placeholder="訊息"
          />
          <button type="ml-3 p-2 w-12 flex items-center justify-center">
            <SendIcon :size="27" fillColor="#515151" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SendIcon from "vue-material-design-icons/Send.vue";
import DotsVerticalIcon from "vue-material-design-icons/DotsVertical.vue";
import EmoticonExcitedOutlineIcon from "vue-material-design-icons/EmoticonExcitedOutline.vue";
import PaperclipIcon from "vue-material-design-icons/Paperclip.vue";
</script>

<style>
#BG {
  background: url('message-bg.png') no-repeat;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: -1;
}
</style>
