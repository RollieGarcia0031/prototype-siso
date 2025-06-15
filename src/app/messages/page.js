'use client';

import styles from './page.module.css';

export default function MessagesPage() {
    // This will be replaced with actual data fetching
    const conversations = [];

    return (
        <main className={styles.container}>
            <h1>Messages</h1>
            <div className={styles.messagesContainer}>
                <div className={styles.conversationsList}>
                    {conversations.length > 0 ? (
                        conversations.map((conversation) => (
                            <div key={conversation.id} className={styles.conversationItem}>
                                <div className={styles.conversationAvatar}>
                                    {/* Avatar will go here */}
                                </div>
                                <div className={styles.conversationInfo}>
                                    <h3>{conversation.name}</h3>
                                    <p>{conversation.lastMessage}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No conversations yet</p>
                    )}
                </div>
                <div className={styles.chatWindow}>
                    <div className={styles.chatHeader}>
                        <h2>Select a conversation</h2>
                    </div>
                    <div className={styles.chatMessages}>
                        <p>Choose a conversation to start chatting</p>
                    </div>
                </div>
            </div>
        </main>
    );
} 