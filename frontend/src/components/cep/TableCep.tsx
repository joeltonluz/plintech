import { TCep, TDataCep } from "@/@types/cep"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"

export type Props = {
  total: number;
  dataApi: any
}

export function TableCep({ total, dataApi}: Props) {
  return(
    <div className="w-[800px] bg-zinc-950 border-2 border-zinc-900 rounded-xl">
      <Table>
        <TableCaption className="font-normal text-zinc-500">Quantidade de Registros: {total}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[110px] font-light">Cep</TableHead>
            <TableHead className="font-light">Logradouro</TableHead>
            <TableHead className="font-light">Bairro</TableHead>
            <TableHead className="w-[130px] font-light">Cidade</TableHead>
            <TableHead className="font-light">UF</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            dataApi?.data.map((c: TCep) => {
              return (
                <TableRow key={c.cep}>
                  <TableCell className="w-[120px] font-medium ">{c.cep}</TableCell>
                  <TableCell className="font-medium">{c.logradouro}</TableCell>
                  <TableCell className="font-medium">{c.bairro}</TableCell>
                  <TableCell className="font-medium">{c.localidade}</TableCell>
                  <TableCell className="w-[30px] font-medium">{c.uf}</TableCell>
                </TableRow> 
              )
            })
          }
        </TableBody>
      </Table>
    </div>
  )
}