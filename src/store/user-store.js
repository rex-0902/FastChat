// stores/counter.js
import { defineStore } from "pinia";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4001/";

export const useUserStore = defineStore("user", {
  state: () => ({
    sub: "",
    email: "",
    picture: "",
    firstName: "",
    lastName: "",
  }),
  actions: {
    async getUserDetailsFromGoogle(data) {
      try {
        let res = await axios.post("api/google-login", {
          token: data.credential,
        });
        console.log(res);
        this.sub = res.data.sub;
        this.email = res.data.email;
        this.picture = res.data.picture;
        this.firstName = res.data.family_name;
        this.lastName = res.data.given_name;
      } catch (error) {
        console.log(error);
      }
    },
    logout() {
      this.sub = "";
      this.email = "";
      this.picture = "";
      this.firstName = "";
      this.lastName = "";
    },
  },
  persist: true,  
});
