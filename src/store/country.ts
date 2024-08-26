import { getAllCountries } from '../service/CountryService';
import {atomWithRefresh} from "./jotaiUtils";
import {loadable} from "jotai/utils";
import _ from "lodash";
import {fromRest} from "../helpers/utils";
import {Country} from "../types/types";
import {atom} from "jotai";

export const countriesAtom = atomWithRefresh(async () => {
    const countriesFromResponse = await getAllCountries();
    let countries:Country[]=[];
    if(countriesFromResponse){
        countries =countriesFromResponse.map(item=>{return fromRest(item)});
    }

    return {
        countries,
        groupByRegion: _.groupBy(countries, "region"),
        mapByName:  _.keyBy(countries, "name")
    };
});
export const countryIdToCountry = atom(async (get) => {
   const atomValue = await get(countriesAtom);
   return _.keyBy(atomValue.countries, "id") as Record<string, Country>;
})

export const countriesLoadable = loadable(countriesAtom);
