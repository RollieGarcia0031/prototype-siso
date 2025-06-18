'use client';
import { useEffect, useRef, useState } from 'react';
import { FaCheck, FaSkullCrossbones } from 'react-icons/fa'
import styles from './css/AlertDialog.module.css'

export default function AlertDialog({value, isOpened, setIsOpened, onConfirm}){
    const ref = useRef(null);

    const [errorMessage, setErrorMessage] = useState('');
    useEffect(()=>{
      if(isOpened){return ref.current.showModal()}
      ref.current.close();
    },[isOpened])

    return (
        <dialog ref={ref} className={styles.main}>
            <div>{value}</div>
            <div className={styles.optionHolder}>
                <button onClick={handleClick}><FaCheck />Confirm</button>
                <button onClick={()=>setIsOpened(false)}><FaSkullCrossbones />Cancel</button>
            </div>
            <div className={styles.errorMessage}>{errorMessage}</div>
        </dialog>
    )

    async function handleClick(){
        try {
            console.log('confirming')
            await onConfirm();
            setErrorMessage('')
            setIsOpened(false);
        } catch (error) {
            console.error(error)
            console.log(await onConfirm)
            setErrorMessage('something went wrong, please try again')
        }
    }
}