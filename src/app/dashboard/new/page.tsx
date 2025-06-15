import Container from '@/components/container';
import Link from 'next/link';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import prismaClient from '@/lib/prisma';

const NewTicket = async () => {

  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const customers = await prismaClient.customer.findMany({
    where: {
      userId: session.user.id
    }
  })

  const handleRegisterTicket = async (formData: FormData) => {
    "use server"

    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const customerId = formData.get('customer') as string;

    if (!name || !description || !customerId) {
      return;
    }

    await prismaClient.ticket.create({
      data: {
        name: name as string,
        description: description as string,
        customerId: customerId as string,
        status: "ABERTO",
        userId: session.user.id,
        created_at: new Date()
      }
    })

    redirect("/dashboard");

  }

  return (
    <Container>
      <main className='mt-9 mb-2'>
        <div className='flex items-center gap-3'>
          <Link href="/dashboard" className="bg-gray-900 px-4 py-1 rounded text-white">
            Voltar
          </Link>
          <h1 className='text-3xl font-bold'>Novo chamado</h1>
        </div>

        <form className='flex flex-col mt-6' action={handleRegisterTicket}>
          <label className='mb-1 font-medium text-lg'>Nome do chamado</label>
          <input
            className='w-full border-2 rounded-md h-11 px-2 mb-2'
            type="text"
            placeholder='Digite o nome do chamado'
            required
            name='name'
          />

          <label className='mb-1 font-medium text-lg'>Descreva o problema</label>
          <textarea
            className='w-full border-2 rounded-md h-24 px-2 mb-2 resize-none'
            placeholder='Descreva o problema...'
            required
            name='description'
          ></textarea>

          {customers.length !== 0 && (
            <>
              <label className='mb-1 font-medium text-lg'>Selecione um cliente</label>
              <select
                className='w-full border-2 rounded-md h-11 px-2 mb-2 resize-none bg-white'
                name='customer'>
                {customers.map(customer => (
                  <option
                    key={customer.id}
                    value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>
            </>
          )}

          {customers.length === 0 && (
            <Link href="/dashboard/customer/new">
              Você ainda não possui nenhum cliente cadastrado.
              <span className='text-purple-700 cursor-pointer hover:underline'>
                Clique aqui para cadastrar.
              </span>
            </Link>
          )}

          <button
            type='submit'
            className='
          bg-purple-700 px-2 h-11 text-white font-bold rounded-md my-4 
          cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
            disabled={customers.length === 0}
          >
            Cadastrar
          </button>

        </form>

      </main>
    </Container>
  )
}

export default NewTicket;