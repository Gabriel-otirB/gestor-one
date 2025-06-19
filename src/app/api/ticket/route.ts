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

export async function POST(request: Request) {
  const { customerId, name, description } = await request.json();

  if (!customerId || !name || !description) {
    return NextResponse.json({ error: "Failed to create ticket" }, { status: 400 });
  }

  try {
    await prismaClient.ticket.create({
      data: {
        name: name as string,
        description: description as string,
        status: "ABERTO",
        customerId: customerId as string
      }
    })

    return NextResponse.json({ message: "Ticket created successfully!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create ticket" }, { status: 400 });
  }

  return NextResponse.json({ message: "Ticket created successfully" }, { status: 201 });
}