'use client';

import {useState, useEffect} from 'react';
import styles from './page.module.css';
import { FaEdit } from 'react-icons/fa'; 
import { AUTH_getData } from '@/firebase/auth'

import Link from 'next/link'

export default function ProfilePage() {
    return(
      <>
        <ProfileHeader />  
      </>
    )
} 

function ProfileHeader(){
    const [userName, setUserName] = useState('');

    useState(()=>{
        const unsub = async()=>{
            try {
                const userName = (await AUTH_getData()).name;
                if (userName?.length){setUserName(userName)}
                else if (userName == undefined || userName == null){setUserName(null)}
            } catch (error) {
                console.error(error);
            }
        }

        unsub();
    },[]);
    
    return (
        <div className={styles.profileHeader}>
          <div className={styles.profileIcon}>
            {userName? userName.charAt(0) : "?"}
          </div>
          <div className={styles.profileHolder}>
            {userName?
                (<span>{userName}</span>):
                (<span className={styles.blankName}>No Name</span>)
            }
          </div>
          <Link href='/profile/edit' className={styles.linkEdit}>
            <FaEdit /><span>edit</span>
          </Link>
        </div>
    );

}