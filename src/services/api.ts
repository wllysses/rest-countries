import axios from "axios";

export async function getCountries() {
  const response = await axios.get("https://restcountries.com/v3.1/all");
  return await response.data;
}

export async function getCountriesByRegion(region: string) {
  const response = await axios.get(
    `https://restcountries.com/v3.1/region/${region}`
  );
  return await response.data;
}

export async function getCountryByName(name: string) {
  const response = await axios.get(
    `https://restcountries.com/v3.1/name/${name}`
  );
  return await response.data;
}
