'use client';

import {
    AUTH_getUserName,
    AUTH_setUserName
} from "@/firebase/auth";

import styles from './page.module.css';
import { useRef, useState, useEffect } from 'react'
import { FaBackspace, FaSave, FaTrash } from 'react-icons/fa';
import Link from 'next/link';
import { VectorValue } from "firebase/firestore";

export default function Edit(){
    const nameRef = useRef(null);
    const addressRef = useRef(null);
    const bioRef = useRef(null);

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [bio, setBio] = useState("");

    useEffect(()=>{
        setInputValue(setName, AUTH_getUserName, nameRef);
        setInputValue(setAddress, AUTH_getUserName, addressRef);
        setInputValue(setAddress, AUTH_getUserName, bioRef)
    },[])

    useEffect(()=>{
        console.log('changed value')
    }, [name, address, bio])
    return (
      <>
        <div className={styles.optionButtonHolder}>
            <div>
                <Link href="/profile" className={styles.backLink}><FaBackspace /></Link>
            </div>
            <button onClick={saveUserInfo}><FaSave /></button>
            <button><FaTrash /></button>
        </div>
      <div className={styles.main}>
        <div className={styles.basicInfo}>
            <InputSmall text="Name:" ref={nameRef} content={name} setContent={setName}/>
            <InputSmall text="Address:" ref={addressRef} content={address} setContent={setAddress}/>
        </div>
        <InputLarge text="Bio:" ref={bioRef} setContent={setBio}/>
      </div>
      </>
    )

    function setInputValue(setValue, promise, ref){
        promise()
          .then( value=>{
            setValue(x=>value);
            ref.current = value;
          })
          .catch(error=>console.error(error))
        ;
    }

    async function saveUserInfo(){
        try {
            console.log('saving now')
            checkAndUpdate(name, nameRef, AUTH_setUserName);
            checkAndUpdate(address, addressRef, AUTH_setUserName);
        } catch (error) {
            console.error(error);
        }
        async function checkAndUpdate(value, ref, promise){
            console.log('saving',{value, ref});
            if(value != ref.current){
                await promise(value);
            }
        }

    }
}


const InputSmall = function({text='', ref, content, setContent}){
    return (
        <div className={styles.inputSmall}>
            <p className='headerText1'>{text}</p>
            <input
                type="text"
                ref={ref}
                value={content}
                placeholder={`you haven't set your ${text}`}
                onChange={e=>setContent(e.target.value)}
            />
        </div>
    )
}

const InputLarge = function({text, ref, content, setContent}){
    return (
        <div className={styles.inputLarge}>
            <p className='headerText1'>{text}</p>
            <textarea
                ref={ref}
                value={content}
                onChange={e=>setContent(e.target.value)}
            />
        </div>
    );
}