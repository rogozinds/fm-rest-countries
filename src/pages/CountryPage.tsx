import { useNavigate, useParams } from "react-router-dom";
import React, { Suspense } from "react";
import {CountryDetailWidget} from "../components/CountryDetailWidget";
import {useCountries} from "../hooks/country";


export const CountryPage: React.FC = () => {
    const { countryId } = useParams<{ countryId: string }>();
    const navigate = useNavigate();
    const { mapByName, countries } = useCountries();

    if (countries.length === 0) {
        return <div>Loading...</div>;
    }

    const country = countryId ? mapByName[countryId] : null;

    if (!country) {
        return (
            <div>
                <h2>Country not found</h2>
                <button onClick={() => navigate('/')}>Go back to home</button>
            </div>
        );
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CountryDetailWidget country={country} />
        </Suspense>
    );
};