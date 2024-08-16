import React from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import styles from './Header.module.css';
import {useTheme} from "./ThemeContext.tsx";

const Header: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className={styles.header}>
            <div className={styles.header_content}>
                <h2>Where in the world?</h2>
                <button onClick={toggleTheme} className={styles.theme_toggle}>
                    {theme === 'dark' ? <FaSun /> : <FaMoon />}
                    {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </button>
            </div>
        </header>
    );
}

export default Header;
