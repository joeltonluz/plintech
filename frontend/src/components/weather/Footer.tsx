import { FaWind } from "react-icons/fa";
import { IoCloudy, IoWater } from "react-icons/io5";
import { CardFooter } from "../ui/card"
;
import { Props } from "@/@types/weather";

export default function Footer({weatherInfo}: Pick<Props,'weatherInfo'>) {

  return(
    <CardFooter className="flex items-center justify-between">
      <div className="flex items-center opacity-80">
        <FaWind size={24}/>
        <p className="text-xs font-semibold ml-1 ">
          {weatherInfo.data.current.wind_kph}km/h
        </p>
      </div>
      <div className="flex items-center opacity-80">
        <IoWater size={24}/>
        <p className="text-xs font-semibold ml-1">
          {weatherInfo.data.current.humidity}%
        </p>
      </div>
      <div className="flex items-center opacity-80">
        <IoCloudy size={24} className="hover:animate-pulse cursor-pointer" />
        <p className="text-xs font-semibold ml-1">
          {weatherInfo.data.current.cloud}%
        </p>
      </div>
    </CardFooter>
  )
}