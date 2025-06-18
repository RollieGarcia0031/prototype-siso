import { db, auth } from "./config";
import { usersCollectionRef } from '@/util/constants';
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

//getter
export async function DB_getUserData(USER_ID){
    try {
        const docRef = doc(db, usersCollectionRef, USER_ID);
        const docSnap = await getDoc(docRef);

        const data = docSnap.data();
        return docSnap.exists()? data : null;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


//setter
export async function DB_setUserData(USER_ID, data){
    try {
        await setDoc( doc(db, usersCollectionRef, USER_ID), data, {merge: true} )
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