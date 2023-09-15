'use client'

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { WeatherInfoProps } from "@/@types/weather";

import ToastContainerWrapper from "@/components/toastify/toastify";
import LoadingWeather from "@/components/weather/LoadingWeather";
import Weather from "@/components/weather/Weather";

export default function Page() {
  const [isLoading, setIsLoading] = useState(true)
  const [weatherInfo, setWeatherInfo] = useState<WeatherInfoProps>();
  const [typeTemp, setTypeTemp] = useState('C')
  
  const fetchWeather = async (query: string) => {
    const res = await fetch(`http://localhost:3000/${query}`)
    const data = await res.json();

    console.log('data',data)    
    return data;
  }

  const handleGeoLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        toast.success('Localização Obtida!!')

        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        const result = await fetchWeather(`${latitude},${longitude}`)

        if (!result.data.error) {
          setWeatherInfo(result)
          setIsLoading(false)
        } else {
          toast.error(result.data.error.message)
        }
        
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
          <Weather setTypeTemp={setTypeTemp} typeTemp={typeTemp} weatherInfo={weatherInfo!} />
        </div>
      )}
      <ToastContainerWrapper />
    </div>         
  )
}
