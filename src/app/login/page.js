'use client'

import Toggler from "@/components/Toggler";
import { useState, useRef } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/config";
import styles from './page.module.css';
import { AUTH_login, AUTH_createAccount } from "@/firebase/auth";

export default function Login(){

    const [value, setValue] = useState("log-in");
    return (
        <div className={styles.main}>
            <Toggler options={["log-in" , "sign up"]} setValue={setValue} value={value} className={styles.toggler}/>

            <div>
                {value === "log-in" ? <LoginForm /> : <SignUpForm />}
            </div>
        </div>
    );
}

function LoginForm(){
    const emailRef = useRef();
    const passwordRef = useRef();
    const buttonRef = useRef();

    return (
        <form onSubmit={e=>handleClick(e)}>
            <h2>Log-in Your Account</h2>
            <div>
                <label>E-mail</label>
                <input type="email" placeholder="Email" ref={emailRef} required/>
            </div>
            <div>
                <label>Password</label>
                <input type="password" placeholder="Password" ref={passwordRef} required/><br/>
            </div>
            <input type="submit" value={"Log In"} ref={buttonRef}/>
        </form>
    )

    async function handleClick(e){
        e.preventDefault(); // Prevent the default form submission
        
        buttonRef.current.disabled = true;

        try{
            await AUTH_login(emailRef.current.value, passwordRef.current.value);
            redirect();
        }
        catch(error){
            console.error("Error logging in:", error);
        }

        buttonRef.current.disabled = false;
    }
}

function SignUpForm(){
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    
    return (
        <form onSubmit={e=>handleClick(e)}>
            <h2>Create a new Account</h2>
            <div>
                <label>Email</label>
                <input type="email" placeholder="Email" required ref={emailRef}/>
            </div>
            <div>
                <label>Password</label>
                <input type="password" placeholder="Password" required ref={passwordRef}/>
            </div>
            <div>
                <label>Confirm Password</label>
                <input type="password" placeholder="Confirm Password" required ref={confirmPasswordRef}/>
            </div><br/>
            <input type="submit" value="Sign Up" />
        </form>
    )

    async function handleClick(e=Event){
        e.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;

        if(password !== confirmPassword){
            return window.alert("Passwords do not match");
        }

        try{
            await AUTH_createAccount(email, password);
            redirect();
        }
        catch(error){
            console.error("Error signing up:", error);
            alert('failed to sign up');   
        }

        
    }
}
function redirect(){
    onAuthStateChanged(auth, user=>{
        if(user.uid){
            window.location.href = "/";
        }
    });
}