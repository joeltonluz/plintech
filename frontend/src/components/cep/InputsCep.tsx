import { ImSearch } from "react-icons/im";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export type Props = {
  uf: string; 
  setUf: any
  city: string; 
  setCity: any; 
  search: string;
  setSearch: any
  fetchCep: () => void;
}

export function InputsCep({uf, setUf, city, setCity, search, setSearch, fetchCep}: Props) {
  return(
    <div className="w-[800px] bg-zinc-950 border-2 border-zinc-900 rounded-xl flex items-center justify-center flex-col mb-2">
      <div className="w-full flex items-center justify-between">
        <div className="p-2">
          <span className="font-semibold text-sm text-zinc-400">UF</span>
          <Input 
            value={uf}
            required={true}
            
            type="text"
            maxLength={2}
            className="w-20 rounded-s border-zinc-600 text-base font-medium text-zinc-300"
            placeholder="SP"
            onChange={(e) => setUf(e.target.value.toUpperCase())}
          />
        </div>
        <div className="w-full p-2">
          <span className="font-semibold text-sm text-zinc-400">Cidade</span>
          <Input 
            value={city}
            type="text"
            maxLength={40}
            className="w-full rounded-s border-zinc-600 text-base font-medium text-zinc-300"
            placeholder="São Paulo"
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
      </div>
      <div className="w-full flex items-center justify-between flex-row">
        <div className="w-full p-2">
          <span className="font-semibold text-sm text-zinc-400">Pesquisa Rua</span>
          <Input 
            value={search}
            type="text"
            maxLength={40}
            className="w-full rounded-s border-zinc-600 text-base font-medium text-zinc-300"
            placeholder="Rua Oscar Freire"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="pt-6 ml-2 mr-2">
          <Button 
            onClick={fetchCep}
          >
            <ImSearch size={32} />
          </Button>
        </div>
      </div>
    </div>
  )
}