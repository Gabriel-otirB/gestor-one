"use client";

import { CustomerProps } from '@/utils/customer.type';
import { TicketProps } from '@/utils/ticket.type';
import { FiFile, FiCheckSquare } from 'react-icons/fi';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';

interface TicketItemProps {
  ticket: TicketProps;
  customer: CustomerProps | null;
}

const TicketItem = ({ customer, ticket }: TicketItemProps) => {
  const router = useRouter();

  const handleChangeStatus = async () => {
    try {
      const response = await api.patch("/api/ticket", { id: ticket.id });

      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <tr className='border-b border-b-slate-200 h-16 last:border-b-0 bg-slate-100 hover:bg-slate-200 duration-300'>
        <td className='text-left pl-1'>
          {customer?.name}
        </td>

        <td className='text-left hidden sm:table-cell'>
          {customer?.created_at?.toLocaleDateString('pt-BR')}
        </td>

        <td className='text-left'>
          <span className='bg-green-500 px-2 py-1 rounded'>{ticket.status}</span>
        </td>

        <td className='text-left'>
          <button className='cursor-pointer mr-3' onClick={handleChangeStatus}>
            <FiCheckSquare size={24} color='#131313' />
          </button>
          <button className='cursor-pointer'>
            <FiFile size={24} color='#3b82f6' />
          </button>
        </td>
      </tr>
    </>
  )
}

export default TicketItem;