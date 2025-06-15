'use client';

import { useState, useEffect } from "react";
import style from "@/components/css/SideBar.module.css"
import { CiCircleChevLeft } from "react-icons/ci";
import { IoHomeOutline, IoDiscOutline,IoMusicalNotesOutline } from "react-icons/io5";
import { FaRegNewspaper } from "react-icons/fa";

import { isLoggedIn } from "@/firebase/auth";


export default function Sidebar(){
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selectedItem, setSelectedItem] = useState("Dashboard");

    const [isAuth, setIsAuth] = useState(false);

    useEffect(()=>{
        const verifyAuth = async () => {
            try{
                const user = await isLoggedIn();
                setIsAuth(!!user);
                console.log(user);
            }
            catch(error){
                console.error(error);
            }
        }
        console.log('running');
        verifyAuth();
    }, []);

    return(
        isAuth ? 
            (<SidebarAuth isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />)
        :
            (<span></span>)
    )
}


function SidebarAuth({isCollapsed, setIsCollapsed, selectedItem, setSelectedItem}){
    return(
        <div className={`${style.sidebar}  ${isCollapsed ? style.collapsed : ''}`}>
            <div className={style.sidebar_collapse_container}>
                <button onClick={() => setIsCollapsed(!isCollapsed)}>
                    <CiCircleChevLeft />
                </button>
            </div>

            <div className={style.sidebar_content}>
                <SidebarItem icon={<IoHomeOutline />} text="Dashboard" />
                <SidebarItem icon={<FaRegNewspaper />} text="Feed" />
                <SidebarItem icon={<IoDiscOutline />} text="Profile" />
                <SidebarItem icon={<IoMusicalNotesOutline />} text="My Songs" />
            </div>

            <div className={style.sidebar_footer}>

            </div>
        </div>
    );    

    function SidebarItem({icon, text}){
        return(
            <div 
                className={selectedItem === text ? style.selected : ''}
                onClick={handleClick}    
            >
                <div className={style.sidebar_item_icon}>{icon}</div>
                {!isCollapsed ? <p>{text}</p> : null}
            </div>
        )

        function handleClick(){
            setSelectedItem(text);
        }
    }
}