'use client'

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastContainerWrapper from "@/components/toastify/toastify";
import { TDataCep } from "@/@types/cep";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImSearch } from "react-icons/im";
import { useState } from "react";
import { TableCep } from "@/components/cep/TableCep";
import { InputsCep } from "@/components/cep/InputsCep";

export default function Home() {
  const [uf, setUf] = useState('')
  const [city, setCity] = useState('')
  const [search, setSearch] = useState('')
  const [dataApi, setDataApi] = useState<TDataCep>()
  const [total, setTotal] = useState(0)

  const fetchCep = async () => {
    toast.info('Buscando informações...',{
      theme: "dark"
    })
    const res = await fetch(`http://localhost:3000/cep/api?uf=${uf}&city=${city}&search=${search}`)
    const result = await res.json();

    setTotal(result.data.length)
    
    toast.success('Pesquisa concluída!',{
      theme: "dark"
    })

    setDataApi(result)
  }

  return (
    <div className="w-screen min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center flex-col">
      <InputsCep 
        uf={uf}
        setUf={setUf}
        city={city}
        setCity={setCity}
        search={search}
        setSearch={setSearch}
        fetchCep={fetchCep}
      />
      <TableCep 
        total={total} 
        dataApi={dataApi} 
      />
      <ToastContainerWrapper />
    </div>
  )
}