<template>
    <div 
        id="Messages" 
        class="pt-1 z-0 overflow-auto  h-[calc(100%-105px)] w-full"
    >
        <div v-for="chat in chats" :key="chat">
        <div @click="openChat(chat)">
            <MessageRowComponents :chat="chat"/>
        </div>
        </div>
    </div>
</template>


<script setup>
import { useUserStore } from '../store/user-store';
import MessageRowComponents from '../components/MessageRowComponents.vue';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
const userStore= useUserStore();
const {chats ,userDataForChat , sub} = storeToRefs(userStore)

import {defineProps} from 'vue';
const props = defineProps({
    changeCollapseButton: Function
})


onMounted(async () =>{ 
    if(userDataForChat.value.length){
  
        await userStore.getChatById(userDataForChat.value[0].id)
    }    
})

const openChat = async (chat) => {
    props.changeCollapseButton(true)
    userDataForChat.value = []
    userDataForChat.value.push({
        id: chat.id,
        sub1: chat.sub1,
        sub2: chat.sub2,
        firstName: chat.user.firstName,
        lastName: chat.user.lastName,
        picture: chat.user.picture,
    })
    try {
        await userStore.getChatById(chat.id)
        let data = {
            id: chat.id,
            key1: 'sub1HasViewed', val1: false, 
            key2: 'sub2HasViewed', val2: false, 
        }
        if (chat.sub1 === sub.value) {
            data.val1 = true
            data.val2 = true
        } else if (chat.sub2 === sub.value) {
            data.val1 = true
            data.val2 = true
        }
        await userStore.hasReadMessage(data)
    } catch (error) {
        console.log(error)
    }
}
</script>

<style lang="scss" scoped>

</style>