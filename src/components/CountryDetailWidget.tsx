import React, { useState, useEffect, useTransition } from "react";
import { useNavigate } from "react-router-dom";
import { DetailedCountry } from "../types/types";
import styles from './CountryDetailWidget.module.css';
import { countryIdToCountry } from '../store/country';
import { useAtom } from "jotai";

export interface Props {
    country: DetailedCountry;
}

const LabeledText: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <div className={styles.labeledText}>
        <span>{label}: </span>
        <span>{value}</span>
    </div>
);

export const CountryDetailWidget: React.FC<Props> = ({country}) => {
    const navigate = useNavigate();
    const [idToCountryMap] = useAtom(countryIdToCountry);
    const [borderCountries, setBorderCountries] = useState<string[]>([]);
    const [_, startTransition] = useTransition();

    useEffect(() => {
        startTransition(() => {
            if (idToCountryMap && country.borderCountries) {
                const updatedBorderCountries = country.borderCountries.map(borderId => {
                    const borderCountry = idToCountryMap[borderId];
                    return borderCountry ? borderCountry.name : borderId;
                });
                setBorderCountries(updatedBorderCountries);
            } else {
                setBorderCountries([]);
            }
        });
    }, [idToCountryMap, country.borderCountries]);

    const handleBack = () => {
        navigate('/');
    };

    const handleBorderCountryClick = (countryName: string) => {
        navigate(`/countries/${encodeURIComponent(countryName)}`);
    };

    return (
        <div className={styles.outerContainer}>
            <button onClick={handleBack} className={styles.backButton}>
                Back
            </button>
            <div className={styles.container}>
                <div className={styles.flagColumn}>
                    <img className={styles.flag} src={country.flagUrl} alt={country.flagAlt} />
                </div>
                <div className={styles.infoColumn}>
                    <h2 className={styles.countryName}>{country.name}</h2>
                    <div className={styles.infoGrid}>
                        <div>
                            <LabeledText label="Native Name" value={country.nativeName} />
                            <LabeledText label="Population" value={country.population.toLocaleString()} />
                            <LabeledText label="Region" value={country.region} />
                            <LabeledText label="Sub Region" value={country.subRegion} />
                            <LabeledText label="Capital" value={country.capital} />
                        </div>
                        <div>
                            <LabeledText label="Top Level Domain" value={country.domains.join(', ')} />
                            <LabeledText label="Currencies" value={country.currencies.join(', ')} />
                            <LabeledText label="Languages" value={country.languages.join(', ')} />
                        </div>
                    </div>
                    {borderCountries.length > 0 && (
                        <div className={styles.borderCountries}>
                            <span className={styles.borderCaption}>Border Countries:</span>
                            {borderCountries.map((borderCountry, index) => (
                                <button
                                    key={index}
                                    className={styles.borderCountry}
                                    onClick={() => handleBorderCountryClick(borderCountry)}
                                >
                                    {borderCountry}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};