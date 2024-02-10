import { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getCountries, getCountriesByRegion } from "@/services/api";
import { CountryProps } from "@/@types/country";
import { Header } from "@/components/header";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Home() {
  const [input, setInput] = useState("");
  const [selectRegion, setSelectRegion] = useState("");

  const { data, isLoading, isError } = useQuery<CountryProps[]>({
    queryKey: ["countries"],
    queryFn: getCountries,
  });

  const {
    data: selectedCountries,
    isLoading: loading,
    isError: error,
  } = useQuery<CountryProps[]>(
    ["selectedCountries", selectRegion],
    () => getCountriesByRegion(selectRegion),
    { enabled: !!selectRegion }
  );

  if (isLoading) return <div className="font-bold">Carregando...</div>;
  if (isError) return <div className="font-bold">Algo deu errado...</div>;

  if (loading) return <div className="font-bold">Carregando...</div>;
  if (error) return <div className="font-bold">Algo deu errado...</div>;

  return (
    <>
      <Header />
      <main className="my-8 container mx-auto">
        <div className="w-full flex items-center justify-between gap-4 max-sm:flex-col max-sm:items-start">
          <Input
            type="text"
            placeholder="Search for a country..."
            onChange={(e) => setInput(e.target.value)}
          />
          <Select onValueChange={setSelectRegion}>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Filter by Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="africa">Africa</SelectItem>
              <SelectItem value="america">America</SelectItem>
              <SelectItem value="asia">Asia</SelectItem>
              <SelectItem value="europe">Europe</SelectItem>
              <SelectItem value="oceania">Oceania</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mt-8 w-full grid grid-cols-5 gap-4 max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2">
          {!selectRegion
            ? data &&
              data
                ?.slice(0, 30)
                .filter((country) =>
                  country.name.common
                    .toLowerCase()
                    .includes(input.toLowerCase())
                )
                .map((country, index) => (
                  <Link to={`/country/${country.name.common}`}>
                    <Card key={index} className="overflow-hidden w-full">
                      <img
                        src={country.flags.png}
                        alt={`Country flag at ${country.name.common}`}
                        className="w-full h-32"
                      />
                      <CardContent className="mt-4">
                        <h4 className="font-bold overflow-hidden text-ellipsis text-nowrap text-xl">
                          {country.name.common}
                        </h4>
                        <ul className="w-full mt-2 text-sm">
                          <li>
                            <strong>Population: </strong> {country.population}
                          </li>
                          <li>
                            <strong>Region: </strong>: {country.region}
                          </li>
                          <li>
                            <strong>Capital: </strong>: {country.capital[0]}
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </Link>
                ))
            : selectedCountries &&
              selectedCountries
                ?.slice(0, 30)
                .filter((country) =>
                  country.name.common
                    .toLowerCase()
                    .includes(input.toLowerCase())
                )
                .map((country, index) => (
                  <Link to={`/country/${country.name.common}`}>
                    <Card key={index} className="overflow-hidden w-full">
                      <img
                        src={country.flags.png}
                        alt={`Country flag at ${country.name.common}`}
                        className="w-full h-28"
                      />
                      <CardContent className="mt-4">
                        <h4
                          className="font-bold overflow-hidden text-ellipsis text-nowrap text-xl"
                          title={country.name.common}
                        >
                          {country.name.common}
                        </h4>
                        <ul className="w-full mt-2 text-sm">
                          <li>
                            <strong>Population: </strong> {country.population}
                          </li>
                          <li>
                            <strong>Region: </strong>: {country.region}
                          </li>
                          <li>
                            <strong>Capital: </strong>: {country.capital[0]}
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
        </div>
      </main>
    </>
  );
}
