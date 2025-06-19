"use client";

import Input from '@/components/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Form, useForm } from 'react-hook-form';
import { FiSearch, FiX } from 'react-icons/fi';
import { z } from 'zod';
import FormTicket from './components/form-ticket';
import { api } from '@/lib/api';

const schema = z.object({
  email: z.string().email("Digite o e-mail do cliente.").min(1, "O campo email é obrigatório."),
})

type FormData = z.infer<typeof schema>;

export interface CustomerDataInfo {
  id: string;
  name: string;
}

const OpenTicket = () => {
  const [customer, setCustomer] = useState<CustomerDataInfo | null>(null);

  const { register, handleSubmit, setValue, setError, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  function handleClearCustomer() {
    setCustomer(null);
    setValue('email', '');
  }

  async function handleSelectCustomer(data: FormData) {
    const response = await api.get("/api/customer", {
      params: {
        email: data.email
      }
    })

    if(response.data === null ) {
      setError("email", { type: "custom", message: "Nenhum cliente encontrado com esse e-mail." });
      return; 
    }

    setCustomer({
      id: response.data.id,
      name: response.data.name
    });
  }

  return (
    <div className='w-full max-w-2xl mx-auto px-2'>
      <h1 className='font-bold text-3xl text-center mt-24'>Abrir chamado</h1>

      <main className='flex flex-col mt-4 mb-2'>
        {customer ? (
          <div className='bg-slate-200 py-6 px-2 rounded border-2 flex items-center justify-between'>
            <p className='text-lg'><strong>Cliente selecionado:</strong> {customer.name}</p>
            <button className='h-11 px-2 flex items-center justify-center rounded cursor-pointer' onClick={handleClearCustomer}>
              <FiX size={30} color='#ff2929' />
            </button>
          </div>
        ) : (
          <form 
          onSubmit={handleSubmit(handleSelectCustomer)}
          className='bg-slate-200 py-6 px-2 rounded border-2'>
            <div className='flex flex-col gap-3'>
              <Input
                name='email'
                placeholder='Digite o e-mail do cliente'
                type='email'
                error={errors.email?.message}
                register={register}
              />

              <button className='bg-blue-500 flex flex-row gap-3 px-2 h-11 items-center justify-center rounded text-white font-bold cursor-pointer'>
                Procurar cliente
                <FiSearch size={24} color='#fff' />
              </button>
            </div>
          </form>
        )}

        {customer !== null && <FormTicket customer={customer} />}
      </main>

    </div>
  )
}

export default OpenTicket;
