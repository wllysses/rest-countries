import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
import { getCountryByName } from "@/services/api";
import { Header } from "@/components/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Details() {
  const { name } = useParams();

  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["country"],
    queryFn: () => getCountryByName(name as string),
  });

  if (isLoading) return <div className="font-bold">Carregando...</div>;
  if (isError) return <div className="font-bold">Algo deu errado...</div>;

  console.log(data);

  return (
    <>
      <Header />
      <main className="my-8 container mx-auto">
        <Button variant="ghost" className="gap-2" onClick={() => navigate("/")}>
          <ArrowLeftIcon />
          Voltar
        </Button>

        <div className="mt-6 grid grid-cols-2 gap-12 max-md:grid-cols-1">
          <img
            src={data[0]!.flags && data[0]!.flags.png}
            alt={`Country flag at ${data[0]!.name.common}`}
            className="w-full rounded"
          />
          <div className="mt-8">
            <h4 className="font-bold text-2xl">{data[0]!.name.common}</h4>
            <ul className="mt-4 w-full flex flex-col gap-2 text-sm">
              <li>
                <strong>Population: </strong>
                {data[0].population.toLocaleString("pt-BR")}
              </li>
              <li>
                <strong>Region: </strong>
                {data[0].region}
              </li>
              <li>
                <strong>Sub Region: </strong>
                {data[0].subregion}
              </li>
              <li>
                <strong>Capital: </strong>
                {data[0]!.capital ? data[0].capital[0] : "Not available"}
              </li>
            </ul>

            <ul className="mt-8 w-full flex flex-col gap-2 text-sm">
              <li>
                <strong>Lat: </strong>
                {data[0]!.latlng ? data[0].latlng[0] : "Not Available"}
              </li>
              <li>
                <strong>Long: </strong>
                {data[0]!.latlng ? data[0].latlng[1] : "Not Available"}
              </li>
              <li>
                <strong>Timezones: </strong>
                {data[0].timezones[0]}
              </li>
              <li className="flex flex-col gap-2">
                <strong>Border Countries: </strong>
                <div className="flex gap-2">
                  {data[0].borders
                    ? data[0].borders.map((country: string, index: number) => (
                        <Badge key={index} className="w-fit">
                          {country}
                        </Badge>
                      ))
                    : "None"}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}
