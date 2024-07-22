<template>
  <div id="FindFriends" class="z-0 overflow-auto  h-[calc(100%-130px)] w-[420px]">
      <div v-for="user in usersComputed" :key="user">
          <div @click="createNewChat(user)" class="flex w-full p-4 items-center cursor-pointer">

              <img class="rounded-full mr-4 w-12" :src="user.picture || ''">

              <div class="w-full">

                  <div class="flex justify-between items-center">
                      <div class="text-[15px] text-slate-300"> {{  user.lastName  }}{{  user.firstName  }}</div>
                  </div>
                  <div class="flex items-center">
                      <div class="text-[15px] text-slate-400">Hi, 我是{{  user.lastName  }}{{  user.firstName  }} !</div>
                  </div>

              </div>
          </div>
      </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useUserStore } from "@/store/user-store";
import { storeToRefs } from "pinia";
const userStore = useUserStore()
const {  showFindFriends, sub, userDataForChat, chats,allUsers, removeUsersFromFindFriends } = storeToRefs(userStore)
let users = ref([])

const hideMe = (user) => {
  if (user.sub === sub.value) {
      return false
  }
  return true
}
// 確認
const checkIsThereAConversationId = (sub1,sub2) =>{

let result = chats.value
result.filter(item => item.sub1 === sub1 && item.sub2 === sub2)
console.log(result[0])

return result[0].id

}
const createNewChat = (user) => {
    
  userDataForChat.value = []
  console.log(checkIsThereAConversationId(sub.value,user.sub))
  if(checkIsThereAConversationId(sub.value,user.sub).length !== 0 ){
    userDataForChat.value.push({
        id: checkIsThereAConversationId(sub.value,user.sub),
        sub1: sub.value,
        sub2: user.sub,
        firstName: user.firstName,
        lastName: user.lastName,
        picture: user.picture,
    })
  }else{

    userDataForChat.value.push({
        id: '',
        sub1: sub.value,
        sub2: user.sub,
        firstName: user.firstName,
        lastName: user.lastName,
        picture: user.picture,
    })
  }
}



const usersComputed = computed(() => {
  if(allUsers.value.length > 0){

    allUsers.value.forEach(user => users.value.push(user))
  //   removeUsersFromFindFriends.value.forEach(remove => {
  //       let index = users.value.findIndex(user => user.sub === remove)
  //       users.value.splice(index, 1)
  //   })
    return users.value
  }
})
</script>

<style lang="scss" scoped>

</style>