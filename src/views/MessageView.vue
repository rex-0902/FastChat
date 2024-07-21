<template>
  <div id="BG" class=" h-full  w-full" ></div>
  <div
    :class="
      CollapseButton == true
        ? 'bg-[#282828]  z-10 min-w-full flex justify-between items-center px-2 py-2 h-[56px]'
        : 'bg-[#282828]  z-10 w-full  flex justify-between items-center px-2 py-2  md:w-[calc(100vw-420px)]'
    "
  >
    <div class="flex items-cente ml-5 items-center">
      <img
        v-if="userDataForChat[0] && userDataForChat[0].picture"
        class="rounded-full mx-1 w-10"
        :src="userDataForChat[0].picture"
      />
      <div
        v-if="userDataForChat[0] && userDataForChat[0].firstName"
        class="text-white ml-1 font-semibold"
      >
        {{ userDataForChat[0].lastName }}{{ userDataForChat[0].firstName }}
      </div>
    </div>

    <DotsVerticalIcon fillColor="#FFF" />
  </div>
  <div
    id="MessagesSection"
    :class="
      CollapseButton == true
        ? '  w-full overflow-auto  touch-auto h-[100%-151px]'
        : '  w-[calc(100vw-420px)] overflow-auto  touch-auto h-[100%-151px]'
    "
  >
    <div v-if="currentChat && currentChat.length" class="px-20 text-sm">
      <div v-for="msg in currentChat[0].messages" :key="msg">
        <div v-if="msg.sub !== sub" class="flex w-[calc(100%-50px)]">
          <div
            v-if="msg.type == 'text'"
            class="inline-block bg-white p-2 rounded-md my-1"
          >
            {{ msg.message }}
          </div>
          <a
            v-if="msg.type == 'img'"
            class="inline-block bg-white p-2 rounded-md my-1 glightbox"
            :href="msg.message"
          >
            <img :src="msg.message" alt="" class="w-[200px]" />
          </a>
        </div>

        <div
          v-else
          :class="
            CollapseButton == true
              ? 'flex justify-end space-x-1 w-full float-right'
              : 'flex justify-end space-x-1 w-[calc(100%-50px)] float-right'
          "
        >
          <div
            v-if="msg.type == 'text'"
            class="inline-block bg-green-200 p-2 rounded-md my-1"
          >
            {{ msg.message }}
          </div>
          <a
            v-if="msg.type == 'img'"
            class="inline-block bg-green-200 p-2 rounded-md my-1 glightbox"
            :href="msg.message"
          >
            <img :src="msg.message" alt="" class="w-[200px]" />
          </a>
        </div>
      </div>
    </div>
  </div>
  <div
    :class="
      CollapseButton == true
        ? 'w-full p-2.5 z-10 bg-[#1c1c1c]  h-[95px]'
        : 'w-[calc(100vw-420px)] p-2.5 z-10 bg-[#262626]  h-[95px]'
    "
  >
    <div class="flex items-center justify-center">
      <div class="relative pr-2 pl-2  w-12">
        <EmoticonExcitedOutlineIcon
          :size="27"
          fillColor="#515151"
          class="mx-1.5 cursor-pointer  w-full flex justify-center items-center"
          @click="isShowEmoji = !isShowEmoji"
        />
        <div v-if="isShowEmoji" class="absolute bottom-8 bg-white">
          <div class="flex flex-row">
            <button
              @click="emojiState = 'person'"
              class="p-5 hover:bg-[#000] bg-[#1e1e1e]"
            >
              😀
            </button>
            <button
              @click="emojiState = 'thing'"
              class="p-5 hover:bg-[#000] bg-[#1e1e1e]"
            >
              💬
            </button>
            <button @click="emojiState = 'food'" class="p-5 hover:bg-[#000] bg-[#1e1e1e]">
              🍕
            </button>
            <button
              @click="emojiState = 'leisure'"
              class="p-5 hover:bg-[#000] bg-[#1e1e1e]"
            >
              🎬
            </button>
            <button
              @click="emojiState = 'signal'"
              class="p-5 hover:bg-[#000] bg-[#1e1e1e]"
            >
              🔺
            </button>
          </div>
          <div
            v-if="emojiState == 'person'"
            id="personIcon"
            class="max-h-60 overflow-y-auto bg-[#1e1e1e]"
          >
            <span v-for="button in emoji_icon.person" :key="button.icon">
              <button
                @click="chooseEmoji(button.icon)"
                class="p-2 hover:bg-[#000]"
              >
                {{ button.icon }}
              </button>
            </span>
          </div>
          <div
            v-if="emojiState == 'thing'"
            id="thingIcon"
            class="max-h-60 overflow-y-auto bg-[#1e1e1e]"
          >
            <span v-for="button in emoji_icon.thing" :key="button.icon">
              <button
                @click="chooseEmoji(button.icon)"
                class="p-2 hover:bg-[#000]"
              >
                {{ button.icon }}
              </button>
            </span>
          </div>
          <div
            v-if="emojiState == 'food'"
            id="foodIcon"
            class="max-h-60 overflow-y-auto bg-[#1e1e1e]"
          >
            <span v-for="button in emoji_icon.food" :key="button.icon">
              <button
                @click="chooseEmoji(button.icon)"
                class="p-2 hover:bg-[#000]"
              >
                {{ button.icon }}
              </button>
            </span>
          </div>
          <div
            v-if="emojiState == 'leisure'"
            id="leisureIcon"
            class="max-h-60 overflow-y-auto bg-[#1e1e1e]"
          >
            <span v-for="button in emoji_icon.leisure" :key="button.icon">
              <button
                @click="chooseEmoji(button.icon)"
                class="p-2 hover:bg-[#000]"
              >
                {{ button.icon }}
              </button>
            </span>
          </div>
          <div
            v-if="emojiState == 'signal'"
            id="signalIcon"
            class="max-h-60 overflow-y-auto bg-[#1e1e1e]"
          >
            <span v-for="button in emoji_icon.signal" :key="button.icon">
              <button
                @click="chooseEmoji(button.icon)"
                class="p-2 hover:bg-[#000]"
              >
                {{ button.icon }}
              </button>
            </span>
          </div>
        </div>
      </div>
      <div class="pr-2 pl-2  w-12 mr-3 ">
        <label for="photoUpload" class="cursor-pointer">
          <Image :size="27" fillColor="#515151" class="mx-1.5 mr-3 w-full flex justify-center items-center cursor-pointer pointer-events-none" />
        </label>
        <input
          type="file"
          class="hidden"
          id="photoUpload"
          @change="uploadImage"
        />
      </div>
      <input
        v-model="message"
        class="mr-1 shadow apperance-none rounded-lg w-full py-3 px-4 bg-[#3b3b3b] text-white  leading-tight focus:outline-none focus:shadow-outline"
        autocomplete="off"
        type="text"
        placeholder="Message"
        @keyup.enter="sendMessage"
      />

      <button
        :disabled="disableBtn"
        @click="sendMessage"
        class="ml-3 p-2 w-12 flex items-center justify-center"
      >
        <SendIcon fillColor="#515151" />
      </button>
    </div>
  </div>
</template>
<script setup>
import DotsVerticalIcon from "vue-material-design-icons/DotsVertical.vue";
import EmoticonExcitedOutlineIcon from "vue-material-design-icons/EmoticonExcitedOutline.vue";
import Image from "vue-material-design-icons/Image.vue";
import SendIcon from "vue-material-design-icons/Send.vue";
import { ref, watch } from "vue";

import { useUserStore } from "@/store/user-store";
import { storeToRefs } from "pinia";

import { storage, db } from "@/firebase-init";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { setDoc, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { defineProps, onMounted } from "vue";
import GLightbox from "glightbox";

onMounted(() => {
  const lightbox = GLightbox({
    touchNavigation: true,
    loop: true,
    autoplayVideos: true,
    closeOnOutsideClick: true,
    keyboardNavigation: true,
  });
});
const userStore = useUserStore();
const { userDataForChat, currentChat, sub, showFindFriends } =
  storeToRefs(userStore);
const props = defineProps({
  CollapseButton: Boolean,
});

let message = ref("");
let disableBtn = ref(false);

watch(
  () => currentChat.value,
  (chat) => {
    if (chat.length) {
      setTimeout(() => {
        let objDiv = document.getElementById("MessagesSection");
        objDiv.scrollTop = objDiv.scrollHeight;
      }, 50);
    }
  },
  { deep: true }
);

// 上傳圖片

const uploadImage = async (event) => {
  const file = event.target.files[0];
 
  if (!file) return;
 
  // 生成唯一文件名稱
  const uniqueFileName = `${uuid()}_${file.name}`;

  // 建立 Storage 參考
  const storageReference = storageRef(storage, `images/${uniqueFileName}`);

  // 上傳圖片到 Firebase Storage
  const snapshot = await uploadBytes(storageReference, file);
  // 獲取圖片下載 URL
  const downloadURL = await getDownloadURL(snapshot.ref);

  // 將圖片 URL 存到 Firestore
  if (userDataForChat.value[0].id) {
    await updateDoc(doc(db, `chat/${userDataForChat.value[0].id}`), {
      sub1HasViewed: false,
      sub2HasViewed: false,
      messages: arrayUnion({
        sub: sub.value,
        message: downloadURL,
        createdAt: Date.now(),
        type: "img",
      }),
    });
  } else {
    let id = uuid();
    await setDoc(doc(db, `chat/${id}`), {
      sub1: sub.value,
      sub2: userDataForChat.value[0].sub2,
      sub1HasViewed: false,
      sub2HasViewed: false,

      messages: [
        {
          sub: sub.value,
          message: downloadURL,
          createdAt: Date.now(),
          type: "img",
        },
      ],
    });

    userDataForChat.value[0].id = id;
    showFindFriends.value = false;
  }
};

const sendMessage = async () => {
  if (message.value === "") return;
  disableBtn.value = true;

  await userStore.sendMessage({
    message: message.value,
    sub2: userDataForChat.value[0].sub2,
    chatId: userDataForChat.value[0].id,
  });
  message.value = "";

  const userData = userDataForChat.value[0];

  let data = {
    id: userData.id,
    key1: "sub1HasViewed",
    val1: false,
    key2: "sub2HasViewed",
    val2: false,
  };
  if (userData.sub1 === sub.value) {
    data.val1 = true;
    data.val2 = false;
  } else if (userData.sub2 === sub.value) {
    data.val1 = false;
    data.val2 = true;
  }
  await userStore.hasReadMessage(data);
  // 如果訊息太長自動到最後面
  let objDiv = document.getElementById("MessagesSection");
  objDiv.scrollTop = objDiv.scrollHeight;

  disableBtn.value = false;
};

let isShowEmoji = ref(false);

let emojiState = ref("person");
let emoji_icon = ref({
  person: [
    { icon: "😀" },
    { icon: "😃" },
    { icon: "😄" },
    { icon: "😁" },
    { icon: "😆" },
    { icon: "😅" },
    { icon: "🤣" },
    { icon: "😂" },
    { icon: "🙂" },
    { icon: "🙃" },
    { icon: "😉" },
    { icon: "😊" },
    { icon: "😇" },
    { icon: "🥰" },
    { icon: "😍" },
    { icon: "🤩" },
    { icon: "😘" },
    { icon: "😗" },
    { icon: "😚" },
    { icon: "😙" },
    { icon: "😋" },
    { icon: "😛" },
    { icon: "😜" },
    { icon: "🤪" },
    { icon: "😝" },
    { icon: "🤑" },
    { icon: "🤗" },
    { icon: "🤭" },
    { icon: "🤫" },
    { icon: "🤔" },
    { icon: "🤐" },
    { icon: "🤨" },
    { icon: "😐" },
    { icon: "😑" },
    { icon: "😶" },
    { icon: "😶‍🌫️" },
    { icon: "😏" },
    { icon: "😒" },
    { icon: "🙄" },
    { icon: "😬" },
    { icon: "😮‍💨" },
    { icon: "🤥" },
    { icon: "😌" },
    { icon: "😔" },
    { icon: "😪" },
    { icon: "🤤" },
    { icon: "😴" },
    { icon: "😷" },
    { icon: "🤒" },
    { icon: "🤕" },
    { icon: "🤢" },
    { icon: "🤮" },
    { icon: "🤧" },
    { icon: "🥵" },
    { icon: "🥶" },
    { icon: "🥴" },
    { icon: "😵" },
    { icon: "😵‍💫" },
    { icon: "🤯" },
    { icon: "🤠" },
    { icon: "🥳" },
    { icon: "😎" },
    { icon: "🤓" },
    { icon: "🧐" },
    { icon: "😕" },
    { icon: "😟" },
    { icon: "🙁" },
    { icon: "☹️" },
    { icon: "😮" },
    { icon: "😯" },
    { icon: "😲" },
    { icon: "😳" },
    { icon: "🥺" },
    { icon: "😦" },
    { icon: "😧" },
    { icon: "😨" },
    { icon: "😰" },
    { icon: "😥" },
    { icon: "😢" },
    { icon: "😭" },
    { icon: "😱" },
    { icon: "😖" },
    { icon: "😣" },
    { icon: "😞" },
    { icon: "😓" },
    { icon: "😩" },
    { icon: "😫" },
    { icon: "🥱" },
    { icon: "😤" },
    { icon: "😡" },
    { icon: "😠" },
    { icon: "🤬" },
    { icon: "😈" },
    { icon: "👿" },
    { icon: "💀" },
    { icon: "☠️" },
    { icon: "💩" },
    { icon: "🤡" },
    { icon: "👹" },
    { icon: "👺" },
    { icon: "👻" },
    { icon: "👽" },
    { icon: "👾" },
    { icon: "🤖" },
    { icon: "😺" },
    { icon: "😸" },
    { icon: "😹" },
    { icon: "😻" },
    { icon: "😼" },
    { icon: "😽" },
    { icon: "🙀" },
    { icon: "😿" },
    { icon: "😾" },
    { icon: "🙈" },
    { icon: "🙉" },
    { icon: "🙊" },
    { icon: "💋" },
    { icon: "💯" },
    { icon: "💢" },
    { icon: "💥" },
    { icon: "💫" },
    { icon: "💦" },
    { icon: "💨" },
    { icon: "🕳️" },
    { icon: "💤" },
    { icon: "👋" },
    { icon: "🤚" },
    { icon: "🖐️" },
    { icon: "✋" },
    { icon: "🖖" },
    { icon: "👌" },
    { icon: "🤏" },
    { icon: "✌️" },
    { icon: "🤞" },
    { icon: "🤟" },
    { icon: "🤘" },
    { icon: "🤙" },
    { icon: "👈" },
    { icon: "👉" },
    { icon: "👆" },
    { icon: "🖕" },
    { icon: "👇" },
    { icon: "☝️" },
    { icon: "👍" },
    { icon: "👎" },
    { icon: "✊" },
    { icon: "👊" },
    { icon: "🤛" },
    { icon: "🤜" },
    { icon: "👏" },
    { icon: "🙌" },
    { icon: "👐" },
    { icon: "🤲" },
    { icon: "🤝" },
    { icon: "🙏" },
    { icon: "✍️" },
    { icon: "💅" },
    { icon: "🤳" },
    { icon: "💪" },
    { icon: "🦾" },
    { icon: "🦿" },
    { icon: "🦵" },
    { icon: "🦶" },
    { icon: "👂" },
    { icon: "🦻" },
    { icon: "👃" },
    { icon: "🧠" },
    { icon: "🦷" },
    { icon: "🦴" },
    { icon: "👀" },
    { icon: "👁️" },
    { icon: "👅" },
    { icon: "👄" },
    { icon: "👶" },
    { icon: "🧒" },
    { icon: "👦" },
    { icon: "👧" },
    { icon: "🧑" },
    { icon: "👱" },
    { icon: "👨" },
    { icon: "🧔" },
    { icon: "🧔‍♂️" },
    { icon: "🧔‍♀️" },
    { icon: "👨‍🦰" },
    { icon: "👨‍🦱" },
    { icon: "👨‍🦳" },
    { icon: "👨‍🦲" },
    { icon: "👩" },
    { icon: "👩‍🦰" },
    { icon: "🧑‍🦰" },
    { icon: "👩‍🦱" },
    { icon: "🧑‍🦱" },
    { icon: "👩‍🦳" },
    { icon: "🧑‍🦳" },
    { icon: "👩‍🦲" },
    { icon: "🧑‍🦲" },
    { icon: "👱‍♀️" },
    { icon: "👱‍♂️" },
    { icon: "🧓" },
    { icon: "👴" },
    { icon: "👵" },
    { icon: "🙍" },
    { icon: "🙍‍♂️" },
    { icon: "🙍‍♀️" },
    { icon: "🙎" },
    { icon: "🙎‍♂️" },
    { icon: "🙎‍♀️" },
    { icon: "🙅" },
    { icon: "🙅‍♂️" },
    { icon: "🙅‍♀️" },
    { icon: "🙆" },
    { icon: "🙆‍♂️" },
    { icon: "🙆‍♀️" },
    { icon: "💁" },
    { icon: "💁‍♂️" },
    { icon: "💁‍♀️" },
    { icon: "🙋" },
    { icon: "🙋‍♂️" },
    { icon: "🙋‍♀️" },
    { icon: "🧏" },
    { icon: "🧏‍♂️" },
    { icon: "🧏‍♀️" },
    { icon: "🙇" },
    { icon: "🙇‍♂️" },
    { icon: "🙇‍♀️" },
    { icon: "🤦" },
    { icon: "🤦‍♂️" },
    { icon: "🤦‍♀️" },
    { icon: "🤷" },
    { icon: "🤷‍♂️" },
    { icon: "🤷‍♀️" },
    { icon: "🤴" },
    { icon: "👸" },
    { icon: "👳" },
    { icon: "👳‍♂️" },
    { icon: "👳‍♀️" },
    { icon: "👲" },
    { icon: "🧕" },
    { icon: "🤵" },
    { icon: "🤵‍♂️" },
    { icon: "🤵‍♀️" },
    { icon: "👰" },
    { icon: "👰‍♂️" },
    { icon: "👰‍♀️" },
    { icon: "🤰" },
    { icon: "🤱" },
    { icon: "👩‍🍼" },
    { icon: "👨‍🍼" },
    { icon: "🧑‍🍼" },
    { icon: "🧍" },
    { icon: "🧍‍♂️" },
    { icon: "🧍‍♀️" },
    { icon: "🧎" },
    { icon: "🧎‍♂️" },
    { icon: "🧎‍♀️" },
    { icon: "💃" },
    { icon: "🕺" },
    { icon: "🛀" },
    { icon: "🛌" },
    { icon: "🧑‍🤝‍🧑" },
    { icon: "👭" },
    { icon: "👫" },
    { icon: "👬" },
    { icon: "💏" },
    { icon: "👩‍❤️‍💋‍👨" },
    { icon: "👨‍❤️‍💋‍👨" },
    { icon: "👩‍❤️‍💋‍👩" },
    { icon: "💑" },
    { icon: "👩‍❤️‍👨" },
    { icon: "👨‍❤️‍👨" },
    { icon: "👩‍❤️‍👩" },
  ],
  thing: [
    { icon: "🧡" },
    { icon: "🤎" },
    { icon: "🖤" },
    { icon: "🤍" },
    { icon: "💛" },
    { icon: "💙" },
    { icon: "💜" },
    { icon: "💚" },
    { icon: "❤" },
    { icon: "❤️‍🔥" },
    { icon: "❤️‍🩹" },
    { icon: "❤️" },
    { icon: "💔" },
    { icon: "💗" },
    { icon: "💓" },
    { icon: "💕" },
    { icon: "💖" },
    { icon: "💞" },
    { icon: "💘" },
    { icon: "💌" },
    { icon: "💋" },
    { icon: "💍" },
    { icon: "💎" },
    { icon: "👤" },
    { icon: "💬" },
    { icon: "👣" },
    { icon: "✨" },
    { icon: "🌟" },
    { icon: "💫" },
    { icon: "💥" },
    { icon: "💢" },
    { icon: "💦" },
    { icon: "💧" },
    { icon: "🌑" },
    { icon: "🌓" },
    { icon: "🌔" },
    { icon: "🌕" },
    { icon: "🌛" },
    { icon: "🌙" },
    { icon: "🌏" },
    { icon: "🌋" },
    { icon: "🌌" },
    { icon: "🌠" },
    { icon: "⭐" },
    { icon: "☀" },
    { icon: "⛅" },
    { icon: "☁" },
    { icon: "⚡" },
    { icon: "☔" },
    { icon: "❄" },
    { icon: "⛄" },
    { icon: "🌀" },
    { icon: "🌁" },
    { icon: "🌈" },
    { icon: "🌊" },
    { icon: "📧" },
    { icon: "📥" },
    { icon: "📤" },
    { icon: "✉" },
    { icon: "📩" },
    { icon: "📨" },
    { icon: "📫" },
    { icon: "📪" },
    { icon: "📮" },
    { icon: "📦" },
    { icon: "📝" },
    { icon: "📄" },
    { icon: "📃" },
    { icon: "📑" },
    { icon: "📊" },
    { icon: "📈" },
    { icon: "📉" },
    { icon: "📜" },
    { icon: "📋" },
    { icon: "📅" },
    { icon: "📆" },
    { icon: "📇" },
    { icon: "📁" },
    { icon: "📂" },
    { icon: "✂" },
    { icon: "📌" },
    { icon: "📎" },
    { icon: "✒" },
    { icon: "✏" },
    { icon: "📏" },
    { icon: "📐" },
    { icon: "📕" },
    { icon: "📗" },
    { icon: "📘" },
    { icon: "📙" },
    { icon: "📓" },
    { icon: "📔" },
    { icon: "📒" },
    { icon: "📚" },
    { icon: "📖" },
    { icon: "🔖" },
    { icon: "📛" },
    { icon: "📰" },
    { icon: "🐶" },
    { icon: "🐺" },
    { icon: "🐱" },
    { icon: "🐭" },
    { icon: "🐹" },
    { icon: "🐰" },
    { icon: "🐸" },
    { icon: "🐯" },
    { icon: "🐨" },
    { icon: "🐻" },
    { icon: "🐷" },
    { icon: "🐽" },
    { icon: "🐮" },
    { icon: "🐗" },
    { icon: "🐵" },
    { icon: "🐒" },
    { icon: "🐴" },
    { icon: "🐑" },
    { icon: "🐘" },
    { icon: "🐼" },
    { icon: "🐧" },
    { icon: "🐦" },
    { icon: "🐤" },
    { icon: "🐥" },
    { icon: "🐣" },
    { icon: "🐔" },
    { icon: "🐍" },
    { icon: "🐢" },
    { icon: "🐛" },
    { icon: "🐝" },
    { icon: "🐜" },
    { icon: "🐞" },
    { icon: "🐌" },
    { icon: "🐙" },
    { icon: "🐚" },
    { icon: "🐠" },
    { icon: "🐟" },
    { icon: "🐬" },
    { icon: "🐳" },
    { icon: "🐎" },
    { icon: "🐲" },
    { icon: "🐡" },
    { icon: "🐫" },
    { icon: "🐩" },
    { icon: "🐾" },
    { icon: "💐" },
    { icon: "🌸" },
    { icon: "🌷" },
    { icon: "🍀" },
    { icon: "🌹" },
    { icon: "🌻" },
    { icon: "🌺" },
    { icon: "🍁" },
    { icon: "🍃" },
    { icon: "🍂" },
    { icon: "🌿" },
    { icon: "🌾" },
    { icon: "🍄" },
    { icon: "🌵" },
    { icon: "🌴" },
    { icon: "🌰" },
    { icon: "🌱" },
    { icon: "🌼" },
  ],
  food: [
    { icon: "☕" },
    { icon: "🍵" },
    { icon: "🍶" },
    { icon: "🍺" },
    { icon: "🍻" },
    { icon: "🍸" },
    { icon: "🍹" },
    { icon: "🍷" },
    { icon: "🍴" },
    { icon: "🍕" },
    { icon: "🍔" },
    { icon: "🍟" },
    { icon: "🍗" },
    { icon: "🍖" },
    { icon: "🍝" },
    { icon: "🍛" },
    { icon: "🍤" },
    { icon: "🍱" },
    { icon: "🍣" },
    { icon: "🍥" },
    { icon: "🍙" },
    { icon: "🍘" },
    { icon: "🍚" },
    { icon: "🍜" },
    { icon: "🍲" },
    { icon: "🍢" },
    { icon: "🍡" },
    { icon: "🍳" },
    { icon: "🍞" },
    { icon: "🍩" },
    { icon: "🍮" },
    { icon: "🍦" },
    { icon: "🍨" },
    { icon: "🍧" },
    { icon: "🎂" },
    { icon: "🍰" },
    { icon: "🍪" },
    { icon: "🍫" },
    { icon: "🍬" },
    { icon: "🍭" },
    { icon: "🍯" },
    { icon: "🍎" },
    { icon: "🍏" },
    { icon: "🍊" },
    { icon: "🍒" },
    { icon: "🍇" },
    { icon: "🍉" },
    { icon: "🍓" },
    { icon: "🍑" },
    { icon: "🍈" },
    { icon: "🍌" },
    { icon: "🍍" },
    { icon: "🍠" },
    { icon: "🍆" },
    { icon: "🍅" },
    { icon: "🌽" },
    { icon: "🎍" },
    { icon: "💝" },
    { icon: "🎎" },
    { icon: "🎒" },
    { icon: "🎓" },
    { icon: "🎏" },
    { icon: "🎆" },
    { icon: "🎇" },
    { icon: "🎐" },
    { icon: "🎑" },
    { icon: "🎃" },
    { icon: "👻" },
    { icon: "🎅" },
    { icon: "🎄" },
    { icon: "🎁" },
    { icon: "🎋" },
    { icon: "🎉" },
    { icon: "🎊" },
    { icon: "🎈" },
    { icon: "🎌" },
    { icon: "🔮" },
    { icon: "🎥" },
    { icon: "📷" },
    { icon: "📹" },
    { icon: "📼" },
    { icon: "💿" },
    { icon: "📀" },
    { icon: "💽" },
    { icon: "💾" },
    { icon: "💻" },
    { icon: "📱" },
    { icon: "☎" },
    { icon: "📞" },
    { icon: "📟" },
    { icon: "📠" },
    { icon: "📡" },
    { icon: "📺" },
    { icon: "📻" },
    { icon: "🔊" },
    { icon: "🔔" },
    { icon: "📢" },
    { icon: "📣" },
    { icon: "⏳" },
    { icon: "⌛" },
    { icon: "⏰" },
    { icon: "⌚" },
    { icon: "🔓" },
    { icon: "🔒" },
    { icon: "🔏" },
    { icon: "🔐" },
    { icon: "🔑" },
    { icon: "🔎" },
    { icon: "💡" },
    { icon: "🔦" },
    { icon: "🔌" },
    { icon: "🔋" },
    { icon: "🔍" },
    { icon: "🛀" },
    { icon: "🚽" },
    { icon: "🔧" },
    { icon: "🔩" },
    { icon: "🔨" },
    { icon: "🚪" },
    { icon: "🚬" },
    { icon: "💣" },
    { icon: "🔫" },
    { icon: "🔪" },
    { icon: "💊" },
    { icon: "💉" },
    { icon: "💰" },
    { icon: "💴" },
    { icon: "💵" },
    { icon: "💳" },
    { icon: "💸" },
    { icon: "📲" },
    { icon: "🎩" },
    { icon: "👑" },
    { icon: "👒" },
    { icon: "👟" },
    { icon: "👞" },
    { icon: "👡" },
    { icon: "👠" },
    { icon: "👢" },
    { icon: "👕" },
    { icon: "👔" },
    { icon: "👚" },
    { icon: "👗" },
    { icon: "🎽" },
    { icon: "👖" },
    { icon: "👘" },
    { icon: "👙" },
    { icon: "💼" },
    { icon: "👜" },
    { icon: "👝" },
    { icon: "👛" },
    { icon: "👓" },
    { icon: "🎀" },
    { icon: "🌂" },
    { icon: "💄" },
  ],
  leisure: [
    { icon: "🎨" },
    { icon: "🎬" },
    { icon: "🎤" },
    { icon: "🎧" },
    { icon: "🎼" },
    { icon: "🎵" },
    { icon: "🎶" },
    { icon: "🎹" },
    { icon: "🎻" },
    { icon: "🎺" },
    { icon: "🎷" },
    { icon: "🎸" },
    { icon: "👾" },
    { icon: "🎮" },
    { icon: "🃏" },
    { icon: "🎴" },
    { icon: "🎲" },
    { icon: "🎯" },
    { icon: "🏈" },
    { icon: "🏀" },
    { icon: "⚽" },
    { icon: "⚾" },
    { icon: "🎾" },
    { icon: "🎱" },
    { icon: "🎳" },
    { icon: "⛳" },
    { icon: "🏁" },
    { icon: "🏆" },
    { icon: "🎿" },
    { icon: "🏂" },
    { icon: "🏊" },
    { icon: "🏄" },
    { icon: "🎣" },
    { icon: "💇" },
    { icon: "💅" },
    { icon: "🏠" },
    { icon: "🏡" },
    { icon: "🏫" },
    { icon: "🏢" },
    { icon: "🏣" },
    { icon: "🏥" },
    { icon: "🏦" },
    { icon: "🏪" },
    { icon: "🏩" },
    { icon: "🏨" },
    { icon: "💒" },
    { icon: "⛪" },
    { icon: "🏬" },
    { icon: "🌇" },
    { icon: "🌆" },
    { icon: "🏯" },
    { icon: "🏰" },
    { icon: "⛺" },
    { icon: "🏭" },
    { icon: "🗼" },
    { icon: "🗾" },
    { icon: "🗻" },
    { icon: "🌄" },
    { icon: "🌅" },
    { icon: "🌃" },
    { icon: "🗽" },
    { icon: "🌉" },
    { icon: "🎠" },
    { icon: "🎡" },
    { icon: "⛲" },
    { icon: "🎢" },
    { icon: "🚢" },
    { icon: "⛵" },
    { icon: "🚤" },
    { icon: "⚓" },
    { icon: "🚀" },
    { icon: "✈" },
    { icon: "💺" },
    { icon: "🚉" },
    { icon: "🚄" },
    { icon: "🚅" },
    { icon: "🚇" },
    { icon: "🚃" },
    { icon: "🚌" },
    { icon: "🚙" },
    { icon: "🚗" },
    { icon: "🚕" },
    { icon: "🚚" },
    { icon: "🚨" },
    { icon: "🚓" },
    { icon: "🚒" },
    { icon: "🚑" },
    { icon: "🚲" },
    { icon: "💈" },
    { icon: "🚏" },
    { icon: "🎫" },
    { icon: "🚥" },
    { icon: "⚠" },
    { icon: "🚧" },
    { icon: "🔰" },
    { icon: "⛽" },
    { icon: "🏮" },
    { icon: "🎰" },
    { icon: "♨" },
    { icon: "🗿" },
    { icon: "🎪" },
    { icon: "🎭" },
    { icon: "📍" },
    { icon: "🚩" },
  ],
  signal: [
    { icon: "🔟" },
    { icon: "🔢" },
    { icon: "🔣" },
    { icon: "⬆" },
    { icon: "⬇" },
    { icon: "⬅" },
    { icon: "➡" },
    { icon: "🔠" },
    { icon: "🔡" },
    { icon: "🔤" },
    { icon: "↗" },
    { icon: "↖" },
    { icon: "↘" },
    { icon: "↙" },
    { icon: "↔" },
    { icon: "↕" },
    { icon: "◀" },
    { icon: "▶" },
    { icon: "🔼" },
    { icon: "🔽" },
    { icon: "↩" },
    { icon: "↪" },
    { icon: "⏪" },
    { icon: "⏩" },
    { icon: "⏫" },
    { icon: "⏬" },
    { icon: "⤵" },
    { icon: "⤴" },
    { icon: "🆗" },
    { icon: "🆕" },
    { icon: "🆙" },
    { icon: "🆒" },
    { icon: "🆓" },
    { icon: "🆖" },
    { icon: "📶" },
    { icon: "🎦" },
    { icon: "🈁" },
    { icon: "🈯" },
    { icon: "🈳" },
    { icon: "🈵" },
    { icon: "🈴" },
    { icon: "🈲" },
    { icon: "🉐" },
    { icon: "🈹" },
    { icon: "🈺" },
    { icon: "🈶" },
    { icon: "🈚" },
    { icon: "🚻" },
    { icon: "🚹" },
    { icon: "🚺" },
    { icon: "🚼" },
    { icon: "🚾" },
    { icon: "🅿" },
    { icon: "♿" },
    { icon: "🚭" },
    { icon: "🈸" },
    { icon: "Ⓜ" },
    { icon: "🉑" },
    { icon: "㊙" },
    { icon: "㊗" },
    { icon: "🆑" },
    { icon: "🆘" },
    { icon: "🆔" },
    { icon: "🚫" },
    { icon: "🔞" },
    { icon: "⛔" },
    { icon: "✳" },
    { icon: "❇" },
    { icon: "❎" },
    { icon: "✅" },
    { icon: "✴" },
    { icon: "💟" },
    { icon: "🆚" },
    { icon: "📳" },
    { icon: "📴" },
    { icon: "🅰" },
    { icon: "🅱" },
    { icon: "🆎" },
    { icon: "🅾" },
    { icon: "💠" },
    { icon: "➿" },
    { icon: "♻" },
    { icon: "♈" },
    { icon: "♉" },
    { icon: "♊" },
    { icon: "♋" },
    { icon: "♌" },
    { icon: "♍" },
    { icon: "♎" },
    { icon: "♏" },
    { icon: "♐" },
    { icon: "♑" },
    { icon: "♒" },
    { icon: "♓" },
    { icon: "⛎" },
    { icon: "🔯" },
    { icon: "🏧" },
    { icon: "💹" },
    { icon: "💲" },
    { icon: "💱" },
    { icon: "©" },
    { icon: "®" },
    { icon: "™" },
    { icon: "❌" },
    { icon: "‼" },
    { icon: "⁉" },
    { icon: "❗" },
    { icon: "❓" },
    { icon: "❕" },
    { icon: "❔" },
    { icon: "⭕" },
    { icon: "🔝" },
    { icon: "🔚" },
    { icon: "🔙" },
    { icon: "🔛" },
    { icon: "🔜" },
    { icon: "🔃" },
    { icon: "🕛" },
    { icon: "🕐" },
    { icon: "🕑" },
    { icon: "🕒" },
    { icon: "🕓" },
    { icon: "🕔" },
    { icon: "🕕" },
    { icon: "🕖" },
    { icon: "🕗" },
    { icon: "🕘" },
    { icon: "🕙" },
    { icon: "🕚" },
    { icon: "✖" },
    { icon: "➕" },
    { icon: "➖" },
    { icon: "➗" },
    { icon: "♠" },
    { icon: "♥" },
    { icon: "♣" },
    { icon: "♦" },
    { icon: "💮" },
    { icon: "💯" },
    { icon: "✔" },
    { icon: "☑" },
    { icon: "🔘" },
    { icon: "🔗" },
    { icon: "➰" },
    { icon: "〰" },
    { icon: "〽" },
    { icon: "🔱" },
    { icon: "◾" },
    { icon: "◽" },
    { icon: "▪" },
    { icon: "▫" },
    { icon: "🔺" },
    { icon: "🔲" },
    { icon: "🔳" },
    { icon: "⚫" },
    { icon: "⚪" },
    { icon: "🔴" },
    { icon: "🔵" },
    { icon: "🔻" },
    { icon: "⬜" },
    { icon: "⬛" },
    { icon: "🔶" },
    { icon: "🔷" },
    { icon: "🔸" },
    { icon: "🔹" },
  ],
});

let chooseEmoji = (emojiIcon) => {
  message.value += emojiIcon;
};
</script>

<style>
#BG {
  background: url("../assets/message-bg.png") repeat center;

  position: fixed;
  z-index: -1;
}
.h_full_160{
  height: calc(100% - 160px);
  max-height: 300px ;
  overflow-y:scroll;
}
</style>
