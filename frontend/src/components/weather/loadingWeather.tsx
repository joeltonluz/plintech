import { MdLocationPin } from "react-icons/md";

export default function LoadingWeather() {
  return (
    <div className="flex flex-col items-center">
      <MdLocationPin 
        className="text-red-700 animate-bounce"
        size={150}
      />
      <p className="text-xl font-bold text-slate-600">Carregando Informações, aguarde !</p>
    </div> 
  )
}