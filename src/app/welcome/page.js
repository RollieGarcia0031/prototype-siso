'use client';

import Link from 'next/link';
import styles from './page.module.css';

export default function WelcomePage() {
    return (
        <main className={styles.container}>
            <div className={styles.welcomeContainer}>
                <section className={styles.welcomeSection}>
                    <h2>Discover Music</h2>
                    <p>Connect with musicians and share your music with the world</p>
                </section>
                
                <section className={styles.welcomeSection}>
                    <h2>Get Started</h2>
                    <p>Create your profile and start your musical journey</p>
                    <Link href="/login" className={styles.ctaButton}>
                        Get Started
                    </Link>
                </section>
            </div>
        </main>
    );
} 