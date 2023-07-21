import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, getDocs, collection, addDoc } from "firebase/firestore";
import { Post } from "../stores/posts";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_FIREBASE_APPID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENTID
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp)
const postCollection = collection(db, 'posts');

const getPosts = async () => {
  const postSnapshot = await getDocs(postCollection);
  const postList = postSnapshot.docs.map(doc => {
    const docData = doc.data() as Post
    return docData;
  });
  return postList;
}

const getPost = async (id: any) => {
  const postSnapshot = await getDocs(postCollection);
  const postList = postSnapshot.docs.map(doc => doc.data());
  const post = postList.find(post => post.id == id)
  return post;
}

const addPost = (newPost: Post) => {
  addDoc(collection(db, "posts"), newPost);
}

export default {
  auth,
  getPosts,
  getPost,
  addPost
} 