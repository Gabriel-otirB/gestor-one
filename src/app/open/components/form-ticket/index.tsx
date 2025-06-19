"use client";

import Input from '@/components/input'
import { api } from '@/lib/api';
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { CustomerDataInfo } from "../../page"

const schema = z.object({
  name: z.string().min(1, "O campo nome é obrigatório."),
  description: z.string().min(1, "O campo descrição é obrigatório."),
})

type FormData = z.infer<typeof schema>

interface FormTicketProps {
  customer: CustomerDataInfo
}

const FormTicket = ({ customer }: FormTicketProps) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  async function handleRegisterTicket(data: FormData) {
    const response = await api.post("api/ticket", {
      name: data.name,
      description: data.description,
      customerId: customer.id
    });
  }

  return (
    <form className='bg-slate-200 mt-6 px-4 py-6 rounded border-2' onSubmit={handleSubmit(handleRegisterTicket)}>
      <div className='flex flex-col gap-1 mb-1'>
        <div>
          <label className='mb-1 font-medium text-lg'>Nome do chamado</label>
          <Input
            type='text'
            placeholder='Digite o nome do chamado...'
            name='name'
            register={register}
            error={errors.name?.message}
          />
        </div>

        <div>
          <label className='font-medium text-lg'>Descrição do chamado</label>
          <textarea
            className='w-full border-2 rounded-md h-24 resize-none px-2 bg-white'
            placeholder='Digite a descrição do chamado...'
            id='description'
            {...register('description')}
            ></textarea>
            {errors.description?.message && <p className='text-red-600 mb-4'>{errors.description?.message}</p>}
        </div>
      </div>
      <button
        type='submit'
        className='bg-blue-500 rounded-md w-full h-11 px-2 text-white font-bold cursor-pointer'
      >
        Cadastrar
      </button>
    </form>
  )
}

export default FormTicket
