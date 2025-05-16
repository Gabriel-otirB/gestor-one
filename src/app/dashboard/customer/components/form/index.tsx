"use client";

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/components/input';

const schema = z.object({
  name: z.string().min(1, "O campo nome é obrigatório."),
  email: z.string().email("Digite um e-mail válido.").min(1, "O campo email é obrigatório."),
  phone: z.string().refine((value) => {
    return /^(?:\(\d{2}\)\s?)?\d{9}$/.test(value) || /^\d{2}\s\d{9}$/.test(value) || /^\d{11}$/.test(value);
  }, {
    message: "O número de telefone deve estar no formato (DD) 999999999."
  }),
  address: z.string(),
})

type FormData = z.infer<typeof schema>;

const handleRegisterCustomer = (data: FormData) => {
  console.log(data);
}

const NewCustomerForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  return (
    <form className='flex flex-col mt-6' onSubmit={handleSubmit(handleRegisterCustomer)}>

      <div className='flex flex-col flex-1'>
        <label className='mb-1 text-lg font-medium'>Nome completo</label>
        <Input
          type='text'
          placeholder='Digite o nome completo...'
          name='name'
          register={register}
          error={errors.name?.message}
        />
      </div>

      <section className='flex flex-col sm:flex-row sm:items-center gap-4 my-2'>
        <div className='flex flex-col flex-1'>
          <label className='mb-1 text-lg font-medium'>Email</label>
          <Input
            type='email'
            placeholder='Digite o e-mail...'
            name='email'
            register={register}
            error={errors.email?.message}
          />
        </div>

        <div className='flex flex-col flex-1'>
          <label className='mb-1 text-lg font-medium'>Telefone</label>
          <Input
            type='text'
            placeholder='Exemplo (DD) 999999999'
            name='phone'
            register={register}
            error={errors.phone?.message}
          />
        </div>
      </section>

      <div className='flex flex-col flex-1'>
        <label className='mb-1 text-lg font-medium'>Endereço completo</label>
        <Input
          type='text'
          placeholder='Digite o endereço do cliente...'
          name='address'
          register={register}
          error={errors.address?.message}
        />
      </div>

      <button
        type='submit'
        className='bg-purple-700 my-4 px-2 h-11 rounded text-white font-bold'
      >
        Cadastrar
      </button>

    </form>
  )
}

export default NewCustomerForm;