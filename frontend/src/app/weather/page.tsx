'use client'

import { useEffect, useState } from "react";
import { MdLocationPin } from "react-icons/md";
import { FaWind } from "react-icons/fa";
import { IoCloudy, IoWater } from "react-icons/io5";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import obterSiglaUf from '@/lib/siglaUf';

import { WeatherInfoProps } from "@/@types/weather";

import ToastContainerWrapper from "@/components/toastify/toastify";
import LoadingWeather from "@/components/weather/loadingWeather";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Footer from "@/components/weather/footer";

export default function Weather() {
  const [isLoading, setIsLoading] = useState(true)
  const [weatherInfo, setWeatherInfo] = useState<WeatherInfoProps>();
  const [typeTemp, setTypeTemp] = useState('C')
  
  const fetchWeather = async (query: string) => {
    const res = await fetch(`http://localhost:3001/${query}`)
    const data = await res.json();

    console.log('data',data)    
    return data;
  }

  const handleGeoLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        const result = await fetchWeather(`${latitude},${longitude}`)
        toast.success('Localização Adquirida!')

        setWeatherInfo(result)
        setIsLoading(false)
      },
      (error) => {
        toast.error(`Favor habilitar a geolocalização! [${error.message}]`)
        console.error('Geolocation error:', error)
      }
    )
  }

  useEffect(() => {
    handleGeoLocation()
  }, [])

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-300 to-indigo-400">
      { isLoading ? (
        <LoadingWeather/>
      ) : (              
        <div className="bg-white bg-opacity-40 w-[300px] m-4 p-5 min-w-max rounded-xl shadow-2xl ">
          <Card className="bg-transparent flex flex-col">
            <CardContent className="flex items-center justify-end p-2">
              <Button
                size={"sm"}
                className={`bg-transparent rounded-xl text-lg ${typeTemp === 'C' ? 'font-bold' : 'opacity-40'}`}
                onClick={() => setTypeTemp('C')}
              >ºC</Button>
              <Button
                size={"sm"}
                className={`bg-transparent rounded-xl text-lg ${typeTemp === 'F' ? 'font-bold' : 'opacity-40'}`}
                onClick={() => setTypeTemp('F')}
              >°F</Button>
            </CardContent>
            <CardContent className="flex flex-col items-center justify-center">
              <Image 
                src={`https:${weatherInfo!.data.current.condition.icon}`}
                width={120}
                height={120}
                alt="Imagem do clima"
              />
              <p>Parcialmente Nublado</p>
            </CardContent>
            <CardContent className="flex flex-col items-center justify-center">
              <span className="text-7xl font-extrabold text-slate-700">
                {
                  typeTemp==='C' ? 
                    `${weatherInfo!.data.current.temp_c}º` : 
                    `${weatherInfo!.data.current.temp_f}º`
                }
              </span>
              <span className="text-xs text-slate-600">
                Sensação Térmica de: {
                  typeTemp==='C' ?
                  `${weatherInfo!.data.current.feelslike_c}º` : 
                  `${weatherInfo!.data.current.feelslike_f}º`
                }
              </span>
            </CardContent>
            <CardContent className="flex items-center justify-center">
              <span className="text-2xl text-slate-600 font-extrabold">
                {`
                  ${weatherInfo?.data.location.name}, 
                  ${obterSiglaUf(weatherInfo!.data.location.region)}
                `}
              </span>
              <MdLocationPin
                size={40}
                className="text-red-700 animate-bounce"
              />
            </CardContent>
            < Footer data={weatherInfo!.data}/>
          </Card>
        </div>
      )}
      <ToastContainerWrapper />
    </div>         
  )
}
