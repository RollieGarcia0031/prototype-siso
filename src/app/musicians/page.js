'use client';

import styles from './page.module.css';

export default function MusiciansPage() {
    // This will be replaced with actual data fetching
    const musicians = [];

    return (
        <main className={styles.container}>
            <h1>Musicians</h1>
            <div className={styles.musiciansContainer}>
                {musicians.length > 0 ? (
                    <div className={styles.musiciansGrid}>
                        {musicians.map((musician) => (
                            <div key={musician.id} className={styles.musicianCard}>
                                <div className={styles.musicianImage}>
                                    {/* Profile image will go here */}
                                </div>
                                <h3>{musician.name}</h3>
                                <p>{musician.genre}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={styles.emptyState}>
                        <h3>No Musicians Found</h3>
                        <p>Start following musicians to see them here!</p>
                    </div>
                )}
            </div>
        </main>
    );
} 