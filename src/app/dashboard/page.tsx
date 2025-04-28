import Container from '@/components/container';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import TicketItem from './components/ticket';

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  return (
    <Container>
      <main className='mt-9 mb-2'>
        <div className='flex items-center justify-between'>
          <h1 className='text-3xl font-bold'>Chamados</h1>
          <Link href="/dashboard/new" className='bg-purple-800 px-4 py-1 rounded text-white'>
            Abrir chamado
          </Link>
        </div>

        <div className="border-2 border-neutral-200 rounded-lg overflow-hidden mt-2">
          <table className="min-w-full">
            <thead className="bg-neutral-100 text-neutral-700 text-md">
              <tr>
                <th className="font-semibold text-left px-3 py-2">CLIENTE</th>
                <th className="font-semibold text-left px-3 py-2 hidden sm:table-cell">DATA CADASTRO</th>
                <th className="font-semibold text-left px-3 py-2">STATUS</th>
                <th className="font-semibold text-left px-3 py-2">#</th>
              </tr>
            </thead>
            <tbody>
              <TicketItem />
              <TicketItem />
              <TicketItem />
            </tbody>
          </table>
        </div>
      </main>
    </Container>
  )
}

export default Dashboard;