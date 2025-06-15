'use client';

import { useState, useEffect } from "react";
import style from "@/components/css/SideBar.module.css"
import { CiCircleChevLeft } from "react-icons/ci";
import { 
    IoHomeOutline, 
    IoDiscOutline,
    IoMusicalNotesOutline, 
    IoLogOutOutline, 
    IoSettingsOutline,
    IoSearchOutline,
    IoPeopleOutline,
    IoChatbubbleOutline
} from "react-icons/io5";
import { FaRegNewspaper } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from 'next/navigation';

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
    const pathname = usePathname();

    return(
        <div className={`${style.sidebar}  ${isCollapsed ? style.collapsed : ''}`}>
            <div className={style.sidebar_collapse_container}>
                <button onClick={() => setIsCollapsed(!isCollapsed)}>
                    <CiCircleChevLeft />
                </button>
            </div>

            <div className={style.sidebar_content}>
                <SidebarItem icon={<IoHomeOutline />} text="Dashboard" href="/" />
                <SidebarItem icon={<FaRegNewspaper />} text="Feed" href="/feed" />
                <SidebarItem icon={<IoSearchOutline />} text="Search" href="/search" />
                <SidebarItem icon={<IoPeopleOutline />} text="Musicians" href="/musicians" />
                <SidebarItem icon={<IoDiscOutline />} text="Profile" href="/profile" />
                <SidebarItem icon={<IoMusicalNotesOutline />} text="My Songs" href="/songs" />
                <SidebarItem icon={<IoChatbubbleOutline />} text="Messages" href="/messages" />
            </div>

            <div className={style.sidebar_footer}>
                <SidebarItem icon={<IoSettingsOutline />} text="Settings" href="/settings" />
                <SidebarItem icon={<IoLogOutOutline />} text="Logout" href="/logout" />
            </div>
        </div>
    );    

    function SidebarItem({icon, text, href}){
        const isActive = pathname === href;

        return(
            <Link
                className={`${isActive ? style.selected : ''}`}
                href={href}
                onClick={handleClick}    
            >
                <div className={style.sidebar_item_icon}>{icon}</div>
                {!isCollapsed ? <p>{text}</p> : null}
            </Link>
        )

        function handleClick(){
            setSelectedItem(text);
        }
    }
}