'use client';

import {
    AUTH_getData,
    AUTH_setUserData
} from "@/firebase/auth";
import AlertDialog from '@/components/AlertDialog';
import styles from './page.module.css';
import { useRef, useState, useEffect } from 'react'
import { FaBackspace, FaSave, FaTrash } from 'react-icons/fa';
import { IoRefreshCircleOutline } from 'react-icons/io5'
import Link from 'next/link';

export default function Edit(){
    const nameRef = useRef(null);//references for checking initial value, used to auto-enable save button when the value changes
    const addressRef = useRef(null);
    const bioRef = useRef(null);

    const [name, setName] = useState("");//for input values
    const [address, setAddress] = useState("");
    const [bio, setBio] = useState("");

    const [disableSaveButton, setDisableSaveButton] = useState(true);

    const [dialogValue, setDialogValue] = useState('');
    const [dialogIsOpened, setdialogIsOpened] = useState(false);

    const hooksAndRef = [
      [name, nameRef.current, setName],
      [address, addressRef.current, setAddress],
      [bio, bioRef.current, setBio]
    ]//paris for easy iteration
    
    useEffect(()=>{
      const unsub = async()=>{
        try{
            const {name, address, bio} = await AUTH_getData();
            setInputValue(setName, name, nameRef);
            setInputValue(setAddress, address, addressRef);
            setInputValue(setBio, bio, bioRef);
        }
        catch(error){
            console.error('error');
        }
      }//set the initial value from database

      unsub();
    },[])

    useEffect(()=>{
      let changed = false;
      hooksAndRef.forEach(data => {//iterate through the pairs
        const [current, initial] = data;
        if(current != initial) {
            changed = true
            console.log('you changed :', current, ' from : ', initial);
        };//checks if the new input is different from original value
      })

      setDisableSaveButton(!changed);//disable if no change in data occured

    }, [name, address, bio]);//update save button upon change in inputs


    return (
      <>
      <AlertDialog
        value={dialogValue}
        isOpened={dialogIsOpened}
        setIsOpened={setdialogIsOpened}
        onConfirm={()=>{
          hooksAndRef.forEach(data => {
            const [current, initial, setValue] = data;
            setValue(initial);
          });
        }}
      />

      <div className={styles.main}>
        <div className={styles.optionButtonHolder}>
            <div>
                <Link href="/profile" className={styles.backLink}><FaBackspace /></Link>
            </div>
            <button onClick={saveUserInfo} disabled={disableSaveButton}><FaSave /></button>
            <button onClick={resetUserInfo}><IoRefreshCircleOutline /></button>
        </div>
        <div className={styles.basicInfo}>
            <InputSmall text="Name:" content={name} setContent={setName}/>
            <InputSmall text="Address:" content={address} setContent={setAddress}/>
        </div>
        <InputLarge text="Bio:" content={bio} setContent={setBio} />
      </div>
      </>
    )

    function setInputValue(setValue, value, ref){
        setValue(value);
        ref.current = value === null? '':value;
    }

    async function saveUserInfo(){
        try {
            console.log('saving now');
            await AUTH_setUserData({name, address, bio});
            setDisableSaveButton(true);
            
        } catch (error) {
            console.error(error);
        }
    }

    function resetUserInfo(){
        setDialogValue("Are you sure you want to reset the changes you've made?")
        setdialogIsOpened(true);        
    }
}


const InputSmall = function({text='', content, setContent}){
    return (
        <div className={styles.inputSmall}>
            <p className='headerText1'>{text}</p>
            <input
                type="text"
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