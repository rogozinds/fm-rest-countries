import {CountryFromRest, DetailedCountry} from "../types/types";

export const fromRest=(fromRest:CountryFromRest):DetailedCountry=>{
    let capital ="";
    if(fromRest.capital){
        capital =fromRest.capital[0] ? fromRest.capital[0]:"";
    }
    let currencies =[] as string[];
    if(fromRest.currencies){
        currencies=Object.keys(fromRest.currencies);
    }

    let languages =[] as string[];
    if(fromRest.languages){
        languages=Object.keys(fromRest.languages);
    }
    const item =  {
        id:fromRest.cioc,
       name:fromRest.name?.common ?fromRest.name.common : "No name",
       population:fromRest.population ? fromRest.population : 0,
       capital:capital,
       region:fromRest.region,
       flagUrl:fromRest?.flags.png ? fromRest.flags.png : "",
       flagAlt:fromRest?.flags.alt ? fromRest.flags.alt :"",

        //Detail Country props
        nativeName: fromRest.name?.official ?fromRest.name.official : "No name",
        subRegion:fromRest.subRegion,
        domains:fromRest.tld,
        borderCountries:fromRest.borders,
        currencies,
        languages,

   } as DetailedCountry;
   return item;
}