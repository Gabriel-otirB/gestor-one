import Container from '@/components/container';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import MeuCustomerForm from '../components/form';

const NewCustomer = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  return (
    <Container>
      <main className='flex flex-col mt-9 mb-2'>
        <div className='flex items-center gap-3'>
          <Link href="/dashboard/customer" className="bg-gray-900 px-4 py-1 rounded text-white">
            Voltar
          </Link>
          <h1 className='text-3xl font-bold'>Novo cliente</h1>
        </div>

        <MeuCustomerForm />
        
      </main>
    </Container>
  )
}

export default NewCustomer;