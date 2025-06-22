import styles from './css/Header.module.css';
import {appName} from '@/util/constants';
import { GiHamburgerMenu } from 'react-icons/gi';
import Link from 'next/link';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.titleContainer}>{appName}</div>
            <div className={styles.loginContainer}>
                <div></div>
                <Link href="/login"><button>Login</button></Link>
            </div>
        </header>
    )
}