import { defineStore } from "pinia";
import _ from "lodash";
import { auth } from '../firebase/firebaseConfig';
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { router } from "../router";

const provider = new GoogleAuthProvider();

export type User = {
  login: boolean,
  token: string,
  email: string;
  username: string;
  photo: string;
}

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {} as User
  }),
  actions: {
    login () {
      signInWithPopup(auth, provider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential?.accessToken;

          if(result && token) {
            this.user.login = true;
            this.user.token = token;
            this.user.username = result.user.displayName ? result.user.displayName : '';
            this.user.email = result.user.email ? result.user.email : '';
            this.user.photo = result.user.photoURL ? result.user.photoURL : '../../public/img/dummy.jpg';
            router.push('/home')
          }
          
        }).catch((error) => {
          console.log("errör", error);
        });
    },
    logout () {
      signOut(auth)
      .then(() => {
        this.user.login = false
        router.push('/')
        console.log("sign out successful");
      })
      .catch((error) => {
        console.log("errör", error);
      })
    }
  },
})