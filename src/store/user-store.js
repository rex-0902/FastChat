// stores/counter.js
import { defineStore } from "pinia";
import Swal from "sweetalert2";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { db } from "../firebase-init";
import { useRouter } from "vue-router";

import {
  setDoc,
  getDoc,
  doc,
  getDocs,
  collection,
  updateDoc,
  arrayUnion,
  onSnapshot,
  deleteField,
  query,
} from "firebase/firestore";

axios.defaults.baseURL = "http://localhost:4001/";

export const useUserStore = defineStore("user", {
  state: () => ({
    sub: "",
    email: "",
    picture: "",
    firstName: "",
    lastName: "",
    chats: [],
    allUsers: [],
    userDataForChat: [],
    removeUsersFromFindFriends: [],
    showFindFriends: true,
    currentChat: null,
    howAboutThisPerson: [],
    userID: "", // 使用者的fastChatID
    loginStatus: false,
  }),
  actions: {
    // 檢查fastChat id 沒被註冊過
    async checkfastChatId(data) {
      const allFastChatIds = await getDocs(collection(db, "fastChatId"));
      return allFastChatIds.docs.some((doc) => doc.id === data);
    },
    async getUserDetailsFromGoogle(data, router) {

        let res = await axios.post("api/google-login", {
          token: data.credential,
        });
        console.log(res)
        let userExists = await this.checkIfUserExists(res.data.sub);
        // 檢查用戶是否註冊
        if (!userExists) {
          await this.saveUserDetails(res, router);
        } else {
          // await this.getAllUsers();
          await this.checkUserInfo(res.data.sub, router);
        }
     
    },
    async getAllUsers(userSub) {
      let allusersArray = [];

      const docRef = doc(db, "users", userSub);
      const docSnap = await getDoc(docRef);
      if (docSnap.data().allFriends?.length > 0) {
        docSnap.data().allFriends.forEach((res) => {
   
          let user = {
            email: res.email,
            firstName: res.firstName,
            lastName: res.lastName,
            picture: res.picture,
            sub: res.sub,
            fastChatId: res.fastChatId,
          };
          allusersArray.push(user);
        });

        this.allUsers = allusersArray;
      } else {
        this.allUsers = "";
      }
      this.showFindFriends = true;
    },
    async checkUserInfo(id, router) {
      const docRef = doc(db, "users", id);
      const docSnap = await getDoc(docRef);

      this.sub = docSnap.data().sub;
      this.email = docSnap.data().email;
      this.picture = docSnap.data().picture;
      this.firstName = docSnap.data().firstName;
      this.lastName = docSnap.data().lastName;

      let allusersArray = [];

      if (docSnap.data()?.allFriends?.length > 0) {
        docSnap.data().allFriends.forEach((res) => {
      
          let user = {
            email: res.data().email,
            firstName: res.data().firstName,
            lastName: res.data().lastName,
            picture: res.data().picture,
            sub: res.data().sub,
            fastChatId: res.data().fastChatId,
          };
          allusersArray.push(user);
        });

        this.allUsers = allusersArray;
      } else {
        this.allUsers = "";
      }

      this.userID = docSnap.data().fastChatId;
      this.howAboutThisPerson = docSnap.data().howAboutThisPerson;
      this.loginStatus = true;
      router.push("/");
    },

    async searchFriend(addUserId) {
      const fastChatCollection = collection(db, "fastChatId");
      const fastChatSnapshot = await getDocs(fastChatCollection);
      let matchingUsers = null;

      for (const fastChatDoc of fastChatSnapshot.docs) {
        if (fastChatDoc.id === addUserId) {
          matchingUsers = fastChatDoc.data();
        }
      }
      return matchingUsers;
      // console.log(q)
    },
    async addFriend(addFriendSub) {
      const userDocRef = doc(db, "users", addFriendSub);
      const userDocSnapshot = await getDoc(userDocRef);
      let msg = "";
      if (userDocSnapshot.exists()) {
        let howAboutThisPerson =
          userDocSnapshot.data().howAboutThisPerson || [];
     
        // 查找是否已有相同 fastChatId
        let existingUserIndex = undefined;
        if (howAboutThisPerson.length !== 0) {
          existingUserIndex = howAboutThisPerson.findIndex(
            (user) => user.sub === this.sub
          );
        }
        let userInfo = {
          sub: this.sub,
          email: this.email,
          picture: this.picture,
          firstName: this.firstName,
          lastName: this.lastName,
          fastChatId: this.userID,
        };
      
        if (existingUserIndex !== -1 && existingUserIndex !== undefined) {
          // 覆蓋已有對象
          msg = "已送出好友!";
        } else {
          // 增加新對象
          howAboutThisPerson.push(userInfo);
          msg = "好友邀請已送出";
        }
 
        // 更新文檔
        await updateDoc(userDocRef, { howAboutThisPerson });
      } else {
        msg = "系統異常";
      }
      return msg;
    },
    //檢查用戶是否存在
    async checkIfUserExists(id) {
      const docRef = doc(db, "users", id);
      const docSnap = await getDoc(docRef);
      return docSnap.exists();
    },
    // 儲存用戶詳細信息
    async saveUserDetails(res, router) {
      // try {
      Swal.fire({
        title: "第一次登入請先設定fastChat id",
        input: "text",
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: true,
        allowOutsideClick: false,
        confirmButtonText: "確定",
        CancelButtonText: "取消",
        showLoaderOnConfirm: true,
        inputValidator: async (value) => {
          const regex = /^[a-zA-Z0-9]*$/;
          if (!value) {
            return "欄位不可空白";
          } else if (!regex.test(value)) {
            return "fastChat id只能包含英文字母和數字！";
          } else if (await this.checkfastChatId(value)) {
            return "fastChat id重複，請想新的";
          }
        },
        allowOutsideClick: () => !Swal.isLoading(),
      })
        .then(async (result) => {
          // isSetFastChatId
          let isSetFastChatId = false;
          if (result.isConfirmed) {
            const fastChatId = result.value;
            isSetFastChatId = true;
            this.userID = result.value;
            try {
              await setDoc(doc(db, "fastChatId", fastChatId), {
                fastChatId,
                sub: res.data.sub,
                email: res.data.email,
                picture: res.data.picture,
                firstName: res.data.given_name,
                lastName: res.data.family_name,
              });
            } catch (error) {
              console.log(error);
            }
          } else {
            isSetFastChatId = false;
          }
          return isSetFastChatId;
        })
        .then(async (isSetFastChatId) => {
          if (isSetFastChatId == true) {
            await setDoc(doc(db, "users", res.data.sub), {
              sub: res.data.sub,
              email: res.data.email,
              picture: res.data.picture,
              firstName: res.data.given_name,
              lastName: res.data.family_name,
              allFriends: [],
              howAboutThisPerson: [],
              fastChatId: this.userID,
            });

            this.sub = res.data.sub;
            this.email = res.data.email;
            this.picture = res.data.picture;
            this.firstName = res.data.given_name;
            this.lastName = res.data.family_name;
            this.loginStatus = true;
            router.push("/");
          }
        });
    },
    async getChatById(id) {
      onSnapshot(doc(db, "chat", id), (doc) => {
        let res = [];
        res.push(doc.data());
        this.currentChat = res;
      });
    },
    //按使用者取得所有聊天記錄
    getAllChatsByUser() {
      const q = query(collection(db, "chat"));

      onSnapshot(q, (querySnapshot) => {
        let chatArray = [];
        querySnapshot.forEach((doc) => {
          let data = {
            id: doc.id,
            sub1: doc.data().sub1,
            sub2: doc.data().sub2,
            sub1HasViewed: doc.data().sub1HasViewed,
            sub2HasViewed: doc.data().sub2HasViewed,
            messages: doc.data().messages,
          };

          if (doc.data().sub1 === this.sub) chatArray.push(data);
          if (doc.data().sub2 === this.sub) chatArray.push(data);

          this.removeUsersFromFindFriends = [];

          chatArray.forEach((chat) => {
            if (this.sub === chat.sub1) {
              this.allUsers.forEach((user) => {
                if (user.sub == chat.sub2) {
                  chat.user = user;
                  this.removeUsersFromFindFriends.push(user.sub);
                }
              });
            }

            if (this.sub === chat.sub2) {
              this.allUsers.forEach((user) => {
                if (user.sub == chat.sub1) {
                  chat.user = user;
                  this.removeUsersFromFindFriends.push(user.sub);
                }
              });
            }
          });

          this.chats = [];
          chatArray.forEach((chat) => {
            this.chats.push(chat);
          });
        });
      });
    },
    async sendMessage(data) {
      try {
        if (data.chatId) {
          await updateDoc(doc(db, `chat/${data.chatId}`), {
            sub1HasViewed: false,
            sub2HasViewed: false,
            messages: arrayUnion({
              sub: this.sub,
              message: data.message,
              createdAt: Date.now(),
              type: "text",
            }),
          });
        } else {
          let id = uuid();
          await setDoc(doc(db, `chat/${id}`), {
            sub1: this.sub,
            sub2: data.sub2,
            sub1HasViewed: false,
            sub2HasViewed: false,

            messages: [
              {
                sub: this.sub,
                message: data.message,
                createdAt: Date.now(),
                type: "text",
              },
            ],
          });

          this.userDataForChat[0].id = id;
          this.showFindFriends = false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async hasReadMessage(data) {
      await updateDoc(
        doc(db, `chat/${data.id}`),
        {
          [data.key1]: data.val1,
          [data.key2]: data.val2,
        },
        { merge: true }
      );
    },
    async becomeFriends(becomeFriendSub) {
      // 確認的好朋友
      const FriendDocRef = doc(db, "users", becomeFriendSub);
      const FriendDocSnapshot = await getDoc(FriendDocRef);
      let msg = "";
      if (FriendDocSnapshot.exists()) {
        let FriendAllUsers = FriendDocSnapshot.data().allFriends || [];
        // 查找是否已有相同 fastChatId
      
        let existingUserIndex = undefined;
        if (FriendAllUsers.length !== 0) {
          existingUserIndex = FriendAllUsers.findIndex(
            (user) => user.sub === this.sub
          );
        }
        let userInfo = {
          sub: this.sub,
          email: this.email,
          picture: this.picture,
          firstName: this.firstName,
          lastName: this.lastName,
          fastChatId: this.userID,
        };
        if (existingUserIndex !== -1 && existingUserIndex !== undefined) {
          // 覆蓋已有對象
          msg = "已成為好友!";
        } else {
          // 增加新對象
          FriendAllUsers.push(userInfo);
          msg = "好友已增加";
        }
       
        // 更新朋友的好友欄位
        await updateDoc(FriendDocRef, { allFriends: FriendAllUsers });

        // 更新自己的好友欄位
        const userDocRef = doc(db, "users", this.sub);
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          let userAllUsers = userDocSnapshot.data().allFriends || [];
        
          let existingFriendIndex = undefined;
          if (userAllUsers.length !== 0) {
            existingFriendIndex = userAllUsers.findIndex(
              (user) => user.sub === this.sub
            );
          }
          let FriendInfo = {
            sub: FriendDocSnapshot.data().sub,
            email: FriendDocSnapshot.data().email,
            picture: FriendDocSnapshot.data().picture,
            firstName: FriendDocSnapshot.data().firstName,
            lastName: FriendDocSnapshot.data().lastName,
            fastChatId: FriendDocSnapshot.data().fastChatId,
          };
          if (existingUserIndex == -1 || existingUserIndex == undefined) {
        
            userAllUsers.push(FriendInfo);
          }
          await updateDoc(userDocRef, { allFriends: userAllUsers });
          // 移除userDocRef 的howAboutThisPerson
          getDoc(userDocRef)
            .then((doc) => {
              if (doc.exists) {
                // Step 2: Get the current array
                let howAboutThisPerson = doc.data().howAboutThisPerson;

                // Step 3: Find the index of the object with sub == Friend.sub
                const index = howAboutThisPerson.findIndex(
                  (obj) =>
                    obj.sub ===
                    FriendDocSnapshot.data().sub
      
                );

                // Step 4: Remove the object if found
                if (index !== -1) {
                  howAboutThisPerson.splice(index, 1);

                  // Step 5: Update the document with the modified array
                  updateDoc(userDocRef, {
                    howAboutThisPerson: howAboutThisPerson,
                  });
                } else {
                  console.log("No such sub value in the array!");
                }
              } else {
                console.log("No such document!");
              }
            })
            .catch((error) => {
              console.log("Error getting document:", error);
            });
        }
      } else {
        msg = "系統異常";
      }
      return msg;
    },
    async removeHowAboutThisPerson(becomeFriendSub, state) {
      // 佔存要刪除的物件
      let removedObjects = [];

      // 遍歷陣列，找到需要刪除的物件
      for (let i = 0; i < this.howAboutThisPerson.length; i++) {
        if (
          this.howAboutThisPerson[i].sub ===
          becomeFriendSub
        ) {
          // 記錄被刪除的物件
          removedObjects.push(this.howAboutThisPerson[i]);
          // 刪除物件
          this.howAboutThisPerson.splice(i, 1);
          // 20240721

          const dbDocRef = doc(db, "users", this.sub);
          await updateDoc(dbDocRef, {
            howAboutThisPerson: this.howAboutThisPerson,
          });
        }
      }
    },
    async getHowAboutThisPerson() {
      const docRef = doc(db, "users", this.sub);
      const docSnap = await getDoc(docRef);
      this.howAboutThisPerson =
        docSnap.data().howAboutThisPerson;
    },
    logout() {
      this.sub = "";
      this.email = "";
      this.picture = "";
      this.firstName = "";
      this.lastName = "";
      this.allUsers = [];
      this.chats = [];
      this.userDataForChat = [];
      this.removeUsersFromFindFriends = [];
      this.showFindFriends = false;
      this.currentChat = null;
      this.howAboutThisPerson = [];
      this.userID = "";
      this.loginStatus = false;
    },
  },
  persist: {
    storage: sessionStorage,
  },
});
