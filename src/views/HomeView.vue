<template>
  <div class=" relative w-full h-full flex flex-row">
    <div 
    id="bar" 
    :class="
    CollapseButton == true ?
     'h-full flex flex-col w-[420px] bg-[#242424] absolute left-[-420px] top-0 z-50 transition-all'
     :'h-full flex flex-col w-full bg-[#242424] absolute left-0 top-0 z-50 transition-all md:w-[420px] '">
   
      <div class="  h-full  w-full">
        <div id="Header " >
          <div
            class="bg-[#242424] w-full flex justify-between items-center px-3 py-2"
          >
            <img
              class="rounded-full ml-1 w-10"
              :src="userStore.picture || ''"
              alt=""
            />
            <div class="text-left w-full pl-2 text-white">
              {{ userStore.lastName }}{{ userStore.firstName }}
            </div>
            <div class="flex items-center justify-center">
              <AccountGroupIcon @click="showFindFriends = true" fillColor="#FFF" class="mr-6 cursor-pointer" />
              <Message @click="showFindFriends = false" fillColor="#FFF" class="mr-6 cursor-pointer" />
              <div class="relative">
                <DotsVerticalIcon @click="isShowSettings = !isShowSettings" fillColor="#FFF" class="cursor-pointer"  />
                <div v-if="isShowSettings == true"  class="flex-col absolute bg-white px-4 border-l-gray-800 z-50">
                  <button @click="settings" class="break-keep p-4">設定</button>
                  <button @click="logout" class="break-keep p-4">登出</button>
                </div>
              </div>
            
              <ArrowLeft fillColor="#FFF"
               @click="CollapseButton = !CollapseButton" 
               :class="CollapseButton == true ?
               'ml-4 cursor-pointer absolute left-[405px]' : 
               'ml-4 cursor-pointer'"
               
               />
            </div>
          </div>
    
          <div id="Search" class="bg-[#1d1c1c] w-full px-2  shadow-sm shadow-slate-900 flex items-center">
            <div
              class="px-1 m-2 bg-[#303030] flex items-center justify-center rounded-md w-full"
            >
              <MagnifyIcon fillColor="#515151" :size="18" class="ml-2" />
              <input
                class="ml-5 apperance-none w-full block bg-[#303030] py-1.5 px-2.5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder:text-sm placeholder:text-gray-500"
                autocomplete="off"
                type="text"
                placeholder="搜尋"
              />
            </div>
          </div>
         
        </div>
        <template v-if="showFindFriends">
          <FindFriendsView  />
        </template>
        <div v-else >
          <ChatsView :changeCollapseButton='changeCollapseButton' />
        </div>
      </div>
         
      
    </div>

    <div v-if="userDataForChat.length" 
    :class="CollapseButton == true ?
    'w-full ml-[0] h-full flex flex-col overflow-hidden': 
    'w-full h-full ml-0 md:w-[calc(100%-420px)] md:ml-[420px] flex flex-col overflow-hidden'" >
      <MessageView :CollapseButton="CollapseButton" />
    </div>
      <div
      v-else 
        class="   h-[100vh] bg-[#02041a] text-center w-full ml-0 md:w-full"
      >
        <div class="grid h-screen place-items-center ">
          <div>
            <div class="w-full flex items-center justify-center">
              <img width="375" src="../assets/notChat.png" alt="" />
            </div>
            <div class="text-[32px] text-white font-light mt-10">
              FastChat
            </div>
            <div class="text-[14px] text-white mt-2">
              <div>目前沒有訊息</div>
            </div>
          </div>
        </div>
      </div>
 
  </div>
</template>

<script setup>
import ChatsView from "./ChatsView.vue";
import FindFriendsView from "./FindFriendsView.vue";
import MessageView from "./MessageView.vue";
import AccountGroupIcon from "vue-material-design-icons/AccountGroup.vue";
import DotsVerticalIcon from "vue-material-design-icons/DotsVertical.vue";
import ArrowLeft from "vue-material-design-icons/ArrowLeft.vue";
import MagnifyIcon from "vue-material-design-icons/Magnify.vue";
import Message from "vue-material-design-icons/Message.vue";
import { onMounted , ref } from "vue";
import { useUserStore } from "../store/user-store";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

const userStore = useUserStore();
const router = useRouter();
const { showFindFriends, userDataForChat } = storeToRefs(userStore);

const logout = () => {
  Swal.fire({
    title: "你確定要離開嗎?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "沒錯",
  }).then((result) => {
    if (result.isConfirmed) {
      userStore.logout();
      router.push("/login");
    }
  });
};
// 是否顯示設定選項
let isShowSettings = ref(false);

let settings = () =>{
  router.push("/settings");
}

// 是否顯示收藏bar
let CollapseButton = ref(true)
let changeCollapseButton = (cho) =>{

  CollapseButton.value = cho
}


onMounted(async () => {
  try {
    userStore.getAllUsers();
    await userStore.getAllChatsByUser();
  } catch (error) {
    console.log(error);
  }
});
</script>

<style lang="scss" scoped></style>
