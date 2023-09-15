import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function Home() {
  return (
    <div className='w-screen min-h-screen bg-slate-950 flex items-center justify-center'>
      <Card className='bg-slate-800 w-[400px] flex flex-col items-center justify-center p-2 rounded-xl'>
        <CardHeader className='m-2 min-w-full rounded-xl bg-slate-300'>
          <CardTitle className='text-center'>Desafios Plintech</CardTitle>
        </CardHeader>
        <CardContent className='m-2 min-w-full rounded-xl bg-transparent'>
          <Link href="/cep" className='text-zinc-200'>Desafio 01 - Busca Logradouro</Link>
        </CardContent>
        <CardContent className='m-2 min-w-full rounded-xl bg-transparent'>
          <Link href="/weather" className='text-zinc-200'>Desafio 02 - Weather</Link>
        </CardContent>
      </Card>
    </div>
  )
}
