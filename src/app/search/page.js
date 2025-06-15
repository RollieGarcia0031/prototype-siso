'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function SearchPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        // Search logic will be implemented here
    };

    return (
        <main className={styles.container}>
            <h1>Search</h1>
            <div className={styles.searchContainer}>
                <input 
                    type="search" 
                    placeholder="Search for songs, artists, or users..."
                    className={styles.searchInput}
                    value={searchQuery}
                    onChange={handleSearch}
                />
                <div className={styles.searchResults}>
                    {searchQuery ? (
                        <p>Searching for: {searchQuery}</p>
                    ) : (
                        <p>Start typing to search...</p>
                    )}
                </div>
            </div>
        </main>
    );
} 