import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, getDocs, collection, addDoc, doc, updateDoc, arrayUnion } from "firebase/firestore";
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
  const postList = postSnapshot.docs.map(doc => {
    const docData = doc.data() as Post
    return docData;
  });
  const post = postList.find(post => post.id == id)  
  return post;
}

const addPost = (newPost: Post) => {
  addDoc(postCollection, newPost);
}

const addComment = async (id: any, newComment: Post) => {
  let commentCount = 0
  const postSnapshot = await getDocs(postCollection);
  const findPost = postSnapshot.docs.find(doc => {
    const docData = doc.data() as Post
    commentCount = docData.comments
    return docData.id === id;
  });

  if (findPost) {
    updateDoc(doc(postCollection, findPost.id), {
      "commentList": arrayUnion(
        ...[
        newComment
        ]
      ),
      "comments": commentCount +1
    })
  }
}

const likePost = async (id: any) => {
  let likeCount = 0
  let isPostLiked = null
  
  const postSnapshot = await getDocs(postCollection);
  const findPost = postSnapshot.docs.find(doc => {
    const docData = doc.data() as Post
    likeCount = docData.like
    isPostLiked = docData.isLiked
    isPostLiked ? likeCount -- : likeCount ++
    return docData.id === id;
  });

  if (findPost) {
    updateDoc(doc(postCollection, findPost.id), {
      "like": likeCount,
      "isLiked": !isPostLiked
    })
  }
}

export default {
  auth,
  getPosts,
  getPost,
  addPost,
  addComment,
  likePost
} 