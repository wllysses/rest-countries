export interface CountryProps {
  flags: {
    png: string;
  };
  name: {
    common: string;
  };
  population: number;
  region: string;
  capital: string[];
}
