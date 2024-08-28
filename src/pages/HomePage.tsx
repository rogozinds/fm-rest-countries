import {useCountries} from "../hooks/country";
import React, {useState} from "react";
import {CountryList} from "../components/CountryList";
import {Region} from "../types/types";
import styles from './HomePage.module.css';
import { FaSearch, FaChevronDown } from 'react-icons/fa';

const ALL="All";
const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export const HomePage:React.FC= () => {
    const { countries } = useCountries();
    const regions = [ALL, ...Object.values(Region)];

    const [filter, setFilter] = useState('');
    const [regionFilter, setRegionFilter] = useState('');

    const filteredCountries = countries.filter(country => {
        return (country.name.toLowerCase().includes(filter.toLowerCase())) &&
            (regionFilter === '' || regionFilter.toLowerCase() === ALL.toLowerCase() || country?.region?.toLowerCase() === regionFilter.toLowerCase());
    });

    return (
        <div className={styles.main}>
            <div className={styles.filter_panel}>
                <div className={styles.search_container}>
                    <FaSearch className={styles.search_icon} />
                    <input
                        className={styles.input}
                        type="search"
                        placeholder="Search for a country..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                </div>
                <div className={styles.select_container}>
                    <select
                        className={styles.select}
                        value={regionFilter}
                        onChange={(e) => {
                            setRegionFilter(e.target.value)
                        }}
                    >
                        <option value="" disabled hidden>Filter by Region</option>
                        {regions.map(region => (
                            <option key={region} value={region.toLowerCase()}>
                                {region === ALL ? ALL : capitalizeFirstLetter(region)}
                            </option>
                        ))}
                    </select>
                    <FaChevronDown className={styles.chevron_icon} />
                </div>
            </div>
            <CountryList countries={filteredCountries}></CountryList>
        </div>
    );
};