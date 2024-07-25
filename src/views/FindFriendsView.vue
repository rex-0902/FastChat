<template>
  <div id="FindFriends" class="z-0 overflow-auto  h-[calc(100%-130px)] w-[420px]">
      <div v-for="user in usersComputed" :key="user">
          <div @click="createNewChat(user)" class="flex w-full p-4 items-center cursor-pointer">

              <img class="rounded-full mr-4 w-12" :src="user.picture || ''">

              <div class="w-full">

                  <div class="flex justify-between items-center">
                      <div class="text-[15px] text-slate-300"> {{  user?.lastName  }}{{  user?.firstName  }}</div>
                  </div>
                  <div class="flex items-center">
                      <div class="text-[15px] text-slate-400">Hi, 我是{{  user?.lastName  }}{{  user?.firstName  }} !</div>
                  </div>

              </div>
          </div>
      </div>
  </div>
</template>

<script setup>
import { computed, ref ,defineProps} from 'vue'
import { useUserStore } from "@/store/user-store";
import { storeToRefs } from "pinia";

const props = defineProps({
    changeCollapseButton: Function
})


const userStore = useUserStore()
const {  showFindFriends,
   sub, 
   userDataForChat,
    chats,
    allUsers,
     removeUsersFromFindFriends,
     } = storeToRefs(userStore)
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

let finResult = 0;

if(result[0] !== undefined){
  finResult = result[0]
}
return finResult

}
const createNewChat = async (user) => {
    
  userDataForChat.value = []
 
  if(checkIsThereAConversationId(sub.value,user.sub) !== 0 ){
    userDataForChat.value.push({
        id: checkIsThereAConversationId(sub.value,user.sub).id,
        sub1: sub.value,
        sub2: user.sub,
        firstName: user?.firstName,
        lastName: user?.lastName,
        picture: user.picture,
    })
    try {
        await userStore.getChatById(checkIsThereAConversationId(sub.value,user.sub).id)
        let data = {
            id: checkIsThereAConversationId(sub.value,user.sub).id,
            key1: 'sub1HasViewed', val1: false, 
            key2: 'sub2HasViewed', val2: false, 
        }
        if (checkIsThereAConversationId(sub.value,user.sub).sub1 === sub.value) {
            data.val1 = true
            data.val2 = true
        } else if (checkIsThereAConversationId(sub.value,user.sub).sub2 === sub.value) {
            data.val1 = true
            data.val2 = true
        }
        await userStore.hasReadMessage(data)
    } catch (error) {
        console.log(error)
    }
    showFindFriends.value = false
  }else{

    userDataForChat.value.push({
        id: '',
        sub1: sub.value,
        sub2: user.sub,
        firstName: user?.firstName,
        lastName: user?.lastName,
        picture: user.picture,
    })
  }
  props.changeCollapseButton(true)
}



const usersComputed = computed(() => {
  if(allUsers.value.length > 0){
    users.value = allUsers.value
    // allUsers.value.forEach(user => users.value.push(user))
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