'use client';

import styles from './page.module.css';

export default function SongsPage() {
    // This will be replaced with actual data fetching
    const songs = [];

    return (
        <main className={styles.container}>
            <h1>My Songs</h1>
            <div className={styles.songsContainer}>
                {songs.length > 0 ? (
                    <div className={styles.songGrid}>
                        {songs.map((song) => (
                            <div key={song.id} className={styles.songCard}>
                                <h3>{song.title}</h3>
                                <p>{song.artist}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={styles.emptyState}>
                        <h3>No Songs Yet</h3>
                        <p>Upload your first song to get started!</p>
                    </div>
                )}
            </div>
        </main>
    );
} 