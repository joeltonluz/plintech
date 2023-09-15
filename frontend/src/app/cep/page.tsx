'use client'

import { TCep, TDataCep } from "@/@types/cep";
import ComboboxUf from "@/components/cep/ComboboxUf";
import UfComboBox from "@/components/cep/UfCombobox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ImSearch } from "react-icons/im";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Home() {
  const [uf, setUf] = useState('')
  const [city, setCity] = useState('')
  const [search, setSearch] = useState('')
  const [dataApi, setDataApi] = useState<TDataCep>()

  const fetchCep = async () => {
    console.log('fetchCep clicado')
    const res = await fetch(`http://localhost:3000/cep/api?uf=${uf}&city=${city}&search=${search}`)
    const result = await res.json();

    toast.success('Rapaz')

    if (!result) toast.info('Nenhum registro encontrado')

    setDataApi(result)
  }

  return (
    <div className="w-screen min-h-screen bg-blue-200 flex items-center justify-center flex-col">
      <div className="w-[800px] bg-slate-100 rounded-xl flex items-center justify-center flex-col mb-2">
        <div className="w-full flex items-center justify-between bg-green-400">
          <div className="bg-red-500 p-2">
            <span>UF</span>
            <Input 
              value={uf}
              type="text"
              maxLength={2}
              className="w-20"
              placeholder="MG"
              onChange={(e) => setUf(e.target.value)}
            />
          </div>
          <div className="w-full bg-blue-500 p-2">
            <span>Cidade</span>
            <Input 
              value={city}
              type="text"
              maxLength={40}
              className="w-full"
              placeholder="Varginha"
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full flex items-center justify-between bg-violet-400 flex-row">
          <div className="w-full bg-pink-400 p-2">
            <span>Pesquisa Rua</span>
            <Input 
              value={search}
              type="text"
              maxLength={40}
              className="w-full"
              placeholder="Rua Maria naz"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="bg-yellow-200 pt-6 ml-2 mr-2">
            <Button 
              className="bg-blue-300"
              onClick={fetchCep}
            >
              <ImSearch size={32} />
            </Button>
          </div>
        </div>
      </div>
      <div className="w-[800px] bg-slate-600">
        <Table>
          <TableCaption>Resultado das Buscas</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Cep</TableHead>
              <TableHead>Logradouro</TableHead>
              <TableHead>Bairro</TableHead>
              <TableHead className="w-[200px]">Cidade</TableHead>
              <TableHead>UF</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              dataApi?.data.map((c) => {
                return (
                  <TableRow key={c.cep}>
                    <TableCell className="font-medium">{c.cep}</TableCell>
                    <TableCell className="font-medium">{c.logradouro}</TableCell>
                    <TableCell className="font-medium">{c.bairro}</TableCell>
                    <TableCell className="font-medium">{c.localidade}</TableCell>
                    <TableCell className="font-medium">{c.uf}</TableCell>
                  </TableRow> 
                )
              })
            }
          </TableBody>
        </Table>
      </div>
    </div>
  )
}