
import { useAtom } from 'jotai';
import { countriesLoadable} from "../store/country";
import {Country} from "../types/types";

export interface CountryStore {
    countries:Country[],
    groupByRegion:any,
    mapByName:any,

}

export const useCountries = () => {
    const [countries] = useAtom(countriesLoadable);

    if (countries.state === "hasData") {
        return countries.data as CountryStore;
    } else {
        return {countries:[], groupByRegion:{}, mapByName:{}};
    }
};
