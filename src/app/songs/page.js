'use client';

import styles from './page.module.css';
import { useEffect, useState } from 'react';
import { DB_getSongs } from "@/firebase/firestore";
import { AUTH_getUser } from "@/firebase/auth"

export default function SongsPage() {
    // This will be replaced with actual data fetching
    const [songs, setSongs] = useState([]);
    useEffect(()=>{
      const unsub = async () => {
        try{
          const userData = await AUTH_getUser();
          if(userData){
            const userSongs = await DB_getSongs(userData.uid);
          }
        }
        catch(error){
            console.error(error);
        }
      }
      unsub();
    }, [])

    return (
      <div className={styles.main}>
        <div className={styles.optionHolder}>
          <Option name="Type" options={["solo","colab"]}/>
          <Option name="Sort" options={["time","length","popularity"]} alphabetical={true}/>
          <Option name="Genre" options={["rock", "acoustic", "pop", "ballad"]} defaultValue="none" alphabetical={true}/>
        </div>
        <div>
            <span>Nothing found</span>
        </div>
      </div>
    );
}

function Option({name, options=[], alphabetical=false, defaultValue}){
    useEffect(()=>{
      if(alphabetical){//to be fixed
        options = options.sort((a,b)=>a-b)
      }
    }, []);
    return(
        <div>
            <span>{name}:</span>
            <select>
                {defaultValue? <option>{defaultValue}</option>:null}
                {options.map((x,i)=><option key={i}>{x}</option>)}
            </select>
        </div>
    )
}

function SongBlock(){
  return(
    <div>
      <div>

      </div>
      <div>

      </div>
    </div>
  )
}