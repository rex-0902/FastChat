// stores/counter.js
import { defineStore } from "pinia";
import Swal from 'sweetalert2';
import axios from "axios";
import { v4 as uuid } from "uuid";
import { db } from "../firebase-init";


import {
  setDoc,
  getDoc,
  doc,
  getDocs,
  collection,
  updateDoc,
  arrayUnion,
  onSnapshot,
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
    showFindFriends: false,
    currentChat: null,
    removeUsersFromFindFriends: [],
    userID:""
  }),
  actions: {
      // 檢查fastChat id 沒被註冊過
      async checkfastChatId (data){
        const allFastChatIds = await getDocs(collection(db, "fastChatId"));
        return allFastChatIds.docs.some(doc => doc.id === data);
         },
    async getUserDetailsFromGoogle(data) {
      try {
        let res = await axios.post("api/google-login", {
          token: data.credential,
        });
        console.log(res)
        let userExists = await this.checkIfUserExists(res.data.sub);
        // 檢查用戶是否註冊
        if (!userExists){
          await this.saveUserDetails(res);
        } 
        await this.getAllUsers();
        this.sub = res.data.sub;
        this.email = res.data.email;
        this.picture = res.data.picture;
        this.firstName = res.data.given_name;
        this.lastName = res.data.family_name;
     
      } catch (error) {
        console.log(error);
      }
    },
    async getAllUsers() {
      // 取得已經註冊的用戶
      const querySnapshot = await getDocs(collection(db, "users"));
      let results = [];
      querySnapshot.forEach((doc) => {
        results.push(doc.data());
      });
      console.log(results)
      if (results.length) {
        this.allUsers = results;
      
        this.showFindFriends = true
      }
    },
    //檢查用戶是否存在
    async checkIfUserExists(id) {
      const docRef = doc(db, "users", id);
      const docSnap = await getDoc(docRef);
      return docSnap.exists();
    },
    // 儲存用戶詳細信息
    async saveUserDetails(res) {
      // try {
        Swal.fire({
          title: "第一次登入請先設定fastChat id",
          input: "text",
          inputAttributes: {
            autocapitalize: "off"
          },
          showCancelButton: true,
          allowOutsideClick: false,
          confirmButtonText: "確定",
          CancelButtonText: "取消",
          showLoaderOnConfirm: true,
          inputValidator: async (value) => {
            const regex = /^[a-zA-Z0-9]*$/;
            if (!value) {
              return '欄位不可空白';
            } else if (!regex.test(value)) {
              return 'fastChat id只能包含英文字母和數字！';
            } else if (await this.checkfastChatId(value)) {
              return 'fastChat id重複，請想新的';
            }
          },
          allowOutsideClick: () => !Swal.isLoading()
        }).then(async (result) => {
          if (result.isConfirmed) {
            const fastChatId = result.value;
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
          }
        }).then(async ()=>{

          await setDoc(doc(db, "users", res.data.sub), {
            sub: res.data.sub,
            email: res.data.email,
            picture: res.data.picture,
            firstName: res.data.given_name,
            lastName: res.data.family_name,
            allDriends:''
            
          });
        })
     
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
    async deleteCollection(collectionPath) {
      const collectionRef = db.collection(collectionPath);
      const batchSize = 100;

      try {
        // 取得所有集合文件
        const query = collectionRef.orderBy("__name__").limit(batchSize);
        const snapshot = await query.get();

        // 如果沒有文件，直接返回
        if (snapshot.size === 0) {
          return;
        }

        // 建立一個batch操作
        const batch = db.batch();
        snapshot.docs.forEach((doc) => {
          // 將每個文件加入batch操作中的刪除操作
          batch.delete(doc.ref);
        });

        // 執行batch操作
        await batch.commit();

        // 遞迴刪除集合的下一批文件
        return deleteCollection(collectionPath);
      } catch (error) {
        console.error("Error deleting collection:", error);
        throw error;
      }
    },
  
    logout() {
      this.deleteCollection("users")
        .then(() => {
          console.log("Collection deleted successfully.");
        })
        .catch((error) => {
          console.log('123')
          console.error("Error deleting collection:", error);
        });
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
      this.currentChat = false;
    },
  },
  persist: true,
});
