import { CardContent } from "../ui/card";
import { Button } from "../ui/button";
import Image from "next/image";

import { Props } from "@/@types/weather";

import formatDateTime from "@/lib/formatDateTime";

export default function Header({typeTemp, setTypeTemp, weatherInfo}: Props) {
  return (
    <div>
      <CardContent className="flex items-center justify-between p-2">
        <span className="text-xs text-slate-600">
          {formatDateTime(weatherInfo.data.location.localtime)}
        </span>
        <div>
          <Button
            size={"sm"}
            className={`bg-transparent rounded-xl text-lg ${typeTemp === 'C' ? 'font-bold text-blue-600' : 'opacity-40'}`}
            onClick={() => setTypeTemp('C')}
          >ºC</Button>
          <Button
            size={"sm"}
            className={`bg-transparent rounded-xl text-lg ${typeTemp === 'F' ? 'font-bold text-blue-600' : 'opacity-40'}`}
            onClick={() => setTypeTemp('F')}
          >°F</Button>
        </div>
      </CardContent>
      <CardContent className="flex flex-col items-center justify-center">
      <Image 
        src={`https:${weatherInfo.data.current.condition.icon}`}
        width={120}
        height={120}
        alt="Imagem do clima"
      />
      <p className="text-sm">Parcialmente Nublado</p>
      </CardContent>
    </div>
  )
}