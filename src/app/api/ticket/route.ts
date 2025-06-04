import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prismaClient from '@/lib/prisma';

// http://localhost:3000/api/ticket
export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ message: "Not authorized" }, { status: 401 });
  }

  const { id } = await request.json();

  const findTicket = await prismaClient.ticket.findFirst({
    where: {
      id: id as string
    }
  })

  if (!findTicket) {
    return NextResponse.json({ error: "Failed to update ticket" }, { status: 404 });
  }

  try {
    await prismaClient.ticket.update({
      where: {
        id: id as string
      },
      data: {
        status: "FECHADO"
      }
    })

    return NextResponse.json({ message: "Ticket updated successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update ticket" }, { status: 404 });
  }

}