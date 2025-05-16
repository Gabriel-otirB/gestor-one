import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prismaClient from '@/lib/prisma';

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

  return NextResponse.json({ message: "ok" });
}