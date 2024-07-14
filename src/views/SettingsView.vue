<template>
  <div
    class="min-h-screen bg-gray-200 flex flex-col md:flex-row items-center justify-center py-12"
  >
    <div class="p-4 max-w-md w-full bg-white shadow-md rounded-md">
      <div class="text-center mb-4">
        <img
          :src="picture"
          alt="User Picture"
          class="w-24 h-24 rounded-full mx-auto"
        />
        <h2 class="text-2xl font-semibold">{{ lastName }}{{ firstName }}</h2>
      </div>
      <!-- <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">User Key</label>
            <input type="text" v-model="userkey" class="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
         </div> -->
      <div v-if="SettingButtonState == false" class="flex-row gap-4 flex">
        <button
          @click="showAddFriend"
          class="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
        >
          添加好友
        </button>
        <button
          class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          @click="showYouMayKnow"
        >
          你可能認識的人
        </button>
      </div>
      <div
        v-if="isAddFriendVisible"
        id="addFriend"
        class="md:ml-4 mt-4 md:mt-0 flex-grow"
      >
        <div class="mt-4 flex items-center">
          <input
            type="text"
            placeholder="輸入要加入的fastChatId"
            v-model="searchUserKey"
            class="flex-grow p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            @click="searchFriend"
            class="ml-2 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
          >
            搜尋
          </button>
          <button
            @click="(isAddFriendVisible = false), cancelDelivery"
            class="ml-2 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
          >
            取消
          </button>
        </div>

        <div
          v-if="searchUser.fastChatId !== null && isShowHiddenUser"
          class="mt-4 p-4 bg-gray-100 rounded-md shadow-md"
        >
          <div v-if="addFriendState == 'canJoin'">
            <img
              v-if="searchUser.picture"
              :src="searchUser.picture"
              alt="Search User Picture"
              class="w-16 h-16 rounded-full mx-auto mb-2"
            />
            <div class="text-center">
              {{ searchUser.lastName }}{{ searchUser.firstName }}
            </div>
            <div class="mt-6 flex justify-between">
              <button
                @click="cancelDelivery"
                class="mt-2 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
              >
                取消
              </button>
              <button
                @click="addFriend"
                class="mt-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                加入
              </button>
            </div>
          </div>
          <div v-if="addFriendState == 'alreadyAfriend'">
            <img
              v-if="searchUser.picture"
              :src="searchUser.picture"
              alt="Search User Picture"
              class="w-16 h-16 rounded-full mx-auto mb-2"
            />
            <div class="text-center">
              {{ searchUser.lastName }}{{ searchUser.firstName }}
            </div>
            <div class="text-center">已成為好友</div>
          </div>
          <div v-if="addFriendState == 'same'">
            <img
              v-if="searchUser.picture"
              :src="searchUser.picture"
              alt="Search User Picture"
              class="w-16 h-16 rounded-full mx-auto mb-2"
            />
            <div class="text-center">
              {{ searchUser.lastName }}{{ searchUser.firstName }}
            </div>
            <div class="text-center">這是你自己</div>
          </div>
        </div>
        <div
          v-else-if="searchUser.fastChatId == null && isShowHiddenUser"
          class="mt-4 text-center"
        >
          <svg
            class="w-16 h-16 rounded-full mx-auto mb-2"
            width="2391"
            height="2391"
            viewBox="0 0 2391 2391"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="2391" height="2391" rx="1195.5" fill="#D9D9D9" />
            <rect x="351" y="745" width="562" height="77" fill="#828282" />
            <rect x="1568" y="745" width="562" height="81" fill="#828282" />
            <rect
              x="1089.36"
              y="1489.45"
              width="307"
              height="56.7835"
              transform="rotate(-13.7196 1089.36 1489.45)"
              fill="#828282"
            />
            <rect
              x="1235.71"
              y="1022.19"
              width="54"
              height="447.959"
              transform="rotate(-13.7196 1235.71 1022.19)"
              fill="#828282"
            />
            <circle cx="990" cy="1894" r="99" fill="#828282" />
          </svg>
          <div class="text-center">查無此人</div>
        </div>
        <div class="mt-6 flex justify-between">
          <button
            class="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
            @click="GoPrevious"
          >
            回上一步
          </button>
        </div>
      </div>
      <div
        v-if="youMayKnow"
        id="youMayKnow"
        class="md:ml-4 mt-4 md:mt-0 flex-grow"
      >
        <h3>你可能認識的人?</h3>
        <div
          v-for="Person in howAboutThisPerson"
          :key="Person.mapValue.fields.firstName.stringValue"
          class="mt-4 p-4 bg-gray-100 rounded-md shadow-md flex items-center justify-between"
        >
          <div class="flex flex-col items-center">
            <img
              :src="Person.mapValue.fields.picture.stringValue"
              alt=""
              class="w-16 h-16 rounded-full mb-2"
            />
            <h3>
              {{ Person.mapValue.fields.lastName.stringValue
              }}{{ Person.mapValue.fields.firstName.stringValue }}
            </h3>
          </div>
          <div class="flex flex-row gap-4">
            <button
               @click="confirm(Person.mapValue.fields.sub.stringValue)"
              class="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              確認
            </button>
            <button
              class="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
            >
               移除
            </button>
          </div>
        </div>
        <div class="mt-6 flex justify-between">
          <button
            class="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
            @click="GoPrevious"
          >
            回上一步
          </button>
        </div>
      </div>
      <div v-if="SettingButtonState == false" class="mt-12 flex justify-center">
   
        <button
          class="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
        設定完成
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../store/user-store";
import { storeToRefs } from "pinia";
import Swal from "sweetalert2";
import axios from "axios";

const userStore = useUserStore();
const { picture, lastName, firstName, userID, sub, howAboutThisPerson } =
  storeToRefs(userStore);
//設定按鈕
let SettingButtonState = ref(false);

// let userkey = ref('');
let searchUserKey = ref("");
let isAddFriendVisible = ref(false);

// 添加好友欄位狀態 (same / notFound / canJoin / alreadyAfriend)
let addFriendState = ref("");

let searchUser = ref({
  fastChatId: null,
  firstName: null,
  lastName: null,
  picture: null,
  sub: null,
  email: null,
});

let isShowHiddenUser = ref(false);

let showAddFriend = () => {
  SettingButtonState.value = true;
  isAddFriendVisible.value = true;
};

let searchFriend = () => {
  // 先重置
  searchUser.value.fastChatId = null;
  searchUser.value.firstName = null;
  searchUser.value.lastName = null;
  searchUser.value.picture = null;
  searchUser.value.sub = null;

  if (searchUserKey.value == userID.value) {
    searchUser.value.fastChatId = userID.value;
    searchUser.value.firstName = firstName.value;
    searchUser.value.lastName = lastName.value;
    searchUser.value.picture = picture.value;
    searchUser.value.sub = sub.value;
    addFriendState.value = "same";
    isShowHiddenUser.value = true;
  } else {
    userStore.searchFriend(searchUserKey.value).then((res) => {
      console.log(res);
      if (res !== null) {
        searchUser.value.fastChatId = res.fastChatId.stringValue;
        searchUser.value.firstName = res.firstName.stringValue;
        searchUser.value.lastName = res.lastName.stringValue;
        searchUser.value.picture = res.picture.stringValue;
        searchUser.value.sub = res.sub.stringValue;
        console.log(searchUser.value);
        addFriendState.value = "canJoin";
      }
      isShowHiddenUser.value = true;
    });
  }
};
//取消寄送好友邀請
let cancelDelivery = () => {
  searchUserKey.value = "";
  addFriendState.value = "";
  SettingButtonState.value = false;
  isAddFriendVisible.value = false;
  let clear = {
    fastChatId: null,
    firstName: null,
    lastName: null,
    picture: null,
    sub: null,
    email: null,
  };
  searchUser.value = clear;
};
let addFriend = () => {
  userStore.addFriend(searchUser.value.sub).then((res) => {
    Swal.fire({
      position: "top-center",
      icon: "success",
      title: `${res}`,
      showConfirmButton: false,
      timer: 1500,
    }).then(() => cancelDelivery());
  });
};

// 你可能認識的人狀態
let youMayKnow = ref(false);
let showYouMayKnow = () => {
  SettingButtonState.value = true;
  youMayKnow.value = true;
};

// 回上一步
let GoPrevious = () => {
  SettingButtonState.value = false;
  youMayKnow.value = false;
  searchUserKey.value = "";
  addFriendState.value = "";
  SettingButtonState.value = false;
  isAddFriendVisible.value = false;
  let clear = {
    fastChatId: null,
    firstName: null,
    lastName: null,
    picture: null,
    sub: null,
    email: null,
  };
  searchUser.value = clear;
};

let confirm = (becomeFriendSub) =>{
   
   userStore.becomeFriends(becomeFriendSub).then((res) => {
    Swal.fire({
      position: "top-center",
      icon: "success",
      title: `${res}`,
      showConfirmButton: false,
      timer: 1500,
    }).then(() => userStore.removeHowAboutThisPerson(becomeFriendSub));
  });
}

</script>

<style scoped>
#addFriend {
  @media (max-width: 787px) {
    margin-left: 0;
    margin-top: 1rem;
  }
}
</style>
