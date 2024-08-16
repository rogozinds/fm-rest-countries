import {useCountries} from "../hooks/country";
import React, {useState} from "react";
import {CountryList} from "../components/CountryList";
import {Region} from "../types/types";
import styles from './HomePage.module.css';
import { FaSearch } from 'react-icons/fa';

const ALL="All";
export const HomePage:React.FC= () => {
    const { countries } = useCountries();
    const regions = [ALL, ...Object.values(Region)];

    const [filter, setFilter] = useState('');
    const [regionFilter, setRegionFilter] = useState(ALL);

    const filteredCountries = countries.filter(country => {
        return (country.name.toLowerCase().includes(filter.toLowerCase())) &&
            (regionFilter.toLowerCase()===ALL.toLowerCase() || country?.region?.toLowerCase()===regionFilter.toLowerCase());
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
                    <select
                        className={styles.select}
                        value={regionFilter}
                        onChange={(e) => {
                            setRegionFilter(e.target.value)
                        }}
                    >
                        {regions.map(region => (
                            <option key={region} value={region.toLowerCase()}>{region}</option>
                        ))}
                    </select>
            </div>
            <CountryList countries={filteredCountries}></CountryList>
        </div>
    );
};