import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prismaClient from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const customerEmail = searchParams.get("email");

  if (!customerEmail || customerEmail === "") {
    return NextResponse.json({ error: "Customer not found" }, { status: 400 });
  }

  try {
    const customer = await prismaClient.customer.findFirst({
      where: {
        email: customerEmail as string
      }
    })

    return NextResponse.json(customer, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: "Customer not found" }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ message: "User not authenticated." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("id");

  if (!userId) {
    return NextResponse.json({ message: "Customer not found." }, { status: 400 });
  }

  const findTickets = await prismaClient.ticket.findFirst({
    where: {
      customerId: userId as string
    }
  })

  if (findTickets) {
    return NextResponse.json({ message: "Customer has tickets." }, { status: 400 });
  }

  try {
    await prismaClient.customer.delete({
      where: {
        id: userId as string
      }
    })

    return NextResponse.json({ message: "Customer deleted successfully!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to delete customer." }, { status: 400 });
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ message: "User not authenticated." }, { status: 401 });
  }

  const { name, email, phone, address, userId } = await request.json();

  try {
    await prismaClient.customer.create({
      data: {
        name,
        email,
        phone,
        address: address ? address : "",
        userId: userId
      }
    });

    return NextResponse.json({ message: "Customer created successfully." }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ message: "Failed to create customer." }, { status: 400 });
  }
}