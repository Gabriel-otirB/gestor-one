"use client";

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

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

const MeuCustomerForm = () => {
  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  return (
    <form>
      <label>Nome completo</label>
      <input
        type="text"
        placeholder='Digite o nome completo...' />
    </form>
  )
}

export default MeuCustomerForm;