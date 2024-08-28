import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { CountryPage } from './pages/CountryPage';
import { useTheme } from "./components/ThemeContext";
import Header from "./components/Header.tsx";

function App() {
    const { theme } = useTheme();
    const themeClass = theme === 'dark' ? 'darkTheme' : 'lightTheme';
    
    // Define the base path for GitHub Pages
    const basePath = '/mf-rest-countries';

    return (
        <div id="app" className={themeClass}>
            <Header />
            <Router basename={basePath}>
                <Routes>
                    <Route path="/countries/:countryId" element={<CountryPage />} />
                    <Route path="/" element={<HomePage />} />
                    <Route path="/home" element={<Navigate to="/" replace />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
