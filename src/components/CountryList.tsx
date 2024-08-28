import {Country} from "../types/types";
import React from "react";
import {CountryCard} from "./CountryCard";
import styles from './CountryList.module.css'; // Import the CSS module

export interface Props {
    countries : Country[];
}
export const CountryList: React.FC<Props> = ({ countries }) => {

    return (
        <div className={styles.list}>
            {countries.map((country, index) => (
                <CountryCard key={index} country={country} />
            ))}
        </div>
    );
};
