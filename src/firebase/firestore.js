import { db, auth } from "./config";
import { CollectionRefs } from '@/util/constants';
import {
    collection,
    doc,
    getDoc,
    setDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    getDocs,
} from "firebase/firestore";

import { AUTH_getUser } from "./auth";
import { SB_uploadSong } from "./storage"

//getter
export async function DB_getUserData(USER_ID){
    try {
        const docRef = doc(db, CollectionRefs.user, USER_ID);
        const docSnap = await getDoc(docRef);

        const data = docSnap.data();
        return docSnap.exists()? data : null;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function DB_getSongs(userId){
    try {
        console.log(userId)
    } catch (error) {
        console.error(error);
    }
}


//setter
export async function DB_setUserData(USER_ID, data){
    try {
        await setDoc( doc(db, CollectionRefs.user, USER_ID), data, {merge: true} )
    } catch (error) {
        console.error(error)
        throw error;
    }
}
const user = {
    id : {
        name: '',
        address: '',
        bio: '',
    }
}

export async function DB_uploadSong(file, metadata){
    try {
        const {uid} = await AUTH_getUser();
        if (!uid)throw new Error("no account");
        //upload to storage bucket
        const uploadRef = await SB_uploadSong(file);
        //save categorically in database (public/private)
        const docRef = doc(collection(db, CollectionRefs.songs));
        await setDoc(docRef,
            {
                ...metadata,
                ref: uploadRef.ref.fullPath,
                ownerID: uid
            });
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// // Function to get a document
// async function getDocument(collectionName, docId) {
//   const docRef = doc(db, collectionName, docId);
//   const docSnap = await getDoc(docRef);
//   if (docSnap.exists()) {
//     return docSnap.data();
//   } else {
//     console.log("No such document!");
//     return null;
//   }
// }

// // Function to set a document
// async function setDocument(collectionName, docId, data) {
//   const docRef = doc(db, collectionName, docId);
//   await setDoc(docRef, data);
//   console.log("Document successfully written!");
// }

// // Function to update a document
// async function updateDocument(collectionName, docId, data) {
//   const docRef = doc(db, collectionName, docId);
//   await updateDoc(docRef, data);
//   console.log("Document successfully updated!");
// }

// // Function to delete a document
// async function deleteDocument(collectionName, docId) {
//   const docRef = doc(db, collectionName, docId);
//   await deleteDoc(docRef);
//   console.log("Document successfully deleted!");
// }

// // Function to query documents
// async function queryDocuments(collectionName, field, operator, value) {
//   const q = query(collection(db, collectionName), where(field, operator, value));
//   const querySnapshot = await getDocs(q);
//   const results = [];
//   querySnapshot.forEach((doc) => {
//     results.push(doc.data());
//   });
//   return results;
// }