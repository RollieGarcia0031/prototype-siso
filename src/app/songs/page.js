'use client';

import styles from './page.module.css';
import { useEffect, useState, useRef } from 'react';
import { DB_getSongs } from "@/firebase/firestore";
import { AUTH_getUser } from "@/firebase/auth"

import { FaUpload } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5';

import { DB_uploadSong } from '@/firebase/firestore'
export default function SongsPage() {
    const [songs, setSongs] = useState([]);
    const uploadDialogRef = useRef(null);

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
        <div>
            <button onClick={e=>uploadDialogRef.current.showModal()}><FaUpload/>Upload</button>
        </div>
        <div className={styles.optionHolder}>
          <Option name="Type" options={["solo","colab"]}/>
          <Option name="Sort" options={["time","length","popularity"]} alphabetical={true}/>
          <Option name="Genre" options={["rock", "acoustic", "pop", "ballad"]} defaultValue="none" alphabetical={true}/>
        </div>
        <div>
            <span>Nothing found</span>
        </div>

        <UploadDialog ref={uploadDialogRef}/>
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

function UploadDialog({ref}){
    const [submitText, setSubmitText] = useState("upload");

    return (
        <dialog ref={ref} className={styles.uploadDialog}>
            <div>
                <button onClick={e=>ref.current.close()}><summary title='Close'> <IoClose /> </summary></button>
            </div>
            <form onSubmit={e=>handleSubmit(e)}>
                <input type='file' accept='mp3' required name="song"/>
                <div className={styles.dataTable}>
                    <label>Title</label>
                    <input type="text" name="title" placeholder='- - - ' required={true}/>
                    <label>Visibility</label>
                    <select name="visibility">
                        <option>public</option>
                        <option>private</option>
                    </select>
                    <label>Genre</label>
                    <select name="genre">
                        <option>others</option>
                        <option>acoustic</option>
                        <option>rock</option>
                        <option>hip-hop</option>
                    </select>
                    <label>Description</label>
                    <textarea name="description" type="text" placeholder='- - - '/>
                    <label>Lyrics</label>
                    <textarea name="lyrics" type="text" placeholder='- - - '/>
                </div>
                <input type="submit" value={submitText}/> 
            </form>
        </dialog>
    )

    async function handleSubmit(e){
        e.preventDefault();
        console.log('handling');
        setSubmitText('uploading');

        const form = e.target;
        const formData = new FormData(form);

        const metadata = {};
        let file;

        for(const [key, value] of formData.entries()){
            if (value instanceof File){
                file = value
            }
            else{
                metadata[key] = value;
            }
        }
        try {
            await DB_uploadSong(file, metadata);
            console.log('done');
        } catch (error) {
            alert(error);
        }
    }
}