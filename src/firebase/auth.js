import { 
    createUserWithEmailAndPassword,
    deleteUser,
    sendPasswordResetEmail,
    onAuthStateChanged,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { auth }from './config';
import {
    DB_getUserData,
    DB_setUserData
} from './firestore'


export async function AUTH_login(email, password){
    console.log('singining in ', email, password);
    try{
        const user = await signInWithEmailAndPassword(auth, email, password);
        return user;
    }
    catch(error){
        console.error(error);
        throw error;
    }
}

export async function AUTH_createAccount(email, password){
    try{
        const user = await createUserWithEmailAndPassword(auth, email, password);
        return user;
    }
    catch(error){
        console.error(error);
        throw error;
    }
}

//getters
export async function isLoggedIn(){
    return auth.currentUser || await new Promise((res, rej)=>{
        onAuthStateChanged(auth, (user)=>{
            if(user){
                res(user);
            }
            else{
                res(null);
            }
        });
    });
}

export async function 
AUTH_getData(){
    if(!isLoggedIn())return;
    try {
        const data = await DB_getUserData( (await AUTH_getUser()).uid ); 
        return data;//get all raw data
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function AUTH_getUser(){
    return auth.currentUser || await new Promise((res, rej)=>{
        onAuthStateChanged(auth, user=>{
            if(user)res(user)
        })
    })
}

//setters
export async function AUTH_setUserData(data){
    if(!isLoggedIn())return;
    try{
        await DB_setUserData((await AUTH_getUser())?.uid, data);
    } catch(error){
        console.log(error);
        throw error;
    }
}
// export async function createAccount(email, password) {
//   try {
//     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//     return userCredential.user;
//   } catch (error) {
//     console.error("Error creating account:", error);
//     throw error;
//   }
// }

// export async function deleteAccount() {
//   try {
//     const user = auth.currentUser;
//     await deleteUser(user);
//   } catch (error) {
//     console.error("Error deleting account:", error);
//     throw error;
//   }
// }

// export async function sendPasswordResetEmail(email) {
//   try {
//     await sendPasswordResetEmail(auth, email);
//   } catch (error) {
//     console.error("Error sending password reset email:", error);
//     throw error;
//   }
// }

// export async function isLoggedIn() {
//   return !!auth.currentUser || new Promise((res, rej)=>{
//     onAuthStateChanged(auth, (user) => {
//       if (user) {
//         res(true);
//       } else {
//         res(false);
//       }
//     });
//   });
// }