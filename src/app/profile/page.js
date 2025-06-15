'use client';

import styles from './page.module.css';

export default function ProfilePage() {
    // This will be replaced with actual user data
    const user = {
        name: 'User Name',
        bio: 'Musician and composer',
        followers: 0,
        following: 0
    };

    return (
        <main className={styles.container}>
            <div className={styles.profileContainer}>
                <div className={styles.profileHeader}>
                    <div className={styles.profilePicture}>
                        {/* Profile image will go here */}
                    </div>
                    <div className={styles.profileInfo}>
                        <h1>{user.name}</h1>
                        <p>{user.bio}</p>
                        <div className={styles.profileStats}>
                            <span>{user.followers} Followers</span>
                            <span>{user.following} Following</span>
                        </div>
                    </div>
                </div>

                <div className={styles.profileContent}>
                    <section className={styles.profileSection}>
                        <h2>About</h2>
                        <p>{user.bio}</p>
                    </section>
                    <section className={styles.profileSection}>
                        <h2>My Music</h2>
                        <p>No songs uploaded yet</p>
                    </section>
                </div>
            </div>
        </main>
    );
} 