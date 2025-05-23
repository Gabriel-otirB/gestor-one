import Container from '@/components/container';
import Link from 'next/link';

const NewTicket = () => {
  return (
    <Container>
      <main className='mt-9 mb-2'>
        <div className='flex items-center gap-3'>
          <Link href="/dashboard" className="bg-gray-900 px-4 py-1 rounded text-white">
            Voltar
          </Link>
          <h1 className='text-3xl font-bold'>Novo chamado</h1>
        </div>

        <form className='flex flex-col mt-6'>
          <label className='mb-1 font-medium text-lg'>Nome do chamado</label>
          <input
            className='w-full border-2 rounded-md h-11 px-2 mb-2'
            type="text"
            placeholder='Digite o nome do chamado'
            required
          />

          <label className='mb-1 font-medium text-lg'>Descreva o problema</label>
          <textarea
            className='w-full border-2 rounded-md h-24 px-2 mb-2 resize-none'
            placeholder='Descreva o problema...'
            required
          ></textarea>

          <label className='mb-1 font-medium text-lg'>Selecione um cliente</label>
          <select className='w-full border-2 rounded-md h-11 px-2 mb-2 resize-none bg-white'>
            <option value="client1">Cliente 1</option>
          </select>
        </form>

      </main>
    </Container>
  )
}

export default NewTicket;