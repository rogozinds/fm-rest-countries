import { getAllCountries } from '../service/CountryService';
import { atomWithRefresh } from "./jotaiUtils";
import { loadable } from "jotai/utils";
import { fromRest } from "../helpers/utils";
import { Country } from "../types/types";
import { atom } from "jotai";

function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
    return array.reduce((result, item) => {
        const groupKey = String(item[key]);
        if (!result[groupKey]) {
            result[groupKey] = [];
        }
        result[groupKey].push(item);
        return result;
    }, {} as Record<string, T[]>);
}

function keyBy<T>(array: T[], key: keyof T): Record<string, T> {
    return array.reduce((result, item) => {
        const itemKey = String(item[key]);
        result[itemKey] = item;
        return result;
    }, {} as Record<string, T>);
}

export const countriesAtom = atomWithRefresh(async () => {
    const countriesFromResponse = await getAllCountries();
    let countries: Country[] = [];
    if (countriesFromResponse) {
        countries = countriesFromResponse.map(item => fromRest(item));
    }

    return {
        countries,
        groupByRegion: groupBy(countries, "region"),
        mapByName: keyBy(countries, "name")
    };
});

export const countryIdToCountry = atom(async (get) => {
   const atomValue = await get(countriesAtom);
   return keyBy(atomValue.countries, "id") as Record<string, Country>;
});

export const countriesLoadable = loadable(countriesAtom);
