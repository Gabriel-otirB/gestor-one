"use client";

import { api } from '@/lib/api';
import { CustomerProps } from '@/utils/customer.type';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function CardCustomer({ customer }: { customer: CustomerProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDeleteCustomer = async () => {
    try {
      setLoading(true);
      const response = await api.delete("/api/customer", {
        params: {
          id: customer.id
        }
      });

      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-white/70">
        <div className="w-8 h-8 border-3 border-purple-700 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <article className='flex flex-col bg-gray-100 border-2 p-2 rounded-lg gap-2 hover:scale-[1.03] duration-300'>
      <h2>
        <a className='font-bold mr-1'>Nome:</a>{customer.name}
      </h2>
      <p><a className='font-bold mr-1'>Email:</a>{customer.email}</p>
      <p><a className='font-bold mr-1'>Telefone:</a>{customer.phone}</p>

      <button
        className='bg-red-500 px-4 rounded text-white mt-2 self-start cursor-pointer'
        onClick={handleDeleteCustomer}
      >
        Deletar
      </button>
    </article>
  )
}