'use client';

import styles from './page.module.css';

export default function FeedPage() {
    return (
        <main className={styles.container}>
            <h1>Feed</h1>
            <div className={styles.feedContainer}>
                {/* Feed items will be mapped here */}
                <div className={styles.feedItem}>
                    <h3>Latest Updates</h3>
                    <p>Your feed is empty. Follow some musicians to see their updates here!</p>
                </div>
            </div>
        </main>
    );
} 