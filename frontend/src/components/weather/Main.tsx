import { MdLocationPin } from "react-icons/md";
import { CardContent } from "../ui/card";

import { Props } from "@/@types/weather";

import obterSiglaUf from "@/lib/obterSiglaUf";

export default function Main({typeTemp, weatherInfo}: Props) {
  return (
    <div>
      <CardContent className="flex flex-col items-center justify-center">
        <span className="text-7xl font-extrabold text-slate-700">
          {
            typeTemp==='C' ? 
              `${weatherInfo.data.current.temp_c}º` : 
              `${weatherInfo.data.current.temp_f}º`
          }
        </span>
        <span className="text-xs text-slate-600">
          Sensação Térmica de: {
            typeTemp==='C' ?
            `${weatherInfo.data.current.feelslike_c}º` : 
            `${weatherInfo.data.current.feelslike_f}º`
          }
        </span>
      </CardContent>
      <CardContent className="flex items-center justify-center">
        <span className="text-xl text-slate-800 font-extrabold">
          {`
            ${weatherInfo.data.location.name}, 
            ${obterSiglaUf(weatherInfo.data.location.region)}
          `}
        </span>
        <MdLocationPin
          size={32}
          className="text-red-700 animate-bounce"
        />
      </CardContent>
    </div>
  )
}