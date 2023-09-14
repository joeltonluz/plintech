import { FaWind } from "react-icons/fa";
import { CardFooter } from "../ui/card";
import { IoCloudy, IoWater } from "react-icons/io5";
import { WeatherInfoProps } from "@/@types/weather";

export default function Footer(props: WeatherInfoProps) {

  return(
    <CardFooter className="flex items-center justify-between">
      <div className="flex items-center">
        <FaWind size={24}/>
        <p className="text-xs font-semibold">
          {props.data.current.wind_kph}km/h
        </p>
      </div>
      <div className="flex items-center">
        <IoWater size={24}/>
        <p className="text-xs font-semibold">
          {props.data.current.humidity}%
        </p>
      </div>
      <div className="flex items-center">
        <IoCloudy size={24}/>
        <p className="text-xs font-semibold ml-1">
          {props.data.current.cloud}%
        </p>
      </div>
    </CardFooter>
  )
}