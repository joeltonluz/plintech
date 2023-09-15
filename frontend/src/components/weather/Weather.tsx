import { Card } from "../ui/card";

import { WeatherInfoProps } from "@/@types/weather";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

type Props = {
  typeTemp: any;
  setTypeTemp: any;
  weatherInfo: WeatherInfoProps;
}

export default function Weather({typeTemp, setTypeTemp, weatherInfo}: Props) {
  return (
    <Card className="bg-transparent flex flex-col">
      <Header 
        typeTemp={typeTemp} 
        setTypeTemp={setTypeTemp} 
        weatherInfo={weatherInfo}
      />
      
      <Main 
        typeTemp={typeTemp} 
        setTypeTemp={setTypeTemp} 
        weatherInfo={weatherInfo}
      />
      
      <Footer 
        weatherInfo={weatherInfo}
      />
    </Card>
  )
}