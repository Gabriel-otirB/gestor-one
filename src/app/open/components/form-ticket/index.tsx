import Input from '@/components/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(1, "O campo nome é obrigatório."),
  description: z.string().min(1, "O campo descrição é obrigatório."),
})

type FormData = z.infer<typeof schema>

const FormTicket = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  return (
    <form className='bg-slate-200 mt-6 px-4 py-6 rounded border-2'>
      <div className='flex flex-col gap-3 mb-1'>
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
          <label className='mb-1 font-medium text-lg'>Descrição do chamado</label>
          <textarea
            className='w-full border-2 rounded-md h-24 resize-none mb-2 px-2 bg-white'
            placeholder='Digite a descrição do chamado...'
            id='description'
            {...register('description')}
          ></textarea>
          {errors.description?.message && <p className='text-red-600 my-1'>{errors.description?.message}</p>}
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
