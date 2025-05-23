import Container from '@/components/container';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react'

import Link from 'next/link';
import { CardCustomer } from './components/card';
import prismaClient from '@/lib/prisma';

const Customer = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const customers = await prismaClient.customer.findMany({
    where: {
      userId: session.user.id
    }
  })

  return (
    <Container>
      <main className='mt-9 mb-2'>
        <div className='flex items-center justify-between'>
          <h1 className='text-3xl font-bold'>Meus clientes</h1>
          <Link
            href="/dashboard/customer/new"
            className='bg-purple-700 text-white px-4 py-1 rounded'
          >
            Novo cliente
          </Link>
        </div>

        <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3'>
          {customers.map(customer => (
            <CardCustomer key={customer.id} customer={customer} />
          ))}
        </section>

        {customers.length === 0 && (
          
          <h1 className='text-gray-600'>Você ainda não possui nenhum cliente.</h1>
        )}

      </main>
    </Container>
  )
}

export default Customer;