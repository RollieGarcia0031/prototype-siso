'use client';

import styles from './page.module.css';

export default function SettingsPage() {
    return (
        <main className={styles.container}>
            <h1>Settings</h1>
            <div className={styles.settingsContainer}>
                <section className={styles.settingsSection}>
                    <h2>Account Settings</h2>
                    <div className={styles.settingItem}>
                        <span>Email</span>
                        <button>Change</button>
                    </div>
                    <div className={styles.settingItem}>
                        <span>Password</span>
                        <button>Change</button>
                    </div>
                </section>

                <section className={styles.settingsSection}>
                    <h2>Preferences</h2>
                    <div className={styles.settingItem}>
                        <span>Notifications</span>
                        <button>Configure</button>
                    </div>
                    <div className={styles.settingItem}>
                        <span>Privacy</span>
                        <button>Configure</button>
                    </div>
                </section>
            </div>
        </main>
    );
} 