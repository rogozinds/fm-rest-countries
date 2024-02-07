import React, {createContext, PropsWithChildren, useContext, useState} from 'react';

const ThemeContext = createContext();

export const ThemeProvider: React.FC<PropsWithChildren>= ({ children }) => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme((curr) => (curr === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
    {children}
    </ThemeContext.Provider>
);
};

export const useTheme = () => useContext(ThemeContext);
