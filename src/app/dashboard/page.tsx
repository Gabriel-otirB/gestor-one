import Container from '@/components/container';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import TicketItem from './components/ticket';
import prismaClient from '@/lib/prisma';

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const tickets = await prismaClient.ticket.findMany({
    where: {
      userId: session.user.id,
      status: "ABERTO"
    },
    include: {
      customer: true
    },
    orderBy: {
      created_at: "desc"
    }
  })

  return (
    <Container>
      <main className='mt-9 mb-2'>
        <div className='flex items-center justify-between'>
          <h1 className='text-3xl font-bold'>Chamados</h1>
          <Link href="/dashboard/new" className='bg-purple-700 px-4 py-1 rounded text-white'>
            Abrir chamado
          </Link>
        </div>

        <div className="border-2 rounded-lg overflow-hidden mt-2">
          <table className="min-w-full">
            <thead className="bg-neutral-100 text-neutral-700 text-md border-b-2">
              <tr>
                <th className="font-semibold text-left px-3 py-2">CLIENTE</th>
                <th className="font-semibold text-left px-3 py-2 hidden sm:table-cell">DATA CADASTRO</th>
                <th className="font-semibold text-left px-3 py-2">STATUS</th>
                <th className="font-semibold text-left px-3 py-2">#</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <TicketItem
                  key={ticket.id}
                  ticket={ticket}
                  customer={ticket.customer} />
              ))}
            </tbody>
          </table>
          {tickets.length === 0 && (
            <div className="p-4 text-center">
              <h1 className='px-2 md:px-0 text-gray-600'>Nenhum ticket aberto foi encontrado...</h1>
            </div>
          )}
        </div>
      </main>
    </Container>
  )
}

export default Dashboard;